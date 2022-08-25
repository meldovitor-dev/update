import { CatalogModel, PageConfigModel } from './../../troubleshooting-interface';
const getIcone = (name: string) => `assets/icon/troubleshooting/unlogged-area/recursos-avancados/${name}`;

export const RECURSOS_AVANCADOS_SLIDES = [
    {
        metadata: 'tela 1',
        ga: 'mudar_canal_pip',
        label: 'COMO MUDAR O CANAL COM PIP',
        gaLabel: 'menu_acessar_pip',
        top: {
            img: getIcone('PIP.svg'),
            title: 'Como mudar de canal com o PIP (Picture in Picture):',
            // tslint:disable-next-line: max-line-length
            paragraph: 'Use as teclas <strong>CIMA</strong> pra visualizar o PIP (Picture in Picture). Depois, pressione a tecla <strong>OK</strong>. pra assistir ao canal que escolheu.'
        }
    },
    {
        metadata: 'tela 2',
        ga: 'pausa_tv',
        label: 'PAUSA NA TV',
        gaLabel: 'menu_acessar_pausa',
        top: {
            title: 'Pausa na TV:',
            img: getIcone('pause.svg'),
            // tslint:disable-next-line: max-line-length
            paragraph: 'Basta pressionar a tecla <strong>PAUSE</strong>. Pra voltar a assistir ao programa, pressione <strong>PAUSE</strong> ou <strong>PLAY</strong>.'
        }
    },
    {
        metadata: 'tela 3',
        ga: 'bloqueio_canais_conteudos_compras_alugueis',
        label: 'BLOQUEIO DE CANAIS E CONTEÚDOS',
        gaLabel: 'menu_acessar_bloqueio_canais',
        top: {
            title: 'Bloqueio de canais, conteúdos, compras e aluguéis de filmes:',
            // tslint:disable-next-line: max-line-length
            paragraph: 'Com a sua senha pessoal, você pode restringir o acesso a canais e conteúdos que considera inapropriados pra sua família.<br/>#breadcrumbs#Coloque a sua senha.<br><br>Obs: Caso não possua uma senha você precisa cadastrá-la ligando para o número de telefone: 10631.',
            breadcrumbs: {
                title: 'Pressione:',
                elements: [ 'MENU', 'Configurações', 'Controle parental', 'Conteúdos']
            }
        }
    },
    {
        metadata: 'tela 4',
        label: 'GRAVAR E AGENDAR PROGRAMAS',
        ga: 'gravar_agendar_programas',
        gaLabel: 'menu_acessar_gravacao',
        top: {
            title: 'Como gravar/agendar programas dentro de casa:',
            // tslint:disable-next-line: max-line-length
            paragraph: '#breadcrumbs#Você pode fazer uma busca pelo programa ou agendar manualmente uma gravação. Basta selecionar o canal, a hora de inicio da gravação e a hora do fim da gravação.<br><br>'+
           '<b>ATENÇÃO:</b> ' +
           'Este recurso está disponível para os planos com direito à gravação de conteúdo.',
            breadcrumbs: {
                title: 'Use as teclas:',
                elements: [ 'MENU', 'GRAVAÇÕES', 'GRAVAR']
            }
        }

    },
    {
        metadata: 'tela 5',
        label: 'ASSISTIR CONTEÚDOS ON DEMAND',
        ga: 'assistir_conteudos_on_demand',
        gaLabel: 'menu_acessar_conteudo_on_demand',
        top: {
            title: 'Como assistir aos conteúdos On Demand:',
            img: getIcone('locadora_oi.jpg'),
            // tslint:disable-next-line: max-line-length
            paragraph: '#breadcrumbs#e depois selecione o que você quer assistir. Você também pode entrar direto na locadora. Basta pressionar a tecla <strong>VIDEO ON DEMAND</strong>.',
            breadcrumbs: {
                title: 'Pressione:',
                elements: [ 'MENU','OI PLAY' ,'VER']
            }
        }
    },
    {
        metadata: 'tela 6',
        label: 'ACESSAR APLICAÇÕES',
        ga: 'acessar_aplicacoes',
        gaLabel: 'menu_acessar_interatividade',
        top: {
            img: getIcone('oi_interativo.jpg'),
            title: 'Como acessar as aplicações:',
            paragraph: 'Pressione <strong>GO INTERACTIVE</strong><br>ou use o',
            breadcrumbs: {
                title: '',
                elements: [ 'MENU','Oi Interativo']
            }

        },
    },
];
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

export const RECURSOS_AVANCADOS: CatalogModel[] = [{
    id: 0,
    gaPageName: '',
    fluxo: 'recursos_avancados_tv',
    pageConfig,
    layout: {
        slides: RECURSOS_AVANCADOS_SLIDES
    },
    state: {
        on: []
    }
}]
