import { ConfigModel } from './../../../../troubleshooting-interface';
import { CatalogModel } from '../../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from './../../shared/alert-catalog';

const getId = (id) => CatalogPrefix.REBOOT_MANUAL + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/fibra/shared/${img}`;
const FIBRA_REBOOT_MANUAL = (negativeId, config: ConfigModel= {}): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'explicacao_inicial',
    fluxo: 'reboot_manual',
    layout: {
      title: 'Vamos precisar da sua ajuda na próxima etapa.',
      paragraph: 'Mesmo sem internet, você ainda pode continuar com um passo a passo que vai ajudar a encontrar a solução.',
      buttons: [
        {
          text: 'Vamos lá!!',
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
    fluxo: 'reboot_manual',
    gaPageName: 'desligar_ligar_modem',
    layout: {
      title: 'Desligue o modem por 10 segundos e ligue novamente.',
      image: getImage('modemTomada.svg'),
      imageCaption: 'Reinicie o aparelho manualmente, pois o modem de Fibra pode estar travado e afetando o seu serviço.',
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
      alert: getAlert(config.alertReboot || 'internet-reboot'),
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
export { FIBRA_REBOOT_MANUAL };
