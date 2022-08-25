import { User } from '../../models/user.model';
import { Omnichannel } from './omnichannel';
import { ProductInterface } from '../product.interface';

export class BilheteDefeitoInfoDTO {
  customerInteraction: Omnichannel.CustomerInteraction;
  eventType: string;
  type: string;
  terminal: string;
  cpfCnpj: string;
  key: string;
  ownership: Omnichannel.Ownership;
  repair: Array<Omnichannel.Repair>;

  constructor(user: User, product: ProductInterface, productCode, agendamento) {
    this.setCustomerInteraction(product);
    this.setUserInformation(user);
    this.setOwnership(product);
    this.setRepair(productCode, agendamento);
    this.setStaticInformation('REPARO ABERTO', 'STATUS BD', user);
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
      productType: ''
    };
  }

  private setRepair(productCode, agendamento) {
    this.repair = [
      {
        open: 'S',
        repairNumber: agendamento.serviceOrder || '',
        type: productCode,
        scheduled: agendamento.isPendente ? 'N' : 'S'
      },
      {
        open: 'N',
        type: this.getOpositeProductCode(productCode)
      }
    ];
  }

  private setCustomerInteraction(product) {
    this.customerInteraction = {
      finale: 'ON-LINE',
      type: this.normalize(product.displayName),
      code: 'INSERIR',
      initialGuide: 'ROTEIRO DE TESTES',
      defectClaimed: 'VISITA TECNICA',
      actionGenerated1: 'REPARO INFORMADO',
      diagnosticAction1: '0',
      details: 'consulta_agendamento_visitas_tecnicas'
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
