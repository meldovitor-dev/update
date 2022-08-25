import { ConfigModel } from './../../../../troubleshooting-interface';
import { InteractionEnum } from './../../../../../domain/interactions';
import { CatalogModel } from '../../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from './../../shared/alert-catalog';

const getId = (id) => CatalogPrefix.TROCA_CANAL + id;
const alert = getAlert('internet');
const FIBRA_TROCA_DE_CANAL = (negativeId, config: ConfigModel = {}): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'trocando_canal',
    fluxo: 'troca_canal',
    layout: {
      title: 'Estamos otimizando o seu sinal para ter menos interferência e melhorar a sua internet.',
      loading: TimerTypes.RING,
      interaction: InteractionEnum.fibraSetChannelWifi,
      alert: getAlert(config.alert || 'internet', 'internet_melhorou_trocando_canal'),
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices', params: {
              interaction: InteractionEnum.fibraSetChannelWifi
            },
          }
        },
        {
          name: InteractionEnum.fibraSetChannelWifi,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'nav',
                params: {
                  id: getId(1)
                }

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
  {
    id: getId(1),
    gaPageName: 'erro_trocando_canal',
    layout: {
      title: 'Não conseguimos otimizar o seu sinal.',
      paragraph: 'Mas vamos seguir no próximo passo pra ajudar a encontrar a solução.',
      hiddenHeaderBackButton: true,
      buttons: [
        {
          text: 'Vamos lá!',
          action: 'errorPage',
          gaAction: 'seguir_proxima_etapa',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'errorPage',
          action: {
            call: 'changeModule', params: {
              id: negativeId
            },
          },
        },
      ]
    }
  }
]));

export { FIBRA_TROCA_DE_CANAL };