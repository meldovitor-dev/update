import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';

const getId = (id) => CatalogPrefix.AUTH_HDM + id;

const AUTH_HDM = (negativeId, successId): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'comecar_autenticacao_hdm',
    fluxo: 'autenticacao_hdm',
    layout: {
      title: 'Ok. Vamos fazer algumas verificações automáticas no seu modem.',
      buttons: [
        {
          text: 'Vamos lá!',
          action: 'navigate',
          gaAction: 'continuar',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
            id: getId(1) ,
            },
          },
        },
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'autenticando_hdm',
    layout: {
      title: 'Estamos verificando as configurações do modem.',
      loading: TimerTypes.RING,
      interaction: InteractionEnum.authenticateHdm,
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices', params: {
              interaction: InteractionEnum.authenticateHdm
            },
          }
        },
        {
          name: InteractionEnum.authenticateHdm,
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
                call: 'checkAuthHdmResponse',
                params: {
                  interaction: InteractionEnum.authenticateHdm,
                  hdmOk: {
                    call: 'changeModule',
                    params: {
                    id: successId
                    }
                  },
                  hdmNok: {
                    call: 'changeModule',
                    params: {
                    id: negativeId
                    }
                  }
                }
              }
            }
          }
        },
      ],
    },
  }
]));

export { AUTH_HDM };
