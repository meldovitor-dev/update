const description = {
    title: 'É importante saber:',
    paragraph: 'Ao desmarcar, a visita técnica será realizada sem data ou horário combinado. ' +
    'Isso significa que o reparo poderá ser realizado a qualquer momento sem aviso prévio.',
};

const reagendamento = {
    title: 'Confirme se você quer reagendar a visita técnica:',
    gaPageName: 'confirmar_reagendamento',
    buttons: [
        {
            txt: 'Confirmar',
            gaAction: 'confirmar',
            action: {
                call: 'reScheduling'
            }
        },
        {
            txt: 'Reagendar em outra data',
            gaAction: 'alterar_data',
            action: {
                call: 'pickDates'
            }
        }
    ],
};
const agendamento = {
    title: 'Confirme se você quer agendar a visita técnica:',
    gaPageName: 'confirmar_agendamento',
    buttons: [
        {
            txt: 'Confirmar',
            gaAction: 'confirmar',
            action: {
                call: 'scheduling'
            }
        },
        {
            txt: 'Escolher outra data',
            gaAction: 'alterar_data',
            action: {
                call: 'pickDates'
            }
        }
    ],
};
const cancelar = {
    title: 'Confirme se você quer desmarcar a visita técnica:',
    gaPageName: 'confirmar_desmarcacao',
    description,
    buttons: [
        {
            txt: 'Desmarcar',
            gaAction: 'confirmar',
            action: {
                call: 'cancelScheduling'
            }
        }
    ]
};
const success = {
    title: 'Sua visita técnica foi #context# com sucesso',
    gaPageName: 'detalhes_#context#_visita_tecnica',
    icon: 'date',
    success: true,
    buttons: [
        {
            txt: 'Ver visitas técnicas',
            gaAction: 'consultar_visitas_tecnicas',
            action: {
                call: 'goToScheduling'
            }
        }
    ]
};
const errorOnce = {
    title: 'Ocorreu um erro ao #contextRaw#',
    gaPageName: 'erro_#context#',
    paragraph: 'No momento, não foi possível concluir a solicitação. Tente agendar novamente.',
    skipDisplay: true,
    icon: 'error',
    error: true,
    buttons: [
        {
            txt: 'Tentar Novamente',
            gaAction: 'tentar_novamente',
            action: {
                call: 'pickDates'
            }
        },
        {
            txt: 'Ver visitas técnicas',
            gaAction: 'consultar_visitas_tecnicas',
            action: {
                call: 'goToScheduling'
            }
        }
    ]
};
const errorCancelOnce = {
    title: 'Ocorreu um erro ao #contextRaw#',
    gaPageName: 'erro_#context#',
    paragraph: 'No momento, não foi possível concluir a solicitação. Tente desmarcar novamente.',
    skipDisplay: true,
    icon: 'error',
    error: true,
    buttons: [
        {
            txt: 'Tentar Novamente',
            gaAction: 'tentar_novamente',
            action: {
                call: 'desmarcar'
            }
        },
        {
            txt: 'Ver visitas técnicas',
            gaAction: 'consultar_visitas_tecnicas',
            action: {
                call: 'goToScheduling'
            }
        }
    ]
};
const errorTwice = {
    title: 'Ocorreu um erro ao #contextRaw#',
    gaPageName: 'erro_#context#_segunda_tentativa',
    paragraph: 'No momento, não foi possível concluir a solicitação. Se ainda quiser agendá-la, é necessário ligar pro nosso atendimento.',
    skipDisplay: true,
    icon: 'error',
    error: true,
    buttons: [
        {
            txt: 'Ligar',
            gaAction: 'ligar',
            action: {
                call: 'callToCallCenter'
            }
        },
        {
            txt: 'Ver visitas técnicas',
            gaAction: 'consultar_visitas_tecnicas',
            action: {
                call: 'goToScheduling'
            }
        }
    ]
};
const errorCancelTwice = {
  title: 'Ocorreu um erro ao #contextRaw#',
  gaPageName: 'erro_#context#_segunda_tentativa',
  paragraph: 'No momento, não foi possível desmarcar a visita técnica. Tente novamente mais tarde ou ligue pro nosso atendimento.',
  skipDisplay: true,
  icon: 'error',
  error: true,
  buttons: [
      {
          txt: 'Ligar',
          gaAction: 'ligar',
          action: {
              call: 'callToCallCenter'
          }
      },
      {
          txt: 'Ver visitas técnicas',
          gaAction: 'consultar_visitas_tecnicas',
          action: {
              call: 'goToScheduling'
          }
      }
  ]
};
const errorId = {
    title: 'Ocorreu um erro ao agendar',
    gaPageName: 'erro_agendar',
    paragraph: 'No momento, não foi possível concluir a solicitação. Tente agendar novamente.',
    skipDisplay: true,
    icon: 'error',
    error: true,
    buttons: [
        {
            txt: 'Ligar',
            gaAction: 'ligar',
            action: {
                call: 'callToCallCenter'
            }
        },
        {
            txt: 'Voltar pro início',
            gaAction: 'voltar_inicio',
            action: {
                call: 'goToHome'
            }
        }
    ]
};

export const SCHEDULING_CONFIRM_PAGE = {
    errorOnce,
    errorCancelOnce,
    errorTwice,
    errorCancelTwice,
    errorId,
    agendamento,
    reagendamento,
    cancelar,
    success
};
