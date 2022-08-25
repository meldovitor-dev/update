import { CatalogPrefix } from './../../../../../enums/catalog.enum';
import { CatalogModel } from '../../../../troubleshooting-interface';
import { getAlert } from './../../shared/alert-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fibra/fixo/${name}`;
const alert = getAlert('fixo','fixo_voltou_trocando_aparelho_telefonico');
const getId = (id) => CatalogPrefix.TROCA_APARELHOS + id;

export const FIBRA_FIXO_TROCA_APARELHOS = (): CatalogModel[] => JSON.parse(JSON.stringify([

    {
        id: getId(0),
        gaPageName: 'trocar_aparelho_telefonico',
        fluxo: 'trocar-aparelhos',
        layout: {
            title: 'Troque o seu aparelho telefônico por outro.',
            image: getImage('trocar-aparelho.svg'),
            alphabetical: true,
            buttons: [
                {
                    text: 'Troquei o aparelho',
                    gaAction: 'trocado',
                    action: 'a',
                    customClasses: '',
                },
                {
                    text: 'Não possuo outro aparelho',
                    gaAction: 'sem_outro_aparelho',
                    action: 'b',
                    customClasses: '',
                },
            ],
        },
        state: {
            on: [
                {
                    name: 'a',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(1)
                        }
                    }
                },
                {
                    name: 'b',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(2)
                        }
                    }
                }
            ],
        },
    },
    {
        id: getId(1),
        gaPageName: 'confirmar_conexao_porta_tel1',
        layout: {
            title: 'Confirme se o cabo continua na porta TEL 1.',
            paragraph: 'O aparelho telefônico só funciona nesta porta do modem.<br><br>' +
            'Lembre-se que um novo aparelho também pode apresentar defeitos.',
            image: getImage('tel1.svg'),
            buttons: [
                {
                    text: 'Próximo',
                    gaAction: 'seguir',
                    action: 'navigate',
                },
            ],
            alert,
        },
        state: {
            on: [
                {
                    name: 'navigate',
                    action: {
                        call: 'openPopup',
                    },
                },
                {
                    name: 'nao',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(3)
                        }
                    }
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToConclusionPage',
                        params: {
                            id: 'aparelho-telefonico'
                        }
                    }
                }
            ],
        },
    },
    {
        id: getId(2),
        gaPageName: 'resolver_outra_forma',
        layout: {
            title: 'Tudo bem! Ainda podemos resolver o problema.',
            buttons: [
                {
                    text: 'Continuar',
                    gaAction: 'seguir_proxima_etapa',
                    action: 'navigate',
                },
            ],
        },
        state: {
            on: [
                {
                    name: 'navigate',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(3),
                        },
                    },
                },
            ],
        },
    },
    {
        id: getId(3),
        gaPageName: 'trocar_cabo_telefonico',
        layout: {
            title: 'Troque o seu cabo telefônico por outro.',
            paragraph: 'O cabo de telefone, normalmente, é da cor cinza.',
            image: getImage('tel2.svg'),
            alphabetical: true,
            buttons: [
                {
                    text: 'Cabo trocado',
                    gaAction: 'cabo_trocado',
                    action: 'openPopup',
                },
                {
                    text: 'Não tenho outro cabo',
                    gaAction: 'sem_outro_cabo',
                    action: 'nao',
                },
            ],
            alert,
        },
        state: {
            on: [
                {
                    name: 'openPopup',
                    action: {
                        call: 'openPopup'
                    },
                },
                {
                    name: 'nao',
                    action: {
                        call: 'goToConclusionPage',
                    }
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToSuccessPage',
                    }
                }
            ],
        },
    },
    {
        id: getId(4),
        gaPageName: 'nao_sucesso_problema_aparelho_telefonico',
        layout: {
            title: 'O problema pode estar no seu aparelho telefônico',
            buttons: [
                {
                    text: 'Voltar pro início',
                    gaAction: 'voltar_inicio',
                    action: 'navigate',
                },
            ],
        },
        state: {
            on: [
                {
                    name: 'navigate',
                    action: {
                        call: 'goToHome'
                    },
                }
            ],
        },
    },
]));
