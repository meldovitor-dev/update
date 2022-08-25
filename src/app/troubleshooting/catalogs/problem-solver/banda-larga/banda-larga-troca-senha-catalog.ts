import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';

const getId = id => CatalogPrefix.TROCA_SENHA + id;
export const BANDA_LARGA_TROCA_SENHA: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'dica_antes_trocar_senha',
    fluxo: 'troca_senha_home',
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
              id: getId(1)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(1),
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
                call: 'nav',
                params: {
                  id: getId(6)
                }

              },
              success: {
                call: 'checkAuthHdmResponse',
                params: {
                  interaction: InteractionEnum.authenticateHdm,
                  hdmOk: {
                    call: 'changeModule',
                    params: {
                    id: getId(2)
                    }
                  },
                  hdmNok: {
                    call: 'changeModule',
                    params: {
                    id: getId(6)
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
    id: getId(2),
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
              id: getId(3)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(3),
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
                  id: 'troca-senha-sem-ligar'
                }
              },
              success: {
                call: 'nav',
                params: {
                  id: getId(4)
                }
              }
            }
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    description: 'sucesso troca senha',
    gaPageName: 'troca_senha_teste',
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
          gaAction: 'conseguiu_conectar_wifi_nova_senha'
        },
        {
          text: 'Não consigo conectar',
          action: 'naoConectar',
          gaAction: 'nao_conseguiu_conectar_wifi_nova_senha'
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
              id: getId(5)
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
    id: getId(5),
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
              id: 'padrao_sem_ligar'
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
    id: getId(6),
    gaPageName: 'aviso_sem_conexao_modem', //adicionar_tagueamento
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Sem conexão com o seu modem.',
      paragraph:
        'Precisaremos reiniciar o modem pra tentarmos nos conectar novamente.',
      buttons: [
        {
          text: 'Próximo',
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
    gaPageName: 'desligar_ligar_modem', //adicionar_tagueamento
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Desligue e ligue o modem da tomada.',
      image: './assets/images/troubleshooting/problem-solver/banda-larga/ligaredesligarocabodeenergia.svg',
      buttons: [
        {
          text: 'Feito!',
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
              id: getId(8)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(8),
    gaPageName: 'reiniciando_modem', //adicionar_tagueamento
    layout: {

      title: 'Reiniciando o modem...',
      paragraph: 'Aguarde enquanto o processo é concluído.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'manualCronometerProcess', params: {
              config: 'rebootManual'
            }
          }
        },
        {
          name: 'manualCronoExpired',
          action: {
            call: 'nav', params: {
              id: getId(9)
            }
          }
        },
      ]
    }
  },
  {
    id: getId(9),
    gaPageName: 'loading',
    layout: {
      loading: TimerTypes.LOADING,
      loadingLabel: 'Carregando',
      hiddenHeaderBackButton: true,
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
                params: {
                  id: 'nao-podemos-ajudar'
                }
              },
              success: {
                call: 'checkAuthHdmResponse',
                params: {
                  interaction: InteractionEnum.authenticateHdm,
                  hdmOk: {
                    call: 'changeModule',
                    params: {
                    id: getId(2)
                    }
                  },
                  hdmNok: {
                    call: 'goToConclusionPage',
                    params: {
                      id: 'modem-sem-conexao'
                    }
                  }
                }
              }
            }
          }
        },
      ]
    }
  },
];


//adicionar_tagueamento banda larga
// tela de "sua senha foi alterada com sucesso"
//tela de "nao foi possivel realizar a troca de senha" b