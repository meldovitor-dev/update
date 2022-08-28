export enum OfflineWarningEnum {
  OFFLINE_DIAGNOSTIC = 'off-diag',
  OFFLINE_FEATURE = 'off-feature',
  INDISPONIVEL_DIAGNOSTIC = 'ind-diag',
  INDISPONIVEL_FEATURE = 'ind-feature',
}

const OFFLINE_WARNING_CATALOG = [
  {
    id: OfflineWarningEnum.OFFLINE_DIAGNOSTIC,
    offline: true,
    title: 'Você está iniciando um atendimento offline.',
    paragraph:
      'Este é um passo a passo manual.<br/><br/>' +
      'Conecte-se à internet pra podermos verificar sua rede e realizar operações ' +
      'automáticas que podem resolver seu problema mais rapidamente.',
    buttons: [
      {
        txt: 'CONECTAR',
        action: {
          call: 'openWifi',
        },
      },
      {
        txt: 'Continuar offline',
        isLink: true,
        action: {
          call: 'goToTroubleshooting',
        },
      },
    ],
  },
  {
    id: OfflineWarningEnum.OFFLINE_FEATURE,
    offline: true,
    title: 'Você precisa estar online para realizar esta operação',
    paragraph:
      'Conecte-se à internet pra ter acesso a todos os serviços do Técnico Virtual.',
    buttons: [
      {
        txt: 'CONECTAR',
        action: {
          call: 'openWifi',
        },
      },
    ],
  },
  {
    id: OfflineWarningEnum.INDISPONIVEL_DIAGNOSTIC,
    gaPageName: 'aviso_manutencao_app',
    fluxo: 'manutencao_gmud',
    title: 'Estamos em manutenção!',
    paragraph:
      'No momento, o nosso serviço está passando por uma manutenção importante.<br/><br/>' +
      'Enquanto isso você pode continuar em um passo a passo manual.',
    buttons: [
      {
        txt: 'Continuar',
        gaAction: 'seguir_manualmente',
        action: {
          call: 'goToTroubleshooting',
        },
      },
      {
        customClasses: 'outline',
        txt: 'Voltar pro início',
        gaAction: 'voltar_inicio',
        action: {
          call: 'goToHome',
        },
      },
    ],
  },
  {
    id: OfflineWarningEnum.INDISPONIVEL_FEATURE,
    gaPageName: 'aviso_manutencao_app',
    fluxo: 'manutencao_gmud',
    title: 'Estamos em manutenção!',
    paragraph:
      'No momento, o nosso serviço está passando por uma manutenção importante.<br/><br/>' +
      'Aguarde e tente novamente mais tarde.',
    buttons: [
      {
        customClasses: 'outline',
        gaAction: 'voltar_inicio',
        txt: 'Voltar pro início',
        action: {
          call: 'goToHome',
        },
      },
    ],
  },
];
export const GET_OFFLINE_WARNING_PAGE = (id) => OFFLINE_WARNING_CATALOG.find(el => el.id === id);
