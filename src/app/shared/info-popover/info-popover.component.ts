import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-info-popover',
  templateUrl: './info-popover.component.html',
  styleUrls: ['./info-popover.component.scss'],
})
export class InfoPopoverComponent implements OnInit {

  @Input() infoData;
  showPopover = false;
  constructor() { }

  ngOnInit() {
    this.infoData = {
      label: 'Dispositivos duplicados? Veja aqui',
      popoverText: 'Atenção: Se as duas redes tiverem o mesmo nome, os dispositivos conectados vão aparecer em ambas as redes.'
    };
  }
  openPopover(evt) {
    evt.stopPropagation();
    this.showPopover ? this.showPopover = false : this.showPopover = true;
  }
  closePopover(evt) {
    this.showPopover = false;
  }

}
