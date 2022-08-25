import { CatalogModel, PageConfigModel } from '../../troubleshooting-interface';
import { getAlert } from '../problem-solver/shared/alert-catalog';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';

const alert = getAlert('feedback-alert');
const getId = (id) => CatalogPrefix.COMPATIBILIDADE_MANUAL + id;
const getImage = (name: string) => `assets/images/troubleshooting/unlogged-area/modem-antena/${name}`;

export const CONFIGURACAO_ANTENA_MODEM = (config?): CatalogModel[] => JSON.parse(JSON.stringify([
  /*
   * FLUXO INCIAL
   */
  {
    id: getId(0),
    gaPageName: 'aviso_antenas',
    fluxo: 'verificacao_manual_wifi_org',
    layout: {
      contentTop: true,
      title: 'Os celulares e computadores podem ter até 2 antenas para acessar o Wi-Fi',
      paragraph: 'Quanto mais antenas tiver, maior a velocidade de download que ele pode alcançar.',
      image: getImage('antena1.svg'),
      imageCaption: 'Em 3 passos, podemos te auxiliar a identificar a quantidade de antenas e a ' +
      'velocidade máxima que o seu celular ou computador pode alcançar.',
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'entendido'
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
        },
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'selecionar_dispositivo',
    layout: {
      contentTop: true,
      noFeedback: true,
      title: 'Qual o tipo de dispositivo que você quer verificar?',
      paragraph: '<b>ATENÇÃO:</b> as informações podem variar de acordo com modelo do dispositivo e a versão do sistema operacional.',
      alphabetical: true,
      buttons: [
        {
          text: 'Computador com Windows',
          action: 'computer',
          gaAction: 'computador_windows'
        },
        {
          text: 'Celular Samsung',
          action: 'samsung',
          gaAction: 'celular_samsung'
        },
        {
          text: 'Celular Motorola',
          action: 'motorola',
          gaAction: 'celular_motorola'
        },
        {
          text: 'Celular Xiaomi',
          action: 'xiaomi',
          gaAction: 'celular_xiaomi'
        },
        {
          text: 'Outro',
          action: 'other',
          gaAction: 'outro'
        },
      ],
    },
    state: {
      on: [
        {
          name: 'samsung',
          action: {
            call: 'nav',
            params: {
              id: getId(3)
            }
          }
        },
        {
          name: 'motorola',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        },
        {
          name: 'xiaomi',
          action: {
            call: 'nav',
            params: {
              id: getId(5)
            }
          }
        },
        {
          name: 'computer',
          action: {
            call: 'nav',
            params: {
              id: getId(2)
            }
          }
        },
        {
          name: 'other',
          action: {
            call: 'nav',
            params: {
              id: getId(6)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'verificar_computador_windows',
    layout: {
      contentTop: true,
      scrollSnap: 'windows',
      alert,
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'sim',
          action: {
            call: config || 'goToSuccessPage',
          }
        },
        {
          name: 'nao',
          action: {
            call: config || 'goToConclusionPage',
          }
        }
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'verificar_celular_samsung',
    layout: {
      contentTop: true,
      scrollSnap: 'samsung',
      alert,
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'sim',
          action: {
            call: config || 'goToSuccessPage',
          }
        },
        {
          name: 'nao',
          action: {
            call: config || 'goToConclusionPage',
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'verificar_celular_motorola',
    layout: {
      contentTop: true,
      scrollSnap: 'motorola',
      alert,
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'sim',
          action: {
            call: config || 'goToSuccessPage',
          }
        },
        {
          name: 'nao',
          action: {
            call: config || 'goToConclusionPage',
          }
        }
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'verificar_celular_xiaomi',
    layout: {
      contentTop: true,
      scrollSnap: 'xiaomi',
      alert,
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'openPopup',
          },
        },
        {
          name: 'sim',
          action: {
            call: config || 'goToSuccessPage',
          }
        },
        {
          name: 'nao',
          action: {
            call: config || 'goToConclusionPage',
          }
        }
      ]
    }
  },
  {
    id: getId(6),
    gaPageName: 'verificar_manual_fabricante',
    layout: {
      noFeedback: true,
      title: 'Verifique as especificações no manual do seu dispositivo',
      paragraph: 'Consulte o manual ou o site do fabricante pra encontrar os tipos de conexão ' +
        'suportados e as velocidades máximas que o seu dispositivo pode atingir.',
      buttons: [
        {
          text: 'Voltar pro inicio',
          action: 'navigate',
          gaAction: 'voltar_inicio'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: config || 'goToHome',
          },
        }
      ]
    }
  },
  {
    id: getId(7),
    gaPageName: 'Qual a marca do dispositivo que você quer verificar?',
    layout: {
      title: 'Qual o tipo de dispositivo que você quer verificar?',
      paragraph: '<b>ATENÇÃO:</b> as informações podem variar de acordo com modelo do dispositivo e a versão do sistema operacional.',
      alphabetical: true,
      buttons: [
        {
          text: 'Celular Samsung',
          action: 'samsung',
          gaAction: 'samsung'
        },
        {
          text: 'Celular Motorola',
          action: 'motorola',
          gaAction: 'motorola'
        },
        {
          text: 'Celular Xiaomi',
          action: 'xiaomi',
          gaAction: 'xiaomi'
        },
        {
          text: 'Outro',
          action: 'other',
          gaAction: 'outro'
        },
      ],
    },
    state: {
      on: [
        {
          name: 'samsung',
          action: {
            call: 'nav',
            params: {
              id: getId(3)
            }
          }
        },
        {
          name: 'motorola',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        },
        {
          name: 'xiaomi',
          action: {
            call: 'nav',
            params: {
              id: getId(5)
            }
          }
        },
        {
          name: 'other',
          action: {
            call: 'nav',
            params: {
              id: getId(6)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(8),
    gaPageName: 'selecionar_dispositivo',
    fluxo:'verificacao_manual_wifi_org',
    layout: {
      contentTop: true,
      title: 'Selecione o seu dispositivo para verificar a velocidade que ele pode atingir no Wi-Fi.',
      paragraph: '<b>ATENÇÃO:</b> as informações podem variar de acordo com modelo do dispositivo e a versão do sistema operacional.',
      alphabetical: true,
      buttons: [

        {
          text: 'Celular Samsung',
          action: 'samsung',
          gaAction: 'celular_samsung'
        },
        {
          text: 'Celular Motorola',
          action: 'motorola',
          gaAction: 'celular_motorola'
        },
        {
          text: 'Celular Xiaomi',
          action: 'xiaomi',
          gaAction: 'celular_xiaomi'
        },
        {
          text: 'Computador com Windows',
          action: 'computer',
          gaAction: 'computador_windows'
        },
        {
          text: 'Outro',
          action: 'other',
          gaAction: 'outro'
        },
      ],
    },
    state: {
      on: [
        {
          name: 'computer',
          action: {
            call: 'nav',
            params: {
              id: getId(2)
            }
          }
        },
        {
          name: 'samsung',
          action: {
            call: 'nav',
            params: {
              id: getId(3)
            }
          }
        },
        {
          name: 'motorola',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        },
        {
          name: 'xiaomi',
          action: {
            call: 'nav',
            params: {
              id: getId(5)
            }
          }
        },
        {
          name: 'other',
          action: {
            call: 'nav',
            params: {
              id: getId(9)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(9),
    gaPageName: 'verificar_manual_fabricante',
    layout: {
      noFeedback: true,
      title: 'Verifique as especificações no manual do seu dispositivo',
      paragraph: 'Consulte o manual ou o site do fabricante pra encontrar os tipos de conexão ' +
        'suportados e as velocidades máximas que o seu dispositivo pode atingir.',
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'entendido'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: config || 'goToConclusionPage',
          },
        }
      ]
    }
  },
]));

const configCall = 'goToHome';

export const FIBRA_COMPATIBILIDADE_MANUAL_HOME = [
  ...CONFIGURACAO_ANTENA_MODEM(configCall),
];
