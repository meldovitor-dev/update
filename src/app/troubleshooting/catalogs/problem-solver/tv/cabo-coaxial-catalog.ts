import { CatalogPrefix } from './../../../../enums/catalog.enum';
import { CatalogModel } from './../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { getAlert } from '../shared/alert-catalog';

const getId = id => CatalogPrefix.CABO_COAXIAL + id;
const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/tv/${name}`;
const CABO_COAXIAL = (negativeId): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'desligar_decodificador_tomada',
    fluxo: 'cabo_coaxial',
    layout: {
      title: 'Antes de seguirmos, você precisa desligar o decodificador na tomada, tudo bem?',
      image: getImage('decodificador_desligar_tomada.svg'),
      buttons: [
        {
          text: 'Feito',
          action: 'feito',
          gaAction: 'proximo',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
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
    gaPageName: 'verificar_conexao_cabo_coaxial',
    layout: {
      title: 'Veja se o cabo coaxial está conectado corretamente ao decodificador.',
      image: getImage('cabo_coaxial.svg'),
      buttons: [
        {
          text: 'Feito',
          action: 'feito',
          gaAction: 'proximo',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(2),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'verificar_conexao_cabo_av_hdmi',
    layout: {
      title: 'Verifique se o cabo AV ou HDMI está conectado corretamente ao decodificador.',
      image: getImage('cabo_av_hdmi.svg'),
      buttons: [
        {
          text: 'Feito',
          action: 'feito',
          gaAction: 'proximo',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(3),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'religar_decodificador',
    layout: {
      title: 'Ok! Agora ligue novamente o seu decodificador.',
      image: getImage('ligar_decodificador.svg'),
      buttons: [
        {
          text: 'Feito',
          action: 'feito',
          gaAction: 'proximo',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(4),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'religando_decodificador',
    layout: {
      title: 'Aguarde um pouco antes de testar o sinal novamente.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
      alert: getAlert('tv-canais', 'tv_voltou_religando_decodificador'),
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'manualCronometerProcess', params: {
              config: 'rebootSTBManual'
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

export { CABO_COAXIAL}