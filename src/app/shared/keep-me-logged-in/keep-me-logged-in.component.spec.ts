import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PwaUtilityService } from 'src/app/services/pwaUtility.service';
import { AnalyticsService } from 'src/app/core/analytics.service';
import { KeepMeLoggedInComponent } from './keep-me-logged-in.component';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';



describe('KeepMeLoggedInComponent', () => {
  let component: KeepMeLoggedInComponent;
  let fixture: ComponentFixture<KeepMeLoggedInComponent>;

  let localstorageServiceSpy;

  beforeEach(async(() => {
    localstorageServiceSpy = jasmine.createSpyObj('LocalstorageService', ['getItem', 'removeItem', 'setItem']);
    TestBed.configureTestingModule({
      declarations: [ KeepMeLoggedInComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LocalstorageService, useValue: localstorageServiceSpy },
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeepMeLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call storage removeItem if keepme is false when updatedEvt called', () => {
    component.keepMe = false;
    component.updatedEvt('');
    expect(localstorageServiceSpy.removeItem).toHaveBeenCalledWith('keep_me_loggedin');
    expect(localstorageServiceSpy.setItem).not.toHaveBeenCalledWith('keep_me_loggedin', true);
  });

  it('should call storage setItem if keepme is true when updatedEvt called', () => {
    component.keepMe = true;
    component.updatedEvt('');
    expect(localstorageServiceSpy.removeItem).not.toHaveBeenCalledWith('keep_me_loggedin');
    expect(localstorageServiceSpy.setItem).toHaveBeenCalledWith('keep_me_loggedin', true);
  });
});
