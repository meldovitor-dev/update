/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { DiagnosticBlockModel } from 'src/app/models/diagnostic-block-model';

const tipoBloqueios = {
  FINANCEIRO: 'FINANCEIRO',
  FALHA_MASSIVA: 'FALHA_MASSIVA',
  REPARO: 'REPARO',
  LINHA: 'LINHA'
};

const gaActionHome = 'voltar_inicio';

const joiceButton = {
  acao: {
    nome: 'goToJoice'
  },
  icon: 'logo-whatsapp',
  texto: 'Falar via Whatsapp',
  gaAction: 'acessar_joice'
};

const FIXO = {
  RECEBE: 'recebeChamadas',
  NAO_RECEBE: 'naoRecebeChamadas'
};
const MODAL_ID = {
  VULTO: {
    FALHA_REGIAO: 'falha_regiao_identificada',
    FALHA_REGIAO_REPETIDO: 'falha_regiao_repetida',
    FALHA_REGIAO_REAPRAZADA: 'falha_regiao_reaprazada',
    FALHA_REGIAO_FURTO: 'falha_regiao_furto'
  },
  FINANCEIRO: {
    BLOQUEIO_TOTAL: 'bloqueio_total_identificado',
    BLOQUEIO_PARCIAL: 'bloqueio_parcial_bandalarga',
    BLOQUEIO_PACIAL_FIXO_PERGUNTA_PF: 'diagnostic_fixo_bloqueio_parcial_pergunta_pf',
    BLOQUEIO_PACIAL_FIXO_PERGUNTA_PJ: 'diagnostic_fixo_bloqueio_parcial_pergunta_pj',
    BLOQUEIO_OUTROS: 'diagnostic_encontrei_bloqueio_outros',
    REPARO_PJ: 'aberto_empresarial',
    REPARO_NAO_AGENDADO: 'aberto_visita_nao_agendada',
    REPARO_AGENDADO: 'aberto_visita_agendada',
    REPARO_AGENDADAMENTO_INDISPONIVEL: 'a_agendar_agendamento_indisponivel',
    REPARO_AGENDADAMENTO_DISPONIVEL: 'a_agendar_agendamento_disponivel'
  },
  TERMINAL: {
    OK_NAO_FUCIONA: 'diagnostic_tudo_ok_internet_n_funciona',
    OK_LENTA: 'diagnostic_tudo_ok_internet_lenta',
    OK_INTERMITENTE: 'diagnostic_tudo_ok_internet_intermitente',
    LINHA_IDENTIFICADA: 'configuracoes_linha_identificada',
    FALHA_DESBLOQUEIO: 'diagnostic_falha_desbloqueio_porta'
  },
  FIXO: {
    FIXO_OK: 'diagnostic_tudo_ok_fixo'
  }
};
const END_POINTS = {
  VULTO: 'consultaEventosVulto',
  FINANCEIRO: 'consultaStatusFinanceiro',
  TERMINAL: 'consultaStatusTerminal',
  RESET_PORTA: 'resetPorta'
};
const DEPENDENCIES = {
  FINANCEIRO: 'financeiro',
  VULTO: 'vulto',
  TERMINAL: 'terminal',
  FIXO_QUESTION: 'fixoQuestion'
};
export const DIAGNOSTIC_BLOCK_BANDA_LARGA = {
  END_POINTS,
  MODAL_ID,
  DEPENDENCIES,
  FIXO
};
const FalhaTypes = {
  furto: 'roubo_furto'
};
export const GET_TYPE_FALHA = data => {
  const type = data.tipoFalha;
  if (type === FalhaTypes.furto) {
    return DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.VULTO.FALHA_REGIAO_FURTO;
  }
  if (data.consulted) {
    return data.rescheduled ? DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.VULTO.FALHA_REGIAO_REAPRAZADA :
      DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.VULTO.FALHA_REGIAO_REPETIDO;
  }
  return DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.VULTO.FALHA_REGIAO;
};

/**
 * Modals Constants
 */
// tslint:disable-next-line: variable-name
const diagnostic_encontrei_bloqueio_outros = {
  condicao: {
    tipo: tipoBloqueios.FINANCEIRO
  },
  gaPageName: 'diagnostico_encontrei_bloqueio_outros',
  titulo: 'Encontramos um bloqueio na sua conta.',
  descricao:
    'Você vai precisar ligar pra Oi pra resolver este problema. A ligação é gratuita.',
  botoes: [
    {
      acao: {
        nome: 'goToCallCenter'
      },
      gaAction: 'ligar',
      texto: 'Ligar pro atendimento '
    },
    {
      acao: {
        nome: 'goToHome'
      },
      gaAction: gaActionHome,
      texto: 'Voltar pro início'
    }
  ]
};
const bloqueio_parcial_fixo_pj = {
  gaPageName: 'bloqueio_parcial_recebe_chamadas',
  titulo: 'Seu serviço está bloqueado por causa de uma pendência financeira.',
  descricao:
    'Pra voltar a utilizar os nossos serviços, é necessário que você faça o pagamento do débito em aberto.<br><br>' +
    'Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
    'Acesse a sua conta no Oi Mais Empresas. ',
  botoes: [
    {
      acao: {
        nome: 'goToOiMaisEmpresas'
      },
      gaAction: 'acessar_oi_mais_empresas',
      texto: 'Ir pro Oi Mais Empresas '
    },
    {
      acao: {
        nome: 'goToHome'
      },
      texto: 'Voltar pro início',
      gaAction: gaActionHome
    }
  ]
};
const bloqueioDefaultModal = (gaPageName: string): DiagnosticBlockModel => {
  const modal = {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'bloqueio_total_pf_encontrado',
    titulo: 'A internet foi bloqueada porque você tem uma ou mais contas vencidas.',
    skipExtraInfoTxt: true,
    descricao:
      'Use os nossos canais digitais pra acessar a segunda via da conta ou código de barras. Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
      'ATENÇÃO: Por aqui você tem a mesma informação que receberia por telefone, e ainda pode acompanhar as atualizações.',
    botoes: [
      {
        gaAction: 'btn_pagar_conta',
        acao: {
          nome: 'goToPagarConta'
        },
        texto: 'Pagar conta'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        gaAction: gaActionHome,
        texto: 'Voltar pro início'
      }
    ]
  };
  return Object.assign({}, modal, { gaPageName });
};
// tslint:disable-next-line: variable-name
const bloqueio_total_identificado: DiagnosticBlockModel = bloqueioDefaultModal(
  'bloqueio_total_identificado'
);

/**
 * FIXO PERGUNTA
 */
// tslint:disable-next-line: variable-name
const bloqueio_parcial_recebe_chamadas: DiagnosticBlockModel = bloqueioDefaultModal(
  'bloqueio_parcial_recebe_chamadas'
);
// tslint:disable-next-line: variable-name
const bloqueio_parcial_nao_recebe_chamadas: DiagnosticBlockModel = diagnostic_encontrei_bloqueio_outros;

const BANDA_LARGA_FIXO_BLOCK_PAGES: { [key: string]: DiagnosticBlockModel } = {
  bloqueio_parcial_bandalarga_pf: {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'bloqueio_parcial_pf_encontrado',
    titulo: 'A velocidade da internet foi reduzida porque  você tem uma ou mais contas vencidas.',
    skipExtraInfoTxt: true,
    descricao:
      'Use os nossos canais digitais pra acessar a segunda via da conta ou código de barras. Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
      'ATENÇÃO: Por aqui você tem a mesma informação que receberia por telefone, e ainda pode acompanhar as atualizações.',
    botoes: [
      {
        acao: {
          nome: 'goToPagarConta'
        },
        gaAction: 'btn_pagar_conta',
        texto: 'Pagar conta'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        gaAction: gaActionHome,
        texto: 'Voltar pro início'
      }
    ]
  },
  bloqueio_parcial_bandalarga_pj: {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'bloqueio_parcial_pj_encontrado',
    titulo: 'A velocidade foi reduzida porque uma conta está vencida.',
    descricao: `Acesse a sua conta no Oi Mais Empresas. Após o pagamento, tudo voltará ao normal em até 2 dias úteis.`,
    botoes: [
      {
        acao: {
          nome: 'goToOiMaisEmpresas'
        },
        gaAction: 'acessar_oi_mais_empresas',
        texto: 'Ir pro Oi Mais Empresas '
      },
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início',
        gaAction: gaActionHome
      }
    ]
  },
  bloqueio_total_identificado_pf: bloqueioDefaultModal(
    'bloqueio_total_pf_encontrado'
  ),
  bloqueio_parcial_recebe_chamadas: bloqueio_total_identificado,
  bloqueio_total_identificado_pj: {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'bloqueio_total_pj_encontrado',
    titulo: 'Seu serviço está bloqueado por causa de uma pendência financeira.',
    descricao: 'Pra voltar a utilizar os nossos serviços, é necessário que você faça o pagamento do débito em aberto.<br><br>' +
    'Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
    'Acesse a sua conta no Oi Mais Empresas. ',
    botoes: [
      {
        acao: {
          nome: 'goToOiMaisEmpresas'
        },
        gaAction: 'acessar_oi_mais_empresas',
        texto: 'Ir pro Oi Mais Empresas '
      },
      {
        acao: {
          nome: 'goToHome'
        },
        gaAction: gaActionHome,
        texto: 'Voltar pro início'
      }
    ]
  },
  diagnostic_encontrei_bloqueio_outros,
  bloqueio_parcial_nao_recebe_chamadas: diagnostic_encontrei_bloqueio_outros,
  falha_regiao_identificada: {
    gaPageName: 'falha_regiao_encontrada',
    condicao: {
      tipo: tipoBloqueios.FALHA_MASSIVA,
      isFalhaLentidao: true,
      forecastDate: { exists: true },
      consulted: false,
      rescheduled: false
    },
    skipExtraInfoTxt: false,
    forecastTxt:
      'Previsão de normalização:<br/><strong>Até às ::hora:: do dia ::dia::.</strong>',
    titulo: 'Encontramos uma falha na região.',
    descricao:
      'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
      '#forecast#' ,
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início',
        gaAction: gaActionHome
      }
    ]
  },
  falha_regiao_repetida: {
    gaPageName: 'falha_regiao_consulta_repetida',
    condicao: {
      tipo: tipoBloqueios.FALHA_MASSIVA,
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: false
    },
    skipExtraInfoTxt: false,
    forecastTxt:
      'Previsão de normalização:<br/><strong> até às ::hora:: do dia ::dia::.</strong>',
    titulo: 'Encontramos uma falha na região.',
    descricao:
      'Identificamos que você já consultou a falha na região. Ela permanece com o mesmo prazo de normalização.<br><br>' +
      '#forecast#' ,
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início',
        gaAction: gaActionHome
      }
    ]
  },
  falha_regiao_reaprazada: {
    gaPageName: 'falha_regiao_reaprazada',
    condicao: {
      tipo: tipoBloqueios.FALHA_MASSIVA,
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: true
    },
    skipExtraInfoTxt: false,
    forecastTxt:
      '<b>Nova previsão</b> de normalização:<br/><strong> até às ::hora:: do dia ::dia::.</strong>',
    titulo: 'Ainda estamos com uma falha na região.',
    descricao:
      'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br/><br/>' +
      '#forecast#' ,
      botoes: [
        {
          acao: {
            nome: 'goToHome'
          },
          texto: 'Voltar pro início',
          gaAction: gaActionHome
        }
      ]
  },
  falha_regiao_furto: {
    gaPageName: 'falha_regiao_roubo_cabos_encontrada',
    condicao: {
      tipo: tipoBloqueios.FALHA_MASSIVA
    },
    skipExtraInfoTxt: true,
    forecastTxt:
      'A Previsão dos técnicos nesse momento é para às <strong>::hora:: do dia ::dia::.</strong>',
    titulo: 'Encontramos uma falha na região.',
    descricao:
      'Prezado Cliente, a Oi está realizando uma manutenção nos elementos de rede em sua região, ' +
      'visto que a rede que dá suporte ao serviço prestado foi (furtada/Vandalizada).<br/><br/>' +
      'A recomposição da rede ocorrerá no menor prazo possível.<br/><br/>' +
      '#forecast#',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_aberto_visita_nao_agendada: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_pf_andamento_encontrado',
    titulo: 'Você possui um reparo em andamento.',
    descricao:
      'A nossa equipe já está trabalhando no seu atendimento. Aguarde a visita técnica em até 24h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_a_agendar_agendamento_indisponivel: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_pj_andamento_encontrado',
    titulo: 'Você possui um reparo em andamento.',
    descricao:
      'A nossa equipe já está trabalhando no seu atendimento. Aguarde a visita técnica em até 24h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_a_agendar_agendamento_disponivel: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_a_agendar_encontrado',
    titulo: 'Você possui um reparo pra agendar.',
    descricao:
      'Escolha a melhor data e período pra realizarmos uma visita técnica.',
    botoes: [
      {
        acao: {
          nome: 'goToAgendamento',
          params: 'goToAgendamentoDisponiveis'
        },
        texto: 'Agendar',
        gaAction: 'agendar'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_aberto_empresarial: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_pj_andamento_encontrado',
    titulo: 'Você possui um reparo em andamento.',
    descricao:
      'A nossa equipe já está trabalhando no seu atendimento. Aguarde a visita técnica em até 48h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_aberto_visita_agendada: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_agendado_encontrado',
    titulo: 'Você possui um reparo agendado.',
    descricao:
      'Uma visita técnica já está agendada pra concluirmos o seu atendimento.',
    botoes: [
      {
        acao: {
          nome: 'goToAgendamento'
        },
        texto: 'Ver visitas técnicas ',
        gaAction: 'consultar_visitas_tecnicas'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  os_aberta_visita_nao_agendada: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_pf_andamento_encontrada',
    titulo: 'Você possui um serviço em andamento.',
    descricao:
      'A nossa equipe já está trabalhando no seu atendimento. Aguarde a visita técnica em até 24h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  os_aberta_visita_agendada: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_agendada_encontrada',
    titulo: 'Você possui um serviço agendado.',
    descricao:
      'Uma visita técnica já está agendada pra concluirmos o seu atendimento.',
    botoes: [
      {
        acao: {
          nome: 'goToAgendamento'
        },
        texto: 'Ver visitas técnicas ',
        gaAction: 'consultar_visitas_tecnicas'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  os_a_agendar_agendamento_disponivel: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_a_agendar_encontrada',
    titulo: 'Você possui um serviço pra agendar.',
    descricao:
      'Escolha a melhor data e período pra realizarmos uma visita técnica.',
    botoes: [
      {
        acao: {
          params: 'goToAgendamentoDisponiveis',
          nome: 'goToAgendamento'
        },
        texto: 'Agendar',
        gaAction: 'agendar'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início',
        gaAction: gaActionHome
      }
    ]
  },
  os_a_agendar_agendamento_indisponivel: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_a_agendar_agendamento_indisponivel',
    titulo: 'Você possui um serviço em andamento.',
    descricao:
      'A nossa equipe já está trabalhando no seu atendimento. Aguarde a visita técnica em até 48h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início',
        gaAction: gaActionHome
      }
    ]
  },
  os_aberta_empresarial: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_pj_andamento_encontrada',
    titulo: 'Você possui um serviço em andamento.',
    descricao:
      'A nossa equipe já está trabalhando no seu atendimento. Aguarde a visita técnica em até 48h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  configuracoes_linha_identificada: {
    condicao: {
      tipo: tipoBloqueios.LINHA
    },
    gaPageName: 'desbloqueio_porta_executado',
    titulo: 'Identifiquei um problema, mas já está resolvido.',
    descricao:
      'Em breve tudo voltará ao normal. Aguarde 2 minutos e veja se o serviço está funcionando novamente.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  diagnostic_falha_desbloqueio_porta: {
    condicao: {
      tipo: tipoBloqueios.LINHA
    },
    gaPageName: 'nao_sucesso',
    titulo: 'Não conseguimos resolver seu problema por aqui',
    descricao:
      'Você vai precisar ligar pra Oi pra resolver este problema. A ligação é gratuita.',
    botoes: [
      {
        acao: {
          nome: 'goToCallCenter'
        },
        texto: 'Ligar pro atendimento ',
        gaAction: 'ligar'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro início ',
        gaAction: gaActionHome
      }
    ]
  },
  diagnostic_fixo_bloqueio_parcial_pergunta_pf: {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'verificar_recebe_chamadas',
    titulo: 'Você consegue receber chamadas no seu Fixo da Oi?',
    skipExtraInfoTxt: true,
    botoes: [
      {
        acao: {
          nome: 'nav',
          params: {
            page: bloqueioDefaultModal('bloqueio_parcial_fixo_pf')
          }
        },
        texto: 'Recebo',
        gaAction: 'recebe'
      },
      {
        acao: {
          nome: 'nav',
          params: {
            page: bloqueio_parcial_nao_recebe_chamadas
          }
        },
        texto: 'Não recebo',
        gaAction: 'nao_recebe'
      }
    ]
  },
  diagnostic_fixo_bloqueio_parcial_pergunta_pj: {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'verificar_recebe_chamadas',
    titulo: 'Você consegue receber chamadas no seu Fixo da Oi?',
    skipExtraInfoTxt: true,
    botoes: [
      {
        acao: {
          nome: 'nav',
          params: {
            page: bloqueio_parcial_fixo_pj
          }
        },
        texto: 'Recebo',
        gaAction: 'recebe'
      },
      {
        acao: {
          nome: 'nav',
          params: {
            page: bloqueio_parcial_nao_recebe_chamadas
          }
        },
        texto: 'Não recebo',
        gaAction: 'nao_recebe'
      }
    ]
  }
};

export { BANDA_LARGA_FIXO_BLOCK_PAGES };
