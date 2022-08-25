import { TimerTypes } from './../../../../general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel, ConfigModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';

const getId = id => CatalogPrefix.REBOOT_MANUAL_STB_CABOS + id;
const getImage = (img: string) =>
  `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

export const FIBRA_TV_REBOOT_MANUAL_STB_CABOS = (negativeId, config: ConfigModel = {}): CatalogModel[] =>
  JSON.parse(
    JSON.stringify([
      {
        id: getId(0),
        gaPageName: 'lembrete_testar_todos_pontos',
        layout: {
          title:
            'Atenção! As próximas ações devem ser feitas em cada ponto de TV que apresentar problema, tudo bem?',
          buttons: [
            {
              text: 'Ok, entendi!',
              gaAction: 'entendido',
              action: 'navigate',
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
                  id: getId(1)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(1),
        fluxo: 'reboot_maual_stb',
        gaPageName: 'verificar_cabos_ethernet_hdmi',
        layout: {
          title: 'Verifique os cabos Ethernet e HDMI atrás do seu decodificador.',
          paragraph: 'Veja se os cabos Ethernet e HDMI estão bem conectados.',
          image: getImage('ethernet_hdmi.png'),
          hiddenHeaderBackButton: true,
          buttons: [{
            text: 'Feito!',
            action: 'navigate',
            gaAction: 'feito'
          }]
        },
        state: {
          on: [{
            name: 'navigate',
            action: {
              call: 'nav',
              params: {
                id: getId(2)
              }
            }
          }]
        }
      },
      {
        id: getId(2),
        gaPageName: 'verificar_cabo_hdmi',
        layout: {
          title: 'Agora verifique o cabo HDMI atrás da sua TV.',
          paragraph: 'Veja se o cabo HDMI está conectado corretamente na televisão.',
          image: getImage('cabo_hdmi.png'),
          buttons: [{
            text: 'Feito!',
            action: 'navigate',
            gaAction: 'feito'
          }]
        },
        state: {
          on: [{
            name: 'navigate',
            action: {
              call: 'nav',
              params: {
                id: getId(3)
              }
            }
          }]
        }
      },
      {
        id: getId(3),
        gaPageName: 'verificar_entrada_tv',
        layout: {
          title: 'Por fim, verifique a entrada do sinal da TV.',
          paragraph: 'Veja se a entrada do sinal da TV é a mesma da entrada do cabo HDMI.',
          image: getImage('sinal_tv.png'),
          buttons: [{
            text: 'Feito!',
            action: 'sim',
            gaAction: 'feito'
          }]
        },
        state: {
          on: [{
            name: 'sim',
            action: {
              call: 'nav',
              params: {
                id: getId(4)
              }
            }
          }]
        }
      },
      {
        id: getId(4),
        gaPageName: 'acoes_realizadas_todos_pontos',
        layout: {
          title: 'Você realizou estas ações em todos os pontos de TV com problema?',
          paragraph: 'Repita estes passos caso você tenha mais de um ponto de TV.',
          buttons: [{
              text: 'Não, ver novamente',
              action: 'novamente',
              gaAction: 'repetir'
            },
            {
              text: 'Sim, feito!',
              action: 'feito',
              gaAction: 'feito'
            }
          ],
          alert: getAlert(config.alert || 'tv-reboot-automatico-stb', 'tv_voltou_verificando_cabos_ethernet'),
        },
        state: {
          on: [{
              name: 'novamente',
              action: {
                call: 'nav',
                params: {
                  id: getId(1)
                }
              }
            },
            {
              name: 'feito',
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
                call: 'goToSuccessPage'
              }
            }
          ]
        }
      }
    ]));
