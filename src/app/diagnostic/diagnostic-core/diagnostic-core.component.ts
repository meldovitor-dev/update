import { Router } from '@angular/router';
import { DiagnosticService } from './../diagnostic.service';
import { ProductHelper } from './../../helpers/product-helper';
import { TicketState } from './../../states/ticket.state';
import { Store } from '@ngxs/store';
import { InteractionEnum, InteractionModel } from './../../domain/interactions';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductState } from 'src/app/states/product.state';
import { FeatureState } from 'src/app/states/feature.state';
import { SubSink } from 'subsink';
import { Feature } from 'src/app/domain/feature';
import { of, Subject, Subscription } from 'rxjs';
import { DiagnosticStepModel } from './diagnostic-step.model';
import { delay, takeUntil, filter, take, tap } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { CountdownTimer } from 'src/app/shared/countdown-timer';
import { DeleteTicketAction } from 'src/app/actions/ticket.actions';
import { FeatureUnset } from 'src/app/actions/feature.action';
import { ModalController } from '@ionic/angular';
import { DiagnosticCancelComponent } from '../diagnostic-cancel/diagnostic-cancel.component';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { ScreenSet, ScreenStateModel } from 'src/app/actions/screen.actions';
import { BackgroundService } from 'src/app/services/background.service';
import { LocalNotificationService } from 'src/app/services/local-notification.service';
import { FeatureEnum } from 'src/app/enums/feature.enum';


@Component({
  selector: 'tecvirt-diagnostic-core',
  templateUrl: './diagnostic-core.component.html',
  styleUrls: ['./diagnostic-core.component.scss'],
  animations: [
    trigger(
        'inOutAnimation',
        [
            transition(':enter', [
                style({ transform: 'translateX(70px)', opacity: 0 }),
                animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ display: 'none' }),
            ])
        ]
    )
]
})
export class DiagnosticCoreComponent implements OnInit {

  public subscriptions = new SubSink();
  private countdownSubscriptions = new SubSink();
  private backgroundSubscription: Subscription;
  public destroyStatusTerminalRequest = new Subject<boolean>();
  public feature: Feature;
  public product: any;
  public diagnosticSteps;
  public alignTimerPage;
  public stopDiagnostic = false;
  public currentStep = { isAutomaticVerifications: false, isConclusion: false, isCheckStatus: false };
  public layoutSteps: DiagnosticStepModel[] = [];
  public pageLayout: any;
  public totalSteps: number;
  public protocol;
  public currentStepIdx = 0;
  public countdown: CountdownTimer;
  public requestResolved = [];
  public blocks: string[] = [];
  public results = {};
  private DIAGNOSTIC_LOCAL_NOTIFICATION = 2336;
  statusTerminalCount = 0;
  MAX_ATTEMPTS_STATUS_TERMINAL = 3;

  constructor(
    public productService: ProductService,
    public store: Store,
    public router: Router,
    public diagnosticService: DiagnosticService,
    public modalController: ModalController,
    public loggProvider: AnalyticsService,
    private backgroundService: BackgroundService,
    private localNotificationService: LocalNotificationService) { }

  ngOnInit() {
    this.feature = this.store.selectSnapshot(FeatureState.getFeature);
    this.protocol = this.feature.protocol;
    this.product = this.store.selectSnapshot(ProductState.getCurrentProduct);
    this.startInterface();
    this.subscriptions.add(
      this.diagnosticService.finishDiagnostic.subscribe(res => {
        this.ngOnDestroy();
      })
    );

    this.backgroundSubscription = this.backgroundService.onPause.subscribe(() => {
      this.localNotificationService.schedule({
        title: "Vamos retomar seu atendimento?",
        text: "Clique aqui pra continuar o diagnóstico.", seconds: 30
      },
        this.DIAGNOSTIC_LOCAL_NOTIFICATION)
    });
  }
  ngAfterContentInit(): void {

  }
  startInterface() {
    this.stopDiagnostic = false;
    this.publishGaDiagnosticStart(); // ga de verificacoes;
    this.diagnosticSteps = this.diagnosticService.getDiagnosticFlow();
    this.layoutSteps = this.diagnosticSteps.checkStatusStep || [];
    if (!this.layoutSteps.length) {
      this.nextAutomaticSteps();
      return;
    }
    this.currentStep.isCheckStatus = true;
    this.totalSteps = (this.layoutSteps.length - 1);
    this.nextTimerOnLayout();
  }
  publishGaDiagnosticStart() {
    const screenName = 'executando_verificacoes_automaticas';
    const contextFlow = 'diagnostico';
    this.store.dispatch(new ScreenSet({
      screenName,
      contextFlow
    }));
  }
  publishGaAction(evt: string, label = 'click') {
    this.loggProvider.logEventGA(evt, label);
  }
  nextTimerOnLayout() {
    const { interactions, gaAction } = this.layoutSteps[this.currentStepIdx];
    this.publishGaAction(gaAction, 'visualizou');
    (interactions || []).forEach(el => {
      this.commitAndRegister(el);
    });
    const { timer } = this.layoutSteps[this.currentStepIdx];
    // tslint:disable-next-line: deprecation
    const destroy = this.createADestroy();
    // tslint:disable-next-line: deprecation
    const obs = of({}).pipe(
      takeUntil(destroy),
      delay(timer || 5000),
    ).subscribe(res => {
      this.updateLayout({ isDelayDone: true });
      obs.unsubscribe();
    });
    this.subscriptions.add(obs);
  }
  nextAutomaticSteps() {
    if (!this.diagnosticSteps ||
      !this.diagnosticSteps.automaticStep ||
      !this.diagnosticSteps.automaticStep.length ||
      this.currentStepIdx >= (this.diagnosticSteps.automaticStep.length)) {
      this.conclusionStep();
      return;
    }
    this.diagnosticService.execDistroyers();
    this.currentStep.isCheckStatus = false;
    this.currentStep.isAutomaticVerifications = true;
    // intermediate page between chronos
    this.setPageLayout();
    if (this.currentStepIdx > 0) {
      const sub = this.intermediateChronos().subscribe(res => {
        sub.unsubscribe();
        this.alignTimerPage = undefined;
        this.checkStepPagesBeforeAction();
      });
      return;
    }
    this.checkStepPagesBeforeAction();
  }
  setPageLayout(options?) {
    if (!options) {
      this.pageLayout = this.diagnosticSteps.automaticStep[this.currentStepIdx];
    } else {
      this.pageLayout = this.diagnosticSteps.conclusionStep[this.currentStepIdx];
    }
  }

  publishGA(analyticsObj?) {
    this.store.dispatch(new ScreenSet(analyticsObj));
  }

  checkStepPagesBeforeAction() {
    // before to commit and register, check if the page has actions
    if (!this.diagnosticSteps.automaticStep[this.currentStepIdx]) {
      this.conclusionStep();
      return;
    }
    const { checkActionPage } = this.diagnosticSteps.automaticStep[this.currentStepIdx];
    if (!checkActionPage) {
      this.updateActions();
      return;
    }
    const { key, interaction } = checkActionPage;
    if (!this.results || !this.results[interaction] || !this.results[interaction].payload) {
      this.updateActions();
      return;
    }
    const { payload } = this.results[interaction];
    const page = payload[key];
    if (!checkActionPage[page]) {
      this.updateActions();
      return;
    }
    const fallback = this.pageLayout;
    this.pageLayout = checkActionPage[page] || fallback;
  }

  updateActions() {
    this.setPageLayout();
    const { interaction } = this.diagnosticSteps.automaticStep[this.currentStepIdx];
    this.commitAndRegister(interaction);
    this.currentStepIdx++;
  }

  intermediateChronos() {
    this.alignTimerPage = {
      title: this.pageLayout.preTitle
    };
    const analytics: ScreenStateModel = {
      screenName: this.pageLayout.preGaPageName,
    };
    this.publishGA(analytics);
    // tslint:disable-next-line: deprecation
    return of({}).pipe(
      delay(3000)
    );
  }
  getResultInteraction(interaction: InteractionEnum) {
    return (this.results && this.results[interaction] ? this.results[interaction] : undefined);
  }

  conclusionStep() {
    this.setConclusionPage();
    this.currentStep.isCheckStatus = false;
    this.currentStep.isAutomaticVerifications = false;
    this.currentStep.isConclusion = true;
    this.setPageLayout({ isConclusion: true });
    this.stopDiagnostic = true;
    this.diagnosticService.execDistroyers();
  }
  setConclusionPage() {
    this.feature.featureCode === FeatureEnum.BANDA_LARGA_LENTA ? this.currentStepIdx = 1 : this.currentStepIdx = 0;
  }
  updateLayout(state: { isDelayDone?: boolean } = {}) {
    // Once be setted with true, stay with true
    this.layoutSteps[this.currentStepIdx].isDelayDone = !!state.isDelayDone || this.layoutSteps[this.currentStepIdx].isDelayDone;
    const { isDelayDone, type } = this.layoutSteps[this.currentStepIdx];
    if (!isDelayDone || !this.requestResolved.includes(type)) {
      return;
    }
    if (this.blocks.includes(this.layoutSteps[this.currentStepIdx].type)) {
      this.goToBlockPage();
      return;
    }
    this.layoutSteps[this.currentStepIdx].state = 'done';
    // indicates finish status check
    if (this.currentStepIdx >= this.totalSteps) {
      this.currentStepIdx = 0; // reset idx for automatic steps
      this.nextAutomaticSteps();
      return;
    }
    if (this.currentStepIdx < this.totalSteps) {
      this.currentStepIdx++;
      this.layoutSteps[this.currentStepIdx].state = 'doing';
      this.nextTimerOnLayout();
    }
  }

  nextStep() {
    if (this.currentStep.isCheckStatus) {
      this.updateLayout();
      return;
    }
    if (this.currentStep.isAutomaticVerifications) {
      this.nextAutomaticSteps();
      return;
    }
  }
  commitAndRegister(interaction: InteractionEnum) {
    this.commitInteraction(interaction);
    this.registerResponse(interaction);
  }

  commitInteraction(interaction: InteractionEnum | InteractionEnum[]) {
    if (this.stopDiagnostic) {
      return;
    }
    const destroy = this.createADestroy();
    this.productService.commitInteraction(interaction, { destroy });
  }

  createADestroy() {
    const destroy = new Subject<boolean>();
    this.diagnosticService.registerDistroyers(destroy);
    return destroy;
  }

  goToBlockPage() {
    this.router.navigate(['diagnostico/conclusao']);
    return;
  }

  handlerResponse(res, interaction) {
    const interactionModel = ProductHelper.getInteraction(interaction);
    this.handlerBlocks(res, interactionModel);
  }
  async handlerBlocks(res, interaction: InteractionModel) {
    const block = await this.diagnosticService.hasBlock(interaction.id, res);
    if (block && block.realizouReprofileComSucesso) {
      this.conclusionStep();
      return;
    }
    if (block && (block as any).validByStatusTerminal) {
      this.commitAndRegisterStatusTerminal();
      return;
    }
    if (!block) {
      this.resolveSteps(interaction);
      if (this.currentStep.isAutomaticVerifications && this.countdown) {
        this.countdown.stop();
      }
      this.nextStep();
      return;
    }
    if ((block as any).interaction) {
      this.commitAndRegister((block as any).interaction);
    }
    const reason = this.diagnosticService.getStepBlock(block);
    if (reason) {
      this.blocks.push(reason);
      this.resolveSteps(interaction);
      if (this.currentStep.isAutomaticVerifications) {
        this.goToBlockPage();
      }
    }
    this.nextStep();
  }
  resolveSteps(interaction) {
    const { stepsResolve } = interaction;
    if (stepsResolve && stepsResolve.length) {
      this.requestResolved = [
        ...this.requestResolved,
        ...stepsResolve,
      ];
    }
  }

  registerResponse(interaction: InteractionEnum) {
    if (this.currentStep.isAutomaticVerifications) {
      this.registerCountdown(interaction);
    }
    const sub = this.store.select(TicketState.getTickets(interaction))
      .pipe(
        filter(res => (res && !res.isEmExecucao)),
        take(1)
      )
      .subscribe(res => {
        if (!this.results[interaction]) {
          this.results[interaction] = res;
        }
        this.handlerResponse(res, interaction);
        sub.unsubscribe();
      });
    this.subscriptions.add(sub);
  }

  handleCountdownInBackground(interaction) {
    const countdownTime = this.countdown.getTime() / 1000;
    let countdownState = undefined;
    let wentToBackgroundTS = undefined;

    this.countdown.on('tick', (statePerSecond) => countdownState = statePerSecond)

    this.countdownSubscriptions.add(
      this.backgroundService.onPause.subscribe(() => {
        wentToBackgroundTS = Math.floor(Date.now() / 1000);
        const timeLeft = countdownTime - (countdownTime - countdownState.tick);
        this.localNotificationService.schedule({
          title: "Vamos continuar?",
          text: "Clique aqui pra retomar o seu atendimento.", seconds: timeLeft
        },
          this.DIAGNOSTIC_LOCAL_NOTIFICATION
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
            const pendingTicket: InteractionModel = ProductHelper.getInteraction(interaction);
            this.productService.handlerInteraction(pendingTicket);
            this.registerCountdown(interaction, actualTimeMS);
          }
        }
      })
    );
  }

  registerCountdown(interaction, recursiveTime?) {
    const { timer_espera_ms, max_timeout_ms, timeout_ms } = this.productService.getConfigFromInteraction(interaction);
    let t = recursiveTime || timer_espera_ms || max_timeout_ms || timeout_ms || 1000;

    if (this.countdown) {
      this.countdown.stop();
      this.countdownSubscriptions.unsubscribe();
    } else {
      this.backgroundSubscription.unsubscribe();
    }

    this.countdown = new CountdownTimer(interaction, t / 1000);
    this.countdown.start();
    this.countdown.on('finish', (r) => {
      this.destroyStatusTerminalRequest.next(true);
      this.stopBackgroundHandler();
      this.nextStep();
    });

    this.handleCountdownInBackground(interaction);
  }

  stopBackgroundHandler() {
    this.countdownSubscriptions.unsubscribe();
    this.backgroundSubscription.unsubscribe();
  }

  goToTs() {
    this.router.navigate(['solucao-de-problemas']);
    this.stopBackgroundHandler();
  }
  ngOnDestroy() {
    this.results = {};
    this.subscriptions.unsubscribe();
    this.stopBackgroundHandler();
  }
  navAction(evt: any) {
    const { action } = evt;
    if (action) {
      this[action.call](action.params);
    }
  }
  /**
   * Special case for banda larga valid reset dsl and reprofile
   */
  commitAndRegisterStatusTerminal() {
    const confirmStatus = async () => {
      if (this.statusTerminalCount++ === this.MAX_ATTEMPTS_STATUS_TERMINAL) {
        this.conclusionStep();
        return;
      }
      const terminalInteraction = InteractionEnum.consultaStatusTerminal;
      try {
        await this.store.dispatch(new DeleteTicketAction(terminalInteraction));
        this.diagnosticService.execDistroyers();
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
            this.conclusionStep();
            return;
          }
          confirmStatus();
        });
    };
    confirmStatus();
  }
  alignmentDone(evt) {
    // not implemented.
  }
  goToSuccess() {
    this.router.navigate(['sucesso']);
  }
  goToHome() {
    this.router.navigate(['home']).finally(() => {
      this.store.dispatch(new FeatureUnset());
    });
  }
  async cancelModal() {
    const modal = await this.modalController.create({
      component: DiagnosticCancelComponent,
      cssClass: 'tec-virt-reduced-modal',
      backdropDismiss: false
    });
    await modal.present();
    const result = await modal.onWillDismiss();
    if (result && result.data && result.data.action) {
      const { action } = result.data;
      this[action.call](action.params);
    }
  }
  automaticActionEvt(event) {
    if (!event || !event.action) {
      return;
    }
    this.navAction(event);
  }

}
