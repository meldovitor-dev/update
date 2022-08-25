import { getAlert } from '../shared/alert-catalog';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';

const getId = id => CatalogPrefix.MODEM_CONFIG + id;
const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/banda-larga/${name}`;

const MODEM_CONFIG = (negativeId, successId): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'explicacao_inicial',
    fluxo: 'modem_ligado',
    layout: {
      title: 'Vamos precisar da sua ajuda na próxima etapa.',
      paragraph: 'Você ainda pode continuar com um passo a passo que vai ajudar a encontrar a solução.',
      buttons: [{
        text: 'Vamos lá!',
        action: 'navigate',
        gaAction: 'comecar',
      }]
    },
    state: {
      on: [{
        name: 'navigate',
        action: {
          call: 'nav',
          params: {
            id: getId(1),
          },
        },
      }, ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'verificar_luzes_modem',
    fluxo: 'modem_ligado',
    layout: {
      title: 'As luzes do seu modem estão acesas?',
      paragraph: 'Pelo menos uma luz tem que estar acesa.',
      alphabetical: true,
      buttons: [{
          text: 'Uma ou mais luzes acesas',
          action: 'successAction',
          gaAction: 'luzes_acesas',
        },
        {
          text: 'Todas as luzes apagadas',
          action: 'nextStep',
          gaAction: 'luzes_apagadas',
        }
      ]
    },
    state: {
      on: [{
          name: 'successAction',
          action: {
            call: 'changeModule',
            params: {
              id: successId,
            },
          },
        },
        {
          name: 'nextStep',
          action: {
            call: 'nav',
            params: {
              id: getId(2),
            },
          },
        },
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'verificar_botao_energia_modem',
    fluxo: 'modem_ligado',
    layout: {
      title: 'Veja se o botão de energia do modem está ligado.',
      alphabetical: true,
      alert: getAlert('sem-hdm-ligando-modem', 'modem_ligou'),
      buttons: [
        {
          text: 'O botão está ligado',
          action: 'nextStep',
          gaAction: 'ligado',
        },
        {
          text: 'Estava desligado. Liguei agora',
          action: 'ligandoModem',
          gaAction: 'desligado',
        },
        {
          text: 'Não sei identificar',
          action: 'nextStep',
          gaAction: 'sem_botao',
        },
      ]
    },
    state: {
      on: [{
          name: 'ligandoModem',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'nao',
          action: {
            call: 'nav', params: {
              id: getId(4)
            },
          },
        },
        {
          name: 'sim',
          action: {
            call: 'nav', params: {
              id: getId(3)
            },
          },
        },
        {
          name: 'nextStep',
          action: {
            call: 'nav',
            params: {
              id: getId(4),
            },
          },
        },
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'ligando_modem',
    fluxo: 'ligando_modem',
    layout: {
        title: 'Aguarde só um pouco antes de testar a sua internet.',
        loading: TimerTypes.RING,
        footerTips: true,
        alert: getAlert('internet-reboot','internet_voltou_ligando_modem'),
      },
    state: {
        on: [
            {
                name: 'onInit',
                action: {
                  call: 'manualCronometerProcess', params: {
                    config: 'rebootManual'                        //  TODO GET TEMPO MANUAL
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
        ],
    },
},
{
  id: getId(4),
  gaPageName: 'verificar_cabo_energia_eletrica',
  fluxo: 'verificar_cabo_energia',
  layout: {
    title: 'O cabo de energia elétrica do modem está bem conectado?',
    imageCaption: 'Observe também se o cabo não está partido ou danificado.',
    image: getImage('caboenergiaeletrica.svg'),
    alphabetical: true,
    alert,
    buttons: [
      {
        text: 'Tudo certo com o cabo',
        action: 'caboOkAction',
        gaAction: 'cabo_ok',
      },
      {
        text: 'O cabo estava mal conectado',
        action: 'caboMalConectadoAction',
        gaAction: 'cabo_mal_conectado',
      },
      {
        text: 'O cabo está danificado',
        action: 'conclusionAction',
        gaAction: 'cabo_danificado',
      },
    ]
  },
  state: {
    on: [
      {
        name: 'caboOkAction',
        action: {
          call: 'nav',
          params: {
            id: getId(5),
          },
        },
      },
      {
        name: 'caboMalConectadoAction',
        action: {
          call: 'nav',
          params: {
            id: getId(7),
          },
        },
      },
      {
        name: 'conclusionAction',
        action: {
          call: 'goToConclusionPage',
          params: {
            id: 'cabo-danificado',
          },
        },
      },
    ]
  }
},
{
  id: getId(5),
  gaPageName: 'trocar_tomada',
  fluxo: 'verificar_cabo_energia',
  layout: {
    title: 'Tente trocar de tomada pra ver se o modem liga.',
    hiddenHeaderBackButton: true,
    imageCaption: 'A tomada atual pode estar com algum problema na instalação.',
    image: getImage('trocardetomada.svg'),
    buttons: [{
      text: 'Feito!',
      action: 'navigate',
      gaAction: 'feito',
    }]
  },
  state: {
    on: [{
      name: 'navigate',
      action: {
        call: 'nav',
        params: {
          id: getId(6),
        },
      },
    }, ]
  }
},
{
  id: getId(6),
  gaPageName: 'trocando_tomada',
  fluxo: 'verificar_cabo_energia',
  layout: {
      title: 'Aguarde só um pouco antes de testar a sua internet.',
      loading: TimerTypes.RING,
      footerTips: true,
      alert: getAlert('internet-tomada', 'modem_ligou'),
  },
  state: {
      on: [
          {
              name: 'onInit',
              action: {
                call: 'manualCronometerProcess', params: {
                  config: 'rebootManual'                        //  TODO GET TEMPO MANUAL
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
                  call: 'goToConclusionPage',
                  params: {
                      id: 'modem-ruim'
                  }
              }
          },
          {
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(9),
                },
              },
          }
      ],
  },
},
{
  id: getId(7),
  gaPageName: 'reconectar_cabo',
  fluxo: 'verificar_cabo_energia',
  layout: {
    title: 'Tente reconectar o cabo para ver se o modem liga.',
    imageCaption: 'A tomada atual pode estar com algum problema na instalação.',
    image: getImage('caboenergiaeletrica.svg'),
    buttons: [{
      text: 'Feito!',
      action: 'navigate',
      gaAction: 'feito',
    }]
  },
  state: {
    on: [{
      name: 'navigate',
      action: {
        call: 'nav',
        params: {
          id: getId(8),
        },
      },
    }, ]
  }
},
{
  id: getId(8),
  gaPageName: 'reconectando_cabo',
  fluxo: 'verificar_cabo_energia',
  layout: {
      title: 'Aguarde só um pouco antes de testar a sua internet.',
      loading: TimerTypes.RING,
      footerTips: true,
      alert: getAlert('internet-reconectar-cabo','internet_voltou_verificando_cabo_energia'),
  },
  state: {
      on: [
          {
              name: 'onInit',
              action: {
                call: 'manualCronometerProcess', params: {
                  config: 'rebootManual'                        //  TODO GET TEMPO MANUAL
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
                  id: getId(5),
                },
              }
          },
          {
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(9),
                },
              },
          }
      ],
  },
},
{
  id: getId(9),
  gaPageName: 'reconectando_internet',
  layout: {
      title: 'Aguarde só um pouco antes de testar a sua internet.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
      footerTips: true,
      alert: getAlert('internet','internet_voltou_verificando_cabo_energia'),
  },
  state: {
      on: [
          {
              name: 'onInit',
              action: {
                call: 'manualCronometerProcess', params: {
                  config: 'rebootManual'                        //  TODO GET TEMPO MANUAL
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
              }
          },
          {
              name: 'sim',
              action: {
                call: 'goToSuccessPage'
              },
          }
      ],
  },
}

]));

export {
  MODEM_CONFIG
};
