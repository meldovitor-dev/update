/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { InteractionEnum } from 'src/app/domain/interactions';
import { getAlert } from './../shared/alert-catalog';

const getId = (id) => CatalogPrefix.DISPOSITIVOS_CONECTADOS + id;
const homeAction = {
  name: 'voltar_inicio',
  action: {
    call: 'goToHome', params: {},
  },
};
const getListClients = {
  call: 'prepareContent',
  params: {
    call: 'populateConnectedDevices',
    interaction: InteractionEnum.bandaLargaListClients,
    dataOk: {
      call: 'nav',
      params: {
        id: getId(5)
      }
    },
    dataNok: {
      call: 'nav',
      params: {
        id: getId(4)
      }
    },
    dataHandler: 'redesHandler',
    dataName: 'dataList'
  }
};

const getButton = (config) => {
  const defaultButton = {
    text: 'Pular esta etapa',
    action: 'navigate',
    gaAction: 'pular_etapa',
  };
  if (!config || !config.goHome) {
    return defaultButton;
  }
  return config.goHome;
};
const getConclusionId = (config) => {
  if (!config || !config.homeId) {
    return getId(9);
  }
  return config.homeId;
};

const BANDA_LARGA_DISPOSITIVOS_CONECTADOS = (negativeId, config?): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    layout: {},
    state: {
      on:
        [
          {
            name: 'onInit',
            action: {
              call: 'verifyServiceEnable',
              params: {
                path: 'modem.listClients.enabled',
                enable:  { id: getId(1) },
                disable: { id: negativeId },
              },
            },
          }
        ],
    }
  },
  {
    id: getId(1),
    gaPageName: 'dispositivos_conectados_inicio',
    fluxo: 'dispositivos_conectados_home',
    description: 'Inicio do processo',
    layout: {
      title: 'Verifique os dispositivos que estão conectados no seu Wi-Fi da Oi.',
      paragraph: 'Caso tenha algum dispositivo que você não reconheça, sugerimos a troca da senha, pois pode ser alguém não autorizado usando sua rede. Se sua internet estiver apresentando problemas, volte para o início e selecione uma opção de reparo.',
      buttons: [
        {
          text: 'Verificar dispositivos',
          action: 'verify',
          gaAction: 'verificar_dispositivos_conectados',
        },
        {
          text: 'Voltar pro início',
          gaAction: 'voltar_inicio',
        },
      ]
    },
    state: {
      on: [
        {
          name: 'verify',
          action: {
            call: 'nav', params: {
              id: getId(2),
            },
          },
        },
        homeAction,
      ],
    },
  },
  {
    id: getId(2),
    gaPageName: 'autenticacao_hdm',
    description: 'faz autenticação do HDM',
    layout: {
      hiddenHeaderBackButton: true,
      loading: TimerTypes.RING,
      title: 'Verificando as configurações do modem.',
      paragraph: 'Aguarde enquanto o processo é concluído.'
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices', params: {
              interaction: InteractionEnum.authenticateHdm
            },
          }
        },
        {
          name: InteractionEnum.authenticateHdm,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'goToConclusionPage',
              },
              success: {
                call: 'checkAuthHdmResponse',
                params: {
                  interaction: InteractionEnum.authenticateHdm,
                  hdmOk: {
                    call: 'nav',
                    params: {
                    id: getId(3)
                    }
                  },
                  hdmNok: {
                    call: 'nav',
                    params: {
                    id: getId(4)
                    }
                  }
                }
              }
            }
          }
        },
      ],
    },
  },
  {
    id: getId(3),
    gaPageName: 'verificando_dispositivos_conectados',
    description: 'faz busca dos dispositivos',
    layout: {
      hiddenHeaderBackButton: true,
      loading: TimerTypes.RING,
      title: 'Verificando dispositivos conectados...',
      paragraph: 'Aguarde enquanto o processo é concluído.',
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices', params: {
              interaction: InteractionEnum.bandaLargaListClients
            },
          }
        },
        {
          name: InteractionEnum.bandaLargaListClients,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'nav',
                params: {
                  id: getId(4)
                }

              },
              success: getListClients
            },
          }
        },
      ],
    },
  },
  {
    id: getId(4),
    gaPageName: 'dispositivos_conectados_erro_timeout',
    description: 'redes nao encontradas',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Não foi possível verificar os dispositivos conectados.',
      paragraph: 'Tente novamente mais tarde.',
      buttons: [
        {
          text: 'Voltar pro início',
          gaAction: 'voltar_inicio',
        }
      ],
    },
    state: {
      on: [
        homeAction
      ],
    },
  },
  {
    id: getId(5),
    gaPageName: 'consultar_dispositivos_conectados',
    layout: {
      hiddenHeaderBackButton: true,
      contentTop: true,
      accordion: 'connected-devices',
      title: 'Veja os dispositivos conectados às suas redes Wi-Fi.',
      paragraph: 'Caso não reconheça algum, trocar a senha da rede pode melhorar a sua internet.',
      buttons: [
        getButton(config)
      ],
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'getSessionData', params: {
              data: 'dataList'
            },
          }
        },
        {
          name: 'requestChangePassword',
          action: {
            call: 'nav',
            params: {
              id: getId(6)
            },
          },
        },
        {
          name: 'navigate',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId
            },
          },
        },
        homeAction
      ],
    },
  },
  {
    id: getId(6),
    gaPageName: 'dica_antes_trocar_senha',
    fluxo: 'troca_senha_problema',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Antes de trocar a senha...',
      paragraph:
        'Anote ou decore sua nova senha, será necessário reconectar todos os dipositivos. A senha é de sua responsabilidade e não fica armazenada no app.',
      buttons: [
        {
          text: 'Vamos lá!',
          gaAction: 'navigate'
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
              id: getId(7)
            }
          }
        }
      ]
    }
  },

  {
    id: getId(7),
    gaPageName: 'trocar_senha',
    layout: {
      input: 'password',
      hiddenHeaderBackButton: true,
      title: 'Nova senha de Wi-Fi.',
      paragraph:
        'A nova senha precisa:<br>'+
        '• Ter entre 8 e 63 caracteres<br>'+
        '• Não usar caractere especial (?@!)<br>'+
        '• Não usar espaços.'
    },
    state: {
      on: [
        {
          name: 'changePassword',
          action: {
            call: 'nav',
            params: {
              id: getId(8)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(8),
    gaPageName: 'trocando_senha',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Trocando a sua senha...',
      paragraph: 'Aguarde enquanto o processo é concluído.',
      loading: TimerTypes.RING
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices',
            params: {
              interaction: InteractionEnum.bandaLargaSetPasswordWifi
            }
          }
        },
        {
          name: InteractionEnum.bandaLargaSetPasswordWifi,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'goToConclusionPage',
                params: {
                  id: 'troca-senha-timeout'
                }
              },
              error: {
                call: 'goToConclusionPage',
                params: {
                  id: 'troca-senha'
                }
              },
              success: {
                call: 'nav',
                params: {
                  id: getConclusionId(config)
                }
              }
            }
          }
        }
      ]
    }
  },
  {
    id: getId(9),
    description: 'sucesso troca senha',
    gaPageName: 'testar_nova_senha',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Sua senha foi alterada.',
      paragraph:
        'Digite a nova senha nos dispositivos conectados à rede pra se conectar novamente.',
      wifiLabel: true,
      alphabetical: true,
      alert: getAlert('internet-lenta','internet_melhorou_trocando_senha'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'dispositivos_conectados'
        },
        {
          text: 'Não consigo conectar',
          action: 'naoConectar',
          gaAction: 'dispositivos_nao_conectados'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'naoConectar',
          action: {
            call: 'nav',
            params: {
              id: getId(10)
            }
          }
        },
        {
          name: 'feito',
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
          },
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        }
      ]
    }
  },
  {
    id: getId(10),
    description: 'nova tentativa de troca de senha',
    gaPageName: 'segundo_teste_nova_senha',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Tente entrar com a sua nova senha mais uma vez.',
      paragraph: 'Lembre-se de digitar a nova senha nos dispositivos pra conectar.',
      wifiLabel: true,
      alphabetical: true,
      alert: getAlert('internet-lenta','internet-internet_melhorou_trocando_senha'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'conseguiu_conectar_wifi_nova_senha'
        },
        {
          text: 'Não consigo conectar',
          action: 'naoConectar',
          gaAction: 'nao_conseguiu_conectar_wifi_nova_senha'
        }
      ],

    },
    state: {
      on: [
        {
          name: 'naoConectar',
          action: {
            call: 'goToConclusionPage'
          }
        },
        {
          name: 'feito',
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
          },
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        }
      ]
    }
  },
  {
    id: getId(33),
    layout: {},
    state: {
      on:
        [
          {
            name: 'onInit',
            action: {
              call: 'dispositivoEnable',
              params: {
                path: 'modem.listClients.enabled',
                enable:  { id: getId(34) },
                disable: { id: negativeId },
              },
            },
          }
        ],
    }
  },
  {
    id: getId(34),
    gaPageName: 'verificando_dispositivos_conectados',
    fluxo: 'dispositivos_conectados',
    description: 'faz busca dos dispositivos',
    layout: {
      hiddenHeaderBackButton: true,
      loading: TimerTypes.RING,
      title: 'Verificando dispositivos conectados...',
      paragraph: 'Aguarde enquanto o processo é concluído.',
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices', params: {
              interaction: InteractionEnum.bandaLargaListClients
            },
          }
        },
        {
          name: InteractionEnum.bandaLargaListClients,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'nav',
                params: {
                  id: getId(4)
                }

              },
              success: getListClients
            },
          }
        },
      ],
    },
  },
]));
export { BANDA_LARGA_DISPOSITIVOS_CONECTADOS };

const DISPOSITIVOS_HOME_END = [
  {
    id: getId(48),
    description: 'sucesso troca fibra',
    gaPageName: 'testar_nova_senha',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Sua senha foi alterada.',
      paragraph:
        'Digite a nova senha nos dispositivos conectados à rede pra se conectar novamente.',
      wifiLabel: true,
      alphabetical: true,
      buttons: [{
        text: 'Feito!',
        action: 'feito',
        gaAction: 'dispositivos_conectados',
      },
      {
        text: 'Não consigo conectar',
        action: 'naoConectar',
        gaAction: 'dispositivos_nao_conectados',
      }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'goToSuccessPage',
          },
        },
        {
          name: 'naoConectar',
          action: {
            call: 'nav',
            params: {
              id: getId(49),
            },
          }
        }
      ]
    }
  },
  {
    id: getId(49),
    description: 'nova tentativa de troca de senha',
    gaPageName: 'segundo_teste_nova_senha',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Tente entrar com a sua nova senha mais uma vez.',
      paragraph: 'Atualize os seus dispositivos com a nova senha pra conectar.',
      wifiLabel: true,
      alphabetical: true,
      buttons: [{
        text: 'Feito!',
        action: 'feito',
        gaAction: 'dispositivos_conectados',
      },
      {
        text: 'Não consigo conectar',
        action: 'nao',
        gaAction: 'dispositivos_nao_conectados',
      }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'goToSuccessPage',
          },
        },
        {
          name: 'nao',
          action: {
            call: 'goToConclusionPage'
          },
        }
      ]
    }
  },
];
const config = {
  goHome: {
    text: 'Voltar pro início',
    action: 'voltar_inicio',
    gaAction: 'voltar_inicio',
  },
  alert: 'dispositivosConectados',
  homeId: getId(48)
};

export const BANDA_LARGA_DISPOSITIVOS_CONECTADOS_HOME = [
  ...BANDA_LARGA_DISPOSITIVOS_CONECTADOS('conclusion', config),
  ...DISPOSITIVOS_HOME_END
];
