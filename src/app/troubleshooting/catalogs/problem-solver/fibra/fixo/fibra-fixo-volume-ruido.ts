import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from '../../../../troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fibra/fixo/${name}`;
const alert = getAlert('fixo-volume');
const getId = (id) => CatalogPrefix.VOLUME_RUIDO + id;

export const FIBRA_FIXO_VOLUME_RUIDO = (catalogId): CatalogModel[] => JSON.parse(JSON.stringify([

    {
        id: getId(0),
        gaPageName: 'selecionar_tipo_problema_ligacao',
        fluxo: 'ruido',
        layout: {
            title: 'Qual é o problema na ligação?',
            alphabetical: true,
            buttons: [
                {
                    text: 'Som muito baixo',
                    gaAction: 'som_muito_baixo',
                    action: 'a',
                },
                {
                    text: 'Ruídos ou interferências',
                    gaAction: 'ruidos_interferencias',
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
                            id: catalogId
                        }
                    }
                }
            ],
        },
    },
    {
        id: getId(1),
        gaPageName: 'aumentar_volume_telefone',
        fluxo: 'ts_volume',
        layout: {
            title: 'Tente aumentar o volume do som do seu telefone.',
            paragraph: 'O áudio do aparelho pode estar baixo, aumente o volume e teste novamente.',
            buttons: [
                {
                    text: 'Feito!',
                    gaAction: 'feito',
                    action: 'navigate',
                }
            ],
            alert
        },
        state: {
            on: [
                {
                    name: 'navigate',
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
                        call: 'goToSuccessPage'
                    },
                }
            ],
        },
    },
]));
