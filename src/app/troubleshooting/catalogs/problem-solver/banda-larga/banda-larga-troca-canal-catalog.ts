import { ConfigModel } from './../../../troubleshooting-interface';
import { InteractionEnum } from './../../../../domain/interactions';
import { CatalogModel } from '../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from './../shared/alert-catalog';

const getId = (id) => CatalogPrefix.TROCA_CANAL + id;
const BANDA_LARGA_TROCA_DE_CANAL = (negativeId, config: ConfigModel= {}): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'trocar_canal',
    fluxo: 'troca_canal',
    layout: {
      title: 'Vamos otimizar o sinal pra diminuir interferências na sua internet.',
      buttons: [
        {
          text: 'Vamos lá!',
          action: 'navigate',
          gaAction: 'comecar'
        }
      ]
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
      ],
    }
  },
  {
    id: getId(1),
    gaPageName: 'trocando_canal',
    layout: {
      title: 'Estamos otimizando o seu sinal para ter menos interferência e melhorar a sua internet.',
      loading: TimerTypes.RING,
      interaction: InteractionEnum.bandaLargaSetChannelWifi,
      alert: getAlert(config.alert || 'internet-lenta', 'internet_melhorou_trocando_canal'),
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices', params: {
              interaction: InteractionEnum.bandaLargaSetChannelWifi
            },
          }
        },
        {
          name: InteractionEnum.bandaLargaSetChannelWifi,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'changeModule', params: {
                  id: negativeId
                },
              },
              success: {
                call: 'openPopup'
              }
            },
          }
        },
        {
          name: 'nao',
          action: {
            call: 'changeModule', params: {
              id: negativeId
            },
          },
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        },
      ],
    },
  },
]));

export { BANDA_LARGA_TROCA_DE_CANAL };
