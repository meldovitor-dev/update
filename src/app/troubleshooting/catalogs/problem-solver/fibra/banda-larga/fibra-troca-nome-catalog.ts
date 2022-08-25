import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';

const getId = (id) => CatalogPrefix.TROCA_NOME + id;

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
    call: 'goToHome', params: {},
  },
};

export const TROCA_NOME: CatalogModel[] = [
    {
      id: getId(0),
      gaPageName: 'dica_antes_trocar_nome',
      fluxo: 'troca_nome',
      layout: {
        title: 'Antes de trocar o nome...',
        paragraph: 'Anote ou decore o novo nome da sua rede. Será necessário reconectar todos os dipositivos. O nome é de sua responsabilidade e não fica armazenado no app.',
        buttons: [
          {
            text: 'Vamos lá!',
            action: 'verify',
            gaAction: 'comecar',
          },
        ],
      },
      state: {
      on: [
        {
          name: 'verify',
          action: {
            call: 'nav', params: {
              id: getId(1),
            },
          },
        },
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
        paragraph: 'Aguarde enquanto o processo é concluído.',
      },
      state: {
        on: [
          {
            name: 'onInit',
            action: {
              call: 'callServices', params: {
                interaction: InteractionEnum.fibraDiagnosticoCompleto
              },
            }
          },
          {
            name: InteractionEnum.fibraDiagnosticoCompleto,
            action: {
              call: 'serviceResponse',
              params: {
                timeout: {
                  call: 'goToConclusionPage',
                  params: {
                    id: 'troca-nome-fibra-netq-timeout'
                  }
                },
                success: getRedesConfig
              },
            }
          },
        ],
      },
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
      id: getId(3),
      gaPageName: 'selecionar_rede',
      layout: {
        title: 'Selecione a rede que deseja trocar o nome.',
        hiddenHeaderBackButton: true,
        networkList: true,
        contentTop: true,
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
            name: 'requestChangeSsid',
            action: {
              call: 'nav',
              params: {
                id: getId(4),
              },
            },
          },
        ]
      }
    },
    {
      id: getId(4),
      gaPageName: 'trocar_nome',
      layout: {
        input: 'ssid',
        wifiLabel: true,
        title: 'Novo nome da rede.',
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
                id: getId(5),
              },
            },
          },
        ],
      },
    },
    {
      id: getId(5),
      gaPageName: 'trocando_nome',
      layout: {
        title: 'Trocando o nome...',
        hiddenHeaderBackButton: true,
        paragraph: 'Aguarde enquanto o processo é concluído.',
        loading: TimerTypes.RING,
      },
      state: {
        on: [
          {
            name: 'onInit',
            action: {
              call: 'callServices', params: {
                interaction: InteractionEnum.fibraSetSSIDWifi,
              },
            }
          },
          {
            name: InteractionEnum.fibraSetSSIDWifi,
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
                    id: 'troca-nome'
                  }
                },
                success: {
                  call: 'goToSuccessPage',
                },
              },
            }
          },
        ],
      },
    },
    {
      id: getId(6),
      gaPageName: 'nao_sucesso_sem_conexao_modem',
      description: 'redes nao encontradas',
      layout: {
        hiddenHeaderBackButton: true,
        title: 'Não foi possível fazer conexão com o seu modem.',
        paragraph: 'Você pode ligar pra gente se quiser alterar a nome. A ligação é gratuita.',
        buttons: [{
          text: 'Ligar',
          action: 'goToCallCenter',
          gaAction: 'ligar',
        },
        {
          text: 'Voltar pro início',
          action: 'voltar_inicio',
          gaAction: 'voltar_inicio',
        }]
      },
      state: {
        on: [
          homeAction,
          {
            name: 'goToCallCenter',
            action: {
              call: 'goToCallCenter',
            }
          }
        ],
      },
    },
];
