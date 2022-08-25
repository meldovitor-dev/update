import {
  CatalogDTO,
  CatalogModel
} from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { DIVISOR_SINAL } from './divisor-sinal-catalog';
import { CABO_COAXIAL } from './cabo-coaxial-catalog';
import { SINAL_SATELITE } from './sinal-satelite-catalog';

const getPage = (catalogName, page = 0) => `${catalogName}${page}`;
const getId = id => CatalogPrefix.TV_TELA_PRETA + id;
const catalog: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'identificar_codigo_erro_e30',
    fluxo: 'erro_canais',
    layout: {
      title: 'Na sua TV aparece algum código de erro E30?',
      alphabetical: true,
      buttons: [
        {
          text: 'Sim',
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
    id: getId(2),
    gaPageName: 'verificar_ausencia_sinal_todos_canais',
    layout: {
      title: 'E a ausência de sinal está em todos os canais?',
      paragraph: 'Verifique se apenas alguns canais específicos estão com problema de sinal ou se isso ocorre com todos.',
      alphabetical: true,
      buttons: [
        {
          text: 'Todos os canais',
          action: 'todos',
          gaAction: 'todos'
        },
        {
          text: 'Apenas alguns',
          action: 'alguns',
          gaAction: 'alguns'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'todos',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        },
        {
          name: 'alguns',
          action: {
            call: 'goToConclusionPage'
          }
        }
      ]
    }
  },
  {
    id: getId(3),
    gaPageName: 'identificar_erro_corretamente',
    layout: {
      title: 'Verifique corretamente o erro que aparece na sua TV e selecione novamente o tipo de reparo que precisa.',
      buttons: [
        {
          text: 'Voltar pro início',
          action: 'goHome',
          gaAction: 'voltar_inicio'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'goHome',
          action: {
            call: 'goToHome'
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'verificar_chuva_regiao',
    fluxo: 'tempo',
    layout: {
      title: 'Está chovendo na sua região?',
      paragraph: 'Tempo nublado, chuva e vento forte, em alguns casos, podem deixar a sua TV sem sinal momentaneamente.',
      alphabetical: true,
      buttons: [
        {
          text: 'Sim, está chovendo/ventando',
          action: 'sim',
          gaAction: 'chove_venta'
        },
        {
          text: 'Não, o tempo está limpo',
          action: 'nao',
          gaAction: 'nao_chove_venta'
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
    id: getId(5),
    gaPageName: 'recomendacao_esperar_tempo_melhorar',
    layout: {
      title: 'Recomendamos que você espere o tempo melhorar antes de verificar se o sinal da sua TV voltou ao normal.',
      buttons: [
        {
          text: 'Ok, entendi',
          action: 'goHome',
          gaAction: 'entendido'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'goHome',
          action: {
            call: 'goToHome'
          }
        }
      ]
    }
  },
  {
    id: getId(6),
    gaPageName: 'possui_ponto_adicional',
    fluxo: 'divisor_sinal',
    layout: {
      title: 'Você possui algum ponto adicional?',
      paragraph: 'Informe se você possui mais de um ponto na sua casa.',
      alphabetical: true,
      buttons: [
        {
          text: 'Sim',
          action: 'sim',
          gaAction: 'possui'
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
              id: getPage(CatalogPrefix.DIVISOR_SINAL)
            }
          }
        },
        {
          name: 'nao',
          action: {
            call: 'nav',
            params: {
              id: getPage(CatalogPrefix.CABO_COAXIAL)
            }
          }
        }
      ]
    }
  },
  ...DIVISOR_SINAL(getPage(CatalogPrefix.CABO_COAXIAL)),
  ...CABO_COAXIAL(getPage(CatalogPrefix.SINAL_SATELITE)),
  ...SINAL_SATELITE
];

const TV_AUSENCIA_SINAL: CatalogDTO = {
  authenticated: {
    catalog,
    initialPage: getId(0)
  },
  default: {
    catalog,
    initialPage: getId(0)
  }
};

export { TV_AUSENCIA_SINAL };
