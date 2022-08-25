import { CatalogPrefix } from './../../../../../enums/catalog.enum';
import { CatalogModel } from '../../../../troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';
import { CALL_GUIDE_ACCORDION_CONTENT } from '../shared/call-guide-accordion';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fibra/fixo/${name}`;
const successId = 99;
const alert = getAlert('fixo');
const getId = (id) => CatalogPrefix.TROCA_APARELHOS_NAO_FAZ + id;

export const FIBRA_FIXO_TROCA_APARELHOS_NAO_FAZ = (config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([

    {
        id: getId(0),
        gaPageName: 'selecionar_tipo_de_chamadas',
        fluxo: 'ts_chamadas',
        layout: {
            title: 'Que tipo de chamadas o seu telefone fixo não faz?',
            alphabetical: true,
            buttons: [
                {
                    text: 'Pra números específicos',
                    gaAction: 'numeros_especificos',
                    action: 'a',
                },
                {
                    text: 'Pra todos os números',
                    gaAction: 'todos_numeros',
                    action: 'b',
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
        gaPageName: 'ligar_seguindo_orientacoes',
        fluxo: 'ts_chamadas',
        layout: {
            contentTop: true,
            accordion: 'call-guide',
            title: 'Faça uma ligação usando as orientações abaixo',
            alert,
            buttons: [
                {
                    text: 'Continuar',
                    gaAction: 'seguir',
                    action: 'navigate',
                }
            ],
            accordionContent: CALL_GUIDE_ACCORDION_CONTENT
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
                    name: 'sim',
                    action: {
                        call: 'goToSuccessPage',
                        params: {
                            id: 'goToSuccess',
                        }
                    },
                },
                {
                    name: 'nao',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(2)
                        }
                    },
                }
            ],
        },
    },
    {
        id: getId(2),
        gaPageName: 'trocar_aparelho_telefonico',
        layout: {
            title: 'Troque o seu aparelho telefônico por outro.',
            image: getImage('trocar-aparelho.svg'),
            alphabetical: true,
            buttons: [
                {
                    text: 'Troquei o aparelho',
                    gaAction: 'sem_outro_aparelho',
                    action: 'a',
                },
                {
                    text: 'Não possuo outro aparelho',
                    gaAction: 'trocado',
                    action: 'nao',
                }
            ],
            alert,
        },
        state: {
            on: [
                {
                    name: 'a',
                    action: {
                        call: 'openPopup',
                    },
                },
                {
                    name: 'nao',
                    action: {
                        call: 'goToConclusionPage'
                    },
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToConclusionPage',
                        params: {
                            id: 'aparelho-telefonico'
                        }
                    },
                }
            ],
        },
    }
]));
