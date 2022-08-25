import { CatalogPrefix } from './../../../../enums/catalog.enum';
import { CatalogDTO } from './../../../troubleshooting-interface';
import { CatalogModel } from '../../../troubleshooting-interface';
import { getAlert } from '../shared/alert-catalog';
import { CALL_GUIDE_ACCORDION_CONTENT } from '../fibra/shared/call-guide-accordion';
import { ABERTURA_BD } from '../shared/abertura-bd-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fixo/${name}`;
const getId = (id) => CatalogPrefix.FIXO_NAO_COMPLETA + id;
const getPage = (catalog, page = 0) => `${catalog}${page}`;

const FIXO_NAO_COMPLETA_CATALOG= (negativeId): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'selecionar_tipo_chamada',
    fluxo: 'nao_completa',
    layout: {
      title: 'Que chamadas o seu telefone fixo não faz?',
      buttons: [
        {
          text: 'Pra celular',
          action: 'navigate',
          gaAction: 'celular'
        },
        {
            text: 'Pra um DDD e DDI',
            action: 'navigate',
            gaAction: 'ddd_ddi',
        },
        {
            text: 'Pra outra operadora',
            action: 'navigate',
            gaAction: 'outra_operadora'
          },
          {
              text: 'Nenhuma ligação',
              action: 'nenhuma-ligacao',
              gaAction: 'nenhuma_ligacao',
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
              id: getId(1)
            }
          }
        },
        {
          name: 'nenhuma-ligacao',
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
    fluxo: 'como_fazer_ligacoes',
    layout: {
      contentTop: true,
      title: 'Faça uma ligação usando as orientações abaixo.',
      accordion: 'call-guide',
      accordionContent: CALL_GUIDE_ACCORDION_CONTENT,
      buttons: [
        {
          text: 'Fiz a ligação',
          action: 'feito',
          gaAction: 'feito',
          customClasses: 'outline'
        }
      ],
      alert: getAlert('fixo-title')
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
              call: 'nav',
              params: {
                  id: getId(2)
              }
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
    gaPageName: 'testar_outro_telefone',
    fluxo: 'ligacao_outro_telefone',
    layout: {
      title: 'Tente fazer a ligação de outro telefone.',
      image: getImage('ligacao_outro_telefone.svg'),
      buttons: [
        {
          text: 'Não tenho outro telefone',
          action: 'nao-tenho',
          gaAction: 'sem_outro_aparelho'
        },
        {
            text: 'Pronto! Ligação feita',
            action: 'feito',
            gaAction: 'ligacao_feita',
        },
      ],
      alert: getAlert('fixo-ligacao', 'atendeu_ligacao_testando_outro_telefone')
    },
    state: {
      on: [
        {
          name: 'nao-tenho',
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
              call: 'goToConclusionPage',
              params: {
                  id: 'destino-ligacao'
              }
          }
        },
        {
          name: 'sim',
          action: {
            call: 'goToConclusionPage',
            params: {
              id: 'telefone-anterior'
            }
          }
        }
      ],
    },
  },
]));

const catalogOnline = [
  ...FIXO_NAO_COMPLETA_CATALOG(getPage(CatalogPrefix.ABERTURA_BD, 10)),
  ...ABERTURA_BD(getPage(CatalogPrefix.FIXO_NAO_COMPLETA))
];

const catalogOffline = [
  ...FIXO_NAO_COMPLETA_CATALOG('conclusion'),
];

export const FIXO_NAO_COMPLETA: CatalogDTO = {
  authenticated: {
    catalog: catalogOnline,
    initialPage: getPage(CatalogPrefix.FIXO_NAO_COMPLETA)
  },
  default: {
    catalog: catalogOffline,
    initialPage: getPage(CatalogPrefix.FIXO_NAO_COMPLETA)
  }
};
