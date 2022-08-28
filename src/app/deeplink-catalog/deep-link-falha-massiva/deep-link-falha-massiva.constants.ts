import { DiagnosticBlockButtonsModel } from 'src/app/models/diagnostic-block-model';
import { InteractionEnum } from 'src/app/domain/interactions';

const homeButton: DiagnosticBlockButtonsModel = {
  texto: 'Está funcionando',
  acao: {
    nome: 'goToHome',
    params: {}
  },
  gaAction: 'internet_funciona',
};
const dslIntro: DiagnosticBlockButtonsModel = {
  texto: 'Ainda estou com problemas',
  acao: {
    nome: 'goToDslStep',
    params: {}
  },
  gaAction: 'internet_nao_funciona',
};
const dslButton: DiagnosticBlockButtonsModel = {
  texto: 'Reiniciar o Sinal',
  acao: {
    nome: 'startDSL',
    params: {}
  },
  gaAction: 'reiniciar_sinal',
};
const conclusionButton = {
  txt: 'Ainda não',
  acao: {
    nome: 'setFeedbackStep',
  },
  gaAction: 'nao',
};
const successButton = {
  txt: 'Sim',
  acao: {
    nome: 'goToSuccess',
  },
  gaAction: 'sim',
};

export const FALHA_MASSICA_RESOLVED = {
  topImage: true,
  gaPageName: 'aviso_falha_resolvida',
  fluxo: 'reset_push_falha_massiva',
  titulo: 'A falha massiva já foi resolvida!',
  descricao: 'Verifique se a sua internet já está funcionando normalmente.',
  botoes: [
    dslIntro,
    homeButton
  ]
};

export const RESET_DSL_INTRO = {
  gaPageName: 'aviso_reiniciar_sinal',
  titulo: 'Precisamos <b>reiniciar</b> o sinal da internet para alinhar o seu modem.',
  botoes: [
    dslButton
  ]
};

export const RESET_DSL = {
  gaPageName: 'reiniciando_sinal',
  title: '<strong>Reiniciando</strong> o sinal da internet',
  paragraph: 'É importante que você continue nesta tela até o processo ser concluído.',
  interaction: InteractionEnum.resetDSL,
  alignPage: { // [nao implementado no diagnostico] SERA USADO EM CASOS DE ALINHAMENTO (tempo extra para reestabelecimento do modem)
    title: 'O modem esta sendo reinicializado',
    paragraph: 'aguarde enquando o equipamento reinicia, esta etapa é automática',
    interaction: InteractionEnum.resetDSL
  },
  // possible answers is PERMITIDO, EXIGIR_CONFIRMACAO, NEGADO, (PERMITIDO, manter o fluxo)
  checkActionPage: {
    interaction: InteractionEnum.consultaStatusTerminal,
    key: 'resetDSL',
    // EXIGIR_CONFIRMACAO: resetDslManual,
    // NEGADO: resetDslNotAllowed
  }
};

export const CONCLUSION_STEP = {
  title: 'Pronto!',
  gaPageName: 'internet_voltou',
  paragraph: 'A internet voltou a funcionar?',
  buttons: [
    conclusionButton,
    successButton
  ]
};

export const FEEDBACK_CONCLUSION = {
  gaPageName: 'nao_sucesso_reset_push_falha_massiva',
  titulo: 'Neste caso selecione um reparo no início do app.',
  descricao: 'Volte pro início e selecione um reparo referente ao problema que você está tendo.',
  botoes: [
    {
      texto: 'Voltar pro início',
      acao: {
        nome: 'goToHome',
        params: {}
      },
      gaAction: 'voltar_inicio',
    }
  ]
};
