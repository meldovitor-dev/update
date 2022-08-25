import { FalhaMassivaInfoService } from './../../../services/falha-massiva-info.service';
import { ProtocolService } from './../../../services/protocol.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { CARD_DIAGNOSTIC_TEMPLATE, NON_DEFAULT_PAGES, CARD_SPECIFIC_FINANCIAL_TITLE } from './card-diagnostic.constants';
import { DiagnosticService } from 'src/app/diagnostic/diagnostic.service';
import { Store } from '@ngxs/store';
import { ProductState } from 'src/app/states/product.state';
import { ProductIdentifierEnum, ProductCodeEnum } from 'src/app/enums/product.enum';
import { InteractionEnum } from 'src/app/domain/interactions';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter, switchMap, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { AddDiagnosticConclusion, ClearDiagnosticConclusion, ClearHomeTickets } from 'src/app/actions/utility.actions';
import { HomeTicketService } from 'src/app/services/home-ticket.service';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { FeatureSet } from 'src/app/actions/feature.action';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { ProductInterface } from 'src/app/domain/product.interface';
import _ from 'lodash';

@Component({
  selector: 'tecvirt-card-diagnostic',
  templateUrl: './card-diagnostic.component.html',
  styleUrls: ['./card-diagnostic.component.scss'],
  providers: [DiagnosticService],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateX(-20px)'
      })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('0.4s', style({
          transform: 'translateX(0px)',
          opacity: 1
        }))
      ]),
    ]),
  ],
})
export class CardDiagnosticComponent implements OnChanges, OnInit, OnDestroy {
  subs = new SubSink();
  page;
  hideCard = true;
  timestamp = new Date();
  product: ProductInterface;
  falhaResolved = false;
  @Input() tickets;
  constructor(
    public diagnosticService: DiagnosticService,
    public store: Store,
    public router: Router,
    public ht: HomeTicketService,
    public ga: AnalyticsService,
    public protocolService: ProtocolService,
    public falhaMassivaInfo: FalhaMassivaInfoService
  ) {}

  ngOnInit() {
    this.subs.sink = this.store.select(ProductState.getCurrentProduct)
      .pipe(
        filter(prd => !!prd),
        // tap(_ => this.ht.execDistroyers()),
        switchMap(_ => this.store.dispatch(new ClearDiagnosticConclusion())),
        switchMap(_ => this.store.dispatch(new ClearHomeTickets()))
      )
      .subscribe(_ => {
        this.reset();
        this.product = this.store.selectSnapshot(ProductState.getCurrentProduct);
        this.diagnosticService.initHome();
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    const {
      tickets
    } = changes;
    if (tickets && tickets.currentValue) {
      const ticketObj = tickets.currentValue;
      this.handlerTickets(ticketObj, tickets.previousValue);
    }
  }
  reset() {
    this.page = undefined;
    this.hideCard = true;
    this.timestamp = new Date();
  }
  async handlerTickets(ticketUpdate, previous) {
    const interactions = this.getInteractionsFromProduct();
    const ticketResult = _.pick(ticketUpdate, Object.keys(ticketUpdate).filter(el => !_.isEqual(ticketUpdate[el], previous[el])));
    if (!interactions.includes(Object.keys(ticketResult)[0])) {
      return;
    }
    // show only ticket has been concluded
    for (const i of interactions) {
      if (!ticketUpdate[i] || ticketUpdate[i].isEmExecucao) {
        return;
      }
    }
    let result;
    // Para cada interação FE/BE conferir se existe bloqueio
    interactions.forEach(async (element, index, array) => {
      await this.diagnosticService.hasBlock(element, ticketUpdate[element]);
      const { requestedTime } = ticketUpdate[element];
      this.updateTimestamp(requestedTime);

      const blockPage = this.diagnosticService.blockPage;
      result = this.diagnosticService.getStepBlock(blockPage) || result;
      // Create Priority Check
      if (!result) {
        this.testFalhaMassiva();
      } else {
        this.falhaResolved = false;
        this.page = CARD_DIAGNOSTIC_TEMPLATE[result];
        this.handlerPageTile(result);
        this.hideCard = !this.page;
        if (!this.hideCard) {
          this.publishEvent(false);
        }
      }
    });
  }
  shouldGetFalhaMassivaFinished() {
    const products = [ProductCodeEnum.FIBRA, ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.FIXO];
    return !this.page && products.includes(this.product.productCode);
  }

  publishEvent(isClickEvent = true) {
    const {
      gaPageName
    } = this.getBlockPage();
    this.ga.logEventGA(gaPageName, isClickEvent ? 'click' : 'visualizou');

  }
  updateTimestamp(timer = new Date()) {
    this.timestamp = timer;
  }
  replaceDots(txt: string = '') {
    return txt.replace(':', 'h');
  }
  handlerPageTile(param) {
    if (param === 'financial') {
      this.page.title = CARD_SPECIFIC_FINANCIAL_TITLE[this.product.productCode];
    }
  }
  getInteractionsFromProduct() {
    const {
      identifier
    } = this.store.selectSnapshot(ProductState.getCurrentProduct);
    const options = {
      [ProductIdentifierEnum.BANDA_LARGA]: [
        InteractionEnum.consultaStatusFinanceiro,
        InteractionEnum.consultaEventosVulto
      ],
      [ProductIdentifierEnum.FIXO]: [
        InteractionEnum.consultaStatusFinanceiro,
        InteractionEnum.consultaEventosVulto
      ],
      [ProductIdentifierEnum.TVDTH]: [
        InteractionEnum.tvConsultaStatus
      ],
      fibra: [
        InteractionEnum.fibraConsultaStatus
      ]
    };
    return options[identifier] || options.fibra;
  }
  getBlockPage() {
    const {
      blockPage
    } = this.diagnosticService;
    // verify if existe a non default page
    const {
      id
    } = blockPage;
    let nonDefaultPage;
    if (NON_DEFAULT_PAGES[id]) {
      nonDefaultPage = {
        ...blockPage,
        ...NON_DEFAULT_PAGES[id]
      };
    }
    return nonDefaultPage || blockPage;
  }
  async onClick() {
    if (this.falhaResolved) {
      this.handleFalhaMassicaResolved()
      return;
    }
    this.publishEvent();
    const blockPage = this.getBlockPage();
    const feature = this.store.selectSnapshot(ProductState.getCurrentProduct).features
      .find(el => el.featureCode === FeatureEnum.DIAGNOSTICO_HOME || el.featureCode === FeatureEnum.FIBRA_DIAGNOSTICO_HOME);
    const protocol = await this.protocolService.generateProtocol(feature);
    const featureObj = {
      protocol,
      ...feature
    }
    await this.store.dispatch(new FeatureSet(featureObj)).toPromise();
    this.store.dispatch(new AddDiagnosticConclusion(blockPage)).toPromise()
      .finally(() => {
        const queryParams = {
          fromCardDiag: true
        }
        this.router.navigate(['diagnostico/conclusao'], {
          queryParams
        });
      });
  }
  async testFalhaMassiva() {
    //  Check if falha massiva is finished
    if (this.shouldGetFalhaMassivaFinished()) {
      const falha = await this.falhaMassivaInfo.getFalhaMassivaFinished();
      if (falha && falha.finished && !falha.dismissable) {
        this.falhaResolved = true;
        this.page = CARD_DIAGNOSTIC_TEMPLATE.resolved;
        // PATCH dismissable TRUE
        falha.dismissable = true;
        this.falhaMassivaInfo.patchFalhaMassiva(falha);
        this.hideCard = !this.page;
      }
    }
  }
  handleFalhaMassicaResolved() {
    if (this.product.productCode === ProductCodeEnum.FIBRA) {
      return;
    }
    this.router.navigate(['deeplink-catalog/conclusao-falha-massiva']);
  }

  ngOnDestroy() {
    // this.ht.execDistroyers();
    // this.ht.destroy();
    this.subs.unsubscribe();
  }
}
