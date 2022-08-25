import { TsHandler } from './ts-handler';
import { Store } from '@ngxs/store';
import { TicketState } from 'src/app/states/ticket.state';
import { InteractionEnum } from 'src/app/domain/interactions';
import { ProductState } from 'src/app/states/product.state';
import { UserState } from 'src/app/states/user.state';
import { ProductHelper } from 'src/app/helpers/product-helper';
import { FeatureState } from 'src/app/states/feature.state';
import { BilheteDefeitoDTO } from 'src/app/domain/omnichannel-dto/bilhete-defeito.dto';

export class TsBandaLargaHandler extends TsHandler {
  validCatalogDependencies(store: Store) {
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.bandaLargaConsultaRegistro));
    if (ticket && ticket.payload) {
      const {payload} = ticket;
      return (payload && payload.fluxoSemConexaoComHDM && payload.dnsWhitelistOk && payload.rebootWhitelistOk);
    }
    console.log('No ticket ConsultaRegistro found');
    return false;
  }
  bandaLargaSetPasswordWifi(store: Store, data) {
      const filterData = {
        password: data.password,
      };
      return filterData;
    }
  bandaLargaSetSSIDWifi(store: Store, data) {
  const filterData = {
      ssid: data.ssid,
  };
  return filterData;
  }
  efetuarAberturaBD(store: Store, data) {
    const { productCode } = store.selectSnapshot(ProductState.getCurrentProduct);
    const filterData = {
      produto: productCode,
      contatoReclamante1: data.phone,
    };
    return filterData;
    }
  populateConnectedDevices(store: Store, data?) {
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.bandaLargaListClients));
    if (ticket && ticket.payload && ticket.payload.clients) {
      const clients = ticket.payload.clients
        .map(el => ({
            hostName: el.title,
            vendor: el.subtitle,
            macAddress: el.macAddress
          }));
      const redes = [{
        devices: clients,
      }];
      return redes;
    }
    return [];
  }
  getInternetSpeed(store: Store, data?) {
    const internetSpeed = {
      hired: undefined,
      provisioned: undefined,
      moreThan80: false,
    };
    let ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.consultaStatusFinanceiro));
    if (ticket && ticket.payload && ticket.payload.velocidadeVelox) {
      internetSpeed.hired = ticket.payload.velocidadeVelox;
    }
    ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.consultaStatusTerminal));
    if (ticket && ticket.payload && ticket.payload.velocidadeAprovisionada) {
      internetSpeed.provisioned = ticket.payload.velocidadeAprovisionada;
    }
    internetSpeed.moreThan80 = ( internetSpeed.provisioned / internetSpeed.hired  >= 0.8);
    return internetSpeed;
  }
  getBdId(store: Store, data?) {
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.efetuarAberturaBD));
    if (ticket && ticket.payload && ticket.payload.bd && ticket.payload.bd !== 'null') {
      return ticket.payload.bd;
    }
    return undefined;
  }
  getBdInfo(store: Store, data?){
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.efetuarAberturaBD));
    const resCorp = {
      bd: '',
      bdJaAberto: false
    };
    if (ticket && ticket.payload) {
      resCorp.bd = ticket.payload.bd === 'null'? '' : ticket.payload.bd;
      resCorp.bdJaAberto = ticket.payload.bdAberto;
    }
    return resCorp;
  }
  consultarAberturaBD(store: Store, data?) {
    const feature = store.selectSnapshot(FeatureState.getFeature);
    const product = store.selectSnapshot(ProductState.getCurrentProduct);
    const user = store.selectSnapshot(UserState.getUser);
    const productCode = ProductHelper.omnichannelProductTranslator(product.productCode);
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.consultaStatusTerminal)) || data.ticket;
    const payload = new BilheteDefeitoDTO(user, product, feature, productCode, ticket);
    return payload;
  }
}
