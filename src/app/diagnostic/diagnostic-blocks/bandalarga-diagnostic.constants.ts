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
    'Voce?? vai precisar ligar pra Oi pra resolver este problema. A ligac??a??o e?? gratuita.',
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
      texto: 'Voltar pro in??cio'
    }
  ]
};
const bloqueio_parcial_fixo_pj = {
  gaPageName: 'bloqueio_parcial_recebe_chamadas',
  titulo: 'Seu servi??o est?? bloqueado por causa de uma pend??ncia financeira.',
  descricao:
    'Pra voltar a utilizar os nossos servi??os, ?? necess??rio que voc?? fa??a o pagamento do d??bito em aberto.<br><br>' +
    'Ap??s o pagamento, tudo voltar?? ao normal em at?? 2 dias ??teis.<br><br>' +
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
      texto: 'Voltar pro in??cio',
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
    titulo: 'A internet foi bloqueada porque voc?? tem uma ou mais contas vencidas.',
    skipExtraInfoTxt: true,
    descricao:
      'Use os nossos canais digitais pra acessar a segunda via da conta ou c??digo de barras. Ap??s o pagamento, tudo voltar?? ao normal em at?? 2 dias ??teis.<br><br>' +
      'ATEN????O: Por aqui voc?? tem a mesma informa????o que receberia por telefone, e ainda pode acompanhar as atualiza????es.',
      
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
        texto: 'Voltar pro in??cio'
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
    titulo: 'A velocidade da internet foi reduzida porque  voc?? tem uma ou mais contas vencidas.',
    skipExtraInfoTxt: true,
    descricao:
      'Use os nossos canais digitais pra acessar a segunda via da conta ou c??digo de barras. Ap??s o pagamento, tudo voltar?? ao normal em at?? 2 dias ??teis.<br><br>' +
      'ATEN????O: Por aqui voc?? tem a mesma informa????o que receberia por telefone, e ainda pode acompanhar as atualiza????es.',
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
        texto: 'Voltar pro in??cio'
      }
    ]
  },
  bloqueio_parcial_bandalarga_pj: {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'bloqueio_parcial_pj_encontrado',
    titulo: 'A velocidade foi reduzida porque uma conta est?? vencida.',
    descricao: `Acesse a sua conta no Oi Mais Empresas. Ap??s o pagamento, tudo voltar?? ao normal em at?? 2 dias ??teis.`,
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
        texto: 'Voltar pro in??cio',
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
    titulo: 'Seu servi??o est?? bloqueado por causa de uma pend??ncia financeira.',
    descricao: 'Pra voltar a utilizar os nossos servi??os, ?? necess??rio que voc?? fa??a o pagamento do d??bito em aberto.<br><br>' +
    'Ap??s o pagamento, tudo voltar?? ao normal em at?? 2 dias ??teis.<br><br>' +
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
        texto: 'Voltar pro in??cio'
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
      'Previs??o de normaliza????o:<br/><strong>At?? ??s ::hora:: do dia ::dia::.</strong>',
    titulo: 'Encontramos uma falha na regi??o.',
    descricao:
      'Nossa equipe n??o precisa ir at?? a sua casa. J?? estamos resolvendo o problema na rede da Oi.<br/><br/>' +
      '#forecast#' ,
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro in??cio',
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
      'Previs??o de normaliza????o:<br/><strong> at?? ??s ::hora:: do dia ::dia::.</strong>',
    titulo: 'Encontramos uma falha na regi??o.',
    descricao:
      'Identificamos que voc?? j?? consultou a falha na regi??o. Ela permanece com o mesmo prazo de normaliza????o.<br><br>' +
      '#forecast#' ,
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro in??cio',
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
      '<b>Nova previs??o</b> de normaliza????o:<br/><strong> at?? ??s ::hora:: do dia ::dia::.</strong>',
    titulo: 'Ainda estamos com uma falha na regi??o.',
    descricao:
      'Os t??cnicos informaram que v??o precisar de mais tempo para resolver o problema.<br/><br/>' +
      '#forecast#' ,
      botoes: [
        {
          acao: {
            nome: 'goToHome'
          },
          texto: 'Voltar pro in??cio',
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
      'A Previs??o dos t??cnicos nesse momento ?? para ??s <strong>::hora:: do dia ::dia::.</strong>',
    titulo: 'Encontramos uma falha na regi??o.',
    descricao:
      'Prezado Cliente, a Oi est?? realizando uma manuten????o nos elementos de rede em sua regi??o, ' +
      'visto que a rede que d?? suporte ao servi??o prestado foi (furtada/Vandalizada).<br/><br/>' +
      'A recomposi????o da rede ocorrer?? no menor prazo poss??vel.<br/><br/>' +
      '#forecast#',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro in??cio',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_aberto_visita_nao_agendada: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_pf_andamento_encontrado',
    titulo: 'Voc?? possui um reparo em andamento.',
    descricao:
      'A nossa equipe j?? est?? trabalhando no seu atendimento. Aguarde a visita t??cnica em at?? 24h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_a_agendar_agendamento_indisponivel: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_pj_andamento_encontrado',
    titulo: 'Voc?? possui um reparo em andamento.',
    descricao:
      'A nossa equipe j?? est?? trabalhando no seu atendimento. Aguarde a visita t??cnica em at?? 24h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_a_agendar_agendamento_disponivel: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_a_agendar_encontrado',
    titulo: 'Voc?? possui um reparo pra agendar.',
    descricao:
      'Escolha a melhor data e per??odo pra realizarmos uma visita t??cnica.',
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
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_aberto_empresarial: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_pj_andamento_encontrado',
    titulo: 'Voc?? possui um reparo em andamento.',
    descricao:
      'A nossa equipe j?? est?? trabalhando no seu atendimento. Aguarde a visita t??cnica em at?? 48h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  reparo_aberto_visita_agendada: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'reparo_agendado_encontrado',
    titulo: 'Voc?? possui um reparo agendado.',
    descricao:
      'Uma visita t??cnica j?? est?? agendada pra concluirmos o seu atendimento.',
    botoes: [
      {
        acao: {
          nome: 'goToAgendamento'
        },
        texto: 'Ver visitas t??cnicas ',
        gaAction: 'consultar_visitas_tecnicas'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  os_aberta_visita_nao_agendada: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_pf_andamento_encontrada',
    titulo: 'Voc?? possui um servi??o em andamento.',
    descricao:
      'A nossa equipe j?? est?? trabalhando no seu atendimento. Aguarde a visita t??cnica em at?? 24h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  os_aberta_visita_agendada: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_agendada_encontrada',
    titulo: 'Voc?? possui um servi??o agendado.',
    descricao:
      'Uma visita t??cnica j?? est?? agendada pra concluirmos o seu atendimento.',
    botoes: [
      {
        acao: {
          nome: 'goToAgendamento'
        },
        texto: 'Ver visitas t??cnicas ',
        gaAction: 'consultar_visitas_tecnicas'
      },
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  os_a_agendar_agendamento_disponivel: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_a_agendar_encontrada',
    titulo: 'Voc?? possui um servi??o pra agendar.',
    descricao:
      'Escolha a melhor data e per??odo pra realizarmos uma visita t??cnica.',
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
        texto: 'Voltar pro ini??cio',
        gaAction: gaActionHome
      }
    ]
  },
  os_a_agendar_agendamento_indisponivel: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_a_agendar_agendamento_indisponivel',
    titulo: 'Voc?? possui um servi??o em andamento.',
    descricao:
      'A nossa equipe j?? est?? trabalhando no seu atendimento. Aguarde a visita t??cnica em at?? 48h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio',
        gaAction: gaActionHome
      }
    ]
  },
  os_aberta_empresarial: {
    condicao: {
      tipo: tipoBloqueios.REPARO
    },
    gaPageName: 'os_pj_andamento_encontrada',
    titulo: 'Voc?? possui um servi??o em andamento.',
    descricao:
      'A nossa equipe j?? est?? trabalhando no seu atendimento. Aguarde a visita t??cnica em at?? 48h.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  configuracoes_linha_identificada: {
    condicao: {
      tipo: tipoBloqueios.LINHA
    },
    gaPageName: 'desbloqueio_porta_executado',
    titulo: 'Identifiquei um problema, mas j?? est?? resolvido.',
    descricao:
      'Em breve tudo voltar?? ao normal. Aguarde 2 minutos e veja se o servi??o est?? funcionando novamente.',
    botoes: [
      {
        acao: {
          nome: 'goToHome'
        },
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  diagnostic_falha_desbloqueio_porta: {
    condicao: {
      tipo: tipoBloqueios.LINHA
    },
    gaPageName: 'nao_sucesso',
    titulo: 'N??o conseguimos resolver seu problema por aqui',
    descricao:
      'Voc?? vai precisar ligar pra Oi pra resolver este problema. A liga????o ?? gratuita.',
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
        texto: 'Voltar pro ini??cio ',
        gaAction: gaActionHome
      }
    ]
  },
  diagnostic_fixo_bloqueio_parcial_pergunta_pf: {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'verificar_recebe_chamadas',
    titulo: 'Voc?? consegue receber chamadas no seu Fixo da Oi?',
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
        texto: 'N??o recebo',
        gaAction: 'nao_recebe'
      }
    ]
  },
  diagnostic_fixo_bloqueio_parcial_pergunta_pj: {
    condicao: {
      tipo: tipoBloqueios.FINANCEIRO
    },
    gaPageName: 'verificar_recebe_chamadas',
    titulo: 'Voc?? consegue receber chamadas no seu Fixo da Oi?',
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
        texto: 'N??o recebo',
        gaAction: 'nao_recebe'
      }
    ]
  }
};

export { BANDA_LARGA_FIXO_BLOCK_PAGES };
