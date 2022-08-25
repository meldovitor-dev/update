import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FooterTipsComponent } from './footer-tips.component';
import { TipsService } from 'src/app/services/tips.service';
import { InAppBrowserService } from 'src/app/services/in-app-browser.service';

describe('FooterTipsComponent', () => {
  let component: FooterTipsComponent;
  let fixture: ComponentFixture<FooterTipsComponent>;

  let tipsServiceSpy;
  let iabSpy;

  beforeEach(async(() => {
    tipsServiceSpy = jasmine.createSpyObj('TipsService', ['init', 'getTips']);
    iabSpy = jasmine.createSpyObj('InAppBrowserService', ['goToLink']);

    TestBed.configureTestingModule({
      declarations: [ FooterTipsComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TipsService, useValue: tipsServiceSpy },
        { provide: InAppBrowserService, useValue: iabSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call inappbrowser function goToLink when onClick is called', () => {
    const link = 'teste';
    component.onClick(link);
    expect(iabSpy.goToLink).toHaveBeenCalledWith(link);
  });

});
