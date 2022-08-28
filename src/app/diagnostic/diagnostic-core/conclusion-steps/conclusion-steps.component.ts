import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductIdentifierEnum } from 'src/app/enums/product.enum';
import { ScreenStateModel, ScreenSet } from 'src/app/actions/screen.actions';

@Component({
  selector: 'tecvirt-conclusion-steps',
  templateUrl: './conclusion-steps.component.html',
  styleUrls: ['./conclusion-steps.component.scss'],
})
export class ConclusionStepsComponent implements OnInit {

  @Output() buttonClicked = new EventEmitter<any>();
  @Input() page: any;
  @Input() productIdentifier;
  bl = ProductIdentifierEnum.BANDA_LARGA;
  constructor(public store: Store) { }

  ngOnInit() {

  }
  onClick(btn: any) {
    this.buttonClicked.emit(btn);
  }
  ngOnChanges(sp: SimpleChanges) {
    if (sp.page) {
      this.publishGA();
    }
  }
  publishGA() {
    const analytics: ScreenStateModel = {
      screenName: this.page.gaPageName,
    };
    if (this.page.fluxo) {
      analytics.contextFlow = this.page.fluxo;
    }
    this.store.dispatch(new ScreenSet(analytics));
  }
}
