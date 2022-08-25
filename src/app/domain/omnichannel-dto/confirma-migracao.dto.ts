import { User } from '../../models/user.model';
import { Omnichannel } from './omnichannel';
import { ProductInterface } from './../product.interface';

export class ConfirmaMigracaoCobreDTO {
  customerInteraction: Omnichannel.CustomerInteraction;
  eventType: string;
  type: string;
  terminal: string;
  cpfCnpj: string;
  key: string;
  ownership: Omnichannel.Ownership;

  constructor(user: User, product: ProductInterface, result) {
    this.setCustomerInteraction(product, user, result);
    this.setUserInformation(user);
    this.setOwnership(product);
    this.setStaticInformation('MIGRACAO', 'LONG', user);
  }

  private setStaticInformation(eventType, type, user) {
    this.eventType = eventType;
    this.type = type;
    this.key = user.sessionUUID;
  }

  private setUserInformation(user: User) {
    this.terminal = user.identifier;
    this.cpfCnpj = user.cpfOrCnpj;
  }

  private setOwnership(product) {
    this.ownership = {
      product: this.normalize(product.displayName),
      productType: 'COBRE'
    };
  }

  private setCustomerInteraction(product, user, result) {
    let actionGenerated1 = 'CLIENTE RECUSOU MIGRACAO';
    if (result.migracao) {
      actionGenerated1 = result.transbordo ? 'CLIENTE ACEITOU MIGRACAO TRANSBORDO' : 'CLIENTE ACEITOU MIGRACAO';
    }
    const { addressData } = user;
    this.customerInteraction = {
      finale: 'ON-LINE',
      type: this.normalize(product.displayName),
      code: 'ATUALIZAR',
      initialGuide: '0',
      defectClaimed: '0',
      actionGenerated1,
      diagnosticAction1: result.ofertaType,
      diagnosticAction2: result.migracaoType,
      details: 'home',
      stage: 'MIGRACAO',
      contact1: addressData ? addressData.address : '',
      contact2: addressData ? addressData.cep : '',
      lastQuestion: result.migracao ? result.dateSelected : '0'
    };
  }
  private normalize(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  }
}
