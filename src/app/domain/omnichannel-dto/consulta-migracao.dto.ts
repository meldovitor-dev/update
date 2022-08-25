import { User } from '../../models/user.model';
import { Omnichannel } from './omnichannel';
import { ProductInterface } from './../product.interface';

export class ConsultaMigracaoCobreDTO {
  customerInteraction: Omnichannel.CustomerInteraction;
  eventType: string;
  type: string;
  terminal: string;
  cpfCnpj: string;
  key: string;
  ownership: Omnichannel.Ownership;

  constructor(user: User, product: ProductInterface) {
    this.setCustomerInteraction(product, user);
    this.setUserInformation(user);
    this.setOwnership(product);
    this.setStaticInformation('INICIO', 'LONG', user);
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

  private setCustomerInteraction(product, user) {
    const { addressData } = user;
    this.customerInteraction = {
      finale: 'ON-LINE',
      type: this.normalize(product.displayName),
      code: 'INSERIR',
      initialGuide: '0',
      defectClaimed: '0',
      actionGenerated1: '0',
      diagnosticAction1: '0',
      details: 'home',
      stage: 'ENTRAR',
      contact1: addressData ? addressData.address : '',
      contact2: addressData ? addressData.cep : '',
    };
  }

  private getOpositeProductCode(productCode) {
    if (productCode === 'VELOX') {
      return 'FIXO';
    }
    return 'VELOX';
  }

  private normalize(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  }
}
