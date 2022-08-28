const pendingPagesCatalog = {
    goOnline: {
        priority: 2,
        paragraph: 'Fique online para ter um atendimento completo',
        button: {
            gaAction: 'abrir_redes',
            action: {
                call: 'goOnline'
            },
            txt: 'Abrir redes'
        }
    },
    doLogin: {
        priority: 1,
        isLogin: true,
        shouldDisableBtn: true,
        paragraph: 'Digite o CPF ou CNPJ do titular para fazer o login e ter um atendimento completo:',
        button: {
            gaAction: 'fazer_login',
            action: {
                call: 'goLogin'
            },
            txt: 'Login'
        }
    }
}

export const PENDING_PAGES_CATALOG = {
    goOnline: 'goOnline',
    doLogin: 'doLogin'
}

export const GET_HIGHEST_PRIORITY_PENDENCE = (ids = []) => {
    const pages = [];
    ids.forEach(el => {
        pages.push(pendingPagesCatalog[el]);
    });
    pages.sort((a, b) => a.priority <= b.priority ? 1 : -1);
    return pages[0];
}
