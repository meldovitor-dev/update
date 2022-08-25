import { FeatureEnum } from 'src/app/enums/feature.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { DICAS_E_BOAS_PRATICAS } from '../../../unlogged-area/dicas-boas-praticas-catalog';

const getId = (id) => CatalogPrefix.WIFI_SIGNAL + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/fibra/internet/sinal-wifi/${img}`;

export const INTENSIDADE_SINAL: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'verificar_configuracoes',
    fluxo: 'intensidade_sinal',
    layout: {
      wifiDependencies: true,
      contentTop: true,
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
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'escolher_ambiente',
    layout: {
      title: 'Vá pro ambiente que deseja verificar a intensidade do sinal Wi-Fi da Oi.',
      buttons: [
        {
        text: 'Verificar neste ambiente',
        action: 'navigate',
        gaAction: 'verificar_sinal',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'navigate',
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
    id: getId(2),
    gaPageName: '',
    layout: {
      wifiInfo: true,
      contentTop: true,
    },
    state: {
      on: [
        {
          name: 'other-room',
          action: {
            call: 'nav',
            params: {
              id: getId(0)
            }
          }
        },
        {
          name: 'navigate',
          action: {
            call: 'nav',
            params: {
              id: 1,
            }
          }
        },
        {
          name: 'near-modem',
          action: {
            call: 'nav',
            params: {
              id: getId(3),
            }
          }
        },
        {
          name: 'internet-lenta',
          action: {
            call: 'enterAnotherFeature',
            params: {
              featureId: FeatureEnum.FIBRA_LENTA,
              id: CatalogPrefix.TROCA_CANAL + 0
            }
          }
        },
        {
          name: 'sem-conexao',
          action: {
            call: 'enterAnotherFeature',
            params: {
              featureId: FeatureEnum.FIBRA_SEM_CONEXAO
            }
          }
        },
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'aproximar_modem',
    layout: {
      title: 'Fique, no máximo, a um metro de distância do modem pra verificar o sinal.',
      image: getImage('perto_modem.svg'),
      imageCaption: 'Certifique-se que não há nenhuma barreira entre você e o modem.<br>' +
                    'Caso ele esteja dentro de um armário, abra a porta.',
      buttons: [
        {
        text: 'Verificar sinal perto do modem',
        action: 'navigate',
        gaAction: 'verificar_perto_modem',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'setNearModemAndNav',
            params: {
              id: getId(2),
            }
          }
        }
      ]
    }
  },
  ...DICAS_E_BOAS_PRATICAS
]