import { SharedModule } from './../../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccordionDispositivosComponent } from './accordion-dispositivos.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AnalyticsService } from 'src/app/core/analytics.service';

describe('AccordionDispositivosComponent', () => {
  let component: AccordionDispositivosComponent;
  let fixture: ComponentFixture<AccordionDispositivosComponent>;
  let storeSpy;
  let analyticsServiceSpy;

  const dummyNetwork = {
    ssid: 'Black Bolt',
    devices: [{
      hostName: 'S8',
      vendor: 'TecVirt',
      ssid: 'Black Bolt',
      macAddress: '00:00:00:53:6f:90'
    }],
    banda: '',
    done: false
  };

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select', 'selectSnapshot']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logScreenViewGa', 'logEventGA']);

    TestBed.configureTestingModule({
      declarations: [ AccordionDispositivosComponent ],
      imports: [IonicModule, FormsModule, SharedModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create component even if accordionContent empty', () => {
    component.accordionContent = [];
    expect(component.filteredAccordion[0].networkList.length).toEqual(0);
    expect(component.filteredAccordion[1].networkList.length).toEqual(0);
    expect(component.filteredAccordion[2].networkList.length).toEqual(0);
    expect(component).toBeTruthy();
  });
  it('should setFilteredAccordion correcty add 2.4 GHz networks', () => {
    dummyNetwork.banda = '2.4 GHz';
    component.setFilteredAccordion(dummyNetwork);
    expect(component.filteredAccordion[0].networkList.length).toEqual(1);
  });
  it('should setFilteredAccordion correcty add 5 GHz networks', () => {
    dummyNetwork.banda = '5GHz';
    component.setFilteredAccordion(dummyNetwork);
    expect(component.filteredAccordion[1].networkList.length).toEqual(1);
  });
  it('should setFilteredAccordion correcty add no band networks', () => {
    delete dummyNetwork.banda;
    component.setFilteredAccordion(dummyNetwork);
    expect(component.filteredAccordion[2].networkList.length).toEqual(1);
  });
});
