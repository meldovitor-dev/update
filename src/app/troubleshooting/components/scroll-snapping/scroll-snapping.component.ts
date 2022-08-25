import { FeatureEnum } from 'src/app/enums/feature.enum';
import { FeatureState } from 'src/app/states/feature.state';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TRIPA_COLECTION } from '../../catalogs/problem-solver/fibra/shared/fibra-antena-tripas';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-scroll-snapping',
  templateUrl: './scroll-snapping.component.html',
  styleUrls: ['./scroll-snapping.component.scss'],
})
export class ScrollSnappingComponent implements OnInit {
  @Input() content: string;
  @Output() clickEvt = new EventEmitter<any>();
  page;
  showGoHomeButton = true;
  constructor(public router: Router, public store: Store) { }

  ngOnInit() {
    if (this.store.selectSnapshot(FeatureState.getFeature).featureCode === FeatureEnum.FIBRA_LENTA) {
      this.showGoHomeButton = false;
    }
    this.page = TRIPA_COLECTION(this.content);
  }
  onClick() {
    this.clickEvt.emit({ action: 'navigate'});
  }

}
