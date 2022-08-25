import { FeatureInterface } from './../feature.interface';
import { User } from '../../models/user.model';
import { Omnichannel } from './omnichannel';
import { ProductInterface } from './../product.interface';
import { ProductHelper } from 'src/app/helpers/product-helper';

export class InformaErroNetQDTO {
  customerInteraction: Omnichannel.CustomerInteraction;
  eventType: string;
  channel: string;
  type: string;
  produto: string;
  protocol: string;
  terminal: string;
  cpfCnpj: string;
  key: string;
  ownership: Omnichannel.Ownership;
  repair: Array<Omnichannel.Repair>;
  os: Array<Omnichannel.OS>;
  event: Array<Omnichannel.Event>;
  test: Array<Omnichannel.Test>;

  constructor(user: User, product: ProductInterface, feature: FeatureInterface, result) {
    const productCode = ProductHelper.omnichannelProductTranslator(product.productCode);
    this.setCustomerInteraction(product, user, feature);
    this.setUserInformation(user);
    this.setOwnership(product);
    this.setRepair(productCode);
    this.setOS(productCode);
    this.setEvent(result);
    this.setStaticInformation('TESTES', 'LONG', user, 'TECNICO VIRTUAL 2', feature);
  }

  private setStaticInformation(eventType, type, user, channel, feature: FeatureInterface) {
    this.channel = channel;
    this.eventType = eventType;
    this.type = type;
    this.key = user.sessionUUID;
    this.protocol = feature.protocol;
  }

  private setUserInformation(user: User) {
    this.terminal = user.identifier;
    this.cpfCnpj = user.cpfOrCnpj;
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

  private setEvent(result) {
    this.event = result.map(el => (
      {
        eventType: el.errorCode,
        detailsEvent: el.description,
        numberEvent: el.criticity,
      }
    ));
  }

  private setCustomerInteraction(product, user, feature) {
    const { addressData } = user;
    this.customerInteraction = {
      finale: 'ON-LINE',
      type: this.normalize(product.displayName),
      code: 'FINALIZAR',
      initialGuide: 'ROTEIRO DE TESTES',
      defectClaimed: ProductHelper.omnichannelFeatureTranslator(feature.ga),
      actionGenerated1: 'PRE REPARO FIBRA',
      diagnosticAction1: 'TESTE NETQ NOK',
      diagnosticAction2: '0',
      details: 'problema_rede_encontrado',
      stage: 'DIAGNOSTICO',
      contact1: addressData ? addressData.address : '',
      contact2: addressData ? addressData.cep : '',
      lastQuestion: '0'
    };
  }

  private setOwnership(product) {
    this.ownership = {
      product: this.normalize(product.displayName),
      productType: 'FIBRA'
    };
  }

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
