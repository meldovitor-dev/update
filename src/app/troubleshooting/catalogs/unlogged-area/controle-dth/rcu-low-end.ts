
const getIcone = (name: string) => `assets/images/troubleshooting/unlogged-area/controle-dth/low-end/${name}`;

export const MANUAL_RCU_LOWEND_MODULO = [
  {
      metadata: 'tela 1',
      ga: 'controle_a_botao_power',
      label: 'POWER - Liga e desliga o decodificador Oi TV',
      section: 'FUNÇÕES BÁSICAS',
      gaLabel: 'controle_a_power',
      top: {
          img: getIcone('01_controle01_basicas_power.png'),
      },
  },
  {
    metadata: 'tela 2',
    ga: 'controle_a_botao_volume',
    label: 'VOLUME - Aumenta e diminui o volume',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_a_volume',
    top: {
        img: getIcone('02_controle01_basicas_volume.png'),
    }
  },
  {
    metadata: 'tela 3',
    ga: 'controle_a_botao_canais',
    label: 'CH - Avança e retrocede os canais',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_a_ch',
    top: {
        img: getIcone('03_controle01_basicas_canais.png'),
    }
  },
  {
    metadata: 'tela 4',
    ga: 'controle_a_botao_teclado_numerico',
    label: 'NÚMEROS - Seleciona o canal desejado',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_a_numeros',
    top: {
        img: getIcone('04_controle01_basicas_numerico.png'),
    }
  },
  {
    metadata: 'tela 5',
    ga: 'controle_a_botao_menu',
    label: 'MENU - Acessa o Menu Oi TV',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_a_menu',
    top: {
        img: getIcone('05_controle01_basicas_menu.png'),
    }
  },
  {
    metadata: 'tela 6',
    ga: 'controle_a_botao_mudo',
    label: 'MUDO - Retira o Áudio da TV',
    section: 'FUNÇÕES BÁSICAS',
    gaLabel: 'controle_a_mudo',
    top: {
        img: getIcone('06_controle01_basicas_mudo.png'),
    }
  },
  {
    metadata: 'tela 7',
    ga: 'controle_a_botao_ok',
    label: 'OK - Confirma as seleções',
    section: 'NAVEGAÇÃO',
    gaLabel: 'controle_a_ok',
    top: {
        img: getIcone('07_controle01_navegacao_OK.png'),
    }
  },
  {
    metadata: 'tela 8',
    ga: 'controle_a_botao_teclas_navegacao',
    label: 'SETAS - Navegam entre os itens',
    section: 'NAVEGAÇÃO',
    gaLabel: 'controle_a_setas',
    top: {
        img: getIcone('08_controle01_navegacao_teclas.png'),
    }
  },
  {
    metadata: 'tela 9',
    ga: 'controle_a_botao_voltar',
    label: 'VOLTAR - retorna para o último canal',
    section: 'NAVEGAÇÃO',
    gaLabel: 'controle_a_voltar',
    top: {
        img: getIcone('09_controle01_navegacao_voltar.png'),
    }
  },
  {
    metadata: 'tela 10',
    ga: 'controle_a_botao_sair',
    label: 'SAIR - Sair da tela atual',
    section: 'NAVEGAÇÃO',
    gaLabel: 'controle_a_sair',
    top: {
        img: getIcone('10_controle01_navegacao_sair.png'),
    }
  },
  {
    metadata: 'tela 11',
    ga: 'controle_a_botao_info',
    label: 'INFO - Exibe informações do programa',
    section: 'PROGRAMAS',
    gaLabel: 'controle_a_info',
    top: {
        img: getIcone('11_controle01_programas_info.png'),
    }
  },
  {
    metadata: 'tela 12',
    ga: 'controle_a_botao_opcoes_legenda',
    label: 'LEGENDA - Seleciona o idioma da legenda',
    section: 'PROGRAMAS',
    gaLabel: 'controle_a_legenda',
    top: {
        img: getIcone('12_controle01_programas_legenda.png'),
    }
  },
  {
    metadata: 'tela 13',
    ga: 'controle_a_botao_opcoes_audio',
    label: 'ÁUDIO - Seleciona o idioma do áudio',
    section: 'PROGRAMAS',
    gaLabel: 'controle_a_audio',
    top: {
        img: getIcone('13_controle01_programas_audio.png'),
    }
  },
  {
    metadata: 'tela 14',
    ga: 'controle_a_botao_rec',
    label: 'REC - Inicia / interrompe gravação',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_a_rec',
    top: {
        img: getIcone('14_controle01_gravacoes_rec.png'),
    }
  },
  {
    metadata: 'tela 15',
    ga: 'controle_a_botao_rew',
    label: 'REW - Retrocede o conteúdo',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_a_rew',
    top: {
        img: getIcone('15_controle01_gravacoes_rew.png'),
    }
  },
  {
    metadata: 'tela 16',
    ga: 'controle_a_botao_play',
    label: 'PLAY - Reproduz conteúdo gravado',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_a_play',
    top: {
        img: getIcone('16_controle01_gravacoes_play.png'),
    }
  },
  {
    metadata: 'tela 17',
    ga: 'controle_a_botao_fwd',
    label: 'FORWARD - Avança o conteúdo',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_a_foward',
    top: {
        img: getIcone('17_controle01_gravacoes_fwd.png'),
    }
  },
  {
    metadata: 'tela 18',
    ga: 'controle_a_botao_pause',
    label: 'PAUSE - Pausa programas gravados',
    section: 'GRAVAÇÕES',
    gaLabel: 'controle_a_pause',
    top: {
        img: getIcone('18_controle01_gravacoes_pause.png'),
    }
  },
  {
    metadata: 'tela 19',
    ga: 'controle_a_botao_portal',
    label: 'PORTAL - Acessa serviçios Oi TV',
    section: 'SERVIÇOS',
    gaLabel: 'controle_a_portal',
    top: {
        img: getIcone('19_controle01_servicos_portal.png'),
    }
  },
  {
    metadata: 'tela 20',
    ga: 'controle_a_botao_coloridas',
    label: 'COLORIDAS - Teclas de atalho',
    section: 'SERVIÇOS',
    gaLabel: 'controle_a_coloridas',
    top: {
        img: getIcone('20_controle01_servicos_coloridas.png'),
    }
  },
  {
    metadata: 'tela 21',
    ga: 'controle_a_botao_guia',
    label: 'GUIA - Exibe o Guia de Programação ',
    section: 'GUIAS',
    gaLabel: 'controle_a_guia',
    top: {
        img: getIcone('21_controle01_guias_guia.png'),
    }
  },
];
