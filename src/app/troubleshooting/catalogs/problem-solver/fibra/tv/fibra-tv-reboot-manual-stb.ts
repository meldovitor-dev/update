import { TimerTypes } from './../../../../general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel, ConfigModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';

const getId = id => CatalogPrefix.REBOOT_MANUAL_STB + id;
const getImage = (img: string) =>
  `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

export const FIBRA_TV_REBOOT_MANUAL_STB = (negativeId,  config: ConfigModel= {}): CatalogModel[] =>
  JSON.parse(
    JSON.stringify([
      {
        id: getId(0),
        gaPageName: 'lembrete_testar_todos_pontos',
        layout: {
          title:
            'Atenção! A próxima ação deve ser feita em cada decodificador, tudo bem?',
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
        gaPageName: 'desligar_ligar_decodificador',
        fluxo: 'reboot_maual_stb',
        layout: {
          title:
            'Desligue o decodificador da tomada por 10 segundos e ligue novamente.',
          imageCaption: 'Realize esta ação no aparelho ligado à sua TV que apresenta problema.',
          image: getImage('cabo_energia.svg'),
          buttons: [
            {
              text: 'Feito!',
              gaAction: 'feito',
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
                  id: getId(2)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(2),
        gaPageName: 'reiniciando_decodificador',
        layout: {
          title: 'Aguarde enquanto o decodificador reinicia',
          paragraph: 'Sua TV deve ficar sem sinal durante o processo.',
          loading: TimerTypes.RING,
          hiddenHeaderBackButton: true,
          alert: getAlert(config.alert || 'tv-reboot-automatico-stb', 'tv_voltou_reiniciando_decodificador'),
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'manualCronometerProcess',
                params: {
                  config: 'rebootSTBManual'
                }
              }
            },
            {
              name: 'manualCronoExpired',
              action: config && config.successId ?
              {
                call: 'changeModule',
                params: {
                  id: config.successId
                }
              } :
              {
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
      },
    ])
  );
