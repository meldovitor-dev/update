import { getAlert } from '../shared/alert-catalog';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';

const getId = id => CatalogPrefix.CORRECAO_DNS + id;
const alert = getAlert('internet', 'internet_voltou_atualizando_configuracoes_modem');

const CORRECAO_DNS = (negativeId): CatalogModel[] =>
  JSON.parse(
    JSON.stringify([
      {
        id: getId(0),
        gaPageName: 'atualizando_configuracoes_modem',
        fluxo: 'correcao_dns',
        layout: {
          title: 'Estamos atualizando as configurações do seu modem...',
          loading: TimerTypes.RING,
          interaction: InteractionEnum.reconfigDns,
          alert
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'callServices',
                params: {
                  interaction: InteractionEnum.reconfigDns
                }
              }
            },
            {
              name: InteractionEnum.reconfigDns,
              action: {
                call: 'serviceResponse',
                params: {
                  timeout: {
                    call: 'changeModule',
                    params: {
                      id: negativeId
                    }
                  },
                  success: {
                    call: 'openPopup'
                  }
                }
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
                call: 'goToSuccessPage'
              }
            }
          ]
        }
      }
    ])
  );

export { CORRECAO_DNS };
