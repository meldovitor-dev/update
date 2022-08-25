import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlidesTroubleshootingComponent } from './slides-troubleshooting.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SlidesTroubleshootingComponent', () => {
  let component: SlidesTroubleshootingComponent;
  let fixture: ComponentFixture<SlidesTroubleshootingComponent>;

  let storeSpy;
  let analyticsServiceSpy;

  const pageMock = {
    metadata: 'tela 4',
    label: 'Selecionar canal',
    ga: 'selecionar_canal',
    gaLabel: 'selecionar_canal',
    top: {
      title: 'Selecionar canal:',
      paragraph: 'Use as teclas pra digitar o canal da programação que você quer assistir.'
    },
    bottom: [
      {
        description: 'ver_tela',
        ga: ''
      }
    ]
  };

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logScreenViewGa']);
    TestBed.configureTestingModule({
      declarations: [ SlidesTroubleshootingComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule, BrowserAnimationsModule],
      providers: [
        { provide: Store, useValue: storeSpy},
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SlidesTroubleshootingComponent);
    component = fixture.componentInstance;
    // component.pages = [pageMock];
    spyOn(component, 'getSlides').and.returnValue([pageMock]);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
