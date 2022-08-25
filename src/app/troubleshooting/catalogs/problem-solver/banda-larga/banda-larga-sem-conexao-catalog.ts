import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { AUTH_HDM } from './auth-hdm-catalog';
import { CORRECAO_DNS } from './correcao-dns-catalog';
import { MODEM_CONFIG } from './modem-config-catalog';
import { BANDA_LARGA_REBOOT_AUTOMATICO } from './banda-larga-reboot-automatico-catalog';
import { BANDA_LARGA_REBOOT_MANUAL } from './banda-larga-reboot-manual-catalog';
import { COBRE_ISOLAR_REDE } from './cobre-isolar-rede-catalog';
import { TS_WIFI } from './ts-wifi-catalog';
import { TS_CABLE } from './ts-cable-catalog';
import { getAlert } from '../shared/alert-catalog';
import { CONFIG_MODEM_MANUAL } from './config-modem-manual';
import { TS_MICROFILTRO } from './ts-microfiltro';
import { COBRE_ISOLAR_MODEM } from './cobre-isolar-modem.catalog';
import { ABERTURA_BD } from '../shared/abertura-bd-catalog';

const getPage = (catalog, page= 0) => `${catalog}${page}`;
const getIdFilter = {filter: {id: getPage(CatalogPrefix.TS_MICROFILTRO)}, noFilter: {id: 'success'}};

const EXTRA_PAGE = [
  {
    id: 0,
    gaPageName: 'adicionar_microfiltro',
    layout: {
      title: 'Adicione o microfiltro novamente pra testar.',
      image: './assets/images/troubleshooting/problem-solver/shared/microfiltro-02.svg',
      alert: getAlert('ts-cabos-cobre','internet_continua_funcionando_adicionando_microfiltro'),
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'feito',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'openPopup',
          }
        },
        {
          name: 'nao',
          action: {
            call: 'nav',
            params: {
              id: 1,
            }
          }
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage'
          }
        }
      ]
    }
  },
  {
    id: 1,
    gaPageName: 'trocar_microfiltro',
    layout: {
      title: 'Retire seu microfiltro pra usar a internet e troque-o por um novo.',
      paragraph: 'Não é possível usar o telefone fixo sem o microfiltro, troque-o por um novo. Você encontra o microfiltro em lojas de informática.',
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'entendido'
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'goToHome',
          }
        }
      ]
    }
  },
  ];

const catalogOnline = [
    ...AUTH_HDM(getPage(CatalogPrefix.MODEM_CONFIG), getPage(CatalogPrefix.CORRECAO_DNS)),
    ...CORRECAO_DNS(getPage(CatalogPrefix.REBOOT_AUTOMATICO)),
    ...BANDA_LARGA_REBOOT_AUTOMATICO(getPage(CatalogPrefix.CONFIG_MODEM_MANUAL), getPage(CatalogPrefix.REBOOT_MANUAL,1)),
    ...BANDA_LARGA_REBOOT_MANUAL(getPage(CatalogPrefix.CONFIG_MODEM_MANUAL)),
    ...CONFIG_MODEM_MANUAL(getPage(CatalogPrefix.TS_WIFI)),
    ...TS_WIFI(getPage(CatalogPrefix.ISOLAR_REDE)),
    ...COBRE_ISOLAR_REDE(getPage(CatalogPrefix.TS_CABOS)),
    ...TS_CABLE(getPage(CatalogPrefix.ISOLAR_MODEM), getIdFilter),
    ...COBRE_ISOLAR_MODEM(getPage(CatalogPrefix.ABERTURA_BD, 10), {},getIdFilter),
    ...TS_MICROFILTRO('conclusion'),
    ...MODEM_CONFIG(getPage(CatalogPrefix.TS_WIFI), getPage(CatalogPrefix.REBOOT_MANUAL)),
    ...ABERTURA_BD(getPage(CatalogPrefix.AUTH_HDM)),
    ...EXTRA_PAGE
];

const catalogOffline = [
    ...MODEM_CONFIG(getPage(CatalogPrefix.ISOLAR_REDE), getPage(CatalogPrefix.REBOOT_MANUAL)),
    ...BANDA_LARGA_REBOOT_MANUAL(getPage(CatalogPrefix.CONFIG_MODEM_MANUAL)),
    ...CONFIG_MODEM_MANUAL(getPage(CatalogPrefix.TS_WIFI)),
    ...TS_WIFI(getPage(CatalogPrefix.ISOLAR_REDE)),
    ...COBRE_ISOLAR_REDE(getPage(CatalogPrefix.TS_CABOS)),
    ...TS_CABLE(getPage(CatalogPrefix.ISOLAR_MODEM), getIdFilter),
    ...COBRE_ISOLAR_MODEM('conclusion', {}, getIdFilter),
    ...TS_MICROFILTRO('conclusion'),
    ...EXTRA_PAGE
];

const catalogHdmOffline = [
  ...MODEM_CONFIG(getPage(CatalogPrefix.ISOLAR_REDE), getPage(CatalogPrefix.REBOOT_MANUAL)),
  ...BANDA_LARGA_REBOOT_MANUAL(getPage(CatalogPrefix.CONFIG_MODEM_MANUAL)),
  ...CONFIG_MODEM_MANUAL(getPage(CatalogPrefix.TS_WIFI)),
  ...TS_WIFI(getPage(CatalogPrefix.ISOLAR_REDE)),
  ...COBRE_ISOLAR_REDE(getPage(CatalogPrefix.TS_CABOS)),
  ...TS_CABLE(getPage(CatalogPrefix.ISOLAR_MODEM), getIdFilter),
  ...COBRE_ISOLAR_MODEM(getPage(CatalogPrefix.ABERTURA_BD, 10), {}, getIdFilter),
  ...TS_MICROFILTRO(getPage(CatalogPrefix.ABERTURA_BD, 10)),
  ...EXTRA_PAGE,
  ...ABERTURA_BD('conclusion')
];

const BANDA_LARGA_SEM_CONEXAO: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.ABERTURA_BD)
    },
    default: {
        catalog: catalogOffline,
        initialPage: getPage(CatalogPrefix.MODEM_CONFIG)
    },
    hdmOffline: {
      catalog: catalogHdmOffline,
      initialPage: getPage(CatalogPrefix.MODEM_CONFIG)
    }
};

export { BANDA_LARGA_SEM_CONEXAO };
