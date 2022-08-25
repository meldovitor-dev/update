import { CatalogModel } from '../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from './../shared/alert-catalog';

const getId = (id) => CatalogPrefix.TS_CABOS + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/shared/${img}`;
const TS_CABLE = (negativeId, successId, config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'inverter_pontas_cabo_tomada_modem',
    fluxo: 'ts_cabos',
    layout: {
      title: 'Inverta as pontas do cabo que está conectado na tomada e no modem.',
      imageCaption: 'Observe também se o cabo não está partido ou danificado.',
      image: getImage('modemremovecable.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'avancar',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
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
    gaPageName: 'ligando_modem',
    layout: {
      title: 'Aguarde só um pouco antes de testar a sua internet.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
      alert: getAlert(config.alert || 'internet','internet_voltou_invertendo_pontas_cabo_tomada_modem'),
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'manualCronometerProcess', params: {
              config: 'rebootManual'
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
            call: 'nav',
            params: {
              id: getId(2),
            }
          }
        },
        {
          name: 'sim',
          action: {
            call: 'checkIfFilter',
            params: {
              then: {id : 'success'},
              else: {id: getId(4)},
            }
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'inverter_pontas_cabo_computador_tv',
    layout: {
      title: 'Inverta as pontas do cabo que está conectado ao roteador, computador ou TV.',
      hiddenHeaderBackButton: true,
      imageCaption: 'Observe também se o cabo não está partido ou danificado.',
      image: getImage('inverter_cabo_dispositivos.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'feito',
        },
        {
          text: 'Não tenho conectado por cabo',
          action: 'nao',
          gaAction: 'feito',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav',
            params: {
              id: getId(3),
            }
          }
        },
        {
          name: 'nao',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId,
            }
          }
        },
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'ligando_modem',
    layout: {
      title: 'Aguarde só um pouco antes de testar a sua internet.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
      alert: getAlert(config.alert || 'internet','internet_voltou_invertendo_pontas_cabo_tomada_modem'),
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'manualCronometerProcess', params: {
              config: 'rebootManual'
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
            }
          }
        },
        {
          name: 'sim',
          action: {
            call: 'checkIfFilter',
            params: {
              then: {id:'success'},
              else: {id:getId(4)},
            }
          }
        }
      ]
    }
  },
  {

    id: getId(4),
    gaPageName: 'adicionar_microfiltro',
    layout: {
      title: 'Adicione o microfiltro novamente pra testar.',
      image: './assets/images/troubleshooting/problem-solver/shared/microfiltro-02.svg',
      alert: getAlert('ts-cabos-cobre','internet_continua_funcionando_adicionando_microfiltro'),
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'feito',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'openPopup',
          }
        },
        {
          name: 'nao',
          action: {
            call: 'nav',
            params: {
              id: getId(5),
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
  {
    id: getId(5),
    gaPageName: 'trocar_microfiltro',
    layout: {
      title: 'Retire seu microfiltro pra usar a internet e troque-o por um novo.',
      image: getImage('decodificador_desligar_tomada.svg'),
      paragraph: 'Não é possível usar o telefone fixo sem o microfiltro, troque-o por um novo. Você encontra o microfiltro em lojas de informática.',
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'entendido'
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'goToHome',
          }
        }
      ]
    }
  },
]));
export { TS_CABLE };
