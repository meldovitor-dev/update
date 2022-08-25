import { CatalogPrefix } from '../../../../enums/catalog.enum';
import { CatalogModel } from '../../../troubleshooting-interface';
import { getAlert } from '../shared/alert-catalog';

const getId = id => CatalogPrefix.SINTONIZAR_CANAL + id;
export const SINTONIZAR_CANAL: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'verificar_tv_sintonizada_hdmi',
    fluxo: 'sintonizar_canal',
    layout: {
      title: 'A TV está sintonizada em HDMI? ',
      paragraph: 'Pra encontrar a solução, será necessário sintonizar a sua TV em modo HDMI.',
      alphabetical: true,
      buttons: [
        {
          text: 'Sim, está sintonizada',
          action: 'sim',
          gaAction: 'sim',
        },
        {
          text: 'Não está sintonizada',
          action: 'not-sync',
          gaAction: 'nao',
        },
        {
          text: 'A TV não possui HDMI',
          action: 'no-hdmi',
          gaAction: 'nao_possui',
        },
        {
          text: 'Não sei reconhecer',
          action: 'nao-sei',
          gaAction: 'nao_reconheco',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'sim',
          action: {
            call: 'nav',
            params: {
              id: getId(1),
            }
          }
        },
        {
          name: 'not-sync',
          action: {
            call: 'nav',
            params: {
              id: getId(3),
            }
          }
        },
        {
          name: 'no-hdmi',
          action: {
            call: 'goToConclusionPage',
          }
        },
        {
          name: 'nao-sei',
          action: {
            call: 'nav',
            params: {
              id: getId(2),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'sintonizar_canal',
    layout: {
      title: 'Então sintonize no canal 31 ou 33 da sua TV e veja se o mosaico de canais aparece corretamente.',
      buttons: [
        {
          text: 'Feito',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
      alert: getAlert('tv-canais','tv_voltou_sintonizando_canal')
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'openPopup',
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
            call: 'goToSuccessPage',
          }
        }
      ],
    },
  },
  {
    id: getId(2),
    gaPageName: 'identificar_hdmi',
    layout: {
      title: 'Tudo bem! Vamos te ajudar a identificar.',
      paragraph: 'Clique no botão "INPUT" ou "SOURCE" no controle remoto da sua TV. ' +
        'Em seguida, coloque a sua TV sintonizada na opção HDMI que está conectada ao seu decodificador.',
      buttons: [
        {
          text: 'HDMI identificado',
          action: 'sim',
          gaAction: 'sim',
        },
        {
          text: 'A TV não possui HDMI',
          action: 'no-hdmi',
          gaAction: 'nao_possui',
        },
      ]
    },
    state: {
      on: [
        {
          name: 'sim',
          action: {
            call: 'nav',
            params: {
              id: getId(3),
            }
          }
        },
        {
          name: 'no-hdmi',
          action: {
            call: 'goToConclusionPage',
          }
        },
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'sintonizar_hdmi',
    layout: {
      title: 'Sintonize a sua TV em HDMI antes de continuarmos.',
      buttons: [
        {
          text: 'Feito',
          action: 'feito',
          gaAction: 'feito',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(1),
            }
          }
        }
      ]
    }
  }
];
