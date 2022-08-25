import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogDTO, CatalogModel } from './../../../../troubleshooting-interface';
import { FIBRA_TV_ISOLAR_STB } from './fibra-tv-isolar-stb';
import { FIBRA_TV_REBOOT_AUTOMATICO_STB } from './fibra-tv-reboot-automatico-stb';
import { FIBRA_TV_REBOOT_MANUAL_STB } from './fibra-tv-reboot-manual-stb';
import { FIBRA_TV_REBOOT_MANUAL_STB_CABOS } from './fibra-tv-cabos.catalog';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';
import { getAlert } from '../../shared/alert-catalog';

const getPage = (catalog, page = 0) => catalog + page;
const getId = (id) => CatalogPrefix.FIBRA_NETFLIX + id;
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

const getSTBSNetflix = {
  call: 'prepareNetflixContent',
  params: {
    call: 'populateSTBsNetflixList',
    interaction: InteractionEnum.fibraDiagnosticoCompleto,
    dataOk: {
      call: 'nav',
      params: {
        id: getId(5)
      }
    },
    dataFiltered: {
      call: 'nav',
      params: {
        id: getId(2)
      }
    },
    dataSingleNok: {
      call: 'goToConclusionPage',
      params: {
        id: 'stb-sem-netflix'
      }
    },
    dataNok: {
      call: 'goToConclusionPage',
      params: {
        id: 'stb-sem-netflix-plural'
      }
    },
    dataHandler: 'stbsHandler',
    dataName: 'dataList'
  }
};
const NETFLIX_CATALOG = (negativeId, negativeId2): CatalogModel[] => JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'identificar_modelos_decodificadores',
    fluxo: 'acesso_netflix',
    layout: {
      title: 'Vamos precisar identificar os modelos dos seus decodificadores.',
      buttons: [{
          text: 'Iniciar',
          action: 'navigate',
          gaAction: 'comecar'
        }
      ],
    },
    state: {
      on: [{
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
    gaPageName: 'identificando_decodificadores',
    description: 'faz o diagnostico completo',
    layout: {
      hiddenHeaderBackButton: true,
      loading: TimerTypes.RING,
      title: 'Estamos identificando os decodificadores.',
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
                call: 'goToConclusionPage',
                params: {
                }
              },
              success: getSTBSNetflix
            }
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'algum_decodificador_nao_compativel',
    layout: {
      hiddenHeaderBackButton: true,
      title: 'Identificamos que você possui um ou mais decodificadores que não são compatíveis com o acesso à Netflix.',
      buttons: [{
          text: 'Avançar',
          action: 'navigate',
          gaAction: 'seguir'
        }
      ],
    },
    state: {
      on: [{
          name: 'navigate',
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
    gaPageName: 'verificar_numero_serie_decodificador',
    layout: {
      contentTop: true,
      stbList: true,
      title:
        'O número de série do decodificador que está com problema está na lista abaixo?',
        buttons: [{
          text: 'Sim, está na lista!',
          action: 'navigate',
          gaAction: 'esta_listado',
          customClasses: 'outline'
        },
        {
          text: 'Não está na lista',
          action: 'noStb',
          gaAction: 'nao_esta_listado',
          customClasses: 'outline'
        }
      ],
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
          name: 'findSTB',
          action: {
            call: 'nav',
            params: {
              id: getPage(CatalogPrefix.REBOOT_AUTOMATICO_STB, 3)
            }
          }
        },
        {
          name: 'navigate',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        },
        {
          name: 'noStb',
          action: {
            call: 'goToConclusionPage',
            params: {
              id: 'lista-sem-stb-netflix'
            }
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'aviso_proximas_etapas',
    layout: {
      title: 'Atenção!<br>Siga as próximas etapas.',
      paragraph: 'As orientações a seguir podem te ajudar a resolver o problema.',
      buttons: [{
          text: 'Iniciar',
          action: 'navigate',
          gaAction: 'comecar'
        }
      ],
    },
    state: {
      on: [{
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
    gaPageName: 'verificar_possui_conta',
    layout: {
      title: 'Você já possui uma conta de acesso na Netflix?',
      buttons: [{
          text: 'Já possuo',
          action: 'navigate',
          gaAction: 'possui'
        },
        {
          text: 'Ainda não',
          action: 'not-yet',
          gaAction: 'nao_possui'
        }
      ],
    },
    state: {
      on: [{
          name: 'navigate',
          action: {
            call: 'nav',
            params: {
              id: getId(6)
            }
          }
        },
        {
          name: 'not-yet',
          action: {
            call: 'goToConclusionPage',
            params: {
              id: 'criar-conta-netflix'
            }
          }
        }
      ]
    }
  },
  {
    id: getId(6),
    gaPageName: 'pressionar_botao_netflix',
    layout: {
      title: 'Pressione o botão Netflix no seu controle ou digite o canal 100. Depois clique em Ok.',
      paragraph: 'Somente os modelos mais novos do controle remoto da Oi possuem o botão.',
      image: getImage('canal-netflix.svg'),
      buttons: [{
          text: 'Feito!',
          action: 'navigate',
          gaAction: 'feito'
        }
      ],
    },
    state: {
      on: [{
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
    gaPageName: 'digitar_login_senha',
    layout: {
      title: 'Digite seu login e senha e tente acessar.',
      image: getImage('login-netflix.svg'),
      buttons: [{
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
      alert: getAlert('alerta-netflix')
    },
    state: {
      on: [{
          name: 'feito',
          action: {
            call: 'openPopup',
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
              call: 'goToSuccessPage'
          }
        },
      ]
    }
  },
  {
    id: getId(8),
    gaPageName: 'digitar_login_senha',
    fluxo: 'acesso_netflix',
    layout: {
      title: 'Digite seu login e senha e tente acessar.',
      image: getImage('login-netflix.svg'),
      buttons: [{
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
      alert: getAlert('alerta-netflix')
    },
    state: {
      on: [{
          name: 'feito',
          action: {
            call: 'openPopup',
          }
        },
        {
          name: 'nao',
          action: {
              call: 'changeModule',
              params: {
                id: negativeId2
              }
          }
        },
        {
          name: 'sim',
          action: {
              call: 'goToSuccessPage'
          }
        },
      ]
    }
  },
  {
    id: getId(9),
    gaPageName: 'digitar_login_senha',
    fluxo: 'acesso_netflix',
    layout: {
      title: 'Digite seu login e senha e tente acessar.',
      image: getImage('login-netflix.svg'),
      buttons: [{
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
      alert: getAlert('alerta-netflix')
    },
    state: {
      on: [{
          name: 'feito',
          action: {
            call: 'openPopup',
          }
        },
        {
          name: 'nao',
          action: {
              call: 'goToConclusionPage',
              params: {id: 'entre-contato'
            },
          }
        },
        {
          name: 'sim',
          action: {
              call: 'goToSuccessPage'
          }
        },
      ]
    }
  },
  {
    id: getId(10),
    gaPageName: 'aviso_necessario_logar',
    layout: {
      title: 'Você precisa estar logado no app para te ajudarmos a acessar a Netflix.',
      buttons: [{
          text: 'Voltar pro inicio',
          action: 'voltar',
          gaAction: 'voltar_inicio'
        }
      ],
    },
    state: {
      on: [{
          name: 'voltar',
          action: {
            call: 'goToHome'
          }
        }
      ]
    }
  },
]
));


const catalogoOnline = [
  ...NETFLIX_CATALOG(getPage(CatalogPrefix.REBOOT_AUTOMATICO_STB, 1), getPage(CatalogPrefix.REBOOT_MANUAL_STB)),
  ...FIBRA_TV_REBOOT_AUTOMATICO_STB(getPage(CatalogPrefix.REBOOT_MANUAL_STB), getPage(CatalogPrefix.REBOOT_MANUAL_STB),
    {successId: getPage(CatalogPrefix.FIBRA_NETFLIX, 8)}),
  ...FIBRA_TV_REBOOT_MANUAL_STB('conclusion', {successId: getPage(CatalogPrefix.FIBRA_NETFLIX, 9)})
];
const catalogoOffline = [
  ...NETFLIX_CATALOG(undefined,undefined)
];

export const FIBRA_NETFLIX_CATALOG: CatalogDTO = {
  authenticated: {
    catalog: catalogoOnline,
    initialPage: getId(0)
  },
  default: {
    catalog: catalogoOffline,
    initialPage: getId(10)
  },
}
