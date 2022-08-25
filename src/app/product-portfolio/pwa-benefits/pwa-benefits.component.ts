import { PwaUtilityService } from 'src/app/services/pwa-utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-pwa-benefits',
  templateUrl: './pwa-benefits.component.html',
  styleUrls: ['./pwa-benefits.component.scss'],
})
export class PwaBenefitsComponent implements OnInit {
  benefitsLIST = [
    { icon: 'icone_leve.svg', text: 'Ocupe menos espaço no seu celular', class: 'large-icon'},
    { icon: 'icone_instalar.svg', text: 'Acesse de forma rápida e simples', class: 'small-icon'}
  ];
  iconPath = './assets/icon';
  constructor(public pwaUtilityService: PwaUtilityService) { }

  ngOnInit() {}
}
