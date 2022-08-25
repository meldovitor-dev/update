import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-redes-list',
  templateUrl: './redes-list.component.html',
  styleUrls: ['./redes-list.component.scss'],
})
export class RedesListComponent implements OnInit {
  @Input() redesContent;
  @Output() buttonClickedEvt = new EventEmitter<any>();
  redes2Hz = [];
  redes5Hz = [];
  constructor() { }

  ngOnInit() {
    this.redes2Hz = this.redesContent.filter(el => el.banda === '2.4GHz');
    this.redes5Hz = this.redesContent.filter(el => el.banda === '5GHz');
  }

  clickEvent(rede) {
    this.buttonClickedEvt.emit(rede);
  }
}
