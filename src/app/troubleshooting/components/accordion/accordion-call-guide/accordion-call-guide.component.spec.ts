import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccordionCallGuideComponent } from './accordion-call-guide.component';
import { CALL_GUIDE_ACCORDION_CONTENT } from 'src/app/troubleshooting/catalogs/problem-solver/fibra/shared/call-guide-accordion';

describe('AccordionCallGuideComponent', () => {
  let component: AccordionCallGuideComponent;
  let fixture: ComponentFixture<AccordionCallGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionCallGuideComponent ],
      imports: [IonicModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionCallGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open item selected and close all others and emit evt when expandAccordion is called', () => {
    spyOn(component.buttonEvent, 'emit');
    component.accordionContent = CALL_GUIDE_ACCORDION_CONTENT;
    const item = component.accordionContent[1];
    component.expandAccordion(item);
    expect(component.accordionContent[0].open).toBe(false);
    expect(component.accordionContent[1].open).toBe(true);
    expect(component.accordionContent[2].open).toBe(false);
    expect(component.accordionContent[3].open).toBe(false);
    expect(component.accordionContent[4].open).toBe(false);
    expect(component.buttonEvent.emit).toHaveBeenCalledWith({open: true });
  });

  it('should return correct icon class when getAccordionIconClass is called', () => {
    component.accordionContent = CALL_GUIDE_ACCORDION_CONTENT;
    const item = component.accordionContent[1];
    const icon = component.getAccordionIconClass(item);
    expect(icon).toBe(`accordion-icone icone-${item.image}`);
  });
});
