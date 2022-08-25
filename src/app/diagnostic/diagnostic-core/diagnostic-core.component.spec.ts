import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { DiagnosticCoreComponent } from './diagnostic-core.component';
import { Store, NgxsModule } from '@ngxs/store';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockProductService } from 'src/app/mocks/product-service.mock';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { MockRouter } from 'src/app/mocks/router.mock';
import { DiagnosticService } from '../diagnostic.service';
import { InteractionEnum } from 'src/app/domain/interactions';
import { FeatureState } from 'src/app/states/feature.state';
import { AnalyticsService } from 'src/app/core/analytics.service';

let store;
let modalController;
let loggProvider;

xdescribe('DiagnosticCoreComponent', () => {
    let component: DiagnosticCoreComponent;
    let fixture: ComponentFixture<DiagnosticCoreComponent>;
    const diagnosticService = jasmine.createSpyObj('DiagnosticService', ['getDiagnosticFlow']);
    modalController = jasmine.createSpyObj('ModalController', ['create', 'present']);
    loggProvider = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    const productService = new MockProductService();
    const router = new MockRouter();
    const FEATURE_STATE = {
        featureState: {
            feature: {
                diagnostic: [
                    InteractionEnum.fibraConsultaStatus
                ]
            }
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                DiagnosticCoreComponent,
                HeaderComponent,
            ],
            providers: [
                { provide: ProductService, useValue: productService },
                { provide: DiagnosticService, useValue: diagnosticService },
                { provide: Router, useValue: router },
                { provide: AnalyticsService, useValue: loggProvider },
                { provide: ModalController, useValue: modalController },
            ],
            imports: [
                IonicModule,
                NgxsModule.forRoot([FeatureState])]
        }).compileComponents();
        store = TestBed.get(Store);
        store.reset(FEATURE_STATE);
        // diagnosticService = new DiagnosticService(store);
        fixture = TestBed.createComponent(DiagnosticCoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
