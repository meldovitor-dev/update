import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from './../../../../troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';
import { InteractionEnum } from 'src/app/domain/interactions';

const getId = (id: number) => CatalogPrefix.ISOLAR_STB + id;
const getImage = (img: string) => 'assets/images/troubleshooting/problem-solver/fibra/tv/' + img;

export const FIBRA_TV_ISOLAR_STB = (negativeId): CatalogModel[]  => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    layout: {
    },
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
                    id: negativeId
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
    gaPageName: 'verificar_equipamento_tv_modem',
    fluxo: 'isolar_stb',
    layout: {
      contentTop: true,
      title: 'Você possui algum equipamento entre o decodificador da TV e o modem?',
      paragraph: 'Verifique se tem um switch ou hub conectado entre a sua TV e o modem.',
      image: getImage('01_switch_hub.svg'),
      buttons: [
        {
          text: 'Sim, possuo',
          action: 'sim',
          gaAction: 'sim'
        },
        {
          text: 'Não',
          action: 'nao',
          gaAction: 'nao'
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
    id: getId(2),
    gaPageName: 'verificar_equipamentos_conectados',
    layout: {
      contentTop: true,
      title: 'Além da TV, você possui algum outro dispositivo conectado a este switch / hub?',
      paragraph: 'Confira se existem outros dispositivos como computadores, notebooks e câmeras ligados ao switch / hub.',
      image: getImage('02_switch_aparelhos.svg'),
      buttons: [
        {
          text: 'Sim, tenho outros dispositivos',
          action: 'sim',
          gaAction: 'outros_dispositivos'
        },
        {
          text: 'Não, apenas a TV',
          action: 'nao',
          gaAction: 'somente_tv'
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
              id: getId(3)
            }
          }
        },
        {
          name: 'nao',
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
    id: getId(3),
    gaPageName: 'isolar_stb',
    layout: {
      contentTop: true,
      title: 'Desconecte os outros dispositivos e deixe apenas os pontos de TV ligados ao switch / hub.',
      paragraph: 'Remova os cabos de computadores, notebooks e outros dispositivos que possam interferir ' +
        'no funcionamento do decodificador da TV.',
      image: getImage('03_switch_sem_aparelhos.svg'),
      alert: getAlert('tv-manual-stb', 'tv_voltou_isolando_stb'),
      buttons: [
        {
          text: 'Não consegui desconectar',
          action: 'nao_conseguiu',
          gaAction: 'nao_conseguiu'
        },
        {
          text: 'Feito. Está somente a TV',
          action: 'navigate',
          gaAction: 'feito'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'nao_conseguiu',
          action: {
            call: 'nav',
            params: {
              id: getId(5)
            }
          }
        },
        {
          name: 'navigate',
          action: {
              call: 'openPopup'
          }
      },
      {
          name: 'nao',
          action: {
              call: 'nav',
              params: {
                  id: getId(5)
              }
          }
      },
      {
          name: 'sim',
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
    gaPageName: 'dispositivos_impactando_sinal',
    layout: {
      contentTop: true,
      title: 'Os outros dispositivos conectados ao switch / hub estavam afetando o sinal da sua TV.',
      paragraph: 'O switch / hub conectado entre a sua TV e o modem só comporta apenas um tipo de serviço.<br>' +
        'Para manter os outros dispositivos funcionando, você deve ligá-los diretamente ao modem de Fibra.<br><br>' +
        'Se o problema continuar, entre em contato com um técnico particular de sua preferência.',
      image: getImage('04_modem_equipamentos.svg'),
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'sim',
          gaAction: 'entendido'
        },
      ]
    },
    state: {
      on: [
        {
          name: 'sim',
          action: {
            call: 'goToHome',
          }
        }
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'conectar_decodificador_modem',
    layout: {
      contentTop: true,
      title: 'Então, conecte o cabo do decodificador da TV diretamente no modem de fibra',
      paragraph: 'Ligue o cabo do decodificador da TV em uma porta LAN (amarela) do modem de fibra.',
      image: getImage('05_retira_switch.svg'),
      alert: getAlert('tv-manual-stb', 'tv_voltou_conectando_decodificador_modem'),
      buttons: [
        {
          text: 'Não consegui conectar o cabo',
          action: 'nao_conseguiu',
          gaAction: 'nao_conseguiu'
        },
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
          name: 'nao_conseguiu',
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
            call: 'checkStbListLength',
            params: {
                dataOk: {
                  call: 'nav',
                  params: {
                    id: getId(6)
                  }
                },
                dataNok: {
                  call: 'goToConclusionPage',
                  params: {
                    id: 'entre-contato'
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
    gaPageName: 'conclusao_problema_switch_hub',
    layout: {
      contentTop: true,
      title: 'Seu switch ou hub pode estar com problema.',
      paragraph: 'Conecte a sua TV diretamente no modem de fibra.<br><br>' +
        'Sugerimos que verifique a configuração com um técnico particular.',
      image: getImage('06_tv_modem.svg'),
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'sim',
          gaAction: 'entendido'
        },
      ]
    },
    state: {
      on: [
        {
          name: 'sim',
          action: {
            call: 'goToHome',
          }
        }
      ]
    }
  },
]));
