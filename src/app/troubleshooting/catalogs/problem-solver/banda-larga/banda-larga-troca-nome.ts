import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';

const getId = id => CatalogPrefix.TROCA_NOME + id;
export const BANDA_LARGA_TROCA_NOME: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'dica_antes_trocar_nome',
    fluxo: 'troca_nome',
    layout: {
      title: 'Antes de trocar o nome...',
      paragraph: 'O app não armazena informações. O nome é de sua responsabilidade.<br/><br/>Anote ou decore o novo nome, pois será necessário conectá-lo em todos os seus dispositivos novamente.',
      buttons: [
        {
          text: 'Vamos lá!',
          action: 'navigate',
          gaAction: 'comecar',
        },
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
    gaPageName: 'autenticando_modem',
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
                  id: getId(4)
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
    id: getId(2),
    gaPageName: 'trocar_nome',
    layout: {
      input: 'ssid',
      hiddenHeaderBackButton: true,
      title: 'Novo nome da rede',
      paragraph:
        'O novo nome precisa:<br>'+
        '• Ter até 32 caracteres<br>'+
        '• Não usar caractere especial (?@!)<br>'+
        '• Não usar espaços.'
    },
    state: {
      on: [
        {
          name: 'changeSsid',
          action: {
            call: 'nav',
            params: {
              id: getId(3),
            },
          },
        },
      ],
    },
  },
  {
    id: getId(3),
    gaPageName: 'trocando_nome',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Trocando o nome...',
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
              interaction: InteractionEnum.bandaLargaSetSSIDWifi
            }
          }
        },
        {
          name: InteractionEnum.bandaLargaSetSSIDWifi,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'goToConclusionPage',
                params: {
                  id: 'troca-nome-timeout'
                }
              },
              error: {
                call: 'goToConclusionPage',
                params: {
                  id: 'troca-nome-sem-tel'
                }
              },
              success: {
                call: 'goToSuccessPage',
              }
            }
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'aviso_sem_conexao_modem',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Sem conexão com o seu modem.',
      paragraph:
        'Precisaremos reiniciar o modem pra tentarmos nos conectar novamente.',
      buttons: [
        {
          text: 'Próximo',
          action: 'navigate',
          gaAction: 'comecar'
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
              id: getId(5)
            }
          }
        }
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'desligar_ligar_modem',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Desligue e ligue o modem da tomada.',
      image: './assets/images/troubleshooting/problem-solver/banda-larga/ligaredesligarocabodeenergia.svg',
      buttons: [
        {
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'feito'
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
    gaPageName: 'reiniciando_modem',
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
              id: getId(7)
            }
          }
        },
      ]
    }
  },
  {
    id: getId(7),
    gaPageName: 'carregando',
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
