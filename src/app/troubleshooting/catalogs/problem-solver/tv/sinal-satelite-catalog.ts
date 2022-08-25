import { CatalogPrefix } from './../../../../enums/catalog.enum';
import { CatalogModel } from './../../../troubleshooting-interface';
import { getAlert } from '../shared/alert-catalog';

const getId = id => CatalogPrefix.SINAL_SATELITE + id;
const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/tv/${name}`;
const SINAL_SATELITE: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'explicacao_inicial',
    fluxo: 'sinal_satelite',
    layout: {
      title: 'Na próxima etapa, vamos precisar configurar a sua TV.',
      paragraph: 'Este será um passo a passo que vai configurar o sinal do satélite novamente.',
      buttons: [
        {
          text: 'Vamos lá!',
          action: 'continuar',
          gaAction: 'comecar',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'continuar',
          action: {
            call: 'nav',
            params: {
              id: getId(1),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(1),
    gaPageName: '',
    layout: {
      title: 'Clique no botão "OK" do controle remoto do decodificador.',
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(2),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'acessar_configuracao_tecnica',
    layout: {
      title: 'Agora acesse a opção "Configuração Técnica".',
      image: getImage('ts-tv8.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(3),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'selecionar_configuracao_satelite',
    layout: {
      title: 'Selecione "Configuração do Satélite".',
      image: getImage('ts-tv9.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(4),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'digitar_senha',
    layout: {
      title: 'Muito bem! Agora digite a senha "3131".',
      image: getImage('ts-tv10.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(5),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'verificar_tipo_lnbf',
    layout: {
      title: 'Verifique qual o "Tipo de LNBF" que aparece na sua televisão.' ,
      paragraph: 'Essa opção fica logo abaixo de "Configuração".',
      image: getImage('ts-tv1.png'),
      buttons: [
        {
          text: 'Continuar',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(6),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(6),
    gaPageName: 'selecionar_tipo_lnbf',
    layout: {
      title: 'Qual o tipo de LNBF está selecionado na sua TV?' ,
      alphabetical: true,
      buttons: [
        {
          text: 'Universal',
          action: 'universal',
          gaAction: 'universal',
        },
        {
          text: 'Oi TV VH',
          action: 'oi',
          gaAction: 'oi_tv_vh',
        },
        {
          text: '4 Tuners Single',
          action: 'four',
          gaAction: 'tuners_single',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'universal',
          action: {
            call: 'nav',
            params: {
              id: getId('universal-0'),
            }
          }
        },
        {
          name: 'oi',
          action: {
            call: 'nav',
            params: {
              id: getId('oi-0'),
            }
          }
        },
        {
          name: 'four',
          action: {
            call: 'nav',
            params: {
              id: getId('tuner-0'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('universal-0'),
    gaPageName: 'alterar_lnbf_para_oi_tv_th',
    layout: {
      title: 'Use as setas do controle remoto pra alterar o tipo de LNBF pra "Oi TV VH", tudo bem?',
      image: getImage('sem-sinal/tela13.png'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('universal-1'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('universal-1'),
    gaPageName: 'visualizar_frequencia',
    layout: {
      title: 'Selecione a frequência 11.976,5 MHz H e clique em "Sim".',
      image: getImage('ts-tv2.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('universal-2'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('universal-2'),
    gaPageName: 'atualizando_satelite',
    layout: {
      title: 'Atualizando o satélite.',
      paragraph: 'Aguarde 5 segundos pro sistema atualizar a troca de satélite. Após esse tempo, na tela aparece um cadeado aberto ou fechado?',
      image: getImage('sem-sinal/tela9.png'),
      alphabetical: true,
      buttons: [
        {
          text: 'Cadeado Aberto',
          action: 'aberto',
          gaAction: 'cadeado_aberto',
        },
        {
          text: 'Cadeado Fechado',
          action: 'fechado',
          gaAction: 'cadeado_fechado',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'aberto',
          action: {
            call: 'nav',
            params: {
              id: getId('universal-3'),
            }
          }
        },
        {
          name: 'fechado',
          action: {
            call: 'nav',
            params: {
              id: getId(8),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('universal-3'),
    gaPageName: 'voltar_tela_tipo_lnbf',
    layout: {
      title: 'Neste caso, precisamos que você volte pra tela que apresenta o tipo de LNBF novamente.',
      image: getImage('ts-tv1.png'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('universal-4'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('universal-4'),
    gaPageName: 'alterar_lnbf_para_tuners_single',
    layout: {
      title: 'Use as setas do controle remoto pra alterar o tipo de LNBF pra "4 Tuners Single", tudo bem?',
      image: getImage('ts-tv12.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('universal-5'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('universal-5'),
    gaPageName: 'visualizar_frequencia',
    layout: {
      title: 'Selecione a frequência 11.976,5 MHz H e clique em "Sim".',
      image: getImage('ts-tv2.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('universal-6'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('universal-6'),
    gaPageName: 'atualizando_satelite',
    layout: {
      title: 'Atualizando o satélite.',
      paragraph: 'Aguarde 5 segundos pro sistema atualizar a troca de satélite. Após esse tempo, na tela aparece um cadeado aberto ou fechado?',
      image: getImage('sem-sinal/tela9.png'),
      alphabetical: true,
      buttons: [
        {
          text: 'Cadeado Aberto',
          action: 'aberto',
          gaAction: 'cadeado_aberto',
        },
        {
          text: 'Cadeado Fechado',
          action: 'fechado',
          gaAction: 'cadeado_fechado',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'aberto',
          action: {
            call: 'goToConclusionPage'
          }
        },
        {
          name: 'fechado',
          action: {
            call: 'nav',
            params: {
              id: getId(8),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('oi-0'),
    gaPageName: 'alterar_lnbf_para_universal',
    layout: {
      title: 'Use as setas do controle remoto pra alterar o tipo de LNBF pra "Universal", tudo bem?',
      image: getImage('sem-sinal/tela10.png'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('oi-1'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('oi-1'),
    gaPageName: 'visualizar_frequencia',
    layout: {
      title: 'Selecione a frequência 11.976,5 MHz H e clique em "Sim".',
      image: getImage('ts-tv2.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('oi-2'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('oi-2'),
    gaPageName: 'atualizando_satelite',
    layout: {
      title: 'Atualizando o satélite.',
      paragraph: 'Aguarde 5 segundos pro sistema atualizar a troca de satélite. Após esse tempo, na tela aparece um cadeado aberto ou fechado?',
      image: getImage('sem-sinal/tela9.png'),
      alphabetical: true,
      buttons: [
        {
          text: 'Cadeado Aberto',
          action: 'aberto',
          gaAction: 'cadeado_aberto',
        },
        {
          text: 'Cadeado Fechado',
          action: 'fechado',
          gaAction: 'cadeado_fechado',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'aberto',
          action: {
            call: 'nav',
            params: {
              id: getId('oi-3'),
            }
          }
        },
        {
          name: 'fechado',
          action: {
            call: 'nav',
            params: {
              id: getId(8),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('oi-3'),
    gaPageName: 'voltar_tela_tipo_lnbf',
    layout: {
      title: 'Neste caso, precisamos que você volte pra tela que apresenta o tipo de LNBF novamente.',
      image: getImage('ts-tv1.png'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('oi-4'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('oi-4'),
    gaPageName: 'alterar_lnbf_para_tuners_single',
    layout: {
      title: 'Use as setas do controle remoto pra alterar o tipo de LNBF pra "4 Tuners Single", tudo bem?',
      image: getImage('ts-tv12.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('oi-5'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('oi-5'),
    gaPageName: 'visualizar_frequencia',
    layout: {
      title: 'Selecione a frequência 11.976,5 MHz H e clique em "Sim".',
      image: getImage('ts-tv2.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('oi-6'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('oi-6'),
    gaPageName: 'atualizando_satelite',
    layout: {
      title: 'Atualizando o satélite.',
      paragraph: 'Aguarde 5 segundos pro sistema atualizar a troca de satélite. Após esse tempo, na tela aparece um cadeado aberto ou fechado?',
      image: getImage('sem-sinal/tela9.png'),
      alphabetical: true,
      buttons: [
        {
          text: 'Cadeado Aberto',
          action: 'aberto',
          gaAction: 'cadeado_aberto',
        },
        {
          text: 'Cadeado Fechado',
          action: 'fechado',
          gaAction: 'cadeado_fechado',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'aberto',
          action: {
            call: 'goToConclusionPage'
          }
        },
        {
          name: 'fechado',
          action: {
            call: 'nav',
            params: {
              id: getId(8),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('tuner-0'),
    gaPageName: 'clicar_ok',
    layout: {
      title: 'Clique em "OK" para continuar.',
      image: getImage('sem-sinal/tela11.png'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('tuner-1'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('tuner-1'),
    gaPageName: 'visualizar_frequencia',
    layout: {
      title: 'Selecione a frequência 11.976,5 MHz H e clique em "Sim".',
      image: getImage('ts-tv2.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('tuner-2'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('tuner-2'),
    gaPageName: 'atualizando_satelite',
    layout: {
      title: 'Atualizando o satélite.',
      paragraph: 'Aguarde 5 segundos pro sistema atualizar a troca de satélite. Após esse tempo, na tela aparece um cadeado aberto ou fechado?',
      image: getImage('sem-sinal/tela9.png'),
      alphabetical: true,
      buttons: [
        {
          text: 'Cadeado Aberto',
          action: 'aberto',
          gaAction: 'cadeado_aberto',
        },
        {
          text: 'Cadeado Fechado',
          action: 'fechado',
          gaAction: 'cadeado_fechado',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'aberto',
          action: {
            call: 'nav',
            params: {
              id: getId('tuner-3'),
            }
          }
        },
        {
          name: 'fechado',
          action: {
            call: 'nav',
            params: {
              id: getId(8),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('tuner-3'),
    gaPageName: 'voltar_tela_tipo_lnbf',
    layout: {
      title: 'Neste caso, precisamos que você volte pra tela que apresenta o tipo de LNBF novamente.',
      image: getImage('sem-sinal/tela11.png'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('tuner-4'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('tuner-4'),
    gaPageName: 'alterar_lnbf_para_universal',
    layout: {
      title: 'Use as setas do controle remoto pra alterar o tipo de LNBF pra "Universal", e clique em "OK".',
      image: getImage('sem-sinal/tela10.png'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('tuner-5'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('tuner-5'),
    gaPageName: 'visualizar_frequencia',
    layout: {
      title: 'Selecione a frequência 11.976,5 MHz H e clique em "Sim".',
      image: getImage('ts-tv2.jpg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId('tuner-6'),
            }
          }
        }
      ]
    }
  },
  {
    id: getId('tuner-6'),
    gaPageName: 'atualizando_satelite',
    layout: {
      title: 'Atualizando o satélite.',
      paragraph: 'Aguarde 5 segundos pro sistema atualizar a troca de satélite. Após esse tempo, na tela aparece um cadeado aberto ou fechado?',
      image: getImage('sem-sinal/tela9.png'),
      alphabetical: true,
      buttons: [
        {
          text: 'Cadeado Aberto',
          action: 'aberto',
          gaAction: 'cadeado_aberto',
        },
        {
          text: 'Cadeado Fechado',
          action: 'fechado',
          gaAction: 'cadeado_fechado',
        }
      ]
    },
    state: {
      on: [
        {
          name: 'aberto',
          action: {
            call: 'goToConclusionPage'
          }
        },
        {
          name: 'fechado',
          action: {
            call: 'nav',
            params: {
              id: getId(8),
            }
          }
        }
      ]
    }
  },
  {
    id: getId(8),
    gaPageName: 'clicar_ok_canto_inferior',
    layout: {
      title: 'Por fim, clique em "Ok para continuar" que aparece no canto inferior da sua TV.',
      image: getImage('sem-sinal/tela12.png'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'seguir',
        }
      ],
      alert: getAlert('tv-canais','verificar_programacao_voltou')
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'openPopup'
          }
        },
        {
          name: 'nao',
          action: {
            call: 'goToConclusionPage'
          },
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          },
        },
      ]
    }
  },
];

export { SINAL_SATELITE}
