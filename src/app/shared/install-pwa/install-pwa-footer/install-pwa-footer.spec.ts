import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PwaUtilityService } from 'src/app/services/pwaUtility.service';
import { AnalyticsService } from 'src/app/core/analytics.service';


import { InstallPwaFooterComponent } from './install-pwa-footer.component';

describe('PwaBenefitsComponent', () => {
  let component: InstallPwaFooterComponent;
  let fixture: ComponentFixture<InstallPwaFooterComponent>;

  let pwaUtilityServicesSpy = jasmine.createSpyObj('PwaUtilityService', ['installBanner']);
  let analyticsServiceSpy;

  beforeEach(async(() => {
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);
    TestBed.configureTestingModule({
      declarations: [ InstallPwaFooterComponent ],
      providers: [
        { provide: PwaUtilityService, useValue: pwaUtilityServicesSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstallPwaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call correct functions when installPWA is called', () => {
    component.installPWA('');
    expect(component.hasClicked).toBe(true);
    expect(pwaUtilityServicesSpy.installBanner).toHaveBeenCalled();
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('adicionar_pwa_tela_inicial', 'click');
  });

  it('should call correct functions when onClick is called', () => {
    component.onClick({stopPropagation: () => {}});
    expect(component.hasClicked).toBe(true);
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('fechar_alerta_adicionar_pwa_tela_inicial', 'click');
  });
});
