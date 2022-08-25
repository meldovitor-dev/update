export const APPRATE = {
    USER_ACTIONS: {
        RATE_NOW: 1,
        NOT_NOW: 2,
        NO_THANKS: 3,
    },
    PLUGIN_PREFERENCES: {
        storeAppURL: {
            ios: 'https://itunes.apple.com/app/id1178728288', // ios: '1178728288',
            android: 'market://details?id=br.com.oi.tecnicovirtual',
        },
        displayAppName: 'Técnico Virtual',
        openStoreInApp: false,
        promptAgainForEachNewVersion: false,
        useCustomRateDialog: false,
        customLocale: {
            title: 'Avaliar o Técnico Virtual',
            message: 'Você recomenda o app? Dê a sua opinião e nos ajude a melhorar cada vez mais!',
            cancelButtonLabel: 'Não, Obrigado',
            laterButtonLabel: 'Lembrar Mais Tarde',
            rateButtonLabel: 'Avaliar Agora',
        },
        callbacks: {},
    },
    FEEDBACK: {
        title: 'Gostou do Técnico Virtual?',
        subTitle: 'E aí? O que achou de usar o aplicativo Técnico Virtual?',
        button1: {
            text: 'Não gostei',
            role: '',
        },
        button2: {
            text: 'Gostei',
            role: '',
        },
    },
    NEGATIVE_FEEDBACK: {
        title: 'Quer ajudar a gente a melhorar?',
        subTitle: 'Que tal nos dizer o que não foi legal?',
        input1: {
            name: 'feedback',
            placeholder: 'Feedback',
            type: 'text',
        },
        button1: {
            text: 'Agora Não',
            role: '',
        },
        button2: {
            text: 'Enviar',
            role: '',
        },
    },
    FEEDBACK_THANKS: {
        title: 'Obrigado!',
        cssClass: 'feedback-thanks',
        subTitle: 'Seu feedback é muito importante e vai nos ajudar a melhorar o Técnico Virtual.',
        button1: {
            text: 'Fechar',
            role: 'cancel',
        },
    },
};
