import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageSelectorComponent } from './image-selector.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnalyticsService } from 'src/app/core/analytics.service';

describe('ImageSelectorComponent', () => {
  let component: ImageSelectorComponent;
  let fixture: ComponentFixture<ImageSelectorComponent>;

  let analyticsServiceSpy;

  beforeEach(async(() => {
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);

    TestBed.configureTestingModule({
      declarations: [ ImageSelectorComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
