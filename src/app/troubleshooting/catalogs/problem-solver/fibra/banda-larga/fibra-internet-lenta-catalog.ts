import { FIBRA_DISPOSITIVOS_CONECTADOS } from './../shared/fibra-dispositivos-conectados-catalog';
import { FIBRA_TROCA_DE_CANAL } from './../shared/fibra-troca-canal-catalog';
import { FIBRA_REBOOT_AUTOMATICO } from '../shared/fibra-reboot-automatico-catalog';
import { FIBRA_REBOOT_MANUAL } from '../shared/fibra-reboot-manual-catalog';
import {
  CatalogDTO, CatalogModel,
} from 'src/app/troubleshooting/troubleshooting-interface';
import { InteractionEnum } from 'src/app/domain/interactions';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { ISOLAR_MODEM } from '../../shared/isolar-modem-catalog';
import { COMPATIBILIDADE_VELOCIDADE_REPAIR } from './fibra-compatibilidade-velocidade.catalog';
import { CONFIGURACAO_ANTENA_MODEM } from '../../../unlogged-area/configuracao-antena-modem';

const getPage = (catalog, page = 0) => `${catalog}${page}`;
const config = {alert: 'internet-lenta', alertReboot: 'internet-lenta-reboot'};

const EXTRA_PAGE: CatalogModel[] = [
  {
    id: 'extraPage-3',
    gaPageName: 'identificar_tipo_rede',
    layout: {
      title:
        'O dispositivo com lentidão está conectado à rede Wi-Fi ou ao cabo de rede (Ethernet)?',
      alphabetical: true,
      buttons: [
        {
          text: 'Wi-fi',
          action: 'wifi',
          gaAction: 'wifi'
        },
        {
          text: 'Cabo de rede',
          action: 'cabo',
          gaAction: 'cabo'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'wifi',
          action: {
            call: 'prepareContent',
            params: {
              call: 'populateConnectedDevices',
              interaction: InteractionEnum.fibraDiagnosticoCompleto,
              dataOk: {
                call: 'changeModule',
                params: {
                  id: getPage(CatalogPrefix.DISPOSITIVOS_CONECTADOS, 44)
                }
              },
              dataNok: {
                call: 'goToConclusionPage',
                params: {
                  id: 'internet-lenta-dispositivos-conectados-erro'
                }
              },
              dataHandler: 'redesHandler',
              dataName: 'dataList'
            }
          }
        },
        {
          name: 'cabo',
          action: {
            call: 'changeModule',
            params: {
              id: getPage(CatalogPrefix.ISOLAR_MODEM)
            }
          }
        }
      ]
    }
  },
  {
    id: 'extraPage-4',
    gaPageName: '',
    layout: {},
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'checkDataAndNav',
            params: {
              data: {
                key: 'displayedSpeed',
                value: true
              },
              idOk: { id: 'conclusion' },
              idNok: { id: getPage(CatalogPrefix.COMPATIBILIDADE_MANUAL, 8) }
            }
          }
        }
      ]
    }
  },
];

const catalogOnline = [
  ...COMPATIBILIDADE_VELOCIDADE_REPAIR(getPage(CatalogPrefix.TROCA_CANAL)),
  ...FIBRA_TROCA_DE_CANAL(getPage(CatalogPrefix.REBOOT_AUTOMATICO), config),
  ...FIBRA_REBOOT_AUTOMATICO('extraPage-3', getPage(CatalogPrefix.REBOOT_MANUAL, 1), config),
  ...FIBRA_REBOOT_MANUAL('extraPage-3', config),
  ...EXTRA_PAGE,
  ...FIBRA_DISPOSITIVOS_CONECTADOS('extraPage-4'),
  ...ISOLAR_MODEM('extraPage-4', config)
];

const catalogOffline = [
  ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.ISOLAR_MODEM)),
  ...ISOLAR_MODEM('extraPage-4', config),
  ...EXTRA_PAGE,
  ...CONFIGURACAO_ANTENA_MODEM()
];

const FIBRA_INTERNET_LENTA: CatalogDTO = {
  authenticated: {
    catalog: catalogOnline,
    initialPage: getPage(CatalogPrefix.COMPATIBILIDADE)
  },
  default: {
    catalog: catalogOffline,
    initialPage: getPage(CatalogPrefix.REBOOT_MANUAL)
  }
};

export { FIBRA_INTERNET_LENTA };
