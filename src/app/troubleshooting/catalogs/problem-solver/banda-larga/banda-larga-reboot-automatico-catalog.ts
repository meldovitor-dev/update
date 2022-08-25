import { ConfigModel } from './../../../troubleshooting-interface';
import { InteractionEnum } from '../../../../domain/interactions';
import { CatalogModel } from '../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';

const getId = (id) => CatalogPrefix.REBOOT_AUTOMATICO + id;
const BANDA_LARGA_REBOOT_AUTOMATICO = (negativeId, timeoutId: any, config: ConfigModel = {}): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    layout: {},
    state: {
      on:
        [
          {
            name: 'onInit',
            action: {
              call: 'verifyServiceEnable',
              params: {
                path: 'modem.reboot.enabled',
                enable:  { id: getId(1) },
                disable: { id: timeoutId },
              },
            },
          }
        ],
    }
  },
  {
    id: getId(1),
    gaPageName: 'reiniciar_modem',
    fluxo: 'reboot_automatico',
    layout: {
      title: 'Vamos reiniciar o seu modem automaticamente.',
      paragraph: 'Essa ação pode resolver o problema.',
      buttons: [
        {
          text: 'Vamos lá!',
          action: 'navigate',
          gaAction: 'comecar'
        }
      ]
    },
    state: {
      on:
        [
          {
            name: 'navigate',
            action: {
              call: 'nav',
              params: {
                id: getId(2),
              },
            },
          }
        ],
    }
  },
  {
    id: getId(2),
    gaPageName: 'reiniciando_modem',
    layout: {
      title: 'Estamos reiniciando o seu modem...',
      loading: TimerTypes.RING,
      interaction: InteractionEnum.bandaLargaRebootModem,
      hiddenHeaderBackButton: true,
      alert: getAlert(config.alertReboot || 'internet-reboot', 'internet_voltou_reiniciando_modem'),
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices', params: {
              interaction: InteractionEnum.bandaLargaRebootModem
            },
          }
        },
        {
          name: InteractionEnum.bandaLargaRebootModem,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'nav',
                params: {
                  id: getId(3)
                }
              },
              success: {
                call: 'openPopup'
              }
            },
          }
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        },
        {
          name: 'nao',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId,
            },
          },
        }
      ],
    },
  },
  {
    id: getId(3),
    gaPageName: 'erro_reiniciando_modem',
    layout: {
      title: 'Não foi possível reiniciar o seu modem.',
      paragraph: 'Vamos reiniciar manualmente no próximo passo.',
      hiddenHeaderBackButton: true,
      buttons: [
        {
          text: 'Vamos lá!',
          gaAction: 'seguir_proxima_etapa',
          action: 'navigate'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'changeModule',
            params: {
              id: timeoutId,
            },
          },
        }
      ]
    },
  }
]));

export { BANDA_LARGA_REBOOT_AUTOMATICO };
