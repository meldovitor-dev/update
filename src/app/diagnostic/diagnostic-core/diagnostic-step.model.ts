/* eslint-disable @typescript-eslint/naming-convention */
import { InteractionEnum } from 'src/app/domain/interactions';

export interface DiagnosticStepModel {
    gaAction: string;
    executingMessage: string;
    feedbackMessage: string;
    icon: string;
    timer?: number;
    state?: 'todo' | 'doing' | 'done' | 'error';
    type?: 'financial' | 'weather' | 'repair' | 'line';
    isDelayDone?: boolean;
    interactions?: InteractionEnum[];
}
const iconPath = './assets/icon/diagnostic';
const defaultTimer = 2500;
const financialDefaultStep: DiagnosticStepModel = {
    gaAction: 'verificando_bloqueios',
    type: 'financial',
    executingMessage: 'Buscando bloqueio financeiro',
    feedbackMessage: 'Não existe bloqueio financeiro',
    icon: `${iconPath}/icone_diagnostico_bloqueio.svg`,
    state: 'doing',
};
const weatherDefaultStep: DiagnosticStepModel = {
    gaAction: 'verificando_falha_regiao',
    type: 'weather',
    executingMessage: 'Pesquisando falhas na região',
    feedbackMessage: 'Não há falhas na região',
    icon: `${iconPath}/icone_diagnostico_falhas.svg`,
};

const repairDefaultStep: DiagnosticStepModel = {
    gaAction: 'verificando_bloqueio_os',
    type: 'repair',
    executingMessage: 'Verificando serviço ou reparo aberto',
    feedbackMessage: 'Não há serviço ou reparo aberto',
    icon: `${iconPath}/icone_diagnostico_visitas.svg`,
};

const lineDefaultStep: DiagnosticStepModel = {
    gaAction: 'verificando_bloqueio_porta_dslam',
    type: 'line',
    executingMessage: 'Analisando configurações da linha',
    feedbackMessage: 'Sua linha está OK',
    icon: `${iconPath}/icone_diagnostico_linha.svg`,
};

const defaultSteps = [
    financialDefaultStep,
    weatherDefaultStep,
    repairDefaultStep,
    lineDefaultStep,
];

const getDefaultDiagnosticStep = (type: string): DiagnosticStepModel => {
    const state = defaultSteps.find(step => step.type === type);
    return Object.assign({}, {
        ...state,
        ...{
            isDelayDone: false,
            isRequestDone: false,
            state: state.state || 'todo',
            timer: state.timer || defaultTimer,
        }
    });
};

/**
 * FIBRA
 */
const diagnosticoCompleto = {
    gaPageName: 'verificar_rede',
    fluxo: 'teste_netq',
    title: 'Agora vamos verificar a sua rede.',
    paragraph: 'É importante que você continue nesta tela até o processo ser concluído.',
    interaction: InteractionEnum.fibraDiagnosticoCompleto,
    checkActionPage: {
        interaction: InteractionEnum.fibraDiagnosticoCompleto,
        key: 'diagnostiCompleto'
    }
};
const defaultConclusionStep = {
    gaPageName: 'aviso_proxima_etapa',
    title: 'Vamos precisar da sua ajuda na próxima etapa.',
    paragraph: 'Os passos a seguir podem resolver a questão.',
    buttons: [
        {
            txt: 'Ok, vamos lá!',
            gaAction: 'seguir_proxima_etapa',
            action: {
                call: 'goToTs',
            }
        }
    ]

};
/**
 * Banda Larga
 */
const reprofile = {
    gaPageName: 'aplicando_reprofile',
    fluxo: 'reprofile',
    title: 'Agora vamos verificar o status da internet',
    paragraph: 'É importante que você continue nesta tela até o processo ser concluído.',
    interaction: InteractionEnum.reprofile,
};
const resetDslManual = {
    gaPageName: 'aviso_reiniciar_sinal_novamente',
    fluxo: 'reset_repetido',
    title: 'O próximo passo seria reiniciar o sinal da banda larga',
    paragraph: 'Porém esta ação já foi realizada recentemente.<br/><br/>Gostaria de reiniciar o sinal de novo?',
    skipCrono: true,
    buttons : [
        {
            txt: 'Reiniciar o sinal',
            gaAction: 'ir_proxima_etapa',
            action: {
                call: 'updateActions'
            }
        },
        {
            txt: 'Continuar sem reiniciar',
            gaAction: 'continuar',
            action: {
                call: 'goToTs'
            }
        },
    ]
};
const resetDslNotAllowed = {
    gaPageName: 'aviso_reset_realizado_duas_vezes',
    title: 'O próximo passo seria reiniciar o sinal da internet',
    skipCrono: true,
    paragraph: 'Porém esta ação já foi realizada duas vezes recentemente.<br/><br/>' +
    'Caso o seu problema não tenha sido resolvido, recomendamos seguir pra etapa seguinte.',
    buttons : [
        {
            txt: 'Continuar',
            action: {
                call: 'goToTs'
            }
        },
        {
            txt: 'Voltar pro início',
            action: {
                call: 'goToHome'
            }
        },
    ]
};

const resetDsl = {
    gaPageName: 'reiniciando_sinal',
    fluxo: 'reset',
    preGaPageName: 'aviso_reiniciar_sinal',
    preTitle: 'Agora vamos <strong>reiniciar</strong> o sinal da internet',
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
        EXIGIR_CONFIRMACAO: resetDslManual,
        NEGADO: resetDslNotAllowed
    }

};

const FIBRA_DIAGNOSTIC = {
    checkStatusStep: [
        {
            ...getDefaultDiagnosticStep('financial'),
            ...{
                interactions: [InteractionEnum.fibraConsultaStatus]
            }
        },
        getDefaultDiagnosticStep('weather'),
        getDefaultDiagnosticStep('repair'),
    ],
    automaticStep: [
        diagnosticoCompleto,
    ],
    conclusionStep: [
        defaultConclusionStep
    ]
};
const BANDA_LARGA_DIAGNOSTIC = {
    checkStatusStep: [
        {
            ...getDefaultDiagnosticStep('financial'),
            ...{
                interactions: [InteractionEnum.consultaStatusFinanceiro, InteractionEnum.consultaEventosVulto]
            }
        },
        getDefaultDiagnosticStep('weather'),
        getDefaultDiagnosticStep('repair'),
        {
            ...getDefaultDiagnosticStep('line'),
            ...{
                interactions: [InteractionEnum.consultaStatusTerminal]
            }
        },
    ],
    automaticStep: [
        reprofile,
        resetDsl
    ],
    conclusionStep: [
        {
            title: 'Pronto!',
            gaPageName: 'internet_voltou',
            paragraph: 'A internet voltou a funcionar?',
            buttons: [
                {
                    txt: 'Ainda não',
                    gaAction: 'nao',
                    action: {
                        call: 'goToTs',
                    }
                },
                {
                    txt: 'Sim',
                    gaAction: 'sim',
                    action: {
                        call: 'goToSuccess',
                    }
                }
            ]

        },
        {
          title: 'Pronto!',
          gaPageName: 'internet_voltou',
          paragraph: 'A sua internet está mais rápida?',
          buttons: [
              {
                  txt: 'Ainda não',
                  gaAction: 'nao',
                  action: {
                      call: 'goToTs',
                  }
              },
              {
                  txt: 'Sim',
                  gaAction: 'sim',
                  action: {
                      call: 'goToSuccess',
                  }
              }
          ]
      },
    ]
};
const FIXO_DIAGNOSTIC = {
    checkStatusStep: [
        {
            ...getDefaultDiagnosticStep('financial'),
            ...{
                interactions: [InteractionEnum.consultaStatusFinanceiro, InteractionEnum.consultaEventosVulto]
            }
        },
        getDefaultDiagnosticStep('weather'),
        getDefaultDiagnosticStep('repair'),
    ],
    automaticStep: [],
    conclusionStep: [
        defaultConclusionStep,
    ]
};
const TVDTH_DIAGNOSTIC = {
    checkStatusStep: [
        {
            ...getDefaultDiagnosticStep('financial'),
            ...{
                interactions: [InteractionEnum.tvConsultaStatus]
            }
        },
        getDefaultDiagnosticStep('weather'),
        getDefaultDiagnosticStep('repair'),
    ],
    automaticStep: [

    ],
    conclusionStep: [
        defaultConclusionStep,
    ]
};

export const getDiagnosticFlow = (id) => {
    const flowWrapper = {
        bl: BANDA_LARGA_DIAGNOSTIC,
        fixo: FIXO_DIAGNOSTIC,
        tv: TVDTH_DIAGNOSTIC,
        fibra: FIBRA_DIAGNOSTIC,
    };
    return JSON.parse(JSON.stringify(flowWrapper[id] || FIBRA_DIAGNOSTIC));
};
