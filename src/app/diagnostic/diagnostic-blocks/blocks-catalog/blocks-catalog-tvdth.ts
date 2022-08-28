import { BlockTypes } from 'src/app/enums/catalog.enum';
import { DiagnosticBlockModel, DiagnosticBlockButtonsModel } from 'src/app/models/diagnostic-block-model';

const tipoFalhaMassiva = {
  INTERFERENCIA_SOLAR: {
    nome: 'interferencia-solar',
    dismissable: false,
  },
  MANUTENCAO_CORRETIVA: {
    nome: 'manutencao_corretiva',
    dismissable: true,
  },
  MANUTENCAO_PREVENTIVA: {
    nome: 'manutencao_preventiva',
    dismissable: true,
  },
  MA_CONDICAO_CLIMATICA: {
    nome: 'condicao-climatica-ruim',
    dismissable: false,
  },
  SEM_SINAL: {
    nome: 'sem_sinal',
    dismissable: true,
  },
};
// buttons
const homeButton: DiagnosticBlockButtonsModel  = {
    texto: 'Voltar pro início',
    acao: {
      nome: 'goToHome',
      params: {}
    },
    gaAction: 'voltar_inicio',
};
const joiceButton: DiagnosticBlockButtonsModel = {
    acao: {
        nome: 'goToJoice',
    },
    icon: 'logo-whatsapp',
    texto: 'Falar via whatsapp',
    gaAction: 'acessar_joice',
};
const minhaOiButton: DiagnosticBlockButtonsModel = {
    texto: 'Ir pra Minha Oi',
    acao: {
      nome: 'goToMinhaOi',
      params: {}
    },
    gaAction: 'acessar_minha_oi',
};
const minhaOiMaisEmpresasButton: DiagnosticBlockButtonsModel = {
    acao: {
        nome: 'goToOiMaisEmpresas',
    },
    gaAction: 'acessar_oi_mais_empresas',
    texto: 'Ir pro Oi Mais Empresas ',
};
const callCenterButton: DiagnosticBlockButtonsModel = {
    acao: {
        nome: 'goToCallCenter',
    },
    gaAction: 'ligar',
    texto: 'Ligar pro atendimento',
};
const ausenciaSinalPage = {
  id: 'AUSENCIA_SINAL_PAGE',
  gaPageName: 'verificar_codigo_erro_ausencia_sinal',
  titulo: 'Na sua TV aparece o código de erro: "E30 - Ausência de Sinal"?',
  skipExtraInfoTxt: true,
  descricao: '',
  botoes: [
    {
      texto: 'Sim, aparece!',
      acao: {
        nome: 'goToAusenciaSinal',
        params: {}
      },
      gaAction: 'aparece',
    },
    {
      texto: 'Meu problema é outro',
      acao: {
        nome: 'goToTroubleshootPage',
        params: {}
      },
      gaAction: 'outro_problema',
    }
  ]
};
const continueTs: DiagnosticBlockButtonsModel = {
    texto: 'Problema com canal aberto',
    acao: {
      nome: 'verifyCurrentProblem',
      params: {
        page: ausenciaSinalPage,
      }
    },
    gaAction: 'continuar'
};
const falhaMassivaConclusao = {
    id: 'FALHA_MASSIVA_CONCLUSAO',
    gaPageName: 'aguardar_correcao_falha',
    titulo: 'Neste caso, é<br/>necessário aguardar<br/>até a falha ser<br/>resolvida.',
    descricao: '',
    botoes: [
      homeButton
    ]
};
const continueFalhaConclusionButton: DiagnosticBlockButtonsModel = {
    texto: 'Ok, entendi!',
    acao: {
      nome: 'openPopUp',
      params: {
          page: falhaMassivaConclusao
      }
    },
    gaAction: 'continuar'
};
const alertModal = (gaPageName) => { return {
    title: 'Esse era o seu problema?',
    gaPageName: gaPageName || 'fixo_voltou_aguardando_sinal',
    buttons: [
      {
        text: 'Não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Sim',
        action: 'sim',
        gaAction: 'sim',
        params: {
          page: falhaMassivaConclusao
        }
      }
    ]
  };
};

export const blocksTvDth: DiagnosticBlockModel[] = [
  {
    id: 'FINANCEIRO_PARCIAL_PJ',
    condicao: {
      tipo: BlockTypes.FINANCEIRO,
      isBloqueioParcial: true,
      isCnpj: true,
    },
    gaPageName: 'bloqueio_parcial_pj_encontrado',
    titulo: 'Seu serviço está bloqueado por causa de uma pendência financeira.',
    descricao: 'Por isso, todos os canais pagos estão bloqueados. Acesse o Oi Mais Empresas pra pagar a sua conta.<br/></br>' +
    'Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
    'Caso o problema seja em um canal aberto, clique em "problema com canal aberto"',
    botoes: [
      minhaOiMaisEmpresasButton,
      continueTs,
      homeButton
    ]
  },
  {
    id: 'FINANCEIRO_PARCIAL_PF',
    condicao: {
      tipo: BlockTypes.FINANCEIRO,
      isBloqueioParcial: true,
      isCnpj: false,
    },
    gaPageName: 'bloqueio_parcial_pf_encontrado',
    titulo: 'Seu serviço está bloqueado por causa de uma pendência financeira.',
    descricao: 'Pra voltar a utilizar os nossos serviços, é necessário que você faça o pagamento do débito em aberto.<br><br>' +
    'Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br/><br/>' +
    'Use um dos nossos canais digitais abaixo pra solicitar as informações de pagamento.<br><br>' +
    'Caso o problema seja em um canal aberto, clique em "problema com canal aberto"',
    botoes: [
      minhaOiButton,
      joiceButton,
      continueTs,
      homeButton
    ]
  },
  {
    id: 'FINANCEIRO_TOTAL_PJ',
    condicao: {
      tipo: BlockTypes.FINANCEIRO,
      isBloqueioTotal: true,
      isCnpj: true,
    },
    gaPageName: 'bloqueio_total_pj_encontrado',
    titulo: 'Seu serviço está bloqueado por causa de uma pendência financeira.',
    descricao: 'Pra voltar a utilizar os nossos serviços, é necessário que você faça o pagamento do débito em aberto.<br/><br/>' +
    'Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
    'Acesse a sua conta no Oi Mais Empresas. ',
    botoes: [
      minhaOiMaisEmpresasButton,
      homeButton
    ]
  },
  {
    id: 'FINANCEIRO_TOTAL_PF',
    condicao: {
      tipo: BlockTypes.FINANCEIRO,
      isBloqueioTotal: true,
      isCnpj: false,
    },
    gaPageName: 'bloqueio_total_pf_encontrado',
    titulo: 'Seu serviço está bloqueado por causa de uma pendência financeira.',
    descricao: 'Pra voltar a utilizar os nossos serviços, é necessário que você faça o pagamento do débito em aberto.<br/><br/>' +
    'Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
    'Use um dos nossos canais digitais abaixo pra solicitar as informações de pagamento.',
    botoes: [
      minhaOiButton,
      joiceButton,
      homeButton
    ]
  },
  {
    id: 'OS_COM_PREVISAO',
    condicao: {
      tipo: BlockTypes.OS,
      dataInicioAgendamento: { exists: true },
    },
    gaPageName: 'os_encontrada',
    titulo: 'Você possui um<br/>serviço aberto.',
    descricao: 'Já estamos trabalhando em sua solicitação.<br><br>Tipo de serviço: ::nome_servico::.<br><br>' +
    'Previsão de normalização:<br/>até ::forecastDate::.',
    botoes: [
        homeButton
    ]
  },
  {
    id: 'OS_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.OS,
      dataInicioAgendamento: { exists: false },
    },
    gaPageName: 'os_encontrada',
    titulo: 'Você possui um<br/>serviço aberto.',
    descricao: 'Já estamos trabalhando em sua solicitação.<br><br>Tipo de serviço: ::nome_servico::.',
    botoes: [
        homeButton
    ]
  },
  {
    id: 'REPARO_COM_PREVISAO',
    condicao: {
      tipo: BlockTypes.REPARO,
      dataInicioAgendamento: { exists: true },
    },
    gaPageName: 'reparo_encontrado',
    titulo: 'Você possui um<br/>reparo aberto.',
    descricao: 'Já estamos trabalhando em sua solução.<br><br>Previsão de normalização:<br/>até ::forecastDate::.',
    botoes: [
        homeButton
    ]
  },
  {
    id: 'REPARO_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.REPARO,
      dataInicioAgendamento: { exists: false },
    },
    gaPageName: 'reparo_encontrado',
    titulo: 'Você possui um<br/>reparo aberto.',
    descricao: 'Já estamos trabalhando em sua solução.',
    botoes: [
        homeButton
    ]
  },
  {
    id: 'FALHA_MASSIVA_INTERFERENCIA_SOLAR_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      tipo_falha: tipoFalhaMassiva.INTERFERENCIA_SOLAR.nome,
      forecastDate: { exists: false },
    },
    gaPageName: 'falha_regiao_interferencia_solar_encontrada',
    titulo: 'Encontramos uma<br/>falha de sinal devido<br/>à interferência solar.',
    descricao: 'Por isso, alguns canais estão temporariamente sem sinal.',
    botoes: [
      homeButton
    ]
  },
  {
    id: 'FALHA_MASSIVA_INTERFERENCIA_SOLAR_COM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      tipo_falha: tipoFalhaMassiva.INTERFERENCIA_SOLAR.nome,
      forecastDate: { exists: true },
    },
    gaPageName: 'falha_regiao_interferencia_solar_encontrada',
    titulo: 'Encontramos uma<br/>falha de sinal devido<br/>à interferência solar.',
    descricao: 'Por isso, alguns canais estão temporariamente sem sinal.<br><br>Previsão de normalização: até às ::hora:: do dia ::dia::.',
    botoes: [
      homeButton
    ]
  },
  {
    id: 'FALHA_MASSIVA_MA_CONDICAO_CLIMATICA_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      tipo_falha: tipoFalhaMassiva.MA_CONDICAO_CLIMATICA.nome,
      forecastDate: { exists: false },
    },
    gaPageName: 'falha_regiao_condicao_climatica_encontrada',
    titulo: 'Encontramos uma<br/>falha devido à má<br/>condição climática.',
    descricao: 'Por isso, alguns canais estão temporariamente sem sinal.<br.<br>Recomendamos que você espere o tempo ' +
    'melhorar antes de verificar se a sua TV voltou ao normal.',
    botoes: [
      homeButton
    ]
  },
  {
    id: 'FALHA_MASSIVA_MA_CONDICAO_CLIMATICA_COM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      tipo_falha: tipoFalhaMassiva.MA_CONDICAO_CLIMATICA.nome,
      forecastDate: { exists: true },
    },
    gaPageName: 'falha_regiao_condicao_climatica_encontrada',
    titulo: 'Encontramos uma<br/>falha devido à má<br/>condição climática.',
    descricao: 'Por isso, alguns canais estão temporariamente sem sinal.<br><br>' +
    'Recomendamos que você espere o tempo melhorar antes de verificar se a sua TV voltou ao normal.<br><br>' +
    'Previsão de normalização: até às ::hora:: do dia ::dia::.',
    botoes: [
      homeButton
    ]
  },
  {
    id: 'FALHA_MASSIVA_CANAIS_MENOR_5_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      canais: { leq: 5 },
      forecastDate: { exists: false },
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Encontramos uma<br/>falha de sinal em<br/>sua região.',
    descricao: 'Devido a uma instabilidade de sinal na sua área, os canais abaixo estão temporariamente indisponíveis:<br><br>' +
    '::canais::',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  {
    id: 'FALHA_MASSIVA_CANAIS_MENOR_5_COM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      canais: { leq: 5 },
      forecastDate: { exists: true },
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Encontramos uma<br/>falha de sinal em<br/>sua região.',
    descricao: 'Devido a uma instabilidade de sinal na sua área, os canais abaixo estão temporariamente indisponíveis:<br><br>' +
    '::canais::.<br><br>' +
    ' Previsão de normalização: até às ::hora:: do dia ::dia::.',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  {
    id: 'FALHA_MASSIVA_CANAIS_MAIOR_5_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      canais: { geq: 5 },
      forecastDate: { exists: false },
    },
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Encontramos uma<br/>falha de sinal em<br/>sua região.',
    descricao: 'Devido a uma instabilidade de sinal na sua área, alguns canais estão temporariamente indisponíveis.',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  {
    id: 'FALHA_MASSIVA_CANAIS_MAIOR_5_COM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      canais: { geq: 5 },
      forecastDate: { exists: true },
    },
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Encontramos uma<br/>falha de sinal em<br/>sua região.',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    descricao: 'Devido a uma instabilidade de sinal na sua área, alguns canais estão temporariamente indisponíveis.<br><br>' +
    'Previsão de normalização: até às ::hora:: do dia ::dia::.',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
]
