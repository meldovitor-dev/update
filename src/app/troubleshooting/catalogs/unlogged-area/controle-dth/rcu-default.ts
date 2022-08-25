
const getIcone = (name: string) => `assets/images/troubleshooting/unlogged-area/controle-dth/default/${name}`;

export const MANUAL_RCU_DEFAULT_MODULO = [
  {
      metadata: 'tela 1',
      ga: 'controle_b_botao_power_tv',
      label: 'POWER TV - Liga e desliga a TV',
      section: 'FUNÇÕES BÁSICAS',
      gaLabel: 'controle_b_power_tv',
      top: {
          img: getIcone('01_controle02_basicas_powerTV.png'),
      },
  },
  {
    metadata: 'tela 2',
    ga: 'controle_b_botao_power_oi',
    label: 'POWER OI - Liga e desliga o decodificador Oi TV',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_b_power_oi',
    top: {
        img: getIcone('02_controle02_basicas_powerOi.png'),
    },
  },
  {
    metadata: 'tela 3',
    ga: 'controle_b_botao_teclas_numericas',
    label: 'NÚMEROS - Seleciona o canal desejado',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_b_numeros',
    top: {
        img: getIcone('03_controle02_basicas_numericas.png'),
    },
  },
  {
    metadata: 'tela 4',
    ga: 'controle_b_botao_volume',
    label: 'VOLUME - Aumenta e diminui o volume',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_b_volume',
    top: {
        img: getIcone('04_controle02_basicas_volume.png'),
    },
  },
  {
    metadata: 'tela 5',
    ga: 'controle_b_botao_canais',
    label: 'CH - Avança e retrocede os canais',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_b_ch',
    top: {
        img: getIcone('05_controle02_basicas_canais.png'),
    },
  },
  {
    metadata: 'tela 6',
    ga: 'controle_b_botao_mudo',
    label: 'MUDO - Retira o Áudio da TV',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_b_mudo',
    top: {
        img: getIcone('06_controle02_basicas_mudo.png'),
    },
  },
  {
    metadata: 'tela 7',
    ga: 'controle_b_botao_menu',
    label: 'MENU - Acessa o Menu Oi TV',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_b_menu',
    top: {
        img: getIcone('07_controle02_basicas_menu.png'),
    },
  },
  {
    metadata: 'tela 8',
    ga: 'controle_b_botao_ok',
    label: 'OK - Confirma as seleções',
    section: 'NAVEGAÇÃO',
    gaLabel: 'controle_b_ok',
    top: {
        img: getIcone('09_controle02_navegacao_ok.png'),
    },
  },
  {
    metadata: 'tela 9',
    ga: 'controle_b_botao_teclas_navegacao',
    label: 'SETAS - Navegam entre os itens',
    section: 'NAVEGAÇÃO',
    gaLabel: 'controle_b_setas',
    top: {
        img: getIcone('08_controle02_navegacao_teclas.png'),
    },
  },
  {
    metadata: 'tela 10',
    ga: 'controle_b_botao_voltar',
    label: 'VOLTAR - retorna para o último canal',
    section: 'NAVEGAÇÃO',
    gaLabel: 'controle_b_voltar',
    top: {
        img: getIcone('10_controle02_navegacao_voltar.png'),
    },
  },
  {
    metadata: 'tela 11',
    ga: 'controle_b_botao_sair',
    label: 'SAIR - Sair da tela atual',
    section: 'NAVEGAÇÃO',
    gaLabel: 'controle_b_sair',
    top: {
        img: getIcone('11_controle02_navegacao_sair.png'),
    },
  },
  {
    metadata: 'tela 12',
    ga: 'controle_b_botao_info',
    label: 'INFO - Exibe informações do programa',
    section: 'PROGRAMAS',
    gaLabel: 'controle_b_info',
    top: {
        img: getIcone('12_controle02_programas_info.png'),
    },
  },
  {
    metadata: 'tela 13',
    ga: 'controle_b_botao_legenda',
    label: 'LEGENDA - Seleciona o idioma da legenda',
    section: 'PROGRAMAS',
    gaLabel: 'controle_b_legenda',
    top: {
        img: getIcone('13_controle02_programas_legenda.png'),
    },
  },
  {
    metadata: 'tela 14',
    ga: 'controle_b_botao_audio',
    label: 'ÁUDIO - Seleciona o idioma do áudio',
    section: 'PROGRAMAS',
    gaLabel: 'controle_b_audio',
    top: {
        img: getIcone('14_controle02_programas_audio.png'),
    },
  },
  {
    metadata: 'tela 15',
    ga: 'controle_b_botao_rew',
    label: 'REW - Retrocede o conteúdo',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_rew',
    top: {
        img: getIcone('15_controle02_gravacoes_rew.png'),
    },
  },
  {
    metadata: 'tela 16',
    ga: 'controle_b_botao_stop',
    label: 'STOP - Finaliza a exibição',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_stop',
    top: {
        img: getIcone('16_controle02_gravacoes_stop.png'),
    },
  },
  {
    metadata: 'tela 17',
    ga: 'controle_b_botao_play',
    label: 'PLAY - Reproduz conteúdo gravado',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_play',
    top: {
        img: getIcone('17_controle02_gravacoes_play.png'),
    },
  },
  {
    metadata: 'tela 18',
    ga: 'controle_b_botao_foward',
    label: 'FORWARD - Avança o conteúdo',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_foward',
    top: {
        img: getIcone('18_controle02_gravacoes_forward.png'),
    },
  },
  {
    metadata: 'tela 19',
    ga: 'controle_b_botao_back',
    label: 'BACK - Retrocede o conteúdo em capítulos',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_back',
    top: {
        img: getIcone('19_controle02_gravacoes_back.png'),
    },
  },
  {
    metadata: 'tela 20',
    ga: 'controle_b_botao_rec',
    label: 'REC - Inicia / interrompe gravação',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_rec',
    top: {
        img: getIcone('20_controle02_gravacoes_rec.png'),
    },
  },
  {
    metadata: 'tela 21',
    ga: 'controle_b_botao_pause',
    label: 'PAUSE - Pausa programas gravados',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_pause',
    top: {
        img: getIcone('21_controle02_gravacoes_pause.png'),
    },
  },
  {
    metadata: 'tela 22',
    ga: 'controle_b_botao_jump',
    label: 'JUMP - Avança o conteúdo em capítulos',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_jump',
    top: {
        img: getIcone('22_controle02_gravacoes_jump.png'),
    },
  },
  {
    metadata: 'tela 23',
    ga: 'controle_b_botao_dvr',
    label: 'DVR - Acessa biblioteca de gravações',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_b_dvr',
    top: {
        img: getIcone('23_controle02_gravacoes_dvr.png'),
    },
  },
  {
    metadata: 'tela 24',
    ga: 'controle_b_botao_portal',
    label: 'PORTAL - Acessa serviçios Oi TV',
    section: 'SERVIÇOS',
    gaLabel: 'controle_b_portal',
    top: {
        img: getIcone('24_controle02_servicos_portal.png'),
    },
  },
  {
    metadata: 'tela 25',
    ga: 'controle_b_botao_vod',
    label: 'VOD - Acessa a locadora Oi',
    section: 'SERVIÇOS',
    gaLabel: 'controle_b_vod',
    top: {
        img: getIcone('25_controle02_servicos_vod.png'),
    },
  },
  {
    metadata: 'tela 26',
    ga: 'controle_b_botao_app',
    label: 'APP - Acessa biblioteca de aplicativos',
    section: 'SERVIÇOS',
    gaLabel: 'controle_b_app',
    top: {
        img: getIcone('26_controle02_servicos_app.png'),
    },
  },
  {
    metadata: 'tela 27',
    ga: 'controle_b_botao_coloridas',
    label: 'COLORIDAS - Teclas de atalho',
    section: 'SERVIÇOS',
    gaLabel: 'controle_b_coloridas',
    top: {
        img: getIcone('27_controle02_servicos_coloridas.png'),
    },
  },
  {
    metadata: 'tela 28',
    ga: 'controle_b_botao_guia',
    label: 'GUIA - Exibe o Guia de Programação ',
    section: 'GUIAS',
    gaLabel: 'controle_b_guia',
    top: {
        img: getIcone('28_controle02_guias_guia.png'),
    },
  },
];
