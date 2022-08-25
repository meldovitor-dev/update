import { CatalogModel } from '../../../troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { InteractionEnum } from 'src/app/domain/interactions';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';

const getId = id => CatalogPrefix.TESTE_VELOCIDADE + id;
const TESTE_VELOCIDADE = (negativeId): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: '',//adicionar_tagueamento
    layout: {},
    state: {
      on:
        [
          {
            name: 'onInit',
            action: {
              call: 'prepareContent',
              params: {
                call: 'getInternetSpeed',
                dataOk: {
                  call: 'checkSpeeds',
                  params: {
                    hasSpeed: {
                      isHigher: { id: getId(5)},
                      isLower: { id: negativeId}
                    },
                    noSpeed: {id: getId(1)},
                  }
                },
                dataHandler: 'speedHandler',
              }
            }
          }
        ],
    }
  },
  {
    id: getId(1),
    gaPageName: 'testar_velocidade',
    fluxo: 'teste_velocidade',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Que tal testar a sua velocidade?',
      paragraph:
        'Pra fazer este teste, você precisa estar com apenas um dispositivo conectado à sua internet.<br><br>' +
        'Pause os downloads, atualizações ou backups em andamento.',
      buttons: [
        {
          text: 'Continuar',
          action: 'navigate',
          gaAction: 'comecar'
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
              id: getId(2)
            }
          }
        },
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'acessar_brasil_banda_larga',
    layout: {
      title: 'Acesse o site Brasil Banda Larga no endereço abaixo: <br><br>brasilbandalarga.com.br',
      paragraph: 'Na área de Banda Larga Fixa, clique em "Teste de velocidade".',
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'feito'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'checkVelocity',
            params: {
              hasSpeed: { id: getId(4)},
              noSpeed:  { id: getId(3)}
            }
          }
        },
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'confirmar_velocidade_medicao',
    layout: {
      title: 'A velocidade da medição está menor ou maior que 80% da contratada?',
      paragraph: 'É normal que você receba uma velocidade igual ou maior que 80% do seu plano.',
      alphabetical: true,
      buttons: [
        {
          text: 'Menor',
          action: 'menor',
          gaAction: 'menor'
        },
        {
          text: 'Igual ou maior',
          action: 'maior',
          gaAction: 'igual_maior'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'menor',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId
            }
          }
        },
        {
          name: 'maior',
          action: {
            call: 'goToSuccessPage',
          }
        },
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'confirmar_velocidade_contratada',
    layout: {
      title: 'Você tem #velocidadeContratada# Mega contratados. A velocidade da medição está menor ou maior que #velocidadeMinimaContratual# Mega?',
      paragraph: 'É normal que você receba uma velocidade igual ou maior que #velocidadeMinimaContratual# Mega por segundo.',
      alphabetical: true,
      buttons: [
        {
          text: 'Menor',
          action: 'menor',
          gaAction: 'menor'
        },
        {
          text: 'Igual ou maior',
          action: 'maior',
          gaAction: 'igual_maior'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'replaceSpeedText'
          }
        },
        {
          name: 'menor',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId
            }
          }
        },
        {
          name: 'maior',
          action: {
            call: 'goToSuccessPage',
          }
        },
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'verificar_velocidade',
    layout: {
      title: 'Vamos checar a velocidade da sua internet.',
      paragraph:
        'Pra fazer este teste, você precisa estar com apenas um dispositivo conectado à sua internet.<br><br>' +
        'Pause os downloads, atualizações ou backups em andamento.',
      buttons: [
        {
          text: 'Continuar',
          action: 'navigate',
          gaAction: 'seguir'
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
              id: getId(6)
            }
          }
        },
      ]
    }
  },
  {
    id: getId(6),
    gaPageName: 'verificar_velocidade',
    layout: {
      loading: TimerTypes.LOADING,
      loadingLabel: 'Verificando conexão',
      hiddenHeaderBackButton: true,
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'manualCronometerProcess', params: {
              config: 'testeVelocidade'
            }
          }
        },
        {
          name: 'manualCronoExpired',
          action: {
            call: 'nav', params: {
              id: getId(7)
            }
          }
        },
      ]
    }
  },
  {
    id: getId(7),
    gaPageName: 'velocidade_de_acordo_contratada',
    layout: {
      title: 'Verificamos que a internet está de acordo com a velocidade contratada de #velocidadeContratada#Mb.',
      paragraph: 'É normal que você receba uma velocidade igual ou maior que 80% do seu plano.',
      buttons: [
        {
          text: 'Internet ainda lenta',
          action: 'nao',
          gaAction: 'avancar'
        },
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'colocar_tagueamento'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'replaceSpeedText'
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
          name: 'navigate',
          action: {
            call: 'goToSuccessPage',
          }
        },
      ]
    }
  }
]));

export { TESTE_VELOCIDADE };
