import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CobreMigracaoComponent } from './cobre-migracao.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';
import { ProductHelper } from 'src/app/helpers/product-helper';

describe('CobreMigracaoComponent', () => {
  let component: CobreMigracaoComponent;
  let fixture: ComponentFixture<CobreMigracaoComponent>;

  let storeSpy;
  let iabSpy;
  let productSpy;

  const migracaoMock = {sucesso: true, solicitarMigracao: true, migracaoType: 'MIGRACAO FIBRA', ofertaType: '', ofertaDelta: false}

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    iabSpy = jasmine.createSpyObj('InAppBrowserService', ['createInAppBrowser']);
    productSpy = jasmine.createSpyObj('ProductHelper', ['extractConfig', 'getInteraction']);

    TestBed.configureTestingModule({
      declarations: [ CobreMigracaoComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy},
        { provide: InAppBrowserService, useValue: iabSpy },
        { provide: ProductHelper, useValue: productSpy}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CobreMigracaoComponent);
    component = fixture.componentInstance;
    component.migracaoData = migracaoMock;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
