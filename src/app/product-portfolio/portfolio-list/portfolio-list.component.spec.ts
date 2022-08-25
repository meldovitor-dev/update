import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ViewmoreButtonComponent } from 'src/app/shared/viewmore-button/viewmore-button.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PortfolioListComponent } from './portfolio-list.component';
import { Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { UrlParamsService } from 'src/app/services/url-params.service';

describe('PortfolioListComponent', () => {

  let component: PortfolioListComponent;
  let fixture: ComponentFixture<PortfolioListComponent>;

  let analyticsServiceSpy;
  let urlParamsServiceSpy;

  beforeEach(async(() => {
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA', 'logScreenViewGa']);
    urlParamsServiceSpy = jasmine.createSpyObj('UrlParamsService', ['isVoicenet']);

    TestBed.configureTestingModule({
      declarations: [ PortfolioListComponent, ViewmoreButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: UrlParamsService, useValue: urlParamsServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      imports: [HttpClientModule, BrowserAnimationsModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Voicenet in display name when client coorp', () => {
    urlParamsServiceSpy.isVoicenet.and.callFake(() => true);
    component.ngOnInit();
    expect(component.items[1].technologies[1].displayName).toBe('Fixo Cobre / Voicenet');
  });

  it('should emit product selected evt when is productSelect called', () => {
    spyOn(component.productSelected, 'emit');
    component.productSelect({stopPropagation: () => {}}, 'teste');
    expect(component.productSelected.emit).toHaveBeenCalledWith('teste');
  });

  it('should call logEventGA when logProductEvent is called', () => {
    component.logProductEvent({open: false, gaAction: 'teste'});
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('teste', 'click');
  });

  it('should not call logEventGA when logProductEvent is called and item is opened', () => {
    component.logProductEvent({open: true, gaAction: 'teste'});
    expect(analyticsServiceSpy.logEventGA).not.toHaveBeenCalled();
  });

  it('should call logEventGA and emit evt when scrollScreen is called', () => {
    spyOn(component.viewMoreEvt, 'emit');
    component.scrollScreen('teste');
    expect(analyticsServiceSpy.logEventGA).toHaveBeenCalledWith('descer', 'click');
    expect(component.viewMoreEvt.emit).toHaveBeenCalledWith('teste');
  });

  it('should open and close others items when expandProduct is called', () => {
    const item = component.items[1];
    spyOn(component, 'logProductEvent');
    component.expandProduct(item);
    expect(component.logProductEvent).toHaveBeenCalledWith(item);
    expect(component.items[0].open).toBe(false);
    expect(component.items[1].open).toBe(true);
    expect(component.items[2].open).toBe(false);
  });

});
