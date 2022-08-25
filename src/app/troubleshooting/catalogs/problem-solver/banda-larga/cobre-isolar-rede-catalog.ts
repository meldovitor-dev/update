import { CatalogModel } from './../../../troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from './../shared/alert-catalog';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';

const getId = id => CatalogPrefix.ISOLAR_REDE + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/shared/${img}`;
const COBRE_ISOLAR_REDE = (negativeId, config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'localizar_microfiltro',
    fluxo: 'isolar_rede',
    layout: {
      title: 'Pra continuar, localize o microfiltro.',
      image: getImage('microfiltro-00.svg'),
      alphabetical: true,
      buttons: [
        {
          text: 'Encontrei o microfiltro',
          action: 'nextPage',
          gaAction: 'encontrado'
        },
        {
          text: 'Não sei o que é',
          action: 'navigate',
          gaAction: 'nao_identificado'
        },
        {
          text: 'Não tenho microfiltro',
          action: 'nextModule',
          gaAction: 'nao_possui'
        }
      ],
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
        },
        {
          name: 'nextPage',
          action: {
            call: 'nav',
            params: {
              id: getId(2)
            }
          }
        },
        {
          name: 'nextModule',
          action: {
            call: 'setNoFilter',
            params: {
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
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
    gaPageName: 'explicacao_microfiltro',
    layout: {
      title: 'Microfiltro é um adaptador que fica conectado à tomada da sua linha telefônica.',
      image: getImage('microfiltro-01.svg'),
      alphabetical: true,
      buttons: [
        {
          text: 'Encontrei o microfiltro',
          action: 'navigate',
          gaAction: 'encontrado'
        },
        {
          text: 'Não tenho microfiltro',
          action: 'nextModule',
          gaAction: 'nao_possui'
        }
      ],
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
        },
        {
          name: 'nextModule',
          action: {
            call: 'setNoFilter',
            params: {
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            }
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'retirar_microfiltro',
    layout: {
      title: 'Agora, retire o microfiltro da tomada e do telefone.',
      image: getImage('microfiltro-02.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'feito'
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
              id: getId(3)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'ligar_modem_direto',
    layout: {
      title: 'Certo. Agora ligue seu modem diretamente à linha telefônica.',
      image: getImage('cabodiretamenteligadonalinhatel.svg'),
      buttons: [
        {
          text: 'Pronto!',
          action: 'navigate',
          gaAction: 'feito'
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
              id: getId(4)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'ligando_modem',
    layout: {
      title: 'Aguarde só um pouco antes de testar a sua internet.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
      alert: getAlert(config.alert || 'internet','internet_voltou_retirando_microfiltro'),
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
            },
          },
        },
        {
          name: 'sim',
          action: {
            call: 'nav',
            params: {
              id: getId(5),
            },
          },
        }
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'microfiltro_com_problema',
    layout: {
      title: 'Seu microfiltro está com problema.',
      hiddenHeaderBackButton: true,
      image: getImage('microfiltro-00.svg'),
      imageCaption: 'Caso você use o telefone fixo, precisa trocar o microfiltro por um novo. Não é possível usar o fixo sem esse adaptador. Você encontra o microfiltro em lojas de informática.',
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'entendi'
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

export { COBRE_ISOLAR_REDE };
