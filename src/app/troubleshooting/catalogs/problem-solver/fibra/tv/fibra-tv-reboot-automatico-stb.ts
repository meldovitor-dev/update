import { InteractionEnum } from './../../../../../domain/interactions';
import { TimerTypes } from './../../../../general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../../shared/alert-catalog';
import { CatalogModel, ConfigModel } from 'src/app/troubleshooting/troubleshooting-interface';

const getId = id => CatalogPrefix.REBOOT_AUTOMATICO_STB + id;
const getImage = (img: string) =>
  `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

const alertAction = {
  name: 'sim',
  action: {
    call: 'checkDataLoopAndProceed',
    params: {
      data: 'stb',
      identification: 'serialNumber',
      then: {
        call: 'nav',
        params: {
          id: getId(2)
        }
      },
      doneAllNetworks: {
        call: 'goToSuccessPage'
      }
    }
  }
};

export const FIBRA_TV_REBOOT_AUTOMATICO_STB = (negativeId, moduleId, config: ConfigModel= {}): CatalogModel[] =>
  JSON.parse(
    JSON.stringify([
      {
        id: getId(0),
        layout: {},
        state: {
          on:
            [
              {
                name: 'onInit',
                action: {
                  call: 'prepareContent',
                  params: {
                    call: 'populateSTBList',
                    interaction: InteractionEnum.fibraDiagnosticoCompleto,
                    dataOk: {
                      call: 'nav',
                      params: {
                        id: getId(1)
                      }
                    },
                    dataNok: {
                      call: 'changeModule',
                      params: {
                        id: moduleId
                      }
                    },
                    dataHandler: 'stbsHandler',
                    dataName: 'dataList'
                  }
                }
              },
            ],
        }
      },
      {
        id: getId(1),
        gaPageName: 'reiniciar_decodidifcador',
        fluxo: 'reboot_automatico_stb',
        layout: {
          title: 'Ok. Neste caso, vamos reiniciar o decodificador.',
          paragraph: 'Se você tem mais de um decodificador, selecione o que não funciona bem na lista a seguir.',
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
                  id: getId(2)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(2),
        gaPageName: 'selecionar_decodificador',
        layout: {
          stbSelect: true,
          title:
            'Selecione o número de série do decodificador que não está funcionando bem:'
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
              name: 'requestResetSTB',
              action: {
                call: 'nav',
                params: {
                  id: getId(8)
                }
              }
            },
            {
              name: 'noMore',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
            {
              name: 'success',
              action: {
                call: 'goToSuccessPage',
              }
            },
            {
              name: 'findSTB',
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
        gaPageName: 'selecionar_menu_configuracoes',
        layout: {
          title:
            'Selecione "MENU" no controle remoto e depois "Configurações" na TV.',
          image: getImage('menu_config.png'),
          buttons: [
            {
              text: 'Próximo',
              action: 'sim',
              gaAction: 'proximo_passo'
            },
            {
              text: 'Não consegui acessar',
              action: 'nao',
              gaAction: 'dificuldade_acessar'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(4)
                }
              }
            },
            {
              name: 'nao',
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
        id: getId(4),
        gaPageName: 'selecionar_informacao_sistema',
        layout: {
          title: 'Agora, selecione Informações do Sistema',
          image: getImage('info_sistema.png'),
          buttons: [
            {
              text: 'Próximo',
              action: 'sim',
              gaAction: 'proximo_passo'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'sim',
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
        gaPageName: 'anotar_numero_serie',
        layout: {
          title: 'Anote o "Número de série da Set-Top Box".',
          paragraph:
            'Realize esta ação e anote o número do decodificador com problema conectado à TV',
          image: getImage('serie_stb.png'),
          buttons: [
            {
              text: 'Encontrei o número!',
              action: 'sim',
              gaAction: 'localizado'
            },
            {
              text: 'Não encontrei',
              action: 'nao',
              gaAction: 'nao_localizado'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(2)
                }
              }
            },
            {
              name: 'nao',
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
        gaPageName: 'localizar_numero_serie',
        layout: {
          contentTop: true,
          title:
            'O número de série pode ser encontrado na parte de baixo do decodificador.',
          paragraph: 'Este está escrito neste formato: "S/N: 123456789"',
          image: getImage('numero_serie.png'),
          buttons: [
            {
              text: 'Encontrei o número!',
              action: 'sim',
              gaAction: 'numero_serie_encontrado'
            },
            {
              text: 'Não encontrei',
              action: 'nao',
              gaAction: 'numero_serie_nao_encontrado'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(2)
                }
              }
            },
            {
              name: 'nao',
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
        gaPageName: 'numero_serie_nao_localizado',
        layout: {
          title:
            'Como o número do decodificador não foi localizado, podemos reiniciar manualmente.',
          buttons: [
            {
              text: 'Vamos lá!',
              action: 'sim',
              gaAction: 'seguir_proxima_etapa'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'sim',
              action: {
                call: 'changeModule',
                params: {
                  id: moduleId
                }
              }
            }
          ]
        }
      },
      {
        id: getId(8),
        gaPageName: 'reiniciando_decodificador',
        layout: {
          title: 'Reiniciando o decodificador da TV...',
          loading: TimerTypes.RING,
          interaction: InteractionEnum.fibraRebootStb,
          hiddenHeaderBackButton: true,
          alert: getAlert(config.alert || 'tv-reboot-automatico-stb', 'tv_voltou_reiniciando_decodificador')
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'callServices',
                params: {
                  interaction: InteractionEnum.fibraRebootStb
                }
              }
            },
            {
              name: InteractionEnum.fibraRebootStb,
              action: {
                call: 'serviceResponse',
                params: {
                  timeout: {
                    call: 'nav',
                    params: {
                      id: getId(9)
                    }
                  },
                  success: config && config.successId ?
                  {
                    call: 'changeModule',
                    params: {
                      id: config.successId
                    }
                  } :
                  {
                    call: 'openPopup'
                  }
                }
              }
            },
            alertAction,
            {
              name: 'nao',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            }
          ]
        }
      },
      {
        id: getId(9),
        gaPageName: 'erro_reiniciando_decodificador',
        layout: {
          hiddenHeaderBackButton: true,
          title: 'Não foi possível reiniciar o seu decodificador.',
          paragraph:
            'Então vamos reiniciar manualmente pra tentar resolver o problema',
          buttons: [
            {
              text: 'Vamos lá!',
              action: 'sim',
              gaAction: 'seguir_proxima_etapa'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'sim',
              action: {
                call: 'changeModule',
                params: {
                  id: moduleId
                }
              }
            }
          ]
        }
      }
    ])
  );
