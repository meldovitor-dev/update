import {
  CatalogDTO,
  CatalogModel
} from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { TV_ENVIA_PULSO } from './envio-pulso-catalog';
import { getAlert } from '../shared/alert-catalog';

const getPage = (catalogName, page = 0) => `${catalogName}${page}`;
const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/tv/${name}`;

const getId = id => CatalogPrefix.TV_CARTAO_INCOMPATIVEL + id;
const catalog = (negativeId: string): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    fluxo: 'cartao_incompativel',
    gaPageName: 'localizar_cartao_chip',
    layout: {
      title: 'Onde o cartão ou chip está inserido no decodificador da Oi TV? ',
      buttons: [
        {
          text: 'CARTÃO inserido na lateral',
          action: 'lateral',
          gaAction: 'cartao_lateral'
        },
        {
          text: 'CARTÃO inserido na parte de trás',
          action: 'tras',
          gaAction: 'cartao_atras'
        },
        {
          text: 'CHIP inserido na parte de trás',
          action: 'chip',
          gaAction: 'chip_atras'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'lateral',
          action: {
            call: 'nav',
            params: {
              id: getId(2)
            }
          }
        },
        {
          name: 'tras',
          action: {
            call: 'nav',
            params: {
              id: getId(3)
            }
          }
        },
        {
          name: 'chip',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'verificar_cartao_lado_decodificador',
    layout: {
      contentTop: true,
      title: 'Verifique se o cartão está inserido corretamente ao lado do decodificador.',
      image: getImage('modelo1.svg'),
      imageCaption: 'Insira o cartão com o lado da seta branca voltado pra cima e no sentido do decodificador. ' +
        'Certifique-se que o cartão está todo inserido.',
      buttons: [
        {
          text: 'Está inserido corretamente',
          action: 'feito',
          gaAction: 'correto'
        },
        {
          text: 'Outros problemas com o cartão',
          action: 'outro',
          gaAction: 'outros_problemas'
        }
      ],
      alert:  getAlert('tv-canais','tv_voltou_verificando_cartao_chip'),
    },
    state: {
      on: [
        {
          name: 'outro',
         action: {
            call: 'changeModule',
            params: {
              id: negativeId
            }
          }
        },
        {
          name: 'feito',
          action: {
            call: 'openPopup',
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
            call: 'goToSuccessPage',
          }
        }
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'verificar_cartao_atras_decodificador',
    layout: {
      contentTop: true,
      title: 'Verifique se o cartão está inserido corretamente atrás do decodificador.',
      image: getImage('modelo2.svg'),
      imageCaption: 'Insira o cartão com o lado do chip voltado pra cima e no sentido do decodificador. ' +
        'Certifique-se que o cartão está todo inserido.',
      buttons: [
        {
          text: 'Está inserido corretamente',
          action: 'feito',
          gaAction: 'correto'
        },
        {
          text: 'Outros problemas com o cartão',
          action: 'outro',
          gaAction: 'outros_problemas'
        }
      ],
      alert:  getAlert('tv-canais','tv_voltou_verificando_cartao_chip'),
    },
    state: {
      on: [
        {
          name: 'outro',
         action: {
            call: 'changeModule',
            params: {
              id: negativeId
            }
          }
        },
        {
          name: 'feito',
          action: {
            call: 'openPopup',
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
            call: 'goToSuccessPage',
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'verificar_chip_atras_decodificador',
    layout: {
      contentTop: true,
      title: 'Verifique se o CHIP está inserido corretamente atrás do decodificador.',
      image: getImage('modelo3.svg'),
      imageCaption: 'Insira o CHIP com o lado de metal voltado pra baixo. ' +
        'Certifique-se que o CHIP está todo inserido.',
      buttons: [
        {
          text: 'Está inserido corretamente',
          action: 'feito',
          gaAction: 'correto'
        },
        {
          text: 'Outros problemas com o CHIP',
          action: 'outro',
          gaAction: 'outros_problemas'
        }
      ],
      alert:  getAlert('tv-canais','tv_voltou_verificando_cartao_chip'),
    },
    state: {
      on: [
        {
          name: 'outro',
         action: {
            call: 'changeModule',
            params: {
              id: negativeId
            }
          }
        },
        {
          name: 'feito',
          action: {
            call: 'openPopup',
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
            call: 'goToSuccessPage',
          }
        }
      ]
    }
  }
]));

const catalogOnline = [
  ...catalog(getPage(CatalogPrefix.ENVIO_PULSO)),
  ...TV_ENVIA_PULSO
];

const catalogOffline = [
  ...catalog('conclusion')
];


const TV_CARTAO_INCOMPATIVEL: CatalogDTO = {
  authenticated: {
    catalog: catalogOnline,
    initialPage: getId(0)
  },
  default: {
    catalog: catalogOffline,
    initialPage: getId(0)
  }
};

export { TV_CARTAO_INCOMPATIVEL };
