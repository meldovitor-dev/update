import { CatalogModel } from '../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from './../shared/alert-catalog';


const getId = (id) => CatalogPrefix.TS_WIFI + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/shared/${img}`;
const TS_WIFI = (negativeId, config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'pressionar_wps',
    fluxo: 'ts_wifi',
    layout: {
      title: 'Certo. Então encontre e pressione o botão WPS no seu modem.',
      imageCaption: 'Você pode identificá-lo a partir dos três ícones acima ou também pelo nome  WIFI/WLAN, WLAN,  WIFI.',
      image: getImage('wpswlan.svg'),
      alphabetical: true,
      buttons: [
        {
          text: 'Já pressionei o botão',
          action: 'navigate',
          gaAction: 'feito',
        },
        {
          text: 'Não encontrei o botão',
          action: 'nextModule',
          gaAction: 'nao_identificado',
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
            }
          }
        },
        {
          name: 'nextModule',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId,
            },
          },
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'ligando_modem',
    layout: {
      title: 'Aguarde só um pouco antes de testar a sua internet.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
      alert: getAlert(config.alert || 'internet','internet_voltou_pressionando_wps'),
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
              id: negativeId
            }
          }
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
export { TS_WIFI };
