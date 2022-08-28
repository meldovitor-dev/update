/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ModalController, Platform } from '@ionic/angular';
import { ConnectionState } from './../states/connection.state';
// import { REGIONS } from './../troubleshooting/general.constants';
import { UserState } from './../states/user.state';
import { GeneralHelper } from './../helpers/general.helper';
import { ProductHelper } from './../helpers/product-helper';
import { ProductCodeEnum } from './../enums/product.enum';
import { ProductState } from 'src/app/states/product.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { PhoneNumberModalComponent } from '../modals/phone-number-modal/phone-number-modal.component';


@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private store: Store,
    public modalController: ModalController,
    private platform: Platform) { }

  public callToCallCenter() {
    const product = this.store.selectSnapshot(ProductState.getCurrentProduct).productCode;
    const config = this.store.selectSnapshot(ProductState.getConfig);
    const atendimento = this.getAtendimento(config);
    let phone = this.getPhone(product, atendimento);
    phone = 'tel:' + phone.replace(new RegExp(' ', 'g'), '');
    console.log(phone);
    this.checkPlatformIsMobile() ? window.open(phone, '_system') : this.handleServiceForPWA(phone);
  }
  getAtendimento(config) {
    if (!config) {
      return ProductHelper.getPhoneConfig();
    }
    return ProductHelper.extractConfigValue(config, 'atendimento');
  }
  getPhone(product, atendimento) {
    const callNumber = {
      [ProductCodeEnum.BANDA_LARGA]: () => this.getPhoneBandaLarga(atendimento),
      [ProductCodeEnum.FIXO]: () => this.getPhoneBandaLarga(atendimento),
      [ProductCodeEnum.TVDTH]: () => this.getPhoneTVDTH(atendimento),
      [ProductCodeEnum.FIBRA]: () => this.getPhoneFibra(atendimento),
      default: () => this.getPhoneBandaLarga(atendimento),
    };
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const tel = (callNumber[product] || callNumber['default'])();
    return tel;
  }
  getPhoneBandaLarga(atendimento) {
    const terminal = this.store.selectSnapshot(UserState.getUser).identifier;
    if (!terminal) {
      return atendimento.telefone_default_r1;
    }
    const region = GeneralHelper.getUserRegion(terminal);
    // if (region === REGIONS.TWO) {
    //   return atendimento.telefone_default_r2;
    // }
    return atendimento.telefone_default_r1;
  }
  getPhoneTVDTH(atendimento) {
    return atendimento.telefone_default_tv;
  }
  getPhoneFibra(atendimento) {
    const cpfOrCnpj = this.store.selectSnapshot(UserState.getUser).cpfOrCnpj;
    const connection = this.store.selectSnapshot(ConnectionState.getConnection);
    const highSpeedNumber = this.getHighSpeedNumber();
    if (highSpeedNumber) {
      return highSpeedNumber;
    }
    if (!connection.connected) {
      return atendimento.fibra.residencial;
    }
    if (GeneralHelper.isEmpresarial(cpfOrCnpj)) {
      return atendimento.fibra.empresarial;
    }
    return atendimento.fibra.residencial;
  }
  getHighSpeedNumber() {

    const config = this.store.selectSnapshot(ProductState.getConfig);
    if (!config) {
      return undefined;
    }
    const clientCallInfo = ProductHelper.extractConfigValue(config, 'fibra');
    if (!clientCallInfo || !clientCallInfo.clientCallCenter || !clientCallInfo.clientCallCenter.enabled) {
      return undefined;
    }
    return this.store.selectSnapshot(UserState.getUser).callCenterNumber;
  }

  public callWithNumber(phone: string) {
    phone = 'tel:' + phone.replace(new RegExp(' ', 'g'), '');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.checkPlatformIsMobile() ? window.open(phone, '_system') : this.handleServiceForPWA(phone);
  }

  async handleServiceForPWA(phoneNumber) {
    const modal = await this.modalController.create({
      component: PhoneNumberModalComponent,
      cssClass: 'tec-virt-modal-wider',
      componentProps: {
        phoneNumber
      }
    });
    return await modal.present();
  }
  checkPlatformIsMobile() {
    return this.platform.is('mobileweb') || this.platform.is('mobile');
  }

}
