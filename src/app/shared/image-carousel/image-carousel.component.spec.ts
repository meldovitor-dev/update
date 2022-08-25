import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { ImageCarouselComponent } from './image-carousel.component';
import { Store } from '@ngxs/store';
import { AnalyticsService } from 'src/app/core/analytics.service';

describe('ImageCarouselComponent', () => {
  let component: ImageCarouselComponent;
  let fixture: ComponentFixture<ImageCarouselComponent>;

  beforeEach(async(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    const modalControllerSpy = jasmine.createSpyObj('ModalController', ['create']);
    const analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['logEventGA']);

    TestBed.configureTestingModule({
      declarations: [ ImageCarouselComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: ModalController, useValue: modalControllerSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
