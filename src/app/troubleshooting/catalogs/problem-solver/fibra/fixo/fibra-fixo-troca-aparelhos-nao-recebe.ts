import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from '../../../../troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fibra/fixo/${name}`;
const alert = getAlert('fixo-volume');
const getId = (id) => CatalogPrefix.TROCA_APARELHOS_NAO_RECEBE + id;

export const FIBRA_FIXO_TROCA_APARELHOS_NAO_RECEBE = (config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([

    {
        id: getId(0),
        gaPageName: 'selecionar_tipo_chamada',
        fluxo: 'ts_troca_aparelhos',
        layout: {
            title: 'Que tipo de chamadas o seu telefone fixo não recebe?',
            alphabetical: true,
            buttons: [
                {
                    text: 'De números específicos',
                    gaAction: 'numeros_especificos',
                    action: 'a',
                },
                {
                    text: 'De todos os números',
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
                        call: 'goToConclusionPage'
                    }
                },
                {
                    name: 'b',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(1)
                        }
                    }
                }
            ],
        },
    },
    {
        id: getId(1),
        gaPageName: 'trocar_aparelho_telefonico',
        layout: {
            title: 'Troque o seu aparelho telefônico por outro.',
            paragraph: 'O cabo deve se manter conectado na porta TEL 1 do seu modem. <br/><br/>' +
            'Lembre-se que um novo aparelho também pode apresentar defeitos.',
            image: getImage('trocar-aparelho.svg'),
            alphabetical: true,
            buttons: [
                {
                    text: 'Troquei o aparelho',
                    gaAction: 'trocado',
                    action: 'a',
                },
                {
                    text: 'Não possuo outro aparelho',
                    gaAction: 'sem_outro_aparelho',
                    action: 'b',
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
                    name: 'b',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(4)
                        }
                    }
                },
                {
                    name: 'nao',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(4)
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
                },
            ],
        },
    },

    {
        id: getId(4),
        gaPageName: 'aumentar_volume_telefone',
        layout: {
            title: 'Tente aumentar o volume do som do seu telefone.',
            paragraph: 'O áudio do aparelho pode estar baixo, aumente o volume e teste novamente.',
            buttons: [
                {
                    text: 'Feito!',
                    gaAction: 'feito',
                    action: 'openPopup',
                },
            ],
            alert: getAlert('fixo-volume','fixo_voltou_aumentando_volume_telefone'),
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
                        call: 'goToConclusionPage'
                    },
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToSuccessPage',
                    },
                }
            ],
        },
    },
]));
