import { CatalogModel, PageConfigModel } from '../../troubleshooting-interface';

const getIcone = (name: string) => `assets/icon/troubleshooting/unlogged-area/orientacoes-controle/${name}`;
const seeControl = 'Ver o controle';
const gaSeeControl = 'ver_controle';
const seeScreen = 'Ver a tela';
const gaSeeScreen = 'ver_tela';
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

export const ORIENTACOES_CONTROLE_SLIDES = [
  {
    metadata: 'tela 1',
    ga: 'acessar_guia',
    label: 'Acessar o Guia de Programação',
    gaLabel: 'acessar_programacao',
    top: {
      title: 'Acessar o Guia de Programação:',
      img: getIcone('top1.png'),
      paragraph: 'Pressione o botão <b>GUIDE</b> para acessar o guia de programação'
    },
    bottom: [
      {
        src: getIcone('controle1.svg'),
        description: seeControl,
        ga: 'ver_controle'
      },
      {
        src: getIcone('tela1.jpg'),
        description: seeScreen,
        ga: 'ver_tela',
        landscape: true,
      },
    ]
  },
  {
    metadata: 'tela 2',
    ga: 'navegar_canais',
    label: 'Navegar entre os canais',
    gaLabel: 'navegar_canais',
    top: {
      title: 'Navegar entre os canais:',
      img: getIcone('top2.svg'),
      paragraph: 'Use as <b>setas</b> superior e inferior pra navegar entre os canais.'
    },
    bottom: [
      {
        src: getIcone('controle2_5.svg'),
        description: seeControl,
        ga: 'ver_controle'
      },
      {
        src: getIcone('tela2.jpg'),
        description: seeScreen,
        ga: 'ver_tela',
        landscape: true,
      },
    ]
  },
  {
    metadata: 'tela 3',
    ga: 'navegar_linha_tempo',
    label: 'Navegar na linha do tempo',
    gaLabel: 'navegar_linha_tempo',
    top: {
      title: 'Navegar na linha do tempo:',
      img: getIcone('top3.svg'),
      paragraph: 'Use as <b>setas</b> laterais pra navegar entre os horários da programação.'
    },
    bottom: [
      {
        src: getIcone('controle3.svg'),
        description: seeControl,
        ga: 'ver_controle'
      },
      {
        src: getIcone('tela3.jpg'),
        description: seeScreen,
        ga: 'ver_tela',
        landscape: true,
      }
    ]
  },
  {
    metadata: 'tela 4',
    label: 'Selecionar canal',
    ga: 'selecionar_canal',
    gaLabel: 'selecionar_canal',
    top: {
      title: 'Selecionar canal:',
      img: getIcone('top4.png'),
      paragraph: 'Use as teclas pra digitar o canal da programação que você quer assistir.'
    },
    bottom: [
      {
        src: getIcone('controle4.svg'),
        description: 'ver_tela',
        ga: ''
      }
    ]
  },
  {
    metadata: 'tela 5',
    label: 'Confirmar uma seleção',
    ga: 'confirmar_selecao',
    gaLabel: 'confirmar_selecao',
    top: {
      title: 'Confirmar uma seleção:',
      img: getIcone('top5.png'),
      paragraph: 'Pressione <b>OK</b> pra confirmar uma opção selecionada.'
    },
    bottom: [
      {
        src: getIcone('controle2_5.svg'),
        description: '',
        ga: 'ver_tela'
      }
    ]
  },
  {
    metadata: 'tela 6',
    label: 'Voltar pro passo anterior',
    ga: 'voltar_passo_anterior',
    gaLabel: 'voltar_passo_anterior',
    top: {
      title: 'Voltar pro passo anterior:',
      img: getIcone('top6.png'),
      paragraph: 'Pressione <b>BACK</b> quando quiser retornar pro passo anterior.'
    },
    bottom: [
      {
        src: getIcone('controle6.svg'),
        description: '',
        ga: ''
      }
    ]
  },
  {
    metadata: 'tela 7',
    label: 'Trocar de página dos canais',
    ga: 'trocar_pagina_canais',
    gaLabel: 'trocar_pagina_canais',
    top: {
      title: 'Trocar de página dos canais:',
      img: getIcone('top7.png'),
      paragraph: 'Use as teclas <b>CH/PG</b> pra trocar a grade de canais.'
    },
    bottom: [
      {
        src: getIcone('controle7.svg'),
        description: seeControl,
        ga: 'ver_controle'
      },
      {
        src: getIcone('tela7.jpg'),
        description: seeScreen,
        landscape: true,
        ga: 'ver_tela'
      }
    ]
  },
  {
    metadata: 'tela 8',
    label: 'Mostrar dias anteriores',
    ga: 'mostrar_dias_anteriores',
    gaLabel: 'mostrar_dias_anteriores',
    top: {
      title: 'Mostrar dias anteriores:',
      img: getIcone('top8.png'),
      paragraph: 'Use a tecla <b>REW</b> pra retroceder 24h na programação.',
    },
    bottom: [
      {
        src: getIcone('controle8_9.svg'),
        description: seeControl,
        ga: 'ver_controle'
      },
      {
        src: getIcone('tela8.jpg'),
        description: seeScreen,
        landscape: true,
        ga: 'ver_tela'
      }
    ]
  },
  {
    metadata: 'tela 9',
    label: 'Mostrar dias posteriores',
    ga: 'mostrar_dias_posteriores',
    gaLabel: 'mostrar_dias_posteriores',
    top: {
      title: 'Mostrar dias posteriores:',
      img: getIcone('top9.png'),
      paragraph: 'Use a tecla <b>FF</b> pra avançar 24h na programação.'
    },
    bottom: [
      {
        src: getIcone('controle8_9.svg'),
        description: seeControl,
      },
      {
        src: getIcone('tela9.jpg'),
        description: seeScreen,
        ga: 'ver_tela',
        landscape: true,
      }
    ]
  }
];
/**
 *  STATE CATALOG
 */
export const ORIENTACOES_CONTROLE: CatalogModel[] = [
  {
    id: 99,
    gaPageName: '',
    layout: {
      slides: ORIENTACOES_CONTROLE_SLIDES,
    },
    state: {
      on: []
    }
  },
  {
    id: 0,
    gaPageName: 'verificar_contole_remoto',
    fluxo: 'guia_programacao',
    pageConfig,
    layout: {
      customClasses: 'title-pink spaced',
      title: 'O seu controle remoto está funcionando?',
      paragraph: 'Teste se o controle remoto está funcionando normalmente. Basta selecionar um canal qualquer.',
      hiddenHeaderBackButton: true,
      buttons: [
        {
          text: 'Está funcionando!',
          gaAction: 'funcionando',
          action:  'funcionando',
          customClasses: 'button-pink text-center button-content',
        },
        {
          text: 'Não está funcionando!',
          gaAction: 'nao_funcionando',
          action: 'nao_funcionando',
          customClasses: 'button-pink text-center button-content',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'funcionando', action: {
            call: 'nav',
            params: {
              id: 99,
            },
          },
        },
        {
          name: 'nao_funcionando', action: {
            call: 'nav',
            params: {
              id: 1,
            },
          },
        },
      ],
    },
  },
  {
    id: 1,
    gaPageName: 'pressionar_botao_stb_guia',
    layout: {
      image: getIcone('stb_guia.svg'),
      title: 'Pressione uma vez o botão <b>STB</b> e depois o botão <b>GUIA</b>.',
      // tslint:disable-next-line: max-line-length
      paragraph: 'Pressionar STB direciona os comandos do controle pro decodificador. <br/><br/>Feito isso, clique no botão GUIA pra verificar se o controle está funcionando.',
      buttons: [
        {
          text: 'Feito!',
          gaAction: 'proximo_passo',
          action: 'feito',
          customClasses: 'button-pink text-center button-content',
        },
      ],
      alert: {
        message: 'Tente selecionar qualquer canal.',
        title: 'O controle voltou a funcionar?',
        gaPageName: 'controle_voltou_pressionando_botao_stb_guia',
        buttons: [{
          text: 'Ainda não',
          action: 'nao',
          gaAction: 'nao'
        },
        {
          text: 'Sim',
          action: 'sim',
          gaAction: 'sim'
        }]
      }
    },
    state: {
      on: [
        {
          name: 'feito', action: {
            call: 'openPopup',
          },
        },
        {
          name: 'sim', action: {
            call: 'nav',
            params: {
              id: 99,
            },
          },
        },
        {
          name: 'nao', action: {
            call: 'nav',
            params: {
              id: 2
            }
          },
        },
      ],
    },
  },
  {
    id: 2,
    gaPageName: 'verificar_pilhas',
    layout: {
      image: getIcone('pilhas.svg'),
      customClasses: 'title-pink spaced',
      title: 'Verifique se as pilhas estão funcionando.',
      paragraph: 'Troque as pilhas por novas e verifique se elas estão carregadas.',
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'proximo_passo',
          customClasses: 'button-pink text-center button-content',
        },
      ],
      alert: {
        message: 'Tente selecionar qualquer canal.',
        title: 'O controle voltou a funcionar?',
        gaPageName: 'controle_voltou_verificando_pilhas',
        buttons: [{
          text: 'Ainda não',
          action: 'nao',
          gaAction: 'nao'
        },
        {
          text: 'Sim',
          action: 'sim',
          gaAction: 'sim'
        }]
      }
    },
    state: {
      on: [
        {
          name: 'feito', action: {
            call: 'openPopup',
          },
        },
        {
          name: 'sim', action: {
            call: 'nav',
            params: {
              id: 99,
            },
          },
        },
        {
          name: 'nao', action: {
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
    gaPageName: 'nao_sucesso',
    layout: {
      title: 'Entre em contato<br/>com o nosso<br/>atendimento.',
      paragraph: 'Um dos nossos especialistas irá ajudá-lo. A ligação é gratuita.',
      buttons: [
        {
          text: 'Ligar',
          gaAction: 'ligar',
          action: 'ligar',
        },
        {
          text: 'Voltar pro início',
          gaAction: 'voltar_inicio',
          action: 'voltar_inicio',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'ligar',
          action: {
            call: 'goToCallCenter', params: {},
          },
        },
        {
          name: 'voltar_inicio',
          action: {
            call: 'goToHome', params: {},
          },
        },
      ],
    },
  },
];
