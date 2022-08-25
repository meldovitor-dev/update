const description = {
    title: 'É importante saber:',
    paragraph: 'Ao desmarcar, a visita técnica será realizada sem data ou horário combinado.' +
    'Isso significa que o reparo poderá ser realizado a qualquer momento sem aviso prévio.',
};

const naoAtende = {
    title: 'Não há outras datas disponíveis no momento. Que tal manter a visita técnica atual?',
    paragraph: 'Recomendamos concluir a solicitação na data e período já agendados, mas você também pode desmarcá-la, se quiser.',
    gaPageName: 'sem_datas_disponiveis',
    buttons: [
        {
            txt: 'Manter visita',
            gaAction: 'manter_visita',
            action: {
                call: 'goToHome'
            }
        },
        {
            txt: 'Desmarcar',
            gaAction: 'cancelar',
            action: {
                call: 'cancelScheduling'
            }
        }
    ],
};
const reagendarMaisTarde = {
    title: 'Tente reagendar mais tarde.',
    gaPageName: 'tentar_reagendar_depois',
    icon: 'no-dates',
    paragraph: 'No momento, não temos outras datas disponíveis pra visita técnica. A data do agendamento não foi alterada.',
        buttons: [{
        txt: 'Voltar pro início',
        gaAction: 'voltar_inicio',
        action: {
            call: 'goToHome'
        }
    },
    {
        txt: 'Ver visitas técnicas',
        gaAction: 'visitas',
        action: {
            call: 'goToScheduling'
        }
    }]
};

const semDisponibilidade = {
    title: 'Não há datas disponíveis no momento.',
    gaPageName: 'sem_datas_disponiveis',
    icon: 'no-dates',
    paragraph: 'Pra realizar o agendamento, tente novamente mais tarde. Se preferir, aguarde uma visita técnica em até 48h.',
    buttons: [],
};

const agendarMaisTarde = {
    title: 'Tente agendar mais tarde.',
    gaPageName: 'tentar_agendar_depois',
    icon: 'no-dates',
    paragraph: 'No momento, não temos outras datas disponíveis pra visita técnica.',
    buttons: [{
        txt: 'Voltar pro início',
        gaAction: 'voltar_inicio',
        action: {
            call: 'goToHome'
        }
    },
    {
        txt: 'Ver visitas técnicas',
        gaAction: 'visitas',
        action: {
            call: 'goToScheduling'
        }
    }]
}

const slots = {
    slots: true,
    buttons: [
        {
            txt: 'Nenhuma opcão me atende',
            gaAction: 'nenhuma_opcao_atende',
            action: {
                call: 'naoAtende'
            }
        }
    ]

}

export const SCHEDULING_SLOT_PAGE = {
    naoAtende,
    reagendarMaisTarde,
    semDisponibilidade,
    agendarMaisTarde,
    slots,
}
