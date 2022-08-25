import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScrollSnappingComponent } from './scroll-snapping.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

describe('ScrollSnappingComponent', () => {
  let component: ScrollSnappingComponent;
  let fixture: ComponentFixture<ScrollSnappingComponent>;

  let storeSpy;
  let routerSpy;

  beforeEach(async(() => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'selectSnapshot']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    TestBed.configureTestingModule({
      declarations: [ ScrollSnappingComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeSpy},
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();
    storeSpy.selectSnapshot.and.returnValue({});
    fixture = TestBed.createComponent(ScrollSnappingComponent);
    component = fixture.componentInstance;
    component.content = 'samsung';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
