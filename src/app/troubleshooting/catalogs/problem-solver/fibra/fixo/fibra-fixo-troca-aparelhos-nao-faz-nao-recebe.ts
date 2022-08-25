import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from '../../../../troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fibra/fixo/${name}`;
const alert = getAlert('fixo-volume');
const getId = (id) => CatalogPrefix.TROCA_APARELHOS_NAO_FAZ_NAO_RECEBE + id;

export const FIBRA_FIXO_TROCA_APARELHOS_NAO_FAZ_NAO_RECEBE = (config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([

    {
        id: getId(0),
        gaPageName: 'trocar_aparelho_telefonico',
        fluxo: 'troca_aparelhos',
        layout: {
            title: 'Troque o seu aparelho telefônico por outro.',
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
                    action: 'nao',
                },
            ],
            alert,
        },
        state: {
            on: [
                {
                    name: 'a',
                    action: {
                        call: 'openPopup'
                    }
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
                        call: 'goToConclusionPage',
                        params: {
                            id: 'aparelho-telefonico'
                        }
                    }
                }
            ],
        },
    },
]));
