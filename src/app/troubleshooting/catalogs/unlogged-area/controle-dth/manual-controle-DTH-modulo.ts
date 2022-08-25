import { CatalogModel, PageConfigModel } from '../../../troubleshooting-interface';
import { MANUAL_RCU_DEFAULT_MODULO } from './rcu-default';
import { MANUAL_RCU_LOWEND_MODULO } from './rcu-low-end';

const getImage = (name: string) => `assets/images/troubleshooting/unlogged-area/controle-dth/${name}`;

const pageConfig: PageConfigModel = {
  feedback: {
    gaPageName: 'avaliacao_dicas',
    title: 'Estas dicas foram úteis?',
    buttons: [
      {
        text: 'Não',
        action: 'goHomeFeedback',
        gaAction: 'nao_util'
      },
      {
        text: 'Sim',
        action: 'goHomeFeedback',
        gaAction: 'util'
      }
    ],
    state: {
      name: 'goHomeFeedback',
      action: {
        call: 'navigateToHome'
      }
    }
  }
};

export const MANUAL_CONTROLE_DTH: CatalogModel[] = [
  {
    id: 0,
    gaPageName: 'selecionar_modelo_controle',
    fluxo: 'conhecendo_controle_remoto',
    pageConfig,
    layout: {
      contentTop: true,
      title: 'Qual o seu controle remoto?',
      paragraph: 'Selecione o controle que possui e clique em avançar',
      imageSelector: [
        {
          stateName: 'low-end',
          imgPath: getImage('controle_lowend.png'),
          gaName: 'modelo_a'
        },
        {
          stateName: 'default',
          imgPath: getImage('controle_default.png'),
          gaName: 'modelo_b'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'default',
          action: {
            call: 'nav',
            params: {
              id: 1
            }
          }
        },
        {
          name: 'low-end',
          action: {
            call: 'nav',
            params: {
              id: 2
            }
          }
        }
      ]
    }
  },
  // SLIDE RCU DEFAULT
  {
    id: 1,
    gaPageName: '',
    pageConfig,
    layout: {
      slides: MANUAL_RCU_DEFAULT_MODULO
    },
    state: {
      on: []
    }
  },
  // SLIDE RCU LOW END
  {
    id: 2,
    gaPageName: '',
    pageConfig,
    layout: {
      slides: MANUAL_RCU_LOWEND_MODULO
    },
    state: {
      on: []
    }
  }
];
