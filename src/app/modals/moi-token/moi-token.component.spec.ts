import { ProductCodeEnum, ProductIdentifierEnum } from 'src/app/enums/product.enum';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoiTokenComponent } from './moi-token.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';
import { ModalController } from '@ionic/angular';
import { TokenMinhaOiService } from 'src/app/services/token-minha-oi.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { TecnologyEnum } from 'src/app/enums/tecnology.enum';

describe('MoiTokenComponent', () => {
  let component: MoiTokenComponent;
  let fixture: ComponentFixture<MoiTokenComponent>;

  let storeSpy;
  let modalControllerSpy;

  const productMock = {
    displayName: 'teste',
    productCode: ProductCodeEnum.BANDA_LARGA,
    features: [],
    tecnology: TecnologyEnum.COBRE,
    identifier: ProductIdentifierEnum.BANDA_LARGA,
    ga: 'teste',
  };

  class TokenMinhaOiMock {
    error =  new BehaviorSubject(observer => {
      observer.next({});
      observer.complete();
    });
    handleTokenLogin = jasmine.createSpy();
  }

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);

    TestBed.configureTestingModule({
      declarations: [ MoiTokenComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy},
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: TokenMinhaOiService, useClass: TokenMinhaOiMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoiTokenComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'selectedProduct', { writable: true });  // uma maneira de conseguir mockar o @Select no componente
    component.selectedProduct = of(productMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal when dismiss is called', () => {
    component.dismiss();
    expect(modalControllerSpy.dismiss).toHaveBeenCalledWith({cancel: true});
  });

  it('should name be Fibra when sanitize is called with fibra product', () => {
    const name = component.sanitize({productCode: ProductCodeEnum.FIBRA});
    expect(name).toBe('Fibra');
  });
});
