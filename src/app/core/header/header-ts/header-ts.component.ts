import { AnalyticsService } from './../../analytics.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Select } from '@ngxs/store';
import { ConnectionState } from '../../../states/connection.state';
import { ConnectionModel } from 'src/app/models/connection.model';
import { Observable } from 'rxjs';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-header-ts',
  templateUrl: './header-ts.component.html',
  styleUrls: ['./header-ts.component.scss'],
})
export class HeaderTsComponent implements OnInit {
  @Input() title;
  @Input() hiddenBack;
  @Input() slidesMenu;
  @Select(ConnectionState.getConnection)
  connection$: Observable<ConnectionModel>;
  @Output() backButtonEvt = new EventEmitter<any>();
  @Output() closeButtonEvt = new EventEmitter<any>();
  @Output() slidesMenuEvt = new EventEmitter<any>();
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {}

  goBackEvt(evt) {
    this.backButtonEvt.emit(evt);
  }
  goHomeEvt(evt) {
    this.closeButtonEvt.emit(evt);
  }
  menuSlidesClick(evt) {
    const gaAction = 'acessar_menu';
    this.analyticsService.logEventGA(gaAction, 'click');
    this.slidesMenuEvt.emit(evt);
  }
}
