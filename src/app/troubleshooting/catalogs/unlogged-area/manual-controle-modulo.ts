import { CatalogModel, PageConfigModel } from './../../troubleshooting-interface';
const getIcone = (name: string) => `assets/icon/troubleshooting/unlogged-area/manual-controle-remoto/${name}`;

export const MANUAL_CONTROLE_MODULO = [
    {
        metadata: 'tela 1',
        ga: 'botao_power',
        label: 'Liga e desliga o decodificador',
        section: 'FUNÇÕES BÁSICAS',
        gaLabel: 'submenu_funcoes_basicas_liga_desliga',
        top: {
            img: getIcone('controle1.jpg'),
        },
    },
    {
        metadata: 'tela 2',
        ga: 'botao_delete',
        label: 'Apaga texto e números em campos de texto',
        gaLabel: 'submenu_funcoes_basicas_apaga_texto',
        section: 'FUNÇÕES BÁSICAS',
        top: {
            img: getIcone('controle2.jpg'),
        },
    },
    {
        metadata: 'tela 3',
        ga: 'botao_tv_video',
        label: 'Alterna os modos de entradas disponíveis',
        gaLabel: 'submenu_funcoes_basicas_alterna_modos',
        section: 'FUNÇÕES BÁSICAS',
        top: {
            img: getIcone('controle3.jpg'),
        },
    },
    {
      metadata: 'tela 4',
      label: 'Seleciona ou cancela itens na tela',
      section: 'FUNÇÕES BÁSICAS',
      ga: 'botao_ok',
      gaLabel: 'submenu_funcoes_basicas_seleciona_cancela_telas',
      top: {
          img: getIcone('controle4.jpg'),
      },
  },
    {
        metadata: 'tela 5',
        label: 'Sai das telas do menu principal e volta pra TV ou vídeo',
        section: 'FUNÇÕES BÁSICAS',
        ga: 'botao_exit_to_tv',
        gaLabel: 'submenu_funcoes_basicas_sai_telas_menu',
        top: {
            img: getIcone('controle5.jpg'),
        },
    },
    {
        metadata: 'tela 6',
        label: 'Seleciona canais TV / Insere letras nos campos de texto',
        section: 'FUNÇÕES BÁSICAS',
        ga: 'botao_teclado_alfanumerico',
        gaLabel: 'submenu_funcoes_basicas_seleciona_canais',
        top: {
            img: getIcone('controle6.jpg'),
        },
    },
    {
        metadata: 'tela 7',
        label: 'Volta à tela anterior',
        section: 'NAVEGAÇÃO',
        ga: 'botao_back',
        gaLabel: 'submenu_navegacao_volta_tela',
        top: {
            img: getIcone('controle7.jpg'),
        },
    },
    {
        metadata: 'tela 8',
        label: 'Navega e seleciona o menu principal',
        section: 'NAVEGAÇÃO',
        ga: 'botao_setas_navegacao',
        gaLabel: 'submenu_navegacao_navega_seleciona_menu',
        top: {
            img: getIcone('controle8.jpg'),
        },
    },
    {
        metadata: 'tela 9',
        label: 'Exibe o menu principal ou retorna pro modo TV',
        section: 'NAVEGAÇÃO',
        ga: 'botao_menu_principal',
        gaLabel: 'submenu_navegacao_exibe_menu',
        top: {
            img: getIcone('controle9.jpg'),
        },
    },
    {
        metadata: 'tela 10',
        label: 'Acessa os últimos cinco canais vistos',
        section: 'NAVEGAÇÃO',
        ga: 'botao_last',
        gaLabel: 'submenu_navegacao_acessa_cinco_canais',
        top: {
            img: getIcone('controle10.jpg'),
        },
    },
    {
        metadata: 'tela 11',
        label: 'Aumenta ou diminui o som',
        section: 'VOLUME',
        ga: 'botao_vol',
        gaLabel: 'submenu_volume_aumenta_diminui',
        top: {
            img: getIcone('controle11.jpg'),
        },
    },
    {
        metadata: 'tela 12',
        label: 'Desliga ou liga o som',
        section: 'VOLUME',
        ga: 'botao_mute',
        gaLabel: 'submenu_volume_desliga_liga',
        top: {
            img: getIcone('controle12.jpg'),
        },
    },
    {
        metadata: 'tela 13',
        label: 'Mostra informações, áudio e legenda do programa',
        section: 'PROGRAMAS',
        ga: 'botao_info',
        gaLabel: 'submenu_programas_mostra_informacoes',
        top: {
            img: getIcone('controle13.jpg'),
        },
    },
    {
        metadata: 'tela 14',
        label: 'Avança ou retrocede na seleção de canais',
        section: 'PROGRAMAS',
        ga: 'botao_ch_pg',
        gaLabel: 'submenu_programas_avanca_volta_canais',
        top: {
            img: getIcone('controle14.jpg'),
        },
    },
    {
        metadata: 'tela 15',
        label: 'Reproduz o programa gravado',
        section: 'PROGRAMAS',
        ga: 'botao_play',
        gaLabel: 'submenu_programas_reproduz_programas',
        top: {
            img: getIcone('controle15.jpg'),
        },
    },
    {
        metadata: 'tela 16',
        label: 'Retorna/Avança o DVR ou VOD (Video On Demand)',
        section: 'PROGRAMAS',
        ga: 'botao_replay_skip',
        gaLabel: 'submenu_programas_dvr_vod',
        top: {
            img: getIcone('controle16.jpg'),
        },
    },
    {
        metadata: 'tela 17',
        label: 'Pausa a exibição do programa',
        section: 'PROGRAMAS',
        ga: 'botao_pause',
        gaLabel: 'submenu_programas_pausa_programa',
        top: {
            img: getIcone('controle17.jpg'),
        },
    },
    {
        metadata: 'tela 18',
        label: 'Inicia a gravação do programa',
        section: 'GRAVAR PROGRAMAS',
        ga: 'botao_record',
        gaLabel: 'submenu_gravar_programas_inicia',
        top: {
            img: getIcone('controle18.jpg'),
        },
    },
    {
        metadata: 'tela 19',
        label: 'Retrocede ou avança o vídeo',
        section: 'GRAVAR PROGRAMAS',
        ga: 'botao_rew_ff',
        gaLabel: 'submenu_gravar_programas_volta_avanca',
        top: {
            img: getIcone('controle19.jpg'),
        },
    },
    {
        metadata: 'tela 20',
        label: 'Para a gravação ou exibição do programa',
        section: 'GRAVAR PROGRAMAS',
        ga: 'botao_stop',
        gaLabel: 'submenu_gravar_programas_gravacao_exibicao',
        top: {
            img: getIcone('controle20.jpg'),
        },
    },
    {
        metadata: 'tela 21',
        label: 'Acessa suas gravações',
        section: 'GRAVAR PROGRAMAS',
        ga: 'botao_recorded_tv',
        gaLabel: 'submenu_gravar_programas_acessa_gravacoes',
        top: {
            img: getIcone('controle21.jpg'),
        },
    },
    {
        metadata: 'tela 22',
        label: 'Acessa a Locadora Oi',
        section: 'SERVIÇOS OI',
        ga: 'botao_video_on_demand',
        gaLabel: 'submenu_servicos_oi_locadora',
        top: {
            img: getIcone('controle22.jpg'),
        },
    },
    {
        metadata: 'tela 23',
        label: 'Acessa seu Oi interativo',
        section: 'SERVIÇOS OI',
        ga: 'botao_go_interactive',
        gaLabel: 'submenu_servicos_oi_interativo',
        top: {
            img: getIcone('controle23.jpg'),
        },
    },
    {
        metadata: 'tela 24',
        label: 'Acessa guia de programação',
        section: 'GUIAS',
        ga: 'botao_guide',
        gaLabel: 'submenu_guias_acessa_guia',
        top: {
            img: getIcone('controle24.jpg'),
        },
    }
];

const pageConfig: PageConfigModel = {
    feedback: {
      gaPageName: 'avaliacao_dicas',
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

export const MANUAL_CONTROLE: CatalogModel[] = [
    {
        id: 0,
        gaPageName: '',
        fluxo: 'conhecendo_controle_remoto',
        pageConfig,
        layout: {
            slides: MANUAL_CONTROLE_MODULO,
        },
        state: {
            on: []
        }
    }
]
