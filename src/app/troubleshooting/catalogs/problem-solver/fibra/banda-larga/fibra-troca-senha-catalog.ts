/* eslint-disable max-len */
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';

const getId = id => CatalogPrefix.TROCA_SENHA + id;

const getRedesConfig = {
  call: 'prepareContent',
  params: {
    call: 'populateConnectedDevices',
    interaction: InteractionEnum.fibraDiagnosticoCompleto,
    dataOk: {
      call: 'nav',
      params: {
        id: getId(3)
      }
    },
    dataNok: {
      call: 'nav',
      params: {
        id: getId(2)
      }
    },
    dataHandler: 'redesHandler',
    dataName: 'dataList'
  }
};
const homeAction = {
  name: 'voltar_inicio',
  action: {
    call: 'goToHome',
    params: {}
  }
};

export const TROCA_SENHA: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'dica_antes_trocar_senha',
    fluxo: 'troca_senha_home',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Antes de trocar a senha...',
      paragraph:
        'O app não armazena senhas. A senha é de sua responsabilidade. Anote ou decore a nova senha, pois será necessário conectá-las em todos os dispositivos como roteadores e repetidores novamente.',
      buttons: [
        {
          text: 'Vamos lá!',
          gaAction: 'comecar',
          action: 'navigate'
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
              id: getId(1)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: 'autenticando_modem',
    description: 'faz o diagnostico completo',
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
                  id: getId(2)
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
    id: getId(2),
    gaPageName: 'nao_sucesso_sem_rede_wifi_ativa',
    description: 'redes nao encontradas',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Não encontramos nenhuma rede Wi-Fi ativa.',
      paragraph: 'Conecte-se a uma rede Wi-Fi ou 3G/4G pra encontrarmos as redes disponíveis.',
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
    id: getId(3),
    gaPageName: 'selecionar_rede',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Selecione a rede que deseja trocar a senha.',
      networkList: true,
      contentTop: true
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
          name: 'requestChangeSsid',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'trocar_senha',
    layout: {
      input: 'password',
      wifiLabel: true,
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
              id: getId(5)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(5),
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
                call: 'goToConclusionPage',
                params: {
                  id: 'troca-senha-timeout',
                  continueId: { id: getId(7) } ,
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
                  id: getId(6)
                }
              }
            }
          }
        }
      ]
    }
  },
  {
    id: getId(6),
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
              id: getId(7)
            }
          }
        },
        {
          name: 'feito',
          action: {
            call: 'goToSuccessPage'
          }
        }
      ]
    }
  },
  {
    id: getId(7),
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
          action: 'nao',
          gaAction: 'dispositivos_nao_conectados'
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
              id: 'entre-contato-senha'
            }
          }
        },
        {
          name: 'feito',
          action: {
            call: 'goToSuccessPage'
          }
        }
      ]
    }
  }
];
