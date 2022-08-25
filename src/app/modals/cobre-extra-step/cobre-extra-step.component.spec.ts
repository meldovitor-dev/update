import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { CobreExtraStepComponent } from './cobre-extra-step.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductService } from 'src/app/services/product.service';
import { of } from 'rxjs';

describe('CobreExtraStepComponent', () => {
  let component: CobreExtraStepComponent;
  let fixture: ComponentFixture<CobreExtraStepComponent>;

  class StoreMock {
    select = jasmine.createSpy().and.returnValue(of({}));
  }
  let modalSpy;
  let productSpy;

  beforeEach(async(() => {
    modalSpy = jasmine.createSpyObj('ModalController', ['dismiss']);
    productSpy = jasmine.createSpyObj('ProductService', ['commitInteraction']);

    TestBed.configureTestingModule({
      declarations: [ CobreExtraStepComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useClass: StoreMock},
        { provide: ModalController, useValue: modalSpy },
        { provide: ProductService, useValue: productSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CobreExtraStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
