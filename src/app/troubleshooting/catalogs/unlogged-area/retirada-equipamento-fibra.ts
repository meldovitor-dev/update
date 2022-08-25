import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
export const RETIRADA_EQUIPAMENTO_FIBRA: CatalogModel[] = [
  {
    id: 0,
    gaPageName: 'agendar_devolucao_aparelho',
    layout: {
      title: 'Agende a devolução do aparelho Oi Fibra.',
      paragraph: 'Se você cancelou o seu plano Oi Fibra, selecione a melhor data para a devolução do seu decodificador ou modem.',

      buttons: [
        {
          text: 'Agendar devolução',
          gaAction: 'agendar',
          action: 'agendar_devolucao_aparelho',
        }
      ],
    },
    state: {
      on: [
        {
          name: 'agendar_devolucao_aparelho',
          action: {
            call: 'openIAB',
            params: {
              link: 'https://www.oi.com.br/minha-oi/contato/coleta-aparelhos/?utm_source=tecnicovirtual&utm_medium=banner&utm_campaign=moi-coleta-modem-oi-fibra&utm_term=hmd'
            }
          }
        }
      ]
    }
  }
];
