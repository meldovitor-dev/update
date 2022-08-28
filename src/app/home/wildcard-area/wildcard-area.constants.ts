const InformationPagesCatalog = {
    goOnline: {
        priority: 6,
        title: 'Você está offline',
        paragraph: '<p>Mesmo assim você ainda<br>pode resolver os seus<br>problemas.</p>',
        action: {
            call: 'goOnline'
        },
    },
    doLogin: {
        priority: 5,
        paragraph: '<p><b>Clique aqui e faça login</b><br>para ter atendimento<br>completo</p>',
        action: {
            call: 'goLogin'
        },
    },
    logado: {
        priority: 4,
        wild: 'user',
    },
    allowLocalization: {
        priority: 3,
        paragraph: '<p>Habilite a localização pra ter acesso a mais serviços</p>',
        action: {
            call: 'allowLocalization'
        },
    },
    allowNotification: {
        priority: 2,
        paragraph: '<p>Habilite as notificações pra ter acesso a mais serviços</p>',
        action: {
            call: 'allowNotification'
        },
    },
    goProduct: {
        priority: 1,
        paragraph: '<p>Este produto não faz parte do seu pacote contratado</p>',
        action: {
            call: 'goProduct'
        },
    },
}

export const INFO_PAGES_CATALOG = {
    goOnline: 'goOnline',
    doLogin: 'doLogin',
    logado: 'logado',
    allowLocalization: 'allowLocalization',
    allowNotification: 'allowNotification',
    goProduct: 'goProduct'
}

export const GET_HIGHEST_PRIORITY_INFO = (ids = []) => {
    const pages = [];
    ids.forEach(el => {
        pages.push(InformationPagesCatalog[el]);
    });
    pages.sort((a, b) => a.priority <= b.priority ? 1 : -1);
    return Object.assign({}, pages[0]);
}