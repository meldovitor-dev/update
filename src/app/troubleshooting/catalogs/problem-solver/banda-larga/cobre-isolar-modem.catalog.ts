import { CatalogModel, ConfigModel } from './../../../troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';

const getId = id => CatalogPrefix.ISOLAR_MODEM + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/shared/${img}`;
const COBRE_ISOLAR_MODEM = (negativeId, config: ConfigModel = {}, successId?): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'isolar_dispositivo',
    fluxo: 'isolar_modem',
    layout: {
      title: 'Vamos lá! Esta é a última etapa.',
      paragraph: 'Este é mais um passo a passo que vai ajudar a resolver o problema.',
      buttons: [
        {
          text: 'Continuar',
          action: 'navigate',
          gaAction: 'avancar'
        }
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
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'isolar_dispositivo',
    layout: {
      title: 'Deixe apenas um equipamento conectado ao modem.',
      image: getImage('isolarmodem.svg'),
      imageCaption:
        'Pra evitar interferências, desconecte roteadores e outros dispositivos que estejam conectados ao modem.',
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'avancar'
        }
      ],
      alert: getAlert((config && config.alert) || 'internet', 'internet_melhorou_isolando_dispositivo')
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'openPopup'
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
            call: 'checkIfFilter',
            params: {
              then: {id: getId(2)},
              else: {id: getId(4)},
            }
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'conclusao_problema_interferencia_dispositivos',
    layout: {
      title: 'Outros dispositivos podem estar interferindo na conexão da sua internet.',
      paragraph: 'Roteadores ou extensões podem estar interferindo no sinal do modem. '+
      'Procure um técnico particular para verificar a sua rede.',
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'avancar'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'goToHome'
          }
        },
      ]
    }
  },
  {

    id: getId(4),
    gaPageName: 'adicionar_microfiltro',
    layout: {
      title: 'Adicione o microfiltro novamente pra testar.',
      image: './assets/images/troubleshooting/problem-solver/shared/microfiltro-02.svg',
      alert: getAlert('ts-cabos-cobre','internet_continua_funcionando_adicionando_microfiltro'),
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'feito',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'openPopup',
          }
        },
        {
          name: 'nao',
          action: {
            call: 'nav',
            params: {
              id: getId(5),
            }
          }
        },
        {
          name: 'sim',
          action: {
            call: 'nav',
            params:{
              id: getId(2)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'trocar_microfiltro',
    layout: {
      title: 'Retire seu microfiltro pra usar a internet e troque-o por um novo.',
      image: getImage('decodificador_desligar_tomada.svg'),
      paragraph: 'Não é possível usar o telefone fixo sem o microfiltro, troque-o por um novo. Você encontra o microfiltro em lojas de informática.',
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'entendido'
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'goToHome',
          }
        }
      ]
    }
  },
]));

export { COBRE_ISOLAR_MODEM };
