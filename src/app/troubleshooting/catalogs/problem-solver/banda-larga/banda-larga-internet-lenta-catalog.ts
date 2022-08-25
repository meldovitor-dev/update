import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { AUTH_HDM } from './auth-hdm-catalog';
import { BANDA_LARGA_REBOOT_AUTOMATICO } from './banda-larga-reboot-automatico-catalog';
import { BANDA_LARGA_REBOOT_MANUAL } from './banda-larga-reboot-manual-catalog';
import { BANDA_LARGA_TROCA_DE_CANAL } from './banda-larga-troca-canal-catalog';
import { BANDA_LARGA_DISPOSITIVOS_CONECTADOS } from './banda-larga-dispositivos-conectados-catalog';
import { TESTE_VELOCIDADE } from '../shared/teste-velocidade-catalog';
import { ABERTURA_BD } from '../shared/abertura-bd-catalog';

const getPage = (catalog, page= 0) => `${catalog}${page}`;
const config = {alert: 'internet-lenta', alertReboot: 'internet-lenta-reboot'};
const catalogOnline = [
    ...AUTH_HDM(getPage(CatalogPrefix.REBOOT_MANUAL), getPage(CatalogPrefix.TROCA_CANAL)),
    ...BANDA_LARGA_TROCA_DE_CANAL(getPage(CatalogPrefix.REBOOT_AUTOMATICO), config),
    ...BANDA_LARGA_REBOOT_AUTOMATICO(getPage(CatalogPrefix.DISPOSITIVOS_CONECTADOS, 33), getPage(CatalogPrefix.REBOOT_MANUAL, 1), config),
    ...BANDA_LARGA_REBOOT_MANUAL(getPage(CatalogPrefix.DISPOSITIVOS_CONECTADOS, 33), config),
    ...BANDA_LARGA_DISPOSITIVOS_CONECTADOS(getPage(CatalogPrefix.TESTE_VELOCIDADE)),
    ...TESTE_VELOCIDADE(getPage(CatalogPrefix.ABERTURA_BD, 10)),
    ...ABERTURA_BD(getPage(CatalogPrefix.AUTH_HDM))
];

const catalogOffline = [
    ...BANDA_LARGA_REBOOT_MANUAL(getPage(CatalogPrefix.TESTE_VELOCIDADE), config),
    ...TESTE_VELOCIDADE('conclusion')
];

const catalogHdmOffline = [
  ...BANDA_LARGA_REBOOT_MANUAL(getPage(CatalogPrefix.TESTE_VELOCIDADE), config),
  ...TESTE_VELOCIDADE(getPage(CatalogPrefix.ABERTURA_BD, 10)),
  ...ABERTURA_BD('conclusion')
];

const BANDA_LARGA_INTERNET_LENTA: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.ABERTURA_BD)
    },
    default: {
        catalog: catalogOffline,
        initialPage: getPage(CatalogPrefix.REBOOT_MANUAL)
    },
    hdmOffline: {
      catalog: catalogHdmOffline,
      initialPage: getPage(CatalogPrefix.REBOOT_MANUAL)
    }
};

export { BANDA_LARGA_INTERNET_LENTA };
