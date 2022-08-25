import { getAlert } from '../shared/alert-catalog';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';

const getId = id => CatalogPrefix.CONFIG_MODEM_MANUAL + id;
const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/banda-larga/${name}`;

const cnpjBehavior = {
  call: 'cnpjBehavior',
  params: {
    isCnpj: {
      call: 'nav',
      params: {
        id: getId(5)
      }
    },
    notCnpj: {
      call: 'nav',
      params: {
        id: getId(4)
      }
    },
  }
};

const CONFIG_MODEM_MANUAL = (negativeId): CatalogModel[] =>
  JSON.parse(
    JSON.stringify([
      {
        id: getId(0),
        gaPageName: 'explicacao_configuracao_inicial_modem',
        fluxo: 'ts_configuracao_modem',
        layout: {
          title: 'Vamos fazer a configuração inicial do seu modem',
          buttons: [
            {
              text: 'Ok, vamos lá!',
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
                  id: getId(1)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(1),
        gaPageName: 'abrir_navegador_computador',
        layout: {
          contentTop: true,
          title: 'Abra o navegador do seu computador e digite:<br><span class="info">iniciarbldaoi</span>',
          image: getImage('configModem1.png'),
          imageCaption: 'Pra que funcione melhor, use o Chrome, Firefox ou Safari.<br><br>ATENÇÃO: Não utilize o navegador Internet Explorer.',
          buttons: [
            {
              text: 'Não tenho computador',
              action: 'noComputer',
              gaAction: 'nao_possui_computador'
            },
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'feito'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'noComputer',
              action: {
                call: 'nav',
                params: {
                  id: getId(3)
                }
              }
            },
            {
              name: 'nextStep',
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
        gaPageName: 'acessar_pagina_componentes_navegacao',
        layout: {
          title:
            'Ao acessar a página, aparecerão os itens do modem pra você conferir o funcionamento',
          image: getImage('configModem2.png'),
          buttons: [
            {
              text: 'Não consegui acessar',
              action: 'noConection',
              gaAction: 'nao_conseguiu_acessar'
            },
            {
              text: 'Consegui acessar',
              action: 'nextStep',
              gaAction: 'conseguiu_acessar'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'noConection',
              action: {
                call: 'cnpjBehavior',
                params: {
                  isCnpj: {
                    call: 'nav',
                    params: {
                      id: getId(17)
                    }
                  },
                  notCnpj: {
                    call: 'nav',
                    params: {
                      id: getId(8)
                    }
                  },
                }
              }
            },
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId('5')
                }
              }
            }
          ]
        }
      },
      {
        id: getId(3),
        gaPageName: 'abrir_navegador_celular',
        layout: {
          contentTop: true,
          title: 'Abra o navegador do seu celular e digite:<br><span class="info">iniciarbldaoi</span>',
          image: getImage('configModem3.png'),
          imageCaption: 'ATENÇÃO: Utilize o navegador Chrome, Firefox ou Safari.',
          buttons: [
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'feito'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(4)
                }
              }
            },
          ]
        }
      },
      {
        id: getId(4),
        gaPageName: 'acessar_pagina_componentes_navegacao',
        layout: {
          title:
            'Ao acessar a página, aparecerão os itens do modem pra você conferir o funcionamento',
          image: getImage('configModem2.png'),
          buttons: [
            {
              text: 'Não consegui acessar',
              action: 'noConection',
              gaAction: 'nao_conseguiu_acessar'
            },
            {
              text: 'Consegui acessar',
              action: 'nextStep',
              gaAction: 'conseguiu_acessar'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'noConection',
              action: {
                call: 'cnpjBehavior',
                params: {
                  isCnpj: {
                    call: 'nav',
                    params: {
                      id: getId(17)
                    }
                  },
                  notCnpj: {
                    call: 'nav',
                    params: {
                      id: getId(9)
                    }
                  },
                }
              }
            },
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId('5')
                }
              }
            }
          ]
        }
      },
      {
        id: getId(5),
        gaPageName: 'verificar_itens_pagina',
        layout: {
          contentTop: true,
          title: 'Verifique se todos os itens de funcionamento do modem estão na cor verde.',
          image: getImage('configModem5.png'),
          buttons: [
            {
              text: 'Tem itens em vermelho',
              action: 'noConection',
              gaAction: 'itens_nao_ok'
            },
            {
              text: 'Todos ficaram verdes',
              action: 'nextStep',
              gaAction: 'itens_ok'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'noConection',
              action: {
                call: 'nav',
                params: {
                  id: getId('17')
                }
              }
            },
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId('6')
                }
              }
            }
          ]
        }
      },
      {
        id: getId(6),
        gaPageName: 'criar_nome_senha_rede_wifi',
        layout: {
          contentTop: true,
          title: 'Agora você precisa criar um nome e uma senha pra a sua rede Wi-Fi.',
          image: getImage('configModem6.png'),
          imageCaption:
            'Depois de escolher nome e senha, clique em "Continuar".<br><br>'+
            'ATENÇÃO: Anote a sua senha em um lugar seguro e que só você acessa.',
          buttons: [
            {
              text: 'Ok, nome e senha criados',
              action: 'nextStep',
              gaAction: 'feito'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId('7')
                }
              }
            }
          ]
        }
      },
      {
        id: getId(7),
        gaPageName: 'aplicando_configuracoes',
        layout: {
          title: 'As configurações estão sendo aplicadas.',
          paragraph: 'Aguarde enquanto o processo é concluído.',
          loading: TimerTypes.RING,
          footerTips: true,
          alert: getAlert('internet', 'internet_voltou_aplicando_configuracoes')
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'manualCronometerProcess',
                params: {
                  config: 'rebootManual'
                }
              }
            },
            {
              name: 'manualCronoExpired',
              action: {
                call: 'openPopup'
              }
            },
            {
              name: 'nao',
              action: {
                call: 'nav',
                params: {
                  id: getId(17)
                }
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
        id: getId(8),
        gaPageName: 'digitar_wizardoi_computador',
        layout: {
          title: 'Digite, então, no seu navegador:<br><span class="info">192.168.1.1/wizardoi</span>',
          image: getImage('configModem8.png'),
          buttons: [
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'feito'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(10)
                }
              }
            },
          ]
        }
      },
      {
        id: getId(9),
        gaPageName: 'digitar_wizardoi_celular',
        layout: {
          title: 'Digite, então, no seu navegador:<br><span class="info">192.168.1.1/wizardoi</span>',
          image: getImage('configModem9.png'),
          buttons: [
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'feito'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(10)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(10),
        gaPageName: 'selecionar_plano',
        layout: {
          title: 'Em "Oi Velox pra sua casa", selecione o seu plano e clique em "Instalar".',
          image: getImage('configModem10.png'),
          buttons: [
            {
              text: 'Não consegui acessar',
              action: 'pularEtapa',
              gaAction: 'nao_conseguiu_acessar'
            },
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'conseguiu_acessar'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(11)
                }
              }
            },
            {
              name: 'pularEtapa',
              action: {
                call: 'nav',
                params: {
                  id: getId(17)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(11),
        gaPageName: 'clicar_avancar',
        layout: {
          title: 'Clique em "Avançar".',
          image: getImage('configModem11.png'),
          buttons: [
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'feito'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(12)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(12),
        gaPageName: 'inserir_numero_telefone',
        layout: {
          contentTop: true,
          title: 'Insira o número do seu telefone, e digite os dados:',
          paragraph: 'Usuário: <span class="info">oi@oi</span>' +
          '<br>Senha: <span class="info">oioi</span><br>Repetir senha: <span class="info">oioi</span>',
          image: getImage('configModem12.png'),
          imageCaption: 'Após preencher, clique em "Avançar".',
          buttons: [
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'feito'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(13)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(13),
        gaPageName: 'criar_nome_senha_rede_wifi_wizardoi',
        layout: {
          title: 'Agora crie um nome e uma senha pra sua rede Wi-Fi.',
          image: getImage('configModem13.png'),
          imageCaption: 'Após criar o nome e senha da rede, clique em "Avançar". <br><br>ATENÇÃO: Anote a sua senha em um lugar seguro.',
          buttons: [
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'feito'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(14)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(14),
        gaPageName: 'participar_rede_wifi_fon',
        layout: {
          contentTop: true,
          title: 'Selecione se deseja fazer parte da rede WiFi FON e clique em "Avançar".',
          image: getImage('configModem14.png'),
          imageCaption: 'O WiFi FON te dá acesso a pontos de Wi-Fi espalhados pela cidade.',
          buttons: [
            {
              text: 'Não aceitei o WiFi FON',
              action: 'nextStep',
              gaAction: 'nao_aceitar'
            },
            {
              text: 'Aceitei o WiFi FON',
              action: 'aceitei',
              gaAction: 'aceitar'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(16)
                }
              }
            },
            {
              name: 'aceitei',
              action: {
                call: 'nav',
                params: {
                  id: getId(15)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(15),
        gaPageName: 'clicar_navegar',
        layout: {
          contentTop: true,
          title: 'Clique em "Navegar".',
          image: getImage('configModem15.png'),
          buttons: [
            {
              text: 'Feito!',
              action: 'nextStep',
              gaAction: 'feito'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
              action: {
                call: 'nav',
                params: {
                  id: getId(16)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(16),
        gaPageName: 'aplicando_configuracoes_wizardoi',
        layout: {
          title: 'As configurações estão sendo aplicadas.',
          paragraph: 'Aguarde enquanto o processo é concluído.',
          loading: TimerTypes.RING,
          footerTips: true,
          alert: getAlert('internet', 'internet_voltou_aplicando_configuracoes_wizardoi')
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'manualCronometerProcess',
                params: {
                  config: 'rebootManual'
                }
              }
            },
            {
              name: 'manualCronoExpired',
              action: {
                call: 'openPopup'
              }
            },
            {
              name: 'nao',
              action: {
                call: 'nav',
                params: {
                  id: getId(17)
                }
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
        id: getId(17),
        gaPageName: 'explicacao_proxima_etapa',
        layout: {
          title: 'Precisamos da sua ajuda na próxima etapa.',
          paragraph: 'Você ainda pode continuar com um passo a passo que vai ajudar a encontrar a solução.',
          buttons: [
            {
              text: 'Ok, vamos lá!',
              action: 'nextStep',
              gaAction: 'comecar'
            },
          ]
        },
        state: {
          on: [
            {
              name: 'nextStep',
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
    ])
  );

export { CONFIG_MODEM_MANUAL };
