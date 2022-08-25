import { FeatureEnum } from 'src/app/enums/feature.enum';
import { CatalogModel, PageConfigModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CONFIGURACAO_ANTENA_MODEM } from '../../../unlogged-area/configuracao-antena-modem';
import { getAlert } from '../../shared/alert-catalog';
import { DICAS_E_BOAS_PRATICAS } from '../../../unlogged-area/dicas-boas-praticas-catalog';
import { InteractionEnum } from 'src/app/domain/interactions';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';

const getId = (id) => CatalogPrefix.COMPATIBILIDADE + id;
const getIdManual = (id) => CatalogPrefix.COMPATIBILIDADE_MANUAL + id;
const alert = getAlert('feedback-alert');
const getImage = (img) => `assets/images/troubleshooting/unlogged-area/modem-antena/${img}`;
const negativeState = (id) => {
  return {
    name: 'negative',
    action: {
      call: 'changeModule',
      params: {
        id,
      },
    },
  };
};

const getConnectedWithOiWifi = (negativeId) => {
  return {
    call: 'checkIfConnectedToOiWifi',
    params: {
      call: 'checkIfConnectedToOiWifi',
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
          id: negativeId
        }
      },
    }
  };
}

const pageConfig: PageConfigModel = {
  feedback: {
    gaPageName: 'avaliar_dicas',
    title: 'Estas dicas foram úteis?',
    buttons: [
      {
        text: 'Não',
        action: 'goHomeFeedback',
        gaAction: 'nao_util',
      },
      {
        text: 'Sim',
        action: 'goHomeFeedback',
        gaAction: 'util',
      },
    ],
    state: {
      name: 'goHomeFeedback',
      action: {
        call: 'navigateToHome',
      },
    },
  },
};

export const COMPATIBILIDADE_VELOCIDADE: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'informacao_frequencias_rede',
    fluxo: 'capacidade_dispositivos',
    pageConfig,
    layout: {
      contentTop: true,
      noFeedback: true,
      title:
        'Vamos verificar a velocidade do seu dispositivo no Wi-Fi da Oi.',
      image: getImage('ilustracao_compatibilidade.svg'),
      imageCaption:
        'O seu modem Oi Fibra pode ter duas frequências Wi-Fi: 5.0 GHz e 2.4 GHz.<br><br>' +
        'A 5.0 GHz é mais rápida perto do modem, e a 2.4 GHz tem alcance maior.',
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
              id: getId(1),
            },
          },
        },
      ],
    },
  },
  {
    id: getId(1),
    gaPageName: 'selecionar_dispositivo_verificacao_velocidade',
    layout: {
      noFeedback: true,
      title: 'Qual dispositivo você quer verificar a velocidade?',
      alphabetical: true,
      buttons: [
        {
          text: 'Este celular',
          action: 'celular',
          gaAction: 'celular',
        },
        {
          text: 'Outros dispositivos',
          action: 'outro',
          gaAction: 'outro_dispositivo',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'celular',
          action: {
            call: 'nav',
            params: {
              id: getId(2),
            },
          },
        },
        {
          name: 'outro',
          action: {
            call: 'nav',
            params: {
              id: getIdManual(1),
            },
          },
        },
      ],
    },
  },
  {
    id: getId(2),
    gaPageName: 'verificando_dispositivos',
    description: 'faz o diagnostico completo',
    layout: {
      hiddenHeaderBackButton: true,
      loading: TimerTypes.RING,
      title: 'Verificando redes da Oi…',
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
                  id: getId(6)
                }
              },
              success: getConnectedWithOiWifi(getId(6))
            }
          }
        }
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'aproximar_modem_verificacao_celular',
    layout: {
      contentTop: true,
      hiddenHeaderBackButton: true,
      noFeedback: true,
      title: 'Fique a 1 metro e meio de distância do modem Oi.',
      image: getImage('ilustracao_distancia.svg'),
      imageCaption:
        'Antes de começar:<br>'+
        '- Mantenha a porta aberta caso o modem esteja dentro de um armário<br>' +
        '- Retire a capa do seu celular.',
      buttons: [
        {
          text: 'Estou perto! Verificar agora',
          action: 'navigate',
          gaAction: 'verificar',
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
              id: getId(4),
            },
          },
        },
      ],
    },
  },
  {
    id: getId(4),
    gaPageName: 'verificar_configuracoes',
    layout: {
      noFeedback: true,
      wifiDependencies: true,
      contentTop: true,
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav',
            params: {
              id: getId(400),
            },
          },
        },
        {
          name: 'not-ok',
          action: {
            call: 'changeModule',
            params: {
              id: getId(6),
            },
          },
        },
        {
          name: 'not-wifi-oi',
          action: {
            call: 'changeModule',
            params: {
              id: getId(9),
            },
          },
        },
      ],
    },
  },
  {
    id: getId(400),
    description: 'Tela para avaliar resultado do wifiInfo e enviar para o local correto',
    gaPageName: '',
    layout: {},
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'verifyWifiResult',
            params: {
              dualBand5: { id: getId(5) },
              singleband: { id: getId(5) },
              error: { id: getId(6) },
              dualBandError: { id: getId(10)}
            },
          },
        },
      ],
    },
  },
  {
    id: getId(5),
    gaPageName: 'informacoes_rede',
    layout: {
      title: 'Veja as velocidades que seu celular pode alcançar:',
      wifiInfoResult: true,
      contentTop: true,
      alert,
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'dispatchWifiInfo',
            params: {
              success: true,
            }
          },
        },
        {
          name: 'rede2.4',
          action: {
            call: 'nav',
            params: {
              id: getId(7),
            },
          },
        },
        {
          name: 'rede5',
          action: {
            call: 'nav',
            params: {
              id: getId(8),
            },
          },
        },
        {
          name: 'erro',
          action: {
            call: 'nav',
            params: {
              id: getId(6),
            },
          },
        },
        {
          name: 'goToHome',
          action: {
            call: 'goToHome',
          },
        },
        {
          name: 'linkSharedEvt',
          action: {
            call: 'nav',
            params: {
              id: 0
            }
          }
        }
      ],
    },
  },
  {
    id: getId(6),
    gaPageName: 'aviso_verificacao_nao_efetuada',
    layout: {
      noFeedback: true,
      title: 'Não conseguimos verificar as informações do seu celular.',
      paragraph:
        'Verifique a capacidade do seu aparelho com um passo a passo manual.',
      buttons: [
        {
          text: 'Verificar manualmente',
          action: 'navigate',
          gaAction: 'verificar_manualmente',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'dispatchWifiInfo',
            params: {
              success: false,
            }
          },
        },
        {
          name: 'navigate',
          action: {
            call: 'nav',
            params: {
              id: 'compatibilidadeManual-7',
            },
          },
        },
      ],
    },
  },
  {
    id: getId(7),
    gaPageName: 'conectar_rede_24ghz',
    layout: {
      noFeedback: true,
      contentTop: true,
      title: 'Conecte o seu celular à rede 2.4 GHz do modem Oi.',
      image: getImage('trocar_rede.svg'),
      linkShare: {
        gaAction: 'mudar_rede_24ghz',
        label: 'Clique aqui pra mudar para a rede 2.4 GHz.',
        captionLabel:
          'Fique a 1 metro e meio de distância do modem para verificar novamente.',
        action: 'openWifiSettinfgs',
      },
      buttons: [
        {
          text: 'Pronto! Estou na rede 2.4 GHz',
          action: 'navigate',
          gaAction: 'mudar_rede_24ghz',
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
              id: getId(4),
            },
          },
        },
      ],
    },
  },
  {
    id: getId(8),
    gaPageName: 'conectar_rede_5ghz',
    layout: {
      noFeedback: true,
      contentTop: true,
      title: 'Conecte o seu celular à rede 5 GHz do modem Oi.',
      image: getImage('trocar_rede.svg'),
      linkShare: {
        gaAction: 'mudar_rede_5ghz',
        label: 'Clique aqui pra mudar para a rede 5 GHz.',
        captionLabel:
          'Fique a 1 metro e meio de distância do modem para verificar novamente.',
        action: 'openWifiSettinfgs',
      },
      buttons: [
        {
          text: 'Pronto! Estou na rede 5 GHz',
          action: 'navigate',
          gaAction: 'mudar_rede_5ghz',
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
              id: getId(3),
            },
          },
        },
      ],
    },
  },
  {
    id: getId(9),
    gaPageName: 'aviso_conectar_rede_wifi_oi',
    layout: {
      contentTop: true,
      noFeedback: true,
      title: 'Você precisa estar conectado a uma rede Wi-Fi da Oi.',
      paragraph: 'Identificamos que você está conectado em uma rede que não é da Oi.<br><br>' +
      'Verifique a capacidade do seu aparelho com um passo a passo manual.',
      buttons: [
        {
          text: 'Verificar manualmente',
          action: 'navigate',
          gaAction: 'verificar_manualmente',
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
              id: 'compatibilidadeManual-7',
            },
          },
        },
      ],
    },
  },
  {
    id: getId(10),
    gaPageName: 'aviso_conectar_rede_wifi_oi',
    layout: {
      title: 'Não conseguimos verificar as informações do seu celular na rede #REDE# GHz.',
      paragraph: 'Verifique a capacidade do seu aparelho com um passo a passo manual.',
      buttons: [
        {
          text: 'Verificar manualmente',
          action: 'navigate',
          gaAction: 'verificar_manualmente',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'setTitleRedeCntError',
          }
        },
        {
          name: 'navigate',
          action: {
            call: 'nav',
            params: {
              id: 'compatibilidadeManual-7',
            },
          },
        },
      ],
    },
  },
  {
    id: getId(11),
    gaPageName: 'aviso_conectar_rede_wifi_oi',
    layout: {
      contentTop: true,
      noFeedback: true,
      title: 'Não conseguimos verificar as informações do seu celular na rede 5.0 GHz.',
      paragraph: 'Verifique a capacidade do seu aparelho com um passo a passo manual.' +
      'Verifique a capacidade do seu aparelho com um passo a passo manual.',
      buttons: [
        {
          text: 'Verificar manualmente',
          action: 'navigate',
          gaAction: 'verificar_manualmente',
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
              id: 'compatibilidadeManual-7',
            },
          },
        },
      ],
    },
  },
  ...DICAS_E_BOAS_PRATICAS,
  ...CONFIGURACAO_ANTENA_MODEM(),
];

export const COMPATIBILIDADE_VELOCIDADE_REPAIR = (negativeId): CatalogModel[] =>
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
                  call: 'verifyPlatform',
                  params: {
                    platform: 'android',
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
        fluxo: 'capacidade_dispositivos_problema',
        gaPageName: 'selecionar_dispositivo_lentidao',
        layout: {
          title: 'Em qual dispositivo você está com lentidão?',
          buttons: [
            {
              text: 'Somente neste celular',
              action: 'celular',
              gaAction: 'celular',
            },
            {
              text: 'Outros dispositivos',
              action: 'negative',
              gaAction: 'outro_dispositivo',
            },
            {
              text: 'Outros aparelhos de celular',
              action: 'negative',
              gaAction: 'outros_celulares',
            },
          ],
        },
        state: {
          on: [
            {
              name: 'celular',
              action: {
                call: 'nav',
                params: {
                  id: getId(30),
                },
              },
            },
            negativeState(negativeId),
          ],
        },
      },
      {
        id: getId(30),
        layout: {},
        state: {
          on:
            [
              {
                name: 'onInit',
                action: {
                  call: 'checkIfConnectedToOiWifi',
                  params: {
                    call: 'checkIfConnectedToOiWifi',
                    interaction: InteractionEnum.fibraDiagnosticoCompleto,
                    dataOk: {
                      call: 'nav',
                      params: {
                        id: getId(2)
                      }
                    },
                    dataNok: {
                      call: 'nav',
                      params: {
                        id: getId(7)
                      }
                    },
                  }
                },
              }
            ],
        }
      },
      {
        id: getId(2),
        gaPageName: 'aproximar_modem_verificacao_celular',
        layout: {
          contentTop: true,
          title: 'Fique a 1 metro e meio de distância do modem Oi.',
          image: getImage('ilustracao_distancia.svg'),
          imageCaption:
            'Antes de começar, é importante que você:<br>' +
            '- Mantenha a porta aberta caso o modem esteja dentro de um armário<br>' +
            '- Retire a capa do seu celular',
          buttons: [
            {
              text: 'Estou perto! Verificar agora',
              action: 'navigate',
              gaAction: 'verificar',
            },
            {
              text: 'Pular esta etapa',
              action: 'negative',
              gaAction: 'pular_etapa',
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
                  id: getId(3),
                },
              },
            },
            negativeState(negativeId),
          ],
        },
      },
      {
        id: getId(3),
        gaPageName: 'verificar_configuracoes',
        layout: {
          wifiDependencies: true,
          contentTop: true,
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'nav',
                params: {
                  id: getId(4),
                },
              },
            },
            {
              name: 'not-ok',
              action: {
                call: 'changeModule',
                params: {
                  id: getId(7),
                },
              },
            },
            {
              name: 'not-wifi-oi',
              action: {
                call: 'changeModule',
                params: {
                  id: getId(16),
                },
              },
            },
          ],
        },
      },
      {
        id: getId(4),
        description: 'Tela para avaliar resultado do wifiInfo e enviar para o local correto',
        layout: {},
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'verifyWifiResultFluxo',
                params: {
                  dualBand24: { id: getId(5) },
                  dataOk: { id: getId(6) },
                },
              },
            },
          ],
        },
      },
      {
        id: getId(5),
        gaPageName: 'conectar_rede',
        layout: {
          contentTop: true,
          title: 'Agora conecte na rede 5 GHz do Wi-Fi para testar a velocidade.',
          image: getImage('trocar_rede.svg'),
          imageCaption: 'Você está conectado na rede 2.4.<br>' +
            'Seu dispositivo é dual Band e acessa as duas redes. Conecte-se na rede 5 GHz do seu modem Oi.',
          linkShare: {
            gaAction: 'conectar_rede_5ghz',
            label: 'Clique aqui pra mudar para a rede 5 GHz.',
            captionLabel:
              'Mantenha-se bem perto do modem para verificar novamente.',
            action: 'openWifiSettinfgs',
          },
          buttons: [
            {
              text: 'Não consegui conectar',
              action: 'nao_consegue_conectar',
              gaAction: 'nao_consegue_conectar',
            },
            {
              text: 'Pronto! Estou na rede 5 GHz',
              action: 'navigate',
              gaAction: 'conectado',
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
                  id: getId(3),
                },
              },
            },
            {
              name: 'nao_consegue_conectar',
              action: {
                call: 'checkDataAndNav',
                params: {
                  data: {
                    key: 'try5ghz',
                    value: true
                  },
                  idNok: { id: getId(6) },
                  idOk: { id: getId(13) }
                },
              },
            },
          ],
        },
      },
      {
        id: getId(6),
        gaPageName: 'informacoes_rede',
        layout: {
          title: 'Confira as informações sobre este celular:',
          wifiInfoResult: true,
          contentTop: true,
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'setDataAndDispatch',
                params: {
                  data: [
                    { key: 'try5ghz',
                      value: true,
                    },
                    {
                      key: 'displayedSpeed',
                      value: true,
                    }
                  ],
                  success: true,
                },
              },
            },
            {
              name: 'erro',
              action: {
                call: 'nav',
                params: {
                  id: getId(7),
                },
              },
            },
            {
              name: 'dual-band-duplo-maior',
              action: {
                call: 'nav',
                params: {
                  id: getId(8),
                },
              },
            },
            {
              name: 'dual-band-duplo-menor',
              action: {
                call: 'nav',
                params: {
                  id: getId(10),
                },
              },
            },
            {
              name: 'dual-band-duplo-sem-plano',
              action: {
                call: 'nav',
                params: {
                  id: getId(10),
                },
              },
            },
            {
              name: 'dual-band-5-maior',
              action: {
                call: 'nav',
                params: {
                  id: getId(8),
                },
              },
            },
            {
              name: 'dual-band-5-menor',
              action: {
                call: 'nav',
                params: {
                  id: getId(11),
                },
              },
            },
            {
              name: 'dual-band-5-sem-plano',
              action: {
                call: 'nav',
                params: {
                  id: getId(12),
                },
              },
            },
            {
              name: 'dual-band-24-maior',
              action: {
                call: 'nav',
                params: {
                  id: getId(8),
                },
              },
            },
            {
              name: 'dual-band-24-menor',
              action: {
                call: 'nav',
                params: {
                  id: getId(5),
                },
              },
            },
            {
              name: 'dual-band-24-sem-plano',
              action: {
                call: 'nav',
                params: {
                  id: getId(5),
                },
              },
            },
            {
              name: 'single-band-maior',
              action: {
                call: 'nav',
                params: {
                  id: getId(8),
                },
              },
            },
            {
              name: 'single-band-menor',
              action: {
                call: 'nav',
                params: {
                  id: getId(15),
                },
              },
            },
            {
              name: 'single-band-sem-plano',
              action: {
                call: 'nav',
                params: {
                  id: getId(14),
                },
              },
            },
          ],
        },
      },
      {
        id: getId(7),
        gaPageName: 'aviso_verificacao_nao_efetuada',
        layout: {
          title: 'Não conseguimos verificar as informações do seu celular.',
          buttons: [
            {
              text: 'Continuar',
              action: 'negative',
              gaAction: 'seguir_proxima_etapa'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'dispatchWifiInfo',
                params: {
                  success: false,
                }
              },
            },
            negativeState(negativeId)
          ]
        }
      },
      {
        id: getId(8),
        description: 'Tela em que a medição é maior que a velocidade contratada',
        gaPageName: 'aviso_celular_alcancando_velocidade_contratada',
        layout: {
          title: 'Legal! O seu celular é capaz de atingir a velocidade contratada.',
          paragraph: 'Verificamos que, perto do modem, o dispositivo consegue atingir a velocidade máxima do seu plano.<br><br>' +
            'Em outros ambientes, interferências podem afetar a qualidade do sinal e a velocidade da sua internet.',
          alert,
          buttons: [
            {
              text: 'Continuar',
              action: 'navigate',
              gaAction: 'seguir'
            },
          ]
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
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(9)
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
        id: getId(9),
        description: 'Conclusao da tela em que a medição é maior que a velocidade contratada',
        gaPageName: 'aviso_melhora_velocidade_perto_modem',
        layout: {
          title: 'Quanto mais perto do modem você estiver, melhor a conexão Wi-Fi.',
          paragraph: 'Equipamentos que emitem ondas, espelhos e paredes podem atrapalhar o sinal Wi-Fi.',
          linkShare: {
            gaAction: 'ver_dicas_wifi',
            label: 'Clique aqui e veja dicas de como melhorar o sinal da internet.',
            action: 'sendEvent',
          },
          buttons: [
            {
              text: 'OK, entendi!',
              action: 'navigate',
              gaAction: 'seguir'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'goToSuccessPage',
              }
            },
            {
              name: 'linkSharedEvt',
              action: {
                call: 'nav',
                params: {
                  id: 0
                }
              }
            }
          ]
        }
      },
      {
        id: getId(10),
        description: 'Tela em que a medição é menor que a velocidade contratada no caso das duas redes estarem presentes',
        gaPageName: 'aviso_melhora_velocidade_perto_modem',
        layout: {
          title: 'Quanto mais perto do modem você estiver, melhor a conexão Wi-Fi.',
          paragraph: 'Em outros ambientes, interferências podem afetar a qualidade do sinal e a velocidade da sua internet.<br><br>' +
            'Vamos fazer um passo a passo que pode ajudar a melhorar a velocidade da sua internet.',
          buttons: [
            {
              text: 'Continuar',
              action: 'navigate',
              gaAction: 'seguir_proxima_etapa'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
          ]
        }
      },
      {
        id: getId(11),
        description: 'Tela em que a medição é menor que a velocidade contratada no caso de somente a 5 GHz',
        gaPageName: 'aviso_celular_nao_alcanca_velocidade_contratada',
        layout: {
          title: 'Olha, verificamos que o seu celular alcança uma boa capacidade na rede 5 GHz.',
          paragraph: 'Seu celular tem capacidade para navegar na rede 5.0 que possui maior velocidade de Wi-Fi, ' +
            'porém não alcança o total do plano contratado.<br><br>' +
            'Vamos fazer um passo a passo que pode ajudar a melhorar a velocidade da sua internet.',
          buttons: [
            {
              text: 'Continuar',
              action: 'navigate',
              gaAction: 'seguir_proxima_etapa'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
          ]
        }
      },
      {
        id: getId(12),
        description: 'Tela Dual Band 5ghz sem plano contratado',
        gaPageName: 'aviso_celular_alcanca_boa_capacidade_rede_5ghz',
        layout: {
          title: 'Verificamos que seu celular é capaz de se conectar à rede 5 GHz e navegar muito mais rápido.',
          paragraph: 'Vamos fazer um passo a passo que pode ajudar a melhorar a velocidade da sua internet.',
          buttons: [
            {
              text: 'Continuar',
              action: 'navigate',
              gaAction: 'seguir_proxima_etapa'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
          ]
        }
      },
      {
        id: getId(13),
        description: 'Tela em que o aparelho é dualband, mas o cliente nao consegiu conectar com a rede 5 GHz',
        gaPageName: 'aviso_celular_capacidade_5ghz',
        layout: {
          title: 'Tente conectar o celular à rede 5 GHz mais tarde.',
          paragraph: 'Como você não conseguiu se conectar na rede 5 GHz agora, ' +
            'vamos fazer um passo a passo pra tentar resolver o seu problema de lentidão.',
          buttons: [
            {
              text: 'Continuar',
              action: 'navigate',
              gaAction: 'seguir_proxima_etapa'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
          ]
        }
      },
      {
        id: getId(14),
        description: 'Tela em que o aparelho não é dualband e não possui dados do plano do cliente',
        gaPageName: 'aviso_celular_nao_possui_compatibilidade_5ghz',
        layout: {
          title: 'Que pena! O seu dispositivo não é compatível com a rede 5 GHz.',
          paragraph: 'Com a rede 5 GHz você navega mais rápido e aproveita o máximo da velocidade que seu plano tem a oferecer.<br><br>' +
            'Mas tudo bem, vamos fazer um passo a passo que pode ajudar com o seu problema de lentidão.',
          buttons: [
            {
              text: 'Continuar',
              action: 'navigate',
              gaAction: 'seguir_proxima_etapa'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
          ]
        }
      },
      {
        id: getId(15),
        description: 'Tela em que o aparelho não é dualband, possui dados do plano do cliente e nao alcança',
        gaPageName: 'aviso_celular_nao_possui_capacidade_5ghz',
        layout: {
          contentTop: true,
          title: 'Que pena! O seu dispositivo não é compatível com a rede 5 GHz.',
          paragraph: 'Infelizmente esse celular não consegue se conectar à rede 5 GHz e ' +
            'por isso não é capaz de alcançar a velocidade contratada.<br><br>' +
            'Pra atingir a velocidade máxima da sua internet fibra, ' +
            'você precisa de um dispositivo compatível com a frequência 5 GHz.<br><br>' +
            'Mas tudo bem, vamos fazer um passo a passo que pode ajudar com o seu problema de lentidão.',
          buttons: [
            {
              text: 'Continuar',
              action: 'navigate',
              gaAction: 'seguir_proxima_etapa'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
          ]
        }
      },
      {
        id: getId(16),
        gaPageName: 'aviso_conectar_rede_wifi_oi',
        layout: {
          contentTop: true,
          noFeedback: true,
          title: 'Você precisa estar conectado a uma rede Wi-Fi da Oi.',
          paragraph: 'Identificamos que você está conectado em uma rede que não é da Oi.' +
          'Vamos fazer um passo a passo que pode ajudar a melhorar a velocidade da sua internet.',
          buttons: [
            {
              text: 'continuar',
              action: 'navigate',
              gaAction: 'seguir_proxima_etapa',
            },
          ],
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'changeModule',
                params: {
                  id: negativeId
                }
              }
            },
          ],
        },
      },
      ...DICAS_E_BOAS_PRATICAS,
      ...CONFIGURACAO_ANTENA_MODEM()
    ])
  );
