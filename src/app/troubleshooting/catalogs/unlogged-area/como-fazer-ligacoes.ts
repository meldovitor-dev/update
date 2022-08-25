import { PageConfigModel } from './../../troubleshooting-interface';
import { CatalogModel } from '../../troubleshooting-interface';
import { CALL_GUIDE_ACCORDION_CONTENT } from '../problem-solver/fibra/shared/call-guide-accordion';

const pageConfig: PageConfigModel = {
  feedback: {
    gaPageName: 'avaliar_dicas',
    title: 'Estas dicas foram úteis?',
    buttons: [
      {
        text: 'Não',
        action: 'goHomeFeedback',
        gaAction: 'nao'
      },
      {
        text: 'Sim',
        action: 'goHomeFeedback',
        gaAction: 'util'
      }
    ],
    state:
    {
      name: 'goHomeFeedback',
      action: {
        call: 'navigateToHome'
      }
    }
  }
};

export const COMO_FAZER_LIGACOES: CatalogModel[] = [
  {
    id: 0,
    gaPageName: 'ligar_seguindo_orientacoes',
    fluxo: 'como_fazer_ligacoes_ddd_ddi',
    pageConfig,
    layout: {
      accordion: 'call-guide',
      contentTop: true,
      title: 'Veja como fazer ligações:',
      buttons: [
        {
          text: 'Voltar pro início',
          gaAction: 'voltar_inicio',
          action: 'goToHome',
          customClasses: 'outline'
        }
      ],
      accordionContent: CALL_GUIDE_ACCORDION_CONTENT,
    },
    state: {
      on: [
        {
          name: 'goToHome',
          action: {
            call: 'goToHome',
          }
        }
      ]
    }
  }
];
