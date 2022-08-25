import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionScaleComponent } from './emotion-scale.component';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EmotionScaleComponent', () => {
  let component: EmotionScaleComponent;
  let fixture: ComponentFixture<EmotionScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionScaleComponent ],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
