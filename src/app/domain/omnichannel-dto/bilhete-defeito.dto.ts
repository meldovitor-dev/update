import { User } from '../../models/user.model';
import { Omnichannel } from './omnichannel';
import { FeatureInterface } from '../feature.interface';
import { ProductInterface } from '../product.interface';

export class BilheteDefeitoDTO {
  customerInteraction: Omnichannel.CustomerInteraction;
  eventType: string;
  type: string;
  terminal: string;
  cpfCnpj: string;
  key: string;
  ownership: Omnichannel.Ownership;
  repair: Array<Omnichannel.Repair>;
  os: Array<Omnichannel.OS>;
  event: Array<Omnichannel.Event>;

  constructor(user: User, product: ProductInterface, feature: FeatureInterface, productCode, ticket) {
    this.setCustomerInteraction(product, feature, ticket);
    this.setUserInformation(user);
    this.setOwnership(product);
    this.setRepair(productCode);
    this.setOS(productCode);
    this.setEvent(productCode);
    this.setStaticInformation('ABREBD', 'LONG', user);
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

  private setOwnership(product: ProductInterface) {
    this.ownership = {
      product: this.normalize(product.displayName),
      productType: ''
    };
  }

  private setRepair(productCode) {
    this.repair = [
      {
        open: 'N',
        type: productCode
      },
      {
        open: 'N',
        type: this.getOpositeProductCode(productCode)
      }
    ];
  }

  private setOS(productCode) {
    this.os = [
      {
        opened: 'N',
        slot: 'N',
        type: productCode
      },
      {
        opened: 'N',
        slot: 'N',
        type: this.getOpositeProductCode(productCode)
      }
    ];
  }

  private setEvent(productCode) {
    this.event = [
      {
        event: 'N',
        type: productCode
      },
      {
        event: 'N',
        type: this.getOpositeProductCode(productCode)
      }
    ];
  }

  private setCustomerInteraction(product: ProductInterface, feature: FeatureInterface, ticket) {
    this.customerInteraction = {
      finale: 'ON-LINE',
      type: this.normalize(product.displayName),
      code: 'ATUALIZAR',
      initialGuide: 'ROTEIRO DE TESTES',
      defectClaimed: this.normalize(feature.displayName),
      actionGenerated1: '',
      diagnosticAction1: 'PRE REPARO VELOX',
      startModemLinedUp: this.getModemLinedUp(ticket)
    };
  }

  private getModemLinedUp(ticket) {
    if (ticket && ticket.payload) {
      return ticket.payload.isDslamOk ? 'ALINHADO' : 'DESALINHADO';
    }
    return '0';
  };

  private getOpositeProductCode(productCode) {
    if (productCode === 'VELOX') {
      return 'FIXO';
    }
    return 'VELOX';
  };

  private normalize(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  }
}
