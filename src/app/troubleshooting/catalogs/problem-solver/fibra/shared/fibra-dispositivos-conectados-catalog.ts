import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { InteractionEnum } from 'src/app/domain/interactions';
import { getAlert } from './../../shared/alert-catalog';

const getId = id => CatalogPrefix.DISPOSITIVOS_CONECTADOS + id;
const homeAction = {
  name: 'voltar_inicio',
  action: {
    call: 'goToHome',
    params: {}
  }
};
const alertAction = negativeId => { return {
  name: 'nao',
  action: {
    call: 'checkDataLoopAndProceed',
    params: {
      data: 'rede',
      identification: 'ssid',
      then: {
        call: 'nav',
        params: {
          id: getId(4)
        }
      },
      doneAllNetworks: {
        call: 'nav',
        params: {
          id: negativeId
        }
      }
    }
  }
}};
const getRedesConfig = {
  call: 'prepareContent',
  params: {
    call: 'populateConnectedDevices',
    interaction: InteractionEnum.fibraDiagnosticoCompleto,
    dataOk: {
      call: 'nav',
      params: {
        id: getId(4)
      }
    },
    dataNok: {
      call: 'nav',
      params: {
        id: getId(3)
      }
    },
    dataHandler: 'redesHandler',
    dataName: 'dataList'
  }
};
const getButton = config => {
  const defaultButton = {
    text: 'Pular esta etapa',
    action: 'navigate',
    gaAction: 'ir_proxima_rede'
  };
  if (!config || !config.goHome) {
    return defaultButton;
  }
  return config.goHome;
};
const getConclusionId = config => {
  if (!config || !config.homeId) {
    return getId(8);
  }
  return config.homeId;
};
const getTimeoutConclusionId = config => {
  if (!config || !config.homeTimeoutId) {
    return getId(10);
  }
  return config.homeTimeoutId;
};
const FIBRA_DISPOSITIVOS_CONECTADOS = (negativeId, config?): CatalogModel[] =>
  JSON.parse(
    JSON.stringify([
      {
        id: getId(0),
        layout: {},
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'verifyServiceEnable',
                params: {
                  path: 'fibra.devicesConnected.enabled',
                  enable: { id: getId(1) },
                  disable: { id: 'conclusion' }
                }
              }
            }
          ]
        }
      },
      {
        id: getId(1),
        gaPageName: 'verificar_dispositivos',
        description: 'Inicio do processo',
        fluxo: 'dispositivos_conectados_home',
        layout: {
          title:
            'Verifique os dispositivos que estão conectados no seu Wi-Fi da Oi.',
          paragraph:
            'Caso tenha algum dispositivo que você não reconheça, sugerimos a troca da senha, pois pode ser alguém não ' +
            'autorizado usando sua rede. Se sua internet estiver apresentando problemas, volte para o início e selecione uma opção de reparo.',
          buttons: [
            {
              text: 'Verificar dispositivos',
              action: 'verify',
              gaAction: 'verificar_dispositivos_conectados'
            },
            {
              text: 'Voltar pro início',
              action: 'voltar_inicio',
              gaAction: 'voltar_inicio'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'verify',
              action: {
                call: 'nav',
                params: {
                  id: getId(2)
                }
              }
            },
            homeAction
          ]
        }
      },
      {
        id: getId(2),
        gaPageName: 'verificando_dispositivos',
        description: 'faz o diagnostico completo',
        layout: {
          hiddenHeaderBackButton: true,
          loading: TimerTypes.RING,
          title: 'Verificando dispositivos conectados na sua rede…',
          paragraph: 'Aguarde enquanto o processo é concluído.'
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'callServices',
                params: {
                  interaction: InteractionEnum.fibraDiagnosticoCompleto
                }
              }
            },
            {
              name: InteractionEnum.fibraDiagnosticoCompleto,
              action: {
                call: 'serviceResponse',
                params: {
                  timeout: {
                    call: 'nav',
                    params: {
                      id: getId(3)
                    }
                  },
                  success: getRedesConfig
                }
              }
            }
          ]
        }
      },
      {
        id: getId(3),
        gaPageName: 'nao_sucesso',
        description: 'redes nao encontradas',
        layout: {
          hiddenHeaderBackButton: true,
          title: 'Não foi possível verificar os dispositivos conectados.',
          paragraph: 'Tente novamente mais tarde.',
          buttons: [
            {
              text: 'Voltar pro início',
              gaAction: 'voltar_inicio'
            }
          ]
        },
        state: {
          on: [homeAction]
        }
      },
      {
        id: getId(4),
        gaPageName: 'consultar_dispositivos_conectados',
        layout: {
          hiddenHeaderBackButton: true,
          contentTop: true,
          accordion: 'connected-devices',
          title: 'Encontramos dispositivos conectados às suas redes Wi-Fi.',
          paragraph:
            'Caso não reconheça algum dispositivo, trocar a senha da rede pode ajudar a melhorar a sua internet.',
          buttons: [getButton(config)]
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'getSessionData',
                params: {
                  data: 'dataList'
                }
              }
            },
            {
              name: 'requestChangePassword',
              action: {
                call: 'nav',
                params: {
                  id: getId(5),
                  contextList: ['wifiSelected']
                }
              }
            },
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
            homeAction
          ]
        }
      },
      {
        id: getId(5),
        gaPageName: 'dica_antes_trocar_senha',
        fluxo: 'troca_senha_problema',
        layout: {
          hiddenHeaderBackButton: true,
          title: 'Antes de trocar a senha...',
          paragraph:
            'O app não armazena senhas. A senha é de sua responsabilidade. Anote ou decore a nova senha, pois será necessário conectá-las em todos os dispositivos como roteadores e repetidores novamente.',
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
                  id: getId(6)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(6),
        gaPageName: 'trocar_senha',
        layout: {
          input: 'password',
          wifiLabel: true,
          hiddenHeaderBackButton: true,
          title: 'Nova senha de Wi-Fi.',
          paragraph:
            'A nova senha precisa:<br>' +
            '• Ter entre 8 e 63 caracteres<br>' +
            '• Não usar caractere especial (?@!)<br>' +
            '• Não usar espaços.'
        },
        state: {
          on: [
            {
              name: 'changePassword',
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
                  interaction: InteractionEnum.fibraSetPasswordWifi
                }
              }
            },
            {
              name: InteractionEnum.fibraSetPasswordWifi,
              action: {
                call: 'serviceResponse',
                params: {
                  timeout: {
                    call: 'nav',
                    params: {
                      id: getTimeoutConclusionId(config)
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
        id: getId(8),
        description: 'sucesso troca fibra',
        gaPageName: 'testar_nova_senha',
        layout: {
          hiddenHeaderBackButton: true,
          title: 'Sua senha foi alterada.',
          paragraph:
            'Digite a nova senha nos dispositivos conectados à rede pra se conectar novamente.',
          wifiLabel: true,
          alphabetical: true,
          alert: getAlert('internet-lenta'),
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
                  id: getId(9)
                }
              }
            },
            {
              name: 'feito',
              action: {
                call: 'openPopup'
              }
            },
            alertAction(negativeId),
            {
              name: 'sim',
              action: {
                call: 'goToSuccessPage'
              }
            }
          ]
        }
      },
      {
        id: getId(9),
        description: 'nova tentativa de troca de senha',
        gaPageName: 'segundo_teste_nova_senha',
        layout: {
          hiddenHeaderBackButton: true,
          title: 'Tente entrar com a sua nova senha mais uma vez.',
          paragraph:
            'Atualize os seus dispositivos com a nova senha pra conectar.',
          wifiLabel: true,
          alphabetical: true,
          alert: getAlert('internet-lenta'),
          buttons: [
            {
              text: 'Feito!',
              action: 'feito',
              gaAction: 'dispositivos_conectados'
            },
            {
              text: 'Não consigo conectar',
              action: 'naoConsegue',
              gaAction: 'dispositivos_nao_conectados'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'naoConsegue',
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
            alertAction(negativeId),
            {
              name: 'sim',
              action: {
                call: 'goToSuccessPage'
              }
            }
          ]
        }
      },
      {
        id: getId(10),
        description: 'confirma troca de senha',
        gaPageName: 'confirmar_troca_senha',
        layout: {
          hiddenHeaderBackButton: true,
          title: 'Verifique se a senha foi alterada com sucesso.',
          paragraph:
            'Não conseguimos confirmar se a operação foi efetuada.<br>' +
            'Tente atualizar os seus dispositivos com a nova senha pra conectar.',
          wifiLabel: true,
          alphabetical: true,
          alert: getAlert('internet-lenta'),
          buttons: [
            {
              text: 'Deu certo!',
              action: 'feito',
              gaAction: 'senha_trocada'
            },
            {
              text: 'Não consigo conectar',
              action: 'nao',
              gaAction: 'nao_conseguiu_conectar'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'nao',
              action: {
                call: 'goToConclusionPage',
                params: {
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
              name: 'sim',
              action: {
                call: 'goToSuccessPage'
              }
            }
          ]
        }
      },
      {
        id: getId(44),
        layout: {},
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'verifyServiceEnable',
                params: {
                  path: 'fibra.devicesConnected.enabled',
                  enable: { id: getId(45) },
                  disable: { id: negativeId }
                }
              }
            }
          ]
        }
      },
      {
        id: getId(45),
        gaPageName: 'consultar_dispositivos_conectados',
        fluxo: 'dispositivos_conectados',
        layout: {
          hiddenHeaderBackButton: true,
          contentTop: true,
          accordion: 'connected-devices',
          title: 'Encontramos dispositivos conectados às suas redes Wi-Fi.',
          paragraph:
            'Caso não reconheça algum dispositivo, trocar a senha da rede pode ajudar a melhorar a sua internet.',
          buttons: [getButton(config)]
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'getSessionData',
                params: {
                  data: 'dataList'
                }
              }
            },
            {
              name: 'requestChangePassword',
              action: {
                call: 'nav',
                params: {
                  id: getId(5),
                  contextList: ['wifiSelected']
                }
              }
            },
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
            homeAction
          ]
        }
      }
    ])
  );
export { FIBRA_DISPOSITIVOS_CONECTADOS };

const alertHome = {
  name: 'feito',
  action: {
    call: 'checkDataLoopAndProceed',
    params: {
      data: 'rede',
      identification: 'ssid',
      then: {
        call: 'nav',
        params: {
          id: getId(4)
        }
      },
      doneAllNetworks: {
        call: 'goToSuccessPage'
      }
    }
  }
};
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
              id: getId(49)
            }
          }
        },
        alertHome
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
            call: 'goToConclusionPage'
          }
        },
        alertHome
      ]
    }
  },
  {
    id: getId(50),
    layout: {},
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'goToConclusionPage',
            params: {
              id: 'troca-senha-timeout'
            }
          }
        }
      ]
    }
  }
];

const config = {
  goHome: {
    text: 'Voltar pro início',
    action: 'voltar_inicio',
    gaAction: 'voltar_inicio'
  },
  alert: 'dispositivosConectados',
  homeId: getId(48),
  homeTimeoutId: getId(50)
};

export const FIBRA_DISPOSITIVOS_CONECTADOS_HOME = [
  ...FIBRA_DISPOSITIVOS_CONECTADOS('0', config),
  ...DISPOSITIVOS_HOME_END
];
