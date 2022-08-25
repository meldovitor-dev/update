
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { InteractionEnum } from 'src/app/domain/interactions';


const getId = (id) => CatalogPrefix.ENVIO_PULSO + id;

export const TV_ENVIA_PULSO: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: '',
    state: {
      on: [
        {
          name: 'onInit',
          action:{
            call: 'checkEnvioPulso',
            params: {
              call: 'checkPulseSendingAvailability',
              then: {
                pulsoOk: {
                  id: getId(1)
                },
                pulsoNok: {
                  id: getId(2)
              }
              }
            }
          }
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'enviando_pulso',
    fluxo: 'envio_pulso',
    layout: {
      title: 'Vamos enviar um comando pra sua Oi TV.',
      paragraph: 'Aguarde enquanto o processo é concluído.<br>',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
      interaction: InteractionEnum.tvEnvioPulso,
      alert: getAlert('tv-canais','tv_voltou_enviando_pulso'),
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices', params: {
              interaction: InteractionEnum.tvEnvioPulso
            },
          }
        },
        {
          name: InteractionEnum.tvEnvioPulso,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'goToConclusionPage'
              },
              success: {
                call: 'getCronoTimeout',
              }
            },
          }
        },
        {
          name: 'cronoExpired',
          action: {
            call: 'openPopup'
          }
        },
        {
          name: 'nao',
          action: {
            call: 'goToConclusionPage'
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
    id: getId(2),
    gaPageName: 'aviso_esperar_envio_pulso',
    layout: {
      title: 'O próximo passo seria enviar um comando pra TV.',
      paragraph: 'Porém esta ação já foi realizada recentemente. ' +
        'Em alguns casos, o comando pode demorar até 1 hora.<br/><br/>#FORECAST#.',
      hiddenHeaderBackButton: true,
      buttons: [
        {
          text: 'Voltar pro inicio',
          action: 'go-home',
          gaAction: 'voltar_inicio',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'replaceForecast'
          }
        },
        {
          name: 'go-home',
          action: {
            call: 'goToHome'
          },
        },
      ]
    }
  }
];
