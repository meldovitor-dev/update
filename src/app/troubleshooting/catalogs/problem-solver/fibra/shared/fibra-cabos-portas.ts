import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from '../../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { getAlert } from './../../shared/alert-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fibra/fixo/${name}`;
const alert = getAlert('fixo');
const getId = (id) => CatalogPrefix.CABOS_E_PORTAS + id;

export const FIBRA_FIXO_CABOS_PORTAS = (negativeId, config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([

    {
        id: getId(0),
        gaPageName: 'aguardando_sinal',
        fluxo: 'ts_cabos_portas',
        layout: {
            title: 'Coloque o telefone no gancho, retire novamente e espere a linha dar sinal.',
            loading: TimerTypes.RING,
            footerTips: true,
            alert: getAlert(config.alert || 'internet','sinal_voltou'),
        },
        state: {
            on: [
                {
                    name: 'onInit',
                    action: {
                      call: 'manualCronometerProcess', params: {
                        config: 'telefoneGancho'
                      }
                    }
                  },
                  {
                    name: 'manualCronoExpired',
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
        gaPageName: 'desligar_extensoes',
        layout: {
            title: 'Desligue as extensões se tiver outros telefones.',
            paragraph: 'Utilize somente o telefone principal.',
            hiddenHeaderBackButton: true,
            image: getImage('desligaligacabo.svg'),
            buttons: [
                {
                    text: 'Próximo',
                    gaAction: 'proximo_passo',
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
                            id: getId(2),
                        },
                    },
                },
            ],
        },
    },
    {
        id: getId(2),
        gaPageName: 'retirar_cabos_fax_bina',
        layout: {
            title: 'Se tiver Fax ou Bina, retire os cabos.',
            paragraph: 'Caso tenha um dos aparelhos, desconecte o dispositivo.',
            image: getImage('fax.svg'),
            buttons: [
                {
                    text: 'Próximo',
                    gaAction: 'proximo_passo',
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
        gaPageName: 'conectar_porta_tel1',
        layout: {
            title: 'Conecte o cabo do telefone direto na porta TEL 1.',
            paragraph: 'O aparelho telefônico só funciona nesta porta do modem.',
            image: getImage('tel1.svg'),
            buttons: [
                {
                    text: 'Próximo',
                    gaAction: 'proximo_passo',
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
                        call: 'openPopup'
                    },
                },
                {
                    name: 'nao',
                    action: {
                        call: 'nav',
                        params: {
                            id: negativeId
                        }
                    }
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToConclusionPage',
                        params: {
                            id: 'aparelho_problema'
                        }
                    }
                }
            ],
        },
    }
]));
