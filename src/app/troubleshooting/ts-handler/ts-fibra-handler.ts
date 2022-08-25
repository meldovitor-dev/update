import { InteractionEnum } from 'src/app/domain/interactions';
import { TicketState } from './../../states/ticket.state';
import { Store } from '@ngxs/store';
import { TsHandler } from './ts-handler';
import { FeatureState } from 'src/app/states/feature.state';

export class TsFibraHandler extends TsHandler {
  validCatalogDependencies(store: Store) {
    const skipDiagnostic = store.selectSnapshot(FeatureState.getFeature).skipDiagnostic;
    if (skipDiagnostic) {
      return true;
    }
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.fibraDiagnosticoCompleto));
    return (ticket && !(ticket.result === 'error') && !(ticket.result === 'NOK'));
  }

  populateConnectedDevices(store: Store, data?) {
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.fibraDiagnosticoCompleto));
    if (ticket && ticket.payload && ticket.payload.wifiList) {
      const redes = ticket.payload.wifiList
        .map(el => el.redes)
        .reduce((el, acc) => (acc = [...(acc || []), ...el]))
        .map(el => ({
            ssid: el.ssid,
            wifiIndex: el.wifiIndex,
            devices: el.devices,
            banda: el.banda
          }));
      return redes;
    }
    return [];
  }
  populateSTBList(store: Store, data?) {
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.fibraDiagnosticoCompleto));
    if (ticket && ticket.payload && ticket.payload.stbList) {
      const stbs = JSON.parse(JSON.stringify(ticket.payload.stbList));
      return stbs;
    }
    return [];
  }

  populateSTBsNetflixList(store: Store, data?) {
    const modelList = [
      'HIE4008',
      'UIW8001',
    ];
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.fibraDiagnosticoCompleto));
    if (ticket && ticket.payload && ticket.payload.stbList) {
      const stbs = JSON.parse(JSON.stringify(ticket.payload.stbList));
      const filteredStbs = stbs.filter(element => modelList.some(el => element.stbModel && element.stbModel.includes(el)));
      const filtered = filteredStbs.length !== stbs.length;
      return {data: filteredStbs, filtered, stbListLength: stbs.length };
    }
    return {data: []};
  }

  fibraSetChannelWifi(store: Store, data?) {
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.fibraDiagnosticoCompleto));
    if (ticket && ticket.payload && ticket.payload.wifiList) {
      const redes = ticket.payload.wifiList
        .map(el => el.redes)
        .reduce((el, acc) => (acc = [...(acc || []), ...el]))
        .filter(el => el.channelAuto === false)
        .map(el => ({
            wifiIndex: el.wifiIndex,
            banda: el.banda
          }));
      return { redes };
    }
    return [];
  }
  fibraSetPasswordWifi(store: Store, data) {
    const filterData = {
      password: data.password,
      wifiIndex: data.rede.wifiIndex,
      frequencia: data.rede.banda
    };
    return filterData;
  }
  fibraSetSSIDWifi(store: Store, data) {
    const filterData = {
      ssid: data.ssid,
      wifiIndex: data.rede.wifiIndex,
      frequencia: data.rede.banda
    };
    return filterData;
  }
  fibraRebootStb(store: Store, data) {
    if ( data && data.stb) {
      return { stbId: data.stb.stbId };
    }
    return {};
  }
  checkIfConnectedToOiWifi(store: Store, data) {
    const ticket = store.selectSnapshot(TicketState.getTickets(InteractionEnum.fibraDiagnosticoCompleto));
    let redes;
    if (ticket && ticket.payload && ticket.payload.wifiList) {
     redes = ticket.payload.wifiList
        .map(el => el.redes)
        .reduce((el, acc) => (acc = [...(acc || []), ...el]))
        .map(el => ({
            ssid: el.ssid,
            banda: el.banda
          }));
     return { redes };
    }
    return {redes: []};
  }
}
