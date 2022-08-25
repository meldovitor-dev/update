import { LocalNotificationService } from 'src/app/services/local-notification.service';
import { ProductService } from './../../services/product.service';
import { DiagnosticService } from 'src/app/diagnostic/diagnostic.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// eslint-disable-next-line max-len
import { FALHA_MASSICA_RESOLVED, RESET_DSL_INTRO, RESET_DSL, CONCLUSION_STEP, FEEDBACK_CONCLUSION } from './deep-link-falha-massiva.constants';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { ScreenSet, ScreenStateModel } from 'src/app/actions/screen.actions';
import { BlockTypes } from 'src/app/enums/catalog.enum';
import { LocationAction } from 'src/app/actions/location.actions';
import { InteractionEnum } from 'src/app/domain/interactions';
import { TicketState } from 'src/app/states/ticket.state';
import { filter, take, takeUntil } from 'rxjs/operators';
import { CountdownTimer } from 'src/app/shared/countdown-timer';
import { SubSink } from 'subsink';
import { ProductState } from 'src/app/states/product.state';
import { Observable, Subject } from 'rxjs';
import { ProductInterface } from 'src/app/domain/product.interface';
import { DeleteTicketAction } from 'src/app/actions/ticket.actions';
import { BackgroundService } from 'src/app/services/background.service';
import { FalhaMassivaInfoService } from 'src/app/services/falha-massiva-info.service';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-deep-link-falha-massiva',
  templateUrl: './deep-link-falha-massiva.component.html',
  styleUrls: ['./deep-link-falha-massiva.component.scss'],
})
export class DeepLinkFalhaMassivaComponent implements OnInit, OnDestroy  {

  @Select(ProductState.getCurrentProduct) product$: Observable<ProductInterface>;
  subscriptions = new SubSink();
  countdownSubscriptions = new SubSink();
  page;
  blockIcon;
  isStandardStep = true;
  isResetDslStep = false;
  isConclusionStep = false;
  countdown: CountdownTimer;
  destroyStatusTerminalRequest = new Subject<boolean>();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private FALHA_MASSIVA_LOCAL_NOTIFICATION = 2497;

  constructor(public router: Router,
    public store: Store,
    public diagnosticService: DiagnosticService,
    public productService: ProductService,
    private backgroundService: BackgroundService,
    private localNotificationService: LocalNotificationService,
    public falhaMassivaInfo: FalhaMassivaInfoService) { }

  async ngOnInit() {
    this.store.dispatch(new LocationAction('deeplink-falha-massiva'));
    this.changePage(FALHA_MASSICA_RESOLVED);
    this.blockIcon = BlockTypes.FALHA_MASSIVA.toLocaleLowerCase();
    await this.testFalhaMassiva();
    this.diagnosticService.initHome();
  }
  changePage(page) {
    this.page = page;
    this.publishGa();
  }
  async testFalhaMassiva() {
    const falha = await this.falhaMassivaInfo.getFalhaMassivaFinished();
    if (falha && falha.finished && !falha.dismissable) {
      // PATCH dismissable TRUE
      falha.dismissable = true;
      this.falhaMassivaInfo.patchFalhaMassiva(falha);
    }
  }
  publishGa() {
    const { gaPageName, fluxo } = this.page;
    const analytics: ScreenStateModel = {
      screenName: gaPageName
    };
    if (fluxo) {
      analytics.contextFlow = fluxo;
    }
    this.store.dispatch(new ScreenSet(analytics));
  }
  buttonClicked(btn) {
    const { acao } = btn;
    this[acao.nome](acao.params);
  }
  goToHome() {
    this.router.navigateByUrl('home');
  }
  goToSuccess() {
    this.router.navigate(['sucesso']);
  }
  goToDslStep(params) {
    this.changePage(RESET_DSL_INTRO);
  }
  startDSL(params) {
    this.page = RESET_DSL;
    this.isStandardStep = false;
    this.isResetDslStep = true;
    const interactionCode = InteractionEnum.resetDSL;
    this.commitInteraction(interactionCode);
    this.registerResponse(interactionCode);
  }
  setConclusionStep() {
    this.page = CONCLUSION_STEP;
    this.isResetDslStep = false;
    this.isConclusionStep = true;
  }
  setFeedbackStep() {
    this.changePage(FEEDBACK_CONCLUSION);
    this.isConclusionStep = false;
    this.isStandardStep = true;
  }
  registerResponse(interaction: InteractionEnum) {
    this.registerCountdown(interaction);
    const sub = this.store.select(TicketState.getTickets(interaction))
      .pipe(
        filter(res => (res && !res.isEmExecucao)),
        take(1)
      )
      .subscribe(res => {
        this.handlerResponse(res, interaction);
        sub.unsubscribe();
      });
    this.subscriptions.add(sub);
  }

  handleCountdownInBackground(interaction) {
    const countdownTime = this.countdown.getTime() / 1000;
    let countdownState;
    let wentToBackgroundTS;

    this.countdown.on('tick', (statePerSecond) => countdownState = statePerSecond);

    this.countdownSubscriptions.add(
      this.backgroundService.onPause.subscribe(() => {
        wentToBackgroundTS = Math.floor(Date.now() / 1000);
        const timeLeft = countdownTime - (countdownTime - countdownState.tick);
        this.localNotificationService.schedule({
          title: 'Vamos continuar?',
          text: 'Clique aqui pra retomar o seu atendimento.', seconds: timeLeft
        },
          this.FALHA_MASSIVA_LOCAL_NOTIFICATION
        );
      })
    );

    this.countdownSubscriptions.add(
      this.backgroundService.onResume.subscribe(() => {
        const secondsInBackgroud = Math.floor(Date.now() / 1000) - wentToBackgroundTS;
        if (countdownState && secondsInBackgroud >= 2) {
          const actualTime = countdownTime - ((countdownTime - countdownState.tick) + secondsInBackgroud);
          const actualTimeMS = actualTime * 1000;

          if (actualTime !== countdownState.tick && actualTimeMS > 0) {
            this.registerCountdown(interaction, actualTimeMS);
          }
        }
      })
    );
  }

  registerCountdown(interaction, recursiveTime?) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { timer_espera_ms, max_timeout_ms, timeout_ms } = this.productService.getConfigFromInteraction(interaction);
    const t = recursiveTime || timer_espera_ms || max_timeout_ms || timeout_ms || 1000;

    if (this.countdown) {
      this.countdown.stop();
      this.countdownSubscriptions.unsubscribe();
    }

    this.countdown = new CountdownTimer(interaction, t / 1000);
    this.countdown.start();
    this.countdown.on('finish', (r) => {
      this.destroyStatusTerminalRequest.next(true);
      this.countdownSubscriptions.unsubscribe();
      this.setConclusionStep();
    });

    this.handleCountdownInBackground(interaction);
  }

  commitAndRegisterStatusTerminal() {
    const confirmStatus = async () => {
      const terminalInteraction = InteractionEnum.consultaStatusTerminal;
      try {
        await this.store.dispatch(new DeleteTicketAction(terminalInteraction));
      } catch (e) {
        console.log('commitAndRegisterStatusTerminal.catch', e);
      }
      this.commitInteraction(terminalInteraction);
      const sub = this.store.select(TicketState.getTickets(terminalInteraction))
        .pipe(
          filter(res => (res && !res.isEmExecucao)),
          take(1),
          takeUntil(this.destroyStatusTerminalRequest)
        )
        .subscribe(res => {
          if (sub) {
            sub.unsubscribe();
          }
          if (res && res.payload && res.payload.isDslamOk) {
            this.setConclusionStep();
            return;
          }
          confirmStatus();
        });
    };
    confirmStatus();
  }
  async handlerResponse(res, interaction) {
    const block = await this.diagnosticService.hasBlock(interaction, res);
    if (block && (block as any).validByStatusTerminal) {
      this.commitAndRegisterStatusTerminal();
      return;
    }
  }
  commitInteraction(interaction: InteractionEnum | InteractionEnum[]) {
    const destroy = this.createADestroy();
    this.productService.commitInteraction(interaction, { destroy });

  }
  createADestroy() {
    const destroy = new Subject<boolean>();
    this.diagnosticService.registerDistroyers(destroy);
    return destroy;
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
