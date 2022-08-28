// import { ButtonCatalogModel } from './../../troubleshooting/troubleshooting-interface';

interface MigracaoCatalogModel {
  id: string;
  fluxo?: string;
  gaPageName?: string;
  title: string;
  paragraph: string;
  smallParagraph?: string;
  buttons?: any[];
  agedamentoList?: boolean;
  noCloseButton?: boolean;
}

const MIGRACAO_CATALOG: MigracaoCatalogModel[] = [
  {
    id: 'fibra-intro-no-delta',
    fluxo: 'migracao_fibra',
    gaPageName: 'aviso_fibra_disponivel',
    title: 'A Oi Fibra já está disponível na sua região!',
    paragraph: 'Vamos trocar a tecnologia dos seus produtos atuais pra fibra óptica, que é uma tecnologia muito mais moderna e estável.<br><br>' +
      'Tenha mais velocidade e estabilidade pra navegar na internet, assistir filmes e séries, jogar online e muito mais.<br><br>' +
      'A mudança não tem custo nenhum pra você,<b>é gratuita!</b>',
    buttons: [
      {
        text: 'Eu quero',
        gaAction: 'confirmar_migracao',
        action: 'goToNextMigrationStep',
      },
      {
        text: 'Não quero',
        gaAction: 'nao_deseja_migrar',
        action: 'closeModal',
        customClasses: 'white'
      }
    ]
  },
  {
    id: 'fibra-intro-has-delta',
    fluxo: 'migracao_fibra',
    gaPageName: 'aviso_fibra_disponivel',
    title: 'A Oi Fibra já está disponível na sua região!',
    paragraph: 'Vamos trocar a tecnologia dos seus produtos atuais pra fibra óptica, que é uma tecnologia muito mais moderna e estável.<br><br>' +
      'Peça <b>Oi Fibra</b> com até <b>1 Giga*</b> e tenha mais velocidade e estabilidade pra navegar na internet, assistir filmes e séries, jogar online e muito mais.<br><br>' +
      'Quer agendar a mudança pra Oi Fibra agora mesmo?',
    smallParagraph: '*Sujeito a viabilidade de internet na sua região.',
    buttons: [
      {
        text: 'Eu quero',
        gaAction: 'confirmar_migracao_direcionar_minha_oi',
        action: 'goToIAB',
      },
      {
        text: 'Não quero',
        gaAction: 'nao_deseja_migrar',
        action: 'closeModal',
        customClasses: 'white'
      }
    ]
  },
  {
    id: 'fibra-fake-agendamento',
    gaPageName: 'reservar_data_instalacao',
    title: 'Agora é preciso reservar uma data pro nosso time fazer a instalação',
    paragraph: 'Escolha uma das opções:',
    agedamentoList: true,
    buttons: [
      {
        text: 'Avançar',
        gaAction: 'seguir',
        action: 'goToConclusion',
      },
      {
        text: 'Voltar',
        gaAction: 'botao_voltar',
        action: 'getInitPage',
        customClasses: 'white'
      }
    ]
  },
  {
    id: 'fibra-conclusao-has-data',
    gaPageName: 'agendamento_concluido',
    noCloseButton: true,
    title: 'Agendamento realizado!',
    paragraph: 'Enviaremos a confirmação da data de instalação pelo WhatsApp com todas as informações.<br><br>' +
      'Se você quiser alterar o agendamento, é só remarcar pelo link que vai estar lá.',
    buttons: [
      {
        text: 'Ok',
        gaAction: 'aceito',
        action: 'sendFeeback',
        customClasses: 'white'
      }
    ]
  },
  {
    id: 'fibra-conclusao-no-data',
    gaPageName: 'aviso_verificacao_agenda_tecnico',
    noCloseButton: true,
    title: 'Vamos verificar a agenda do time técnico',
    paragraph: 'Assim que tivermos o dia e o período disponíveis enviaremos a confirmação da data de instalação pelo WhatsApp com todas as informações.<br><br>' +
      'Se você quiser alterar o agendamento, é só remarcar pelo link que vai estar lá.',
    buttons: [
      {
        text: 'Ok',
        gaAction: 'aceito',
        action: 'sendFeeback',
        customClasses: 'white'
      }
    ]
  },
  {
    id: 'wll-intro',
    fluxo: 'migracao_fibra',
    gaPageName: 'aviso_mudanca_fixo',
    title: 'Seu fixo vai mudar',
    paragraph: 'A rede do seu Oi Fixo vai mudar pra uma nova tecnologia sem fio chamada WLL.<br><br>' +
      'Por conta disso, você tem a opção de migrar seu telefone de forma gratuita pra essa tecnologia, mantendo o mesmo número e mensalidade.<br><br>' +
      'Cadastre-se e solicite a mudança do seu Oi Fixo.',
    buttons: [
      {
        text: 'Consultar Migração',
        gaAction: 'confirmar_migracao',
        action: 'goToIAB',
      },
      {
        text: 'Não quero',
        gaAction: 'nao_deseja_migrar',
        action: 'closeModal',
        customClasses: 'white'
      }
    ]
  },
]

export const getMigracaoPage = (id: string) => MIGRACAO_CATALOG.find(el => el.id === id);
