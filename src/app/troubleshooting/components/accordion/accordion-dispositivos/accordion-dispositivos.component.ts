import { FrequencyNetwork } from './../../../troubleshooting-interface';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { AnalyticsService } from 'src/app/core/analytics.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tecvirt-accordion-dispositivos',
  templateUrl: './accordion-dispositivos.component.html',
  styleUrls: ['./accordion-dispositivos.component.scss'],
})
export class AccordionDispositivosComponent implements OnInit, OnDestroy {
  @Input() accordionContent = [];
  @Output() buttonEvent = new EventEmitter<any>();
  unknownDeviceList = [];
  filteredAccordion: FrequencyNetwork[];
  devices = [];
  sameSSID = false;
  popoverData = {
    label: 'Dispositivos duplicados? Veja aqui',
    popoverText: 'Atenção: Se as duas redes tiverem o mesmo nome, os dispositivos conectados vão aparecer em ambas as redes.'
  };
  constructor(public storage: LocalstorageService,
              public ga: AnalyticsService) { }

  ngOnInit() {
    const devicesStorage = JSON.parse(this.storage.getItem('ud'));
    if (devicesStorage) {
      this.unknownDeviceList = devicesStorage;
    }
    this.initFilteredAccordion();
    this.accordionContent.forEach((el, index) => {
      el.open = false;
      el.ga = 'rede_' + this.alphabeticNetwork(index);
      this.checkUnknownDeviceList(el.devices);
      this.ga.logEventGA(el.ga, 'visualizou');
      this.setFilteredAccordion(el);
      this.checkSameSSID(el);
    });
  }
  setFilteredAccordion(network) {
    const { banda } = network;
    if (!banda) {
      this.filteredAccordion[2].networkList.push(network);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (banda === '5GHz') ? this.filteredAccordion[1].networkList.push(network) : this.filteredAccordion[0].networkList.push(network);
  }
  checkUnknownDeviceList(devices) {
    devices.map(el => {
      if (this.unknownDeviceList.includes(el.macAddress)) {
        el.unknown = true;
        return;
      }
      el.unknown = false;
    });
  }
  checkSameSSID(network) {
    const { ssid } = network;
    const ssidFilterAcordion = this.accordionContent.filter(el => el.ssid === ssid);
    if (ssidFilterAcordion.length > 1) {
      this.sameSSID = true;
    }
  }
  expandAccordion(item) {
    let option;
    this.accordionContent.forEach((el) => {
      if (item === el) {
        el.open = !el.open;
        option = el.open;
      } else {
        el.open = false;
      }
      return el;
    });
    this.sendEventNoDeviceGa(item);
  }
  unknownDeviceClick(device) {
    if (this.unknownDeviceList.includes(device.macAddress)) {
      this.unknownDeviceList = this.unknownDeviceList.filter(el => el !== device.macAddress);
      device.unknown  = false;
      return;
    }
    device.unknown  = true;
    this.unknownDeviceList.push(device.macAddress);
  }

  clickEvent(rede) {
    this.buttonEvent.emit(rede);
  }
  sendEventNoDeviceGa(item) {
    if (item.open && !item.devices.length) {
      const gaAction = 'nenhum_dispositivo_' + item.ga;
      this.ga.logEventGA(gaAction, 'visualizou');
    }
  }
  alphabeticNetwork(idx) {
    return String.fromCharCode(idx + 97);
  }

  initFilteredAccordion() {
    const redes2Hz: FrequencyNetwork = {
      label: 'Redes 2.4 GHz:',
      networkList: []
    };
    const redes5Hz: FrequencyNetwork = {
      label: 'Redes 5 GHz:',
      networkList: []
    };
    const redesNoBand: FrequencyNetwork = {
      label: '',
      networkList: []
    };
    this.filteredAccordion = [redes2Hz, redes5Hz, redesNoBand];
  }

  ngOnDestroy(): void {
    if (this.unknownDeviceList) {
      this.storage.setItem('ud', JSON.stringify(this.unknownDeviceList));
    }
  }
}
