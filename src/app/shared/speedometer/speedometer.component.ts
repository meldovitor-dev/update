import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { WifiLevelEnum } from 'src/app/services/wifi-manager.service';

@Component({
    selector: 'tecvirt-speedometer',
    templateUrl: './speedometer.component.html',
    styleUrls: ['./speedometer.component.scss']
})
export class SpeedometerComponent implements OnInit, OnChanges {
    @Input() wifiLevel: WifiLevelEnum;
    spedoometerModel: {wifiLevel: WifiLevelEnum, label: string, cssClass: string}[] = [
        {
            wifiLevel: WifiLevelEnum.NO_SIGNAL,
            label: 'Sem sinal',
            cssClass: 'no-signal',
        },
        {
            wifiLevel: WifiLevelEnum.WEAK,
            label: 'Fraco',
            cssClass: 'weak',
        },
        {
            wifiLevel: WifiLevelEnum.MEDIUM,
            label: 'Médio',
            cssClass: 'medium',
        },
        {
            wifiLevel: WifiLevelEnum.STRONG,
            label: 'Forte',
            cssClass: 'strong',
        },
    ];
    spedoometer: {wifiLevel: WifiLevelEnum, label: string, cssClass: string};
    constructor() {
        this.spedoometer = this.spedoometerModel[0];
    }

    ngOnInit() {
    }
    ngOnChanges(s: SimpleChanges) {
        this.spedoometer = (this.spedoometerModel.find(el => el.wifiLevel === this.wifiLevel) || this.spedoometerModel[0]);
    }
}
