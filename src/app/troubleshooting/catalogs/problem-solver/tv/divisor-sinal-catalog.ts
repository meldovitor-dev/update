import { CatalogPrefix } from './../../../../enums/catalog.enum';
import { CatalogModel } from './../../../troubleshooting-interface';
import { getAlert } from '../shared/alert-catalog';

const getId = id => CatalogPrefix.DIVISOR_SINAL + id;
const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/tv/${name}`;
const DIVISOR_SINAL = (negativeId): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'lembrete_testar_todos_pontos',
    fluxo: 'divisor_sinal',
    layout: {
      title: 'Então os próximos passos devem ser realizados em todos os pontos que estiverem sem sinal, tudo bem?',
      buttons: [
        {
          text: 'Ok, entendi',
          action: 'entendi',
          gaAction: 'entendi',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'entendi',
          action: {
            call: 'nav',
            params: {
              id: getId(1),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'verificar_cabos_bem_conectados',
    layout: {
      title: 'Veja se os cabos estão bem conectados no divisor.',
      image: getImage('divisor_de_sinal.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito',
        }
      ],
      alert: getAlert('tv-canais','tv_voltou_verificando_cabos_bem_conectados'),
    },
    state: {
      on: [
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

export { DIVISOR_SINAL}