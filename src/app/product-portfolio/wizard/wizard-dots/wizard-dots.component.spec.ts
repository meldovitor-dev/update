import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { WizardDotsComponent } from './wizard-dots.component';

describe('WizardDotsComponent', () => {
  let component: WizardDotsComponent;
  let fixture: ComponentFixture<WizardDotsComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ WizardDotsComponent],
      providers: [
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
