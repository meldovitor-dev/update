import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { AUTH_HDM } from './auth-hdm-catalog';
import { BANDA_LARGA_REBOOT_AUTOMATICO } from './banda-larga-reboot-automatico-catalog';
import { BANDA_LARGA_REBOOT_MANUAL } from './banda-larga-reboot-manual-catalog';
import { COBRE_ISOLAR_REDE } from './cobre-isolar-rede-catalog';
import { TS_CABLE } from './ts-cable-catalog';
import { BANDA_LARGA_TROCA_DE_CANAL } from './banda-larga-troca-canal-catalog';
import { TS_MICROFILTRO } from './ts-microfiltro';
import { COBRE_ISOLAR_MODEM } from './cobre-isolar-modem.catalog';
import { ABERTURA_BD } from '../shared/abertura-bd-catalog';

const getPage = (catalog, page= 0) => `${catalog}${page}`;
const getIdFilter = {filter: {id: getPage(CatalogPrefix.TS_MICROFILTRO)}, noFilter: {id: 'success'}};
const EXTRA_PAGE = [
    {
      id: 0,
      gaPageName: 'explicacao_inicial',
      fluxo: 'isolar_rede',
      layout: {
        title: 'Tudo bem! Vamos te ajudar com esse problema.',
        paragraph: 'Esta etapa pode solucionar casos de internet instável.',
        buttons: [
          {
            text: 'Vamos lá!',
            action: 'navigate',
            gaAction: 'comecar'
          },
        ],
        },
        state: {
            on: [
              {
              name: 'navigate',
              action: {
                call: 'nav',
                params: {
                    id: getPage(CatalogPrefix.ISOLAR_REDE)
                 }
                }
              },
            ]
        }
    },
    ];


const catalogOnline = [
    ...AUTH_HDM(getPage(CatalogPrefix.REBOOT_MANUAL), getPage(CatalogPrefix.TROCA_CANAL)),
    ...BANDA_LARGA_TROCA_DE_CANAL(getPage(CatalogPrefix.REBOOT_AUTOMATICO)),
    ...BANDA_LARGA_REBOOT_AUTOMATICO(0, getPage(CatalogPrefix.REBOOT_MANUAL,1)),
    ...BANDA_LARGA_REBOOT_MANUAL(getPage(CatalogPrefix.ISOLAR_REDE)),
    ...COBRE_ISOLAR_REDE(getPage(CatalogPrefix.TS_CABOS)),
    ...TS_CABLE(getPage(CatalogPrefix.ISOLAR_MODEM), getIdFilter),
    ...COBRE_ISOLAR_MODEM(getPage(CatalogPrefix.ABERTURA_BD, 10), {},getIdFilter),
    ...TS_MICROFILTRO('conclusion'),
    ...EXTRA_PAGE,
    ...ABERTURA_BD(getPage(CatalogPrefix.AUTH_HDM))
];

const catalogOffline = [
    ...BANDA_LARGA_REBOOT_MANUAL(0),
    ...COBRE_ISOLAR_REDE(getPage(CatalogPrefix.TS_CABOS)),
    ...TS_CABLE(getPage(CatalogPrefix.ISOLAR_MODEM), getIdFilter),
    ...COBRE_ISOLAR_MODEM('conclusion', {}, getIdFilter),
    ...TS_MICROFILTRO('conclusion'),
    ...EXTRA_PAGE
];

const catalogHdmOffline = [
    ...BANDA_LARGA_REBOOT_MANUAL(0),
    ...COBRE_ISOLAR_REDE(getPage(CatalogPrefix.TS_CABOS)),
    ...TS_CABLE(getPage(CatalogPrefix.ISOLAR_MODEM), getIdFilter),
    ...COBRE_ISOLAR_MODEM(getPage(CatalogPrefix.ABERTURA_BD, 10), {}, getIdFilter),
    ...TS_MICROFILTRO(getPage(CatalogPrefix.ABERTURA_BD, 10)),
    ...EXTRA_PAGE,
    ...ABERTURA_BD('conclusion')
];

const BANDA_LARGA_QUEDAS_CONSTANTES: CatalogDTO = {
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

export { BANDA_LARGA_QUEDAS_CONSTANTES };
