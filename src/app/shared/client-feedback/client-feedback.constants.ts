export enum FeedbackEnum {
  SERVICO = 'servico',
  APLICATIVO = 'app',
  PROBLEMA = 'problema',
  CONCLUSAO = 'conclusao',
  SAIR = 'sair',
}

const FEEDBACK_CATALOG: FeedbackInterface[] = [
  {
    id: FeedbackEnum.SERVICO,
    gaPageName: 'avaliar_servico',
    title: 'Você esta satisfeito com o serviço que você tem contratado na Oi?',
    emotionScale: true,
    button: {
      text: 'Enviar',
      gaAction: 'enviar_avaliacao',
      action: {
        call: 'updatePage',
        params: {
          id: FeedbackEnum.APLICATIVO,
        },
      },
    },
  },
  {
    id: FeedbackEnum.APLICATIVO,
    gaPageName: 'avaliar_tecnico_virtual',
    title: 'E com o Técnico Virtual? Como você avalia sua experiência?',
    emotionScale: true,
    button: {
      text: 'Enviar',
      gaAction: 'enviar_avaliacao',
      action: {
        call: 'checkAndUpdate',
        params: {
          goodFeedback: {
            id: FeedbackEnum.CONCLUSAO,
          },
          badFeedback: {
            id: FeedbackEnum.PROBLEMA,
          },
        },
      },
    },
  },
  {
    id: FeedbackEnum.PROBLEMA,
    gaPageName: 'explicar_avaliacao',
    title: 'Por que você deu esta nota?',
    problemsList: [
      { label: 'Não tem a opção que preciso', feedback: 'nao_tem_opcao' },
      { label: 'Não é fácil de usar', feedback: 'dificil_usar' },
      { label: 'Não resolveu totalmente meu problema', feedback: 'nao_resolveu_problema' },
      { label: 'Problemas com login', feedback: 'problemas_login' },
      { label: 'Precisa de internet para usar', feedback: 'precisa_internet' }
    ],
    button: {
      text: 'Enviar',
      gaAction: 'enviar_avaliacao',
      action: {
        call: 'goToConclusion',
        params: {
          id: FeedbackEnum.CONCLUSAO,
        },
      },
    },
  },
  {
    id: FeedbackEnum.CONCLUSAO,
    gaPageName: 'agradecimento_avaliacao',
    title: 'Obrigado!<br>Sua opinião foi importante pra nós.',
    icon: './assets/icon/success-page/nota4.svg',
    button: {
      text: 'Fechar',
      gaAction: 'concluir',
      action: {
        call: 'dismiss',
      },
      customClasses: 'outline',
    },
  },
  {
    id: FeedbackEnum.SAIR,
    gaPageName: 'lembrete_avaliacao',
    title: 'Não esqueça de avaliar o Técnico Virtual.',
    leaveButtons: true
  },
];
export const GET_FEEDBACK_PAGE = (id) =>
  FEEDBACK_CATALOG.find((el) => el.id === id);

export interface FeedbackInterface {
  id: FeedbackEnum;
  gaPageName: string;
  title: string;
  button?: FeedbackButtonInterface;
  icon?: string;
  emotionScale?: boolean;
  leaveButtons?: boolean;
  problemsList?: {label: string, feedback: string}[];
}

export interface FeedbackButtonInterface {
  text: string;
  gaAction: string;
  action: any;
  customClasses?: string;
}
