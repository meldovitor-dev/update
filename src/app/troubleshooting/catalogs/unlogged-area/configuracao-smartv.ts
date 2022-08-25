import { CatalogModel, PageConfigModel } from '../../troubleshooting-interface';
import { getAlert } from '../problem-solver/shared/alert-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/unlogged-area/configuracao-smartv/${name}`;
const pageConfig: PageConfigModel = {
  feedback: {
    gaPageName: 'avaliar_dicas',
    title: 'Estas dicas foram úteis?',
    buttons: [
      {
        text: 'Não',
        action: 'goHomeFeedback',
        gaAction: 'nao'
      },
      {
        text: 'Sim',
        action: 'goHomeFeedback',
        gaAction: 'util'
      }
    ],
    state:
    {
      name: 'goHomeFeedback',
      action: {
        call: 'navigateToHome'
      }
    }
  }
};
export const CONFIGURACAO_SMART_TV: CatalogModel[] = [
  /*
  * FLUXO INCIAL
  */
  {
    id: 0,
    gaPageName: 'aviso_variacao_orientacoes',
    fluxo: 'configurar_internet_tv',
    pageConfig,
    layout: {
      title: 'As orientações a seguir podem variar de acordo com a sua TV.',
      customClasses: 'title-pink spaced',
      paragraph: 'Alguns botões e telas podem apresentar outras opções de texto. Se necessário, procure o manual da sua TV.',
      buttons: [
        {
          text: 'Ok, vamos lá!',
          gaAction: 'comecar',
          action: 'navigate',
          customClasses: 'button-pink text-center button-content',
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
              id: 1,
            },
          },
        },
        {
          name: 'start-model',
          action: {
            call: 'resetSmartvVars',
          },
        },
      ],
    },
  },
  {
    id: 1,
    gaPageName: 'pressionar_botao_menu_home_configuracoes',
    layout: {
      title: 'Pelo controle remoto da TV, pressione o botão <b>"Menu"</b> ou <b>"Home"</b> ou <b>"Configurações"</b>.',
      paragraph: 'Selecione a opção correspondente à sua TV.',
      customClasses: 'title-pink spaced',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
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
              id: 2,
            },
          },
        },
      ],
    },
  },
  {
    id: 2,
    gaPageName: 'selecionar_rede',
    layout: {
      title: 'Selecione a opção <b>"Rede"</b>.',
      customClasses: 'title-pink',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
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
              id: 3
            }
          },
        },
      ],
    },
  },
  {
    id: 3,
    gaPageName: 'selecionar_configuracoes_rede',
    layout: {
      title: 'Selecione a opção <b>"Configurações de rede"</b> ou <b>"Ligação de Rede"</b>.',
      customClasses: 'title-pink',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
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
              id: 4
            }
          },
        },
      ],
    },
  },
  {
    id: 4,
    gaPageName: 'escolher_forma_conectar_tv',
    layout: {
      title: 'Você quer conectar a sua TV via <b>cabo</b> ou <b>Wi-Fi</b>?',
      customClasses: 'title-pink',
      buttons: [
        {
          text: 'Conectar via cabo',
          gaAction: 'via_cabo',
          action: 'navigateCable',
          customClasses: 'button-gray',
        },
        {
          text: 'Conectar via Wi-Fi',
          gaAction: 'via_wifi',
          action: 'navigateWifi',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigateCable',
          action: {
            call: 'nav',
            params: {
              id: 5
            }
          },
        },
        {
          name: 'navigateWifi',
          action: {
            call: 'nav',
            params: {
              id: 14
            }
          },
        },
      ],
    },
  },
  /*
  * INICIO FLUXO VIA CABO
  */
  {
    id: 5,
    gaPageName: 'confirmar_cabo_bem_conectado',
    layout: {
      title: 'Confirme se o cabo de internet está bem conectado à TV e ao modem.',
      hiddenHeaderBackButton: true,
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
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
              id: 6,
            },
          },
        },
      ],
    },
  },
  {
    id: 6,
    gaPageName: 'selecionar_tipo_rede_cabo',
    layout: {
      title: 'Em <b>"Tipo de rede"</b>, selecione a opção <b>"Cabo"</b> ou <b>"Rede com fio"</b>.',
      customClasses: 'title-pink',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
              id: 7,
            },
          },
        },
      ],
    },
  },
  {
    id: 7,
    gaPageName: 'clicar_botao_conectar',
    layout: {
      title: 'Agora clique no botão <b>"Conectar"</b> ou <b>"Concluído"</b>.',
      paragraph: 'Em seguida, sua TV irá conectar-se à internet.',
      customClasses: 'title-pink',
      buttons: [
        {
          text: 'Feito!',
          gaAction: 'feito',
          action: 'navigatePop',
          customClasses: 'button-gray',
        },
      ],
      alert:  getAlert('smart-tv','tv_conectou_configurando_rede_cabo')
    },
    state: {
      on: [
        {
          name: 'navigatePop',
          action: {
            call: 'openPopup',
          },
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
            call: 'nav',
            params: {
              id: 8,
            },
          },
        },
      ],
    },
  },
  {
    id: 8,
    gaPageName: 'pressionar_botao_menu_home_configuracoes',
    layout: {
      title: 'Pelo controle remoto da TV, pressione o botão <b>"Menu"</b> ou <b>"Home"</b> ou <b>"Configurações"</b>.',
      paragraph: 'Selecione a opção correspondente à sua TV.',
      customClasses: 'title-pink spaced',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
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
              id: 9,
            },
          },
        },
      ],
    },
  },
  {
    id: 9,
    gaPageName: 'selecionar_status_rede',
    layout: {
      title: 'Selecione a opção <b>"Status da rede"</b>.',
      customClasses: 'title-pink',

      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
              id: 10,
            },
          },
        },
      ],
    },
  },
  {
    id: 10,
    gaPageName: 'verificar_status_rede',
    layout: {
      title: 'A sua TV aparece como conectada no status<br/> da rede?',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Sim, está conectada',
          gaAction: 'tv_conectada',
          action: 'openPopup',
          customClasses: 'button-gray',
        },
        {
          text: 'Não está conectada',
          gaAction: 'tv_nao_conectada',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
      alert : getAlert('smart-tv','tv_conectou_verificando_status')
    },
    state: {
      on: [
        {
          name: 'openPopup',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
              id: 11,
            },
          },
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
            call: 'nav',
            params: {
              id: 11,
            },
          },
        },
      ],
    },
  },
  {
    id: 11,
    gaPageName: 'trocar_cabo_internet',
    layout: {
      title: 'Troque o cabo de internet conectado à sua TV e teste novamente.',
      customClasses: 'title-pink spaced',

      image: getImage('troca_cabo_tv.svg'),
      buttons: [
        {
          text: 'Feito! Cabo trocado',
          gaAction: 'trocado',
          action: 'openPopup',
          customClasses: 'button-gray',
        },
        {
          text: 'Não tenho outro cabo',
          gaAction: 'sem_outro_cabo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
      alert :getAlert('smart-tv','tv_conectou_trocando_cabo'),
    },
    state: {
      on: [
        {
          name: 'openPopup',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        },
        {
          name: 'navigate',
          action: {
            call: 'smartvCableDecision',
            params: {
              then: {id: 34},
              else: {id: 12},
            }
          },
        },
        {
          name: 'nao',
          action: {
            call: 'smartvCableDecision',
            params: {
              then: {id: 34},
              else: {id: 12},
            }
          },
        },
      ],
    },
  },
  {
    id: 12,
    gaPageName: 'tentar_conectar_wifi_verificar_conexao',
    layout: {
      title:
      'Não conseguimos conectar sua TV à internet via cabo.<br/><br/> Tente conectar-se via Wi-Fi ou verifique a sua conexão de internet.',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Conectar via Wi-Fi',
          gaAction: 'conectar_wifi',
          action: 'navigateWifi',
          customClasses: 'button-gray',
        },
        {
          text: 'Verificar conexão de internet',
          gaAction: 'verificar_conexao',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigateWifi',
          action: {
            call: 'nav', params: {
              id: 14,
            }
          },
        },
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
              id: 13,
            }
          },
        },
      ],
    },
  },
  {
    id: 13,
    gaPageName: 'verificar_conexao_internet',
    layout: {
      title: 'Pra verificar a conexão da sua internet, faça seu login no app e selecione a opção <b>"Sem conexão"</b>.',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Entrar',
          gaAction: 'seguir_proxima_etapa',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'goToHome'
          },
        },
      ],
    },
  },
  /*
  * INÍCIO FLUXO VIA WIFI
  */
  {
    id: 14,
    gaPageName: 'verificar_conexao_wifi_tv',
    layout: {
      title: 'Verifique se o modelo da sua TV possui a opção de conexão via Wi-Fi.',
      paragraph: 'Consulte o manual da sua TV pra saber se possui conexão à rede Wi-Fi.',
      customClasses: 'title-pink spaced',
      hiddenHeaderBackButton: true,

      buttons: [
        {
          text: 'Sim, possui',
          gaAction: 'possui',
          action: 'navigate',
          customClasses: 'button-gray',
        },
        {
          text: 'Não possui',
          gaAction: 'nao_possui',
          action: 'navigateCable',
          customClasses: 'button-gray',
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
              id: 15
            },
          },
        },
        {
          name: 'navigateCable',
          action: {
            call: 'smartvWifiDecision',
            params: {
              then: {id: 34},
              else: {id: 5},
            }
          },
        },
      ],
    },
  },
  {
    id: 34,
    gaPageName: 'tv_nao_conectada_internet',
    layout: {
      title: 'Não conseguimos conectar sua TV à internet.<br/><br/> Verifique a sua conexão de internet a seguir.',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Avançar',
          gaAction: 'seguir_proxima_etapa',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
              id: 13,
            },
          },
        },
      ],
    },
  },
  {
    id: 15,
    gaPageName: 'selecionar_tipo_rede_sem_fio',
    layout: {
      title: 'Em <b>"Tipo de rede"</b>, selecione a opção <b>"Sem fio"</b>. As redes sem fio disponíveis serão apresentadas.',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
              id: 16,
            },
          },
        },
      ],
    },
  },
  {
    id: 16,
    gaPageName: 'escolher_rede_wifi',
    layout: {
      title: 'Selecione a rede Wi-Fi da Oi que deseja.',
      paragraph: 'Se a sua TV possuir compatibilidade, serão apresentadas as duas redes: 2.4 GHz e 5 GHz. ' +
      'Confira qual a rede tem maior intensidade de sinal no ambiente da sua TV.',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
              id: 17,
            },
          },
        },
      ],
    },
  },
  {
    id: 17,
    gaPageName: 'digitar_senha_wifi',
    layout: {
      title: 'Digite a senha de acesso à rede Wi-Fi e clique em concluído na sua TV.',
      paragraph: 'Após digitar a senha, a sua TV vai conectar-se à internet.',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Feito!',
          gaAction: 'feito',
          action: 'openPopup',
          customClasses: 'button-gray',
        },
      ],
      alert : getAlert ('smart-tv','tv_conectou_configurando_rede_wifi'),
    },
    state: {
      on: [
        {
          name: 'openPopup',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'nao',
          action: {
            call: 'nav',
            params: {
              id: 18,
            }
          },
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        },
      ],
    },
  },
  {
    id: 18,
    gaPageName: 'pressionar_botao_menu_home_configuracoes',
    layout: {
      title: 'Pelo controle remoto da TV, pressione o botão<br/> <b>"Menu"</b> ou <b>"Home"</b><br/> ou <b>"Configurações"</b>.',
      paragraph: 'Selecione a opção correspondente à sua TV.',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
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
              id: 19,
            }
          },
        },
      ],
    },
  },
  {
    id: 19,
    gaPageName: 'selecionar_status_rede',
    layout: {
      title: 'Selecione a opção <b>"Status da rede"</b>.',
      customClasses: 'title-pink',

      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
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
              id: 20,
            }
          },
        },
      ],
    },
  },
  {
    id: 20,
    gaPageName: 'verificar_status_rede',
    layout: {
      title: 'A sua TV aparece como conectada no status<br/> da rede?',
      customClasses: 'title-pink',

      buttons: [
        {
          text: 'Sim, está conectada à rede!',
          gaAction: 'tv_conectada',
          action: 'openPopup',
          customClasses: 'button-gray',
        },
        {
          text: 'Não está conectada',
          gaAction: 'tv_nao_conectada',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
      alert: getAlert ('smart-tv','tv_conectou_verificando_status'),
    },
    state: {
      on: [
        {
          name: 'openPopup',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'navigate',
          action: {
            call: 'smartvWifiDecision',
            params: {
              then: {id: 34},
              else: {id: 21},
            }
          },
        },
        {
          name: 'nao',
          action: {
            call: 'smartvWifiDecision',
            params: {
              then: {id: 34},
              else: {id: 21}
            }
          },
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        },
      ],
    },
  },
  {
    id: 21,
    gaPageName: 'tentar_conectar_cabo_verificar_conexao',
    layout: {
      title:
      'Não conseguimos conectar sua TV à internet via Wi-Fi.<br/><br/> Tente conectar-se via cabo ou verifique a sua conexão de internet.',
      customClasses: 'title-pink spaced',

      buttons: [
        {
          text: 'Conectar via cabo',
          gaAction: 'conectar_cabo',
          action: 'navigateCable',
          customClasses: 'button-gray',
        },
        {
          text: 'Verificar conexão de internet',
          gaAction: 'verificar_conexao',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigateCable',
          action: {
            call: 'nav',
            params: {
              id: 5,
            }
          },
        },
        {
          name: 'navigate',
          action: {
            call: 'nav', params: {
              id: 13,
            }
          },
        },
      ],
    },
  },
];
