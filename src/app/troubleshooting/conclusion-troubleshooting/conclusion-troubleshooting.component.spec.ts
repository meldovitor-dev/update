import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConclusionTroubleshootingComponent } from './conclusion-troubleshooting.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';

let storeSpy;
describe('ConclusionTroubleshootingComponent', () => {
  let component: ConclusionTroubleshootingComponent;
  let fixture: ComponentFixture<ConclusionTroubleshootingComponent>;
  storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select', 'selectSnapshot']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclusionTroubleshootingComponent ],
      providers: [
          {provide: Store, useValue: storeSpy}
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConclusionTroubleshootingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
