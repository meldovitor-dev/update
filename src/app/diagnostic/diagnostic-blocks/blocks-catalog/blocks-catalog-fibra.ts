import { ProductIdentifierEnum } from 'src/app/enums/product.enum';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { BlockTypes } from 'src/app/enums/catalog.enum';
import { DiagnosticBlockModel, DiagnosticBlockButtonsModel } from 'src/app/models/diagnostic-block-model';

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
    texto: 'Falar via Whatsapp',
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
const callCenterButton: DiagnosticBlockButtonsModel = {
    acao: {
        nome: 'goToCallCenter',
    },
    gaAction: 'ligar',
    texto: 'Ligar',
};
const falhaMassivaConclusao = {
    id: 'FALHA_MASSIVA_CONCLUSAO',
    gaPageName: 'aguardar_correcao_falha',
    titulo: 'Neste caso, é<br/>necessário aguardar<br/>até a falha ser<br/>resolvida.',
    skipExtraInfoTxt: true,
    descricao: 'ATENÇÃO:<br/>Ative as notificações do app para ser avisado quando o reparo estiver concluído.<br><br>'+
    'Por aqui você tem a mesma informação que receberia por telefone.',
    botoes: [
      homeButton
    ]
};
const continueFalhaConclusionButton: DiagnosticBlockButtonsModel = {
    texto: 'Continuar',
    acao: {
      nome: 'openPopUp',
    },
    gaAction: 'continuar'
};
const oiSolucoesButton: DiagnosticBlockButtonsModel = {
  texto: 'Acessar Portal Oi Soluções',
  acao: {
    nome: 'goToOiSolucoes',
    params: {}
  },
  gaAction: 'acessar_portal_oi_solucoes',
};
const alertModal = (gaPageName) => ({
    title: 'Esse era o seu problema?',
    gaPageName: 'confirma_falha_regiao_lentidao_encontrada',
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
  });

export const BLOCK_FIBRA_NETQ_NOK: DiagnosticBlockModel = {
  id: 'NETQ_NOK',
  condicao: {
    tipo: BlockTypes.LINHA,
  },
  gaPageName: 'problema_rede_encontrado',
  titulo: 'Encontramos um problema na sua rede',
  skipExtraInfoTxt: true,
  descricao: 'Infelizmente não é possível resolver por aqui, você precisa ligar pro nosso atendimento.<br/>'
    + 'A ligação é gratuita.',
  botoes: [
    {
      acao: {
        nome: 'goToCallCenter',
      },
      texto: 'Ligar',
      gaAction: 'ligar'
    },
    {
      acao: {
        nome: 'goToHome',
      },
      texto: 'Voltar pro início',
      gaAction: 'voltar_inicio',
    },
  ],
};

export const blocksFibra: DiagnosticBlockModel[] = [
  {
    id: 'FINANCEIRO_PF',
    condicao: {
      tipo: BlockTypes.FINANCEIRO,
      isCnpj: false,
    },
    gaPageName: 'bloqueio_total_pf_encontrado',
    titulo: 'Seu serviço está bloqueado por causa de uma pendência financeira.',
    descricao: 'Pra voltar a utilizar os nossos serviços, é necessário que você faça o pagamento do débito em aberto.<br><br>' +
    'Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
    'Use um dos nossos canais digitais abaixo pra solicitar as informações de pagamento:',
    botoes: [
      minhaOiButton,
      joiceButton,
      homeButton,
    ]
  },
  {
    id: 'FINANCEIRO_PJ',
    gaPageName: 'bloqueio_total_pj_encontrado',
    condicao: {
      tipo: BlockTypes.FINANCEIRO,
      isCnpj: true,
    },
    titulo: 'Seu serviço está bloqueado por causa de uma pendência financeira.',
    descricao: 'Pra voltar a utilizar os nossos serviços, é necessário que você faça o pagamento do débito em aberto.<br><br>' +
      'Após o pagamento, tudo voltará ao normal em até 2 dias úteis.<br><br>' +
      'Se precisar da 2ª via de conta pra realizar o pagamento, ligue pro nosso atendimento. A ligação é gratuita.',
    botoes: [
      callCenterButton,
      homeButton,
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_VOIP_SEM_PREVISAO
    id: 'FALHA_MASSIVA_LENTIDAO_VOIP_SEM_PREVISAO',
    gaPageName: 'falha_regiao_lentidao_sem_previsao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_FIXO,
      forecastDate: { exists: false },
    },
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    titulo: 'Encontramos uma<br/>falha na região.',
    descricao: 'Devido a uma falha na rede, o telefone pode apresentar problemas de eco, ruídos, voz metalizada ou cortando.<br/><br/>'+
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO
    id: 'FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO',
    gaPageName: 'falha_regiao_lentidao_com_previsao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_FIXO,
      forecastDate: { exists: true },
      consulted: false,
      rescheduled: false
    },
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Devido a uma falha na rede, o telefone pode apresentar problemas de eco, ruídos, voz metalizada ou cortando.<br/><br/>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_REPETIDA
    id: 'FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_REPETIDA',
    gaPageName: 'falha_regiao_consulta_repetida',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_FIXO,
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: false
    },
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Identificamos que você já consultou a falha na região. Ela permanece com o mesmo prazo de normalização.<br/><br/>' +
    'Esta falha na rede pode causar problemas de eco, ruídos, voz metalizada ou cortando.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_REAPRAZADA
    id: 'FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_REAPRAZADA',
    gaPageName: 'falha_regiao_reaprazada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_FIXO,
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: true
    },
    titulo: 'Ainda estamos<br/>com uma falha<br/>na região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br/><br/>'+
    'Esta falha na rede pode apresentar problemas de eco, ruídos, voz metalizada ou cortando.<br/><br/>' +
    '<strong>Nova previsão</strong> de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_IPTV_SEM_PREVISAO
    id: 'FALHA_MASSIVA_LENTIDAO_IPTV_SEM_PREVISAO',
    gaPageName: 'falha_regiao_lentidao_sem_previsao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      forecastDate: { exists: false },
    },
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    titulo: 'Encontramos uma<br/>falha na região.',
    descricao: 'Devido a uma falha na rede, a sua TV pode apresentar falha de som e imagem, ou mesmo ausência do sinal.<br/><br/>'+
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO
    id: 'FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO',
    gaPageName: 'falha_regiao_lentidao_com_previsao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      forecastDate: { exists: true },
      consulted: false,
      rescheduled: false
    },
    titulo: 'Encontramos uma<br/>falha na região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Devido a uma falha na rede, a sua TV pode apresentar falha de som e imagem, ou mesmo ausência do sinal.<br/><br/>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO_REPETIDA
    id: 'FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO_REPETIDA',
    gaPageName: 'falha_regiao_consulta_repetida',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: false
    },
    titulo: 'Encontramos uma<br/>falha na região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Identificamos que você já consultou a falha na região. Ela permanece com o mesmo prazo de normalização.<br/><br/>' +
    'Devido a esta instabilidade de sinal a sua TV pode apresentar falha de som e imagem, ou mesmo ausência do sinal.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO_REAPRAZADA
    id: 'FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO_REAPRAZADA',
    gaPageName: 'falha_regiao_reaprazada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: true
    },
    titulo: 'Ainda estamos<br/>com uma falha<br/>na região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br/><br/>' +
    'Devido a esta instabilidade de sinal a sua TV pode apresentar falha de som e imagem, ou mesmo ausência do sinal.<br/><br/>' +
    '<strong>Nova previsão</strong> de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_INTERNET_SEM_PREVISAO
    id: 'FALHA_MASSIVA_LENTIDAO_INTERNET_SEM_PREVISAO',
    gaPageName: 'falha_regiao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
      forecastDate: { exists: false },
      feature: { neq: FeatureEnum.FIBRA_LENTA },
    },
    titulo: 'Encontramos uma<br/>falha na região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Devido a uma falha na rede a sua internet está mais lenta.<br/><br/>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO
    id: 'FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO',
    gaPageName: 'falha_regiao_lentidao_com_previsao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
      forecastDate: { exists: true },
      feature: { neq: FeatureEnum.FIBRA_LENTA },
      consulted: false,
      rescheduled: false
    },
    titulo: 'Encontramos uma<br/>falha na região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Devido a uma falha na rede a sua internet está mais lenta.<br/><br/>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.<br><br></strong>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_REPETIDA
    id: 'FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_REPETIDA',
    gaPageName: 'falha_regiao_consulta_repetida',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
      forecastDate: { exists: true },
      feature: { neq: FeatureEnum.FIBRA_LENTA },
      consulted: true,
      rescheduled: false
    },
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Identificamos que você já consultou a falha na região. Ela permanece com o mesmo prazo de normalização.<br/><br/>' +
    'Esta falha na rede pode deixar sua internet mais lenta.<br/><br/>'+
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong><br><br>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_REAPRAZADA
    id: 'FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_REAPRAZADA',
    gaPageName: 'falha_regiao_reaprazada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
      forecastDate: { exists: true },
      feature: { neq: FeatureEnum.FIBRA_LENTA },
      consulted: true,
      rescheduled: true
    },
    titulo: 'Ainda estamos<br/>com uma falha<br/>na região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao: 'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br/><br/>'+
    'Esta falha na rede pode deixar a sua internet mais lenta.<br/><br/>'+
    '<strong>Nova previsão</strong> de normalização:<br/><strong>até às ::hora:: do dia ::dia::</strong>.<br/><br/>',
    botoes: [
      continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_LENTIDAO_INTERNET_SEM_PREVISAO_INTERNET_LENTA
    id: 'FALHA_MASSIVA_LENTIDAO_INTERNET_SEM_PREVISAO_INTERNET_LENTA',
    gaPageName: 'falha_regiao_lentidao_sem_previsao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
      forecastDate: { exists: false },
      feature: FeatureEnum.FIBRA_LENTA,
    },
    titulo: 'Encontramos uma<br/>falha na região.',
    skipExtraInfoTxt: true,
    descricao: 'Devido a uma falha na rede a sua internet está mais lenta.<br/><br/>'+
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>',
    botoes: [
      homeButton
    ]
  },
 { //FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA
  id: 'FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA',
  gaPageName: 'falha_regiao_lentidao_com_previsao_encontrada',
  condicao: {
    tipo: BlockTypes.FALHA_MASSIVA,
    isFalhaLentidao: true,
    product: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
    forecastDate: { exists: true },
    feature: FeatureEnum.FIBRA_LENTA,
    consulted: false,
      rescheduled: false
  },
  alert: alertModal('falhaMassivaConclusao'),
  titulo: 'Encontramos<br/>uma falha na<br/>região.',
  skipExtraInfoTxt: false,
  descricao: 'Devido a uma falha na rede a sua internet está mais lenta.<br/><br/>' +
  'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
  'Previsão de normalização:<br/><strong>Até às ::hora:: do dia ::dia::.</strong>',
  botoes: [
    homeButton,
  ]
},
{ //FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA_REPETIDA
  id: 'FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA_REPETIDA',
  gaPageName: 'falha_regiao_consulta_repetida',
  condicao: {
    tipo: BlockTypes.FALHA_MASSIVA,
    isFalhaLentidao: true,
    product: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
    forecastDate: { exists: true },
    feature: FeatureEnum.FIBRA_LENTA,
    consulted: true,
      rescheduled: false
  },
  alert: alertModal('falhaMassivaConclusao'),
  titulo: 'Encontramos<br/>uma falha na<br/>região.',
  skipExtraInfoTxt: false,
  descricao: 'Identificamos que você já consultou a falha massiva na região. Ela permanece com o mesmo prazo de normalização.<br/><br/>' +
  'Esta falha na rede pode deixar sua internet mais lenta.<br/><br/>'+
  'Previsão de normalização:<br/><strong>Até às ::hora:: do dia ::dia::.</strong>',
  botoes: [
    homeButton,

  ]
},
{ //FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA_REAPRAZADA
  id: 'FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA_REAPRAZADA',
  gaPageName: 'falha_regiao_reaprazada',
  condicao: {
    tipo: BlockTypes.FALHA_MASSIVA,
    isFalhaLentidao: true,
    product: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
    forecastDate: { exists: true },
    feature: FeatureEnum.FIBRA_LENTA,
    consulted: true,
    rescheduled: true
  },
  alert: alertModal('falhaMassivaConclusao'),
  titulo: 'Ainda estamos<br/>com uma falha<br/>na região.',
  skipExtraInfoTxt: false,
  descricao: 'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br/><br/>' +
  'Esta falha na rede pode deixar a sua internet mais lenta.<br/><br/>'+
  '<strong>Nova previsão</strong> de normalização:<br/><strong>Até às ::hora:: do dia ::dia::.</strong>',
  botoes: [
    homeButton,

  ]
},
{ //FALHA_MASSIVA_CANAIS_MENOR_5_SEM_PREVISAO
  id: 'FALHA_MASSIVA_CANAIS_MENOR_5_SEM_PREVISAO',
  condicao: {
    tipo: BlockTypes.FALHA_MASSIVA,
    isFalhaCanal: true,
    product: ProductIdentifierEnum.FIBRA_TV,
    canais: { leq: 5 },
    forecastDate: { exists: false },
  },
  gaPageName: 'falha_regiao_cinco_canais_encontrada',
  skipExtraInfoTxt: true,
  alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
  titulo: 'Encontramos uma<br/>falha de sinal em<br/>sua região.',
  // eslint-disable-next-line max-len
  descricao: 'Devido a uma instabilidade de sinal na sua área, os canais abaixo estão temporariamente indisponíveis:<br> ::canais::<br><br>' +
  'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.',
  botoes: [
      continueFalhaConclusionButton
  ]
  },
{ //FALHA_MASSIVA_CANAIS_MENOR_5_COM_PREVISAO
    id: 'FALHA_MASSIVA_CANAIS_MENOR_5_COM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaCanal: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { leq: 5 },
      forecastDate: { exists: true },
      consulted: false,
      rescheduled: false
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Encontramos uma<br/>falha de sinal em<br/>sua região.',
    // eslint-disable-next-line max-len
    descricao: 'Devido a uma instabilidade de sinal na sua área, os canais abaixo estão temporariamente indisponíveis:<br> ::canais::<br><br>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br><br>'+
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
{ //FALHA_MASSIVA_CANAIS_MENOR_5_COM_PREVISAO_REPETIDA
    id: 'FALHA_MASSIVA_CANAIS_MENOR_5_COM_PREVISAO_REPETIDA',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaCanal: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { leq: 5 },
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: false
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Encontramos uma<br/>falha de sinal em<br/>sua região.',
    descricao: 'Identificamos que você já consultou a falha na região. Ela permanece com o mesmo prazo de normalização.<br><br>'+
    'Devido a uma instabilidade de sinal os canais abaixo estão temporariamente indisponíveis:<br> ::canais::<br><br>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_CANAIS_MENOR_5_COM_PREVISAO_REAPRAZADA
    id: 'FALHA_MASSIVA_CANAIS_MENOR_5_COM_PREVISAO_REAPRAZADA',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaCanal: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { leq: 5 },
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: true
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Ainda estamos<br/>com uma falha<br/>na região.',
    descricao: 'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br><br>'+
    'Devido a uma instabilidade de sinal os canais abaixo estão temporariamente indisponíveis:<br> ::canais::<br/><br/>' +
    '<strong>Nova previsão</strong> de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_CANAIS_MAIOR_5_SEM_PREVISAO
    id: 'FALHA_MASSIVA_CANAIS_MAIOR_5_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaCanal: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { geq: 5 },
      forecastDate: { exists: false },
    },
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Encontramos uma<br/>falha na região.',
    descricao: 'Devido a uma instabilidade de sinal na sua área, alguns canais estão temporariamente indisponíveis.<br><br>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_CANAIS_MAIOR_5_COM_PREVISAO
    id: 'FALHA_MASSIVA_CANAIS_MAIOR_5_COM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaCanal: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { geq: 5 },
      forecastDate: { exists: true },
      consulted: false,
      rescheduled: false
    },
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Encontramos uma<br/>falha na região.',
    descricao: 'Devido a uma instabilidade de sinal na sua área, alguns canais estão temporariamente indisponíveis.<br/><br/>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_CANAIS_MAIOR_5_COM_PREVISAO_REPETIDA
    id: 'FALHA_MASSIVA_CANAIS_MAIOR_5_COM_PREVISAO_REPETIDA',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaCanal: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { geq: 5 },
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: false
    },
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Encontramos uma<br/>falha na região.',
    descricao: 'Identificamos que você já consultou a falha na região. Ela permanece com o mesmo prazo de normalização.<br><br>' +
    'Devido a esta instabilidade de sinal, alguns canais estão temporariamente indisponíveis.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_CANAIS_MAIOR_5_COM_PREVISAO_REAPRAZADA
    id: 'FALHA_MASSIVA_CANAIS_MAIOR_5_COM_PREVISAO_REAPRAZADA',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaCanal: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { geq: 5 },
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: true
    },
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Ainda estamos<br/>com uma falha<br/>na região.',
    descricao: 'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br/><br/>'+
    'Devido a uma instabilidade de sinal alguns canais estão temporariamente indisponíveis.<br/><br/>' +
    '<strong>Nova previsão</strong> de normalização:<br><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_SEM_PREVISAO
    id: 'FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { leq: 5 },
      forecastDate: { exists: false },
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    descricao: 'Devido a uma falha de rede, a sua TV pode apresentar falha de som e imagem, ou mesmo ausência do sinal.<br/><br/>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO
    id: 'FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { leq: 5 },
      forecastDate: { exists: true },
      consulted: false,
      rescheduled: false
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    descricao: 'Devido a uma falha de rede, a sua TV pode apresentar falha de som e imagem, ou mesmo ausência do sinal.<br/><br/>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>'+
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO_REPETIDA
    id: 'FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO_REPETIDA',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { leq: 5 },
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: false
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    descricao:
    'Identificamos que você já consultou a falha na região. Ela permanece com o mesmo prazo de normalização.<br><br>' +
    'Devido a esta instabilidade de sinal a sua TV pode apresentar falha de som e imagem, ou mesmo ausêmcia do sinal<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO_REAPRAZADA
    id: 'FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO_REAPRAZADA',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { leq: 5 },
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: true
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Ainda estamos<br/>com uma falha<br/>na região.',
    descricao:
    'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.' +
    'Devido a esta instabilidade de sinal a sua TV pode apresentar falha de som e imagem, ou mesmo ausêmcia do sinal<br/><br/>' +
    '<strong>Nova previsão</strong> de normalização:<br><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_SEM_PREVISAO
    id: 'FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_SEM_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { geq: 5 },
      forecastDate: { exists: false },
    },
    gaPageName: 'falha_regiao_cinco_canais_encontrada',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_cinco_canais_encontrada'),
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    descricao: 'Devido a uma falha de rede, a sua TV pode apresentar falha de som e imagem, ou mesmo ausência do sinal.<br/><br/>' +
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO
    id: 'FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { geq: 5 },
      forecastDate: { exists: true },
      consulted: false,
      rescheduled: false
    },
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Encontramos uma<br/>falha na região.',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    descricao:
    'Devido a uma instabilidade de sinal na sua área alguns canais estão temporariamente indisponíveis.<br/><br/>' +
    'Nossa equipe não vai precisar ir até a sua casa. Já estamos resolvendo o problema na rede Oi.<br/><br/>'+
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO_REPETIDA
    id: 'FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO_REPETIDA',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { geq: 5 },
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: false
    },
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Encontramos uma<br/>falha na região.',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    descricao:
    'Identificamos que você já consultou a falha na região. Ela permanece com o mesmo prazo de normalização.<br/><br/>' +
    'Devido a esta instabilidade de sinal alguns canais estão temporariamente indisponíveis.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO_REAPRAZADA
    id: 'FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO_REAPRAZADA',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: true,
      product: ProductIdentifierEnum.FIBRA_TV,
      canais: { geq: 5 },
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: true
    },
    gaPageName: 'falha_regiao_mais_cinco_canais_encontrada',
    titulo: 'Ainda estamos<br/>com uma falha<br/>na região.',
    skipExtraInfoTxt: true,
    alert: alertModal('confirma_falha_regiao_mais_cinco_canais_encontrada'),
    descricao:
    'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br/><br/>' +
    'Devido a esta instabilidade de sinal alguns canais estão temporariamente indisponíveis.<br/><br/>' +
    '<strong>Nova previsão</strong> de normalização:<br><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
        continueFalhaConclusionButton
    ]
  },
  { //FALHA_MASSIVA_GENERICA_SEM_PREVISAO
    id: 'FALHA_MASSIVA_GENERICA_SEM_PREVISAO',
    gaPageName: 'falha_regiao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: false,
      forecastDate: { exists: false },
    },
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    skipExtraInfoTxt: true,
    alert: alertModal(''),
    descricao:
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
    'ATENÇÃO:<br/>Ative as notificações do app para ser avisado quando o reparo estiver concluído.<br/><br/>'+
    'Por aqui você tem a mesma informação que receberia por telefone.',
    botoes: [
        homeButton
    ]
  },
  { //FALHA_MASSIVA_GENERICA_COM_PREVISAO
    id: 'FALHA_MASSIVA_GENERICA_COM_PREVISAO',
    gaPageName: 'falha_regiao_encontrada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: false,
      forecastDate: { exists: true },
      consulted: false,
      rescheduled: false
    },
    skipExtraInfoTxt: false,
    alert: alertModal(''),
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    descricao:
    'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
      homeButton
    ]
  },
  { //FALHA_MASSIVA_GENERICA_COM_PREVISAO_REPETIDA
    id: 'FALHA_MASSIVA_GENERICA_COM_PREVISAO_REPETIDA',
    gaPageName: 'falha_regiao_consulta_repetida',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: false,
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: false
    },
    skipExtraInfoTxt: false,
    alert: alertModal(''),
    titulo: 'Encontramos<br/>uma falha na<br/>região.',
    descricao:
    'Identificamos que você já consultou a falha da região. Ela permanece com o mesmo prazo de normalização.<br/><br/>' +
    'Previsão de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
      homeButton
    ]
  },
  { //FALHA_MASSIVA_GENERICA_COM_PREVISAO_REAPRAZADA
    id: 'FALHA_MASSIVA_GENERICA_COM_PREVISAO_REAPRAZADA',
    gaPageName: 'falha_regiao_reaprazada',
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: false,
      forecastDate: { exists: true },
      consulted: true,
      rescheduled: true
    },
    skipExtraInfoTxt: false,
    alert: alertModal(''),
    titulo: 'Ainda estamos<br>com uma falha<br>na região.',
    descricao:
    'Os técnicos informaram que vão precisar de mais tempo para resolver o problema.<br/><br/>' +
    '<strong>Nova previsão</strong> de normalização:<br/><strong>até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
      homeButton
    ]
  },
  { //FALHA_MASSIVA_SEM_PREVISAO
    id: 'FALHA_MASSIVA_SEM_PREVISAO',
    gaPageName: 'falha_regiao_lentidao_sem_previsao_encontrada',
    skipExtraInfoTxt: true,
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: false,
      forecastDate: { exists: false },
    },
    alert: alertModal(''),
    titulo: 'Encontramos uma<br/>falha na região.',
    descricao: 'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
      'ATENÇÃO:<br/> Por aqui você tem a mesma informação que receberia por telefone e ainda pode acompanhar as atualizações.',
      botoes: [
      homeButton
    ]
  },
  { //FALHA_MASSIVA_COM_PREVISAO
    id: 'FALHA_MASSIVA_COM_PREVISAO',
    gaPageName: 'falha_regiao_encontrada',
    skipExtraInfoTxt: false,
    condicao: {
      tipo: BlockTypes.FALHA_MASSIVA,
      isFalhaLentidao: false,
      forecastDate: { exists: true },
    },
    alert: alertModal(''),
    titulo: 'Encontramos uma<br/>falha na região.',
    descricao: 'Nossa equipe não precisa ir até a sua casa. Já estamos resolvendo o problema na rede da Oi.<br/><br/>' +
    'Previsão de normalização:<br/><strong> até às ::hora:: do dia ::dia::.</strong>',
    botoes: [
      homeButton
    ]
  },
  {
    id: 'REPARO',
    gaPageName: 'reparo_encontrado',
    condicao: {
      tipo: BlockTypes.REPARO,
    },
    titulo: 'Você possui um<br/>reparo em<br/>andamento.',
    descricao: 'A nossa equipe já está trabalhando<br/>no seu atendimento.',
    botoes: [
      homeButton
    ]
  },
];

export const BLOCK_FINANCIAL_CORP_CLIENTS: DiagnosticBlockModel = {
  id: 'FINANCEIRO_PF',
  condicao: {
    tipo: BlockTypes.FINANCEIRO,
  },
  gaPageName: 'bloqueio_corporativo_encontrado',
  titulo: 'Encontramos uma conta vencida.',
  descricao: 'Acesse novamente o portal Oi Soluções, baixe a 2ª via e faça o pagamento assim que possível.<br><br>' +
  'Se quiser saber mais detalhes ou tirar dúvidas, ligue pra nossa Central de Atendimento e fale com um dos nossos atendentes.',
  skipExtraInfoTxt: true,
  botoes: [
    oiSolucoesButton,
    callCenterButton,
    homeButton,
  ]
};
