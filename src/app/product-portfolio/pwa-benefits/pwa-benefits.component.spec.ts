import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PwaUtilityService } from 'src/app/services/pwa-utility.service';

import { PwaBenefitsComponent } from './pwa-benefits.component';

describe('PwaBenefitsComponent', () => {
  let component: PwaBenefitsComponent;
  let fixture: ComponentFixture<PwaBenefitsComponent>;

  const pwaUtilityServicesSpy = jasmine.createSpyObj('PwaUtilityService', ['isPwa']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwaBenefitsComponent ],
      providers: [{ provide: PwaUtilityService, useValue: pwaUtilityServicesSpy }],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PwaBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
