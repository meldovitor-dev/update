import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { BlockTypes } from 'src/app/enums/catalog.enum';
import { DiagnosticBlockButtonsModel } from 'src/app/models/diagnostic-block-model';

export const CARD_DIAGNOSTIC_TEMPLATE = {
    weather: {
        title: 'Encontramos uma falha na região',
        icon: 'tower'
    },
    financial: {
        title: 'Encontramos uma conta vencida',
        icon: 'wallet'
    },
    resolved: {
      title: 'A falha na sua região já foi resolvida',
      icon: 'resolved-tower'
    }
};

export const CARD_SPECIFIC_FINANCIAL_TITLE = {
  [ProductCodeEnum.FIBRA]: 'Seu Oi Fibra está bloqueado',
  [ProductCodeEnum.BANDA_LARGA]: 'Sua internet está bloqueada',
  [ProductCodeEnum.FIXO]: 'Seu fixo está bloqueado',
  [ProductCodeEnum.TVDTH]: 'Sua tv está bloqueada',
};

const homeButton: DiagnosticBlockButtonsModel = {
    texto: 'Voltar pro início',
    acao: {
        nome: 'goToHome',
        params: {}
    },
    gaAction: 'voltar_inicio',
};

const choiceAProblem = {
    skipExtraInfoTxt: true,
    id: 'FALHA_MASSIVA_ESCOLHER_PROBLEMA',
    gaPageName: 'selecionar_reparo_home',
    condicao: {
        tipo: BlockTypes.FALHA_MASSIVA
    },
    titulo: 'Neste caso, selecione uma opção de reparo na tela inicial do app.',
    descricao: 'Volte pro início e selecione o reparo relacionado ao seu problema na home do app.',
    botoes: [
        homeButton
    ]
};
const waitFailGoesAway = {
    id: 'FALHA_MASSIVA_ESPERAR',
    gaPageName: 'aguardar_correcao_falha',
    condicao: {
        tipo: BlockTypes.FALHA_MASSIVA
    },
    titulo: 'Neste caso é necessário aguardar até a falha ser resolvida.',
    botoes: [
        homeButton
    ]
};

const fibraFalhaMassiva = {
    skipExtraInfoTxt: true,
    botoes: [{
        texto: 'Estou com internet lenta',
        acao: {
            nome: 'nav',
            params: {
                page: waitFailGoesAway
            }
        },
        gaAction: 'internet_lenta',
    },
    {
        texto: 'Meu problema é outro',
        acao: {
            nome: 'nav',
            params: {
                page: choiceAProblem
            },
            gaAction: 'outro_problema',
        }
    }]
};

const fibraFalhaMassivaTv = {
    skipExtraInfoTxt: true,
    botoes: [{
        texto: 'Este é o meu problema',
        acao: {
            nome: 'nav',
            params: {
                page: waitFailGoesAway
            }
        },
        gaAction: 'internet_lenta',
    },
    {
        texto: 'Meu problema é outro',
        acao: {
            nome: 'nav',
            params: {
                page: choiceAProblem
            },
            gaAction: 'outro_problema',
        }
    }]
};

/**
 * PAGES O OVERRITE DEFAULT BEHAVIOR ON FALHA MASSIVA
 */
export const NON_DEFAULT_PAGES = {
    FALHA_MASSIVA_LENTIDAO_IPTV_SEM_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_SEM_PREVISAO: fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_SEM_PREVISAO: fibraFalhaMassiva,
    FALHA_MASSIVA_CANAIS_MENOR_5_SEM_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_CANAIS_MENOR_5_COM_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_CANAIS_MAIOR_5_SEM_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_CANAIS_MAIOR_5_COM_PREVISAO: fibraFalhaMassivaTv,


    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_REPETIDA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_REAPRAZADA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_GENERICA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_GENERICA_REPETIDA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_GENERICA_REAPRAZADA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_DE_LENTIDAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_DE_LENTIDAO_REPETIDA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_VOIP_COM_PREVISAO_DE_LENTIDAO_REAPRAZADA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_INTERNET_SEM_PREVISAO_INTERNET_LENTA: fibraFalhaMassivaTv,

    FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO: fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_REPETIDA:fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_REAPRAZADA:fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_GENERICO_INTERNET_LENTA: fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_GENERICO_INTERNET_LENTA_REPETIDA: fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_GENERICO_INTERNET_LENTA_REAPRAZADA: fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA: fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA_REPETIDA: fibraFalhaMassiva,
    FALHA_MASSIVA_LENTIDAO_INTERNET_COM_PREVISAO_INTERNET_LENTA_REAPRAZADA: fibraFalhaMassiva,


    FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO_REPETIDA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_LENTIDAO_IPTV_COM_PREVISAO_REAPRAZADA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_GENERICA_IPTV_COM_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_GENERICA_IPTV_COM_PREVISAO_REPETIDA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_GENERICA_IPTV_COM_PREVISAO_REAPRAZADA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO_REPETIDA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MENOR_5_PREVISAO_REAPRAZADA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO: fibraFalhaMassivaTv,
    FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO_REPETIDA: fibraFalhaMassivaTv,
    FALHA_MASSIVA_DE_LENTIDAO_CANAIS_MAIOR_5_PREVISAO_REAPRAZADA: fibraFalhaMassivaTv,
};
