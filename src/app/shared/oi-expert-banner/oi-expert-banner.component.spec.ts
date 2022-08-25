import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OiExpertBannerComponent } from './oi-expert-banner.component';

describe('OiExpertBannerComponent', () => {
  let component: OiExpertBannerComponent;
  let fixture: ComponentFixture<OiExpertBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OiExpertBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OiExpertBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
