import { CatalogModel } from '../../troubleshooting-interface';

export const WELCOME_KIT: CatalogModel[] = [
  {
    id: 0,
    gaPageName: 'explicacao_manuais_boas_vindas_uso_aparelhos',
    layout: {
      title: 'Confira os manuais de boas vindas e de uso dos seus aparelhos Oi Fibra.',
      paragraph: 'Você pode tirar dúvidas de como usar seus aparelhos.<br><br>' +
        'Veja também os manuais de boas vindas.<br><br>' +
        'Clique abaixo para acessar.',
      buttons: [
        {
          text: 'Ver manuais',
          gaAction: 'acessar_manuais',
          action: 'ver_manuais',
        }
      ],
    },
    state: {
      on: [
        {
          name: 'ver_manuais',
          action: {
            call: 'openIAB',
            params: {
              // tslint:disable-next-line: max-line-length
              link: 'https://www.oi.com.br/minha-oi/manuais-digitais/?utm_source=tecnicovirtual&utm_medium=banner&utm_campaign=moi-manuais_digitais&utm_term=hmd'
            }
          }
        }
      ]
    }
  }
];
