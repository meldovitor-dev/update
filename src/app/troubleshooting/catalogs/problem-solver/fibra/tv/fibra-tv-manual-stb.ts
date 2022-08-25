import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../../shared/alert-catalog';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';

const getId = (id) => CatalogPrefix.TV_MANUAL_STB + id;
const alert = getAlert('tv-manual-stb', 'tv_voltou_verificando_pilhas');
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

export const FIBRA_TV_MANUAL_STB = (negativeId, config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([
    {
        id: getId(0),
        gaPageName: 'pressionar_botoes_stb_guia',
        fluxo: 'ts_manual_controle_remoto',
        layout: {
            title: 'Pressione uma vez o botão STB e depois o botão GUIA.',
            paragraph: 'O STB direciona os comandos do controle para o decodificador. ' +
            'O botão GUIA verifica se o controle está funcionando.',
            image: getImage('controle_stb.png'),
            alert: getAlert(config.alert || 'tv-manual-stb', 'tv_voltou_verificando_pilhas'),
            buttons: [
                {
                    text: 'Feito!',
                    gaAction: 'feito',
                    action: 'navigate',
                },
            ],
        },
        state: {
            on: [
                {
                    name: 'navigate',
                    action: {
                        call: 'openPopup'
                    }
                },
                {
                    name: 'nao',
                    action: {
                        call: 'nav',
                        params: {
                            id: getId(1)
                        }
                    }
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToSuccessPage'
                    }
                }
            ],
        },
    },
    {
        id: getId(1),
        gaPageName: 'verificar_pilhas',
        layout: {
            title: 'Verifique as pilhas do seu controle remoto.',
            paragraph: 'As pilhas antigas podem estar sem energia, troque por pilhas novas.',
            image: getImage('pilhas.svg'),
            alert: getAlert(config.alert || 'tv-manual-stb', 'tv_voltou_verificando_pilhas'),
            buttons: [
                {
                    text: 'Feito!',
                    action: 'navigate',
                    gaAction: 'feito',
                },
            ],
        },
        state: {
            on: [
                {
                    name: 'navigate',
                    action: {
                        call: 'openPopup'
                    }
                },
                {
                    name: 'nao',
                    action: {
                        call: 'changeModule',
                        params: {
                            id: negativeId
                        }
                    }
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToSuccessPage'
                    }
                }
            ]
        }
    }
]));
