import { ConfigModel } from './../../../troubleshooting-interface';
import { CatalogModel } from '../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';

const getId = (id) => CatalogPrefix.REBOOT_MANUAL + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/banda-larga/${img}`;
const BANDA_LARGA_REBOOT_MANUAL = (negativeId, config: ConfigModel = {}): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'explicacao_inicial',
    fluxo: 'reboot_manual',
    layout: {
      title: 'Vamos reiniciar o seu modem manualmente.',
      paragraph: 'Esta próxima etapa pode te ajudar com a solução.',
      buttons: [
        {
          text: 'Vamos lá!',
          action: 'navigate',
          gaAction: 'avancar',
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
              id: getId(1),
            },
          },
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'desligar_ligar_modem',
    fluxo: 'reboot_manual',
    layout: {
      title: 'Desligue e ligue o modem da tomada.',
      image: getImage('rebootManual.svg'),
      imageCaption: 'O modem pode travar e afetar a banda larga. Aguarde alguns segundos após reiniciá-lo.',
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
            call: 'nav',
            params: {
              id: getId(2),
            },
          },
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'reiniciando_modem',
    layout: {

      title: 'Reiniciando o modem...',
      paragraph: 'Aguarde enquanto o processo é concluído.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
      alert: getAlert(config.alertReboot || 'internet-lenta-reboot', 'internet_melhorou_reiniciando_modem'),
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'manualCronometerProcess', params: {
              config: 'rebootManual'
            }
          }
        },
        {
          name: 'manualCronoExpired',
          action: {
            call: 'openPopup'
          }
        },
        {
          name: 'nao',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId,
            },
          },
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        }
      ]
    }
  }
]));
export { BANDA_LARGA_REBOOT_MANUAL };
