import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tecvirt-wifi-label',
  template: `
    <div network *ngIf="selectedNetwork && (selectedNetwork.ssid || selectedNetwork.nomeDaRede)">
      <ion-text color="medium"><p>Rede:<p></ion-text>
      <ion-text color="secondary"><p class="bold-text">{{selectedNetwork.ssid || selectedNetwork.nomeDaRede}}<p></ion-text>
    </div>
    `,
  styleUrls: ['./wifi-label.component.scss'],
})
export class WifiLabelComponent implements OnInit {
  @Input() selectedNetwork;
  constructor() { }

  ngOnInit() {
  }

}
