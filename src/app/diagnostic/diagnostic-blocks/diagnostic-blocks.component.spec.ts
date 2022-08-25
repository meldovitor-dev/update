import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';

import { DiagnosticBlocksComponent } from './diagnostic-blocks.component';
import { NgxsModule, Store } from '@ngxs/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DiagnosticService } from '../diagnostic.service';
import { MockRouter } from 'src/app/mocks/router.mock';
import { Router, ActivatedRoute } from '@angular/router';
import { FeatureState } from 'src/app/states/feature.state';
import { MockDiagnosticService } from 'src/app/mocks/diagnostic-service.mock';
import { blocks } from './diagnostic-blocks.constants';
import { Observable } from 'rxjs';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { CallService } from 'src/app/services/call.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { UrlParamsService } from 'src/app/services/url-params.service';
import { FalhaMassivaInfoService } from 'src/app/services/falha-massiva-info.service';
import { OmnichannelService } from 'src/app/services/omnichannel.service';
import { HttpClientModule } from '@angular/common/http';
import { BlockTypes } from 'src/app/enums/catalog.enum';
import { BLOCK_FINANCIAL_CORP_CLIENTS, BLOCK_FIBRA_NETQ_NOK } from './blocks-catalog/blocks-catalog-fibra';
import { ScreenSet } from 'src/app/actions/screen.actions';

describe('DiagnosticBlocksComponent', () => {
    let component: DiagnosticBlocksComponent;
    let fixture: ComponentFixture<DiagnosticBlocksComponent>;
    let storeSpy;
    let routerSpy;
    let analyticsServiceSpy;
    let callServiceSpy;
    let iabSpy;
    let alertControllerSpy;
    let urlParamsServiceSpy;
    let falhaMassivaInfoSpy;
    let omnichannelSpy;

    class ActivatedRouteMock {    // Uma maneira de conseguir mockar observables de serviços chamados no construtor
      queryParams = new Observable(observer => {
        const urlParams = {fromDeeplink: 'true', portfolioPresent: 'true', isPositivado: 'true', needsActionContract: 'true'};
        observer.next(urlParams);
        observer.complete();
      });
      params = new Observable(observer => {
        const urlParams = {
          param1: 'some',
          param2: 'params'
        };
        observer.next(urlParams);
        observer.complete();
      });
    }

    const diagnosticService = new MockDiagnosticService();
    diagnosticService.blockPage = blocks.fibra[0];
    beforeEach(async(() => {
        storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
        analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
        callServiceSpy = jasmine.createSpyObj('CallService', ['callWithNumber', 'callToCallCenter']);
        iabSpy = jasmine.createSpyObj('InAppBrowserService', ['goToMinhaOi', 'goToOiSolucoes', 'goToOiMaisEmpresas', 'goToJoice']);
        alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
        urlParamsServiceSpy = jasmine.createSpyObj('UrlParamsService', ['urlParamsCheck']);
        falhaMassivaInfoSpy = jasmine.createSpyObj('FalhaMassivaInfoService', ['patchFalhaMassiva']);
        omnichannelSpy = jasmine.createSpyObj('OmnichannelService', ['sendNetQNok']);

        TestBed.configureTestingModule({
            declarations: [DiagnosticBlocksComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: DiagnosticService, useValue: diagnosticService },
                { provide: Router, useValue: routerSpy },
                { provide: AnalyticsService, useValue: analyticsServiceSpy },
                { provide: ActivatedRoute, useClass: ActivatedRouteMock },
                { provide: Store, useValue: storeSpy },
                { provide: CallService, useValue: callServiceSpy },
                { provide: InAppBrowserService, useValue: iabSpy },
                { provide: AlertController, useValue: alertControllerSpy },
                { provide: UrlParamsService, useValue: urlParamsServiceSpy },
                { provide: FalhaMassivaInfoService, useValue: falhaMassivaInfoSpy },
                { provide: OmnichannelService, useValue: omnichannelSpy },
            ],
            imports: [
                IonicModule,
                NgxsModule.forRoot([FeatureState]),
                HttpClientModule
            ]
        }).compileComponents();
        storeSpy.selectSnapshot.and.returnValue({cpfOrCnpj: '987654320100'});
        fixture = TestBed.createComponent(DiagnosticBlocksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle client corp if needed when created', () => {
      component.page = { condicao: { tipo: BlockTypes.FINANCEIRO}};
      spyOn(component, 'checkIfCorpClient').and.returnValue(true);
      spyOn(component, 'handleCorpClient');
      component.ngOnInit();
      expect(component.handleCorpClient).toHaveBeenCalled();
    });

    it('should set correct page when handling client corp', () => {
      component.handleCorpClient();
      expect(component.page).toEqual(BLOCK_FINANCIAL_CORP_CLIENTS);
    });

    it('should get correct number to call when handling client corp', () => {
      component.handleCorpClientCallCenter();
      expect(callServiceSpy.callWithNumber).toHaveBeenCalled();
    });

    it('should call omnichannel when netQ NOK', () => {
      component.page = BLOCK_FIBRA_NETQ_NOK;
      component.handleNetQNok();
      expect(omnichannelSpy.sendNetQNok).toHaveBeenCalled();
    });

    it('should call correct function when buttonClickedis called', () => {
      spyOn(component, 'goToHome');
      const button = { acao: {nome: 'goToHome', params: 'teste'}};
      component.buttonClicked(button);
      expect(component.goToHome).toHaveBeenCalledWith('teste');
    });

    it('should call correct function when goToMinhaOi is called', () => {
      component.goToMinhaOi('');
      expect(iabSpy.goToMinhaOi).toHaveBeenCalled();
    });

    it('should call correct function when goToOiSolucoes is called', () => {
      component.goToOiSolucoes('');
      expect(iabSpy.goToOiSolucoes).toHaveBeenCalled();
    });

    it('should call correct function when goToOiMaisEmpresas is called', () => {
      component.goToOiMaisEmpresas();
      expect(iabSpy.goToOiMaisEmpresas).toHaveBeenCalled();
    });

    it('should call correct function when goToJoice is called', () => {
      component.goToJoice();
      expect(iabSpy.goToJoice).toHaveBeenCalled();
    });

    it('should call correct function when goToHome is called', () => {
      component.goToHome('');
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('home');
    });

    it('should call correct function when goToAgendamento is called', () => {
      component.goToAgendamento();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['visitas_tecnicas']);
    });

    it('should call correct function when goToTroubleshootPage is called', () => {
      component.goToTroubleshootPage();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['solucao-de-problemas']);
    });

    it('should dispatch ga function when publishGaAlert is called', () => {
      component.publishGaAlert('teste');
      expect(storeSpy.dispatch).toHaveBeenCalledWith(new ScreenSet({ screenName: 'teste' }));
    });

    it('should not dispatch ga function when publishGaAlert is called', () => {
      component.publishGaAlert('');
      expect(storeSpy.dispatch).not.toHaveBeenCalledWith(new ScreenSet({ screenName: '' }));
    });

    it('should call to call center when goToCallCenter is called', () => {
      spyOn(component, 'checkIfCorpClient').and.returnValue(false);
      component.goToCallCenter();
      expect(callServiceSpy.callToCallCenter).toHaveBeenCalled();
    });

    it('should call to handleCorpClientCallCenter when goToCallCenter is called and it is a corp client', () => {
      spyOn(component, 'checkIfCorpClient').and.returnValue(true);
      spyOn(component, 'handleCorpClientCallCenter');
      component.goToCallCenter();
      expect(callServiceSpy.callToCallCenter).not.toHaveBeenCalled();
      expect(component.handleCorpClientCallCenter).toHaveBeenCalled();
    });

});
