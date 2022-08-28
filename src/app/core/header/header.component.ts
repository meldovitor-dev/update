import { LocationState } from './../../states/location.state';
import { ConnectionState } from './../../states/connection.state';
import { Store, Select } from '@ngxs/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tecvirt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title;
  @Input() product;
  @Input() hiddenBack;
  @Input() useTsHeader = false;
  @Input() hasMenuSlides = false;
  @Output() backButtonEvt = new EventEmitter<any>();
  @Output() closeButtonEvt = new EventEmitter<any>();
  @Output() slidesMenuEvt = new EventEmitter<any>();
  @Select(ConnectionState.getConnection) connection$;
  tsHeader = ['troubleshooting', 'diagnostic', 'scheduling', 'deeplink-falha-massiva'];
  constructor(private store: Store) { }

  ngOnInit() { }
  ngAfterContentInit(): void {
  }
  goBackEvt(evt) {
    this.backButtonEvt.emit(evt);
  }
  goHomeEvt(evt) {
    this.closeButtonEvt.emit(evt);
  }
  slidesMenuEvtClicked(evt) {
    this.slidesMenuEvt.emit(evt);
  }
  isHeaderTS() {
    return (this.tsHeader.includes(this.store.selectSnapshot(LocationState.getLocation)) || this.useTsHeader);
  }

}
