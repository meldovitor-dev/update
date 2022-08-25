const nextBtn = {
    txt: 'Próximo',
    action: 'next',
    gaAction: 'seguir'
};

export const WIZARD_PAGES = [
    {
        title: 'Resolva por aqui problemas de Fibra, Internet, TV e Fixo da Oi.',
        buttons: [
            nextBtn,
        ]
    },
    {
        titleSection: 'Você também pode:',
        items: [
            {
                txt: 'Trocar senha do Wi-Fi',
                icon: 'signal'
            },
            {
                txt: 'Consultar reparos e serviços',
                icon: 'tecnician'
            },
            {
                txt: 'Acompanhar falhas na região',
                icon: 'weather'
            },
            {
                txt: 'Identificar quem usa sua rede',
                icon: 'network'
            }
        ],
        buttons: [
            nextBtn
        ]
    },
    {
        title: 'Encontre soluções rápidas, antes de ligar pro atendimento.',
        buttons: [
            {
                txt: 'Começar a usar',
                action: 'goToProductSelection',
                gaAction: 'comecar'
            }
        ]
    }
];
