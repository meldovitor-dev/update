import { CatalogDTO } from './../../../troubleshooting-interface';
import { CatalogModel } from '../../../troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';
import { FIXO_FILTRO_E_PROTETOR } from './filtro-protetor-catalog';
import { CABO_RJ11 } from './cabos-rj11-catalog';
import { ABERTURA_BD } from '../shared/abertura-bd-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fixo/${name}`;
const getId = (id) => CatalogPrefix.FIXO_RUIDO + id;
const getPage = (catalog, page = 0) => `${catalog}${page}`;

const FIXO_COM_RUIDO_CATALOG: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'selecionar_tipo_aparelho',
    fluxo: 'troca_aparelhos',
    layout: {
      title: 'Seu telefone é com fio ou sem fio?',
      image: getImage('troca_aparelhos1.svg'),
      buttons: [
        {
          text: 'Com fio',
          action: 'com-fio',
          gaAction: 'com_fio'
        },
        {
          text: 'Sem fio',
          action: 'sem-fio',
          gaAction: 'sem_fio',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'sem-fio',
          action: {
            call: 'nav',
            params: {
              id: getId(1)
            }
          }
        },
        {
          name: 'com-fio',
          action: {
            call: 'nav',
            params: {
              id: getId(2)
            }
          }
        }
      ],
    },
  },
  {
    id: getId(1),
    gaPageName: 'trocar_aparelho_por_com_fio',
    fluxo: 'troca_aparelhos',
    layout: {
      title: 'Troque seu aparelho sem fio por um com fio.',
      image: getImage('troca_aparelhos2.svg'),
      buttons: [
        {
          text: 'Feito! Troquei por um com fio',
          action: 'feito',
          gaAction: 'trocado'
        },
        {
          text: 'Não tenho aparelho com fio',
          action: 'nao-tem',
          gaAction: 'sem_aparelho_com_fio',
        },
      ],
      alert: getAlert('fixo', 'voltou_trocando_trocando_aparelho_telefonico'),
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'openPopup',
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
            call: 'goToConclusionPage',
            params: {
              id: 'outro-telefone-defeito'
            }
          }
        },
        {
          name: 'nao-tem',
          action: {
            call: 'nav',
            params: {
              id: getId(3)
            }
          }
        }
      ],
    },
  },
  {
    id: getId(2),
    gaPageName: 'trocar_aparelho_telefonico',
    fluxo: 'troca_aparelhos',
    layout: {
      title: 'Troque seu aparelho por um outro.',
      image: getImage('troca_aparelhos6.svg'),
      buttons: [
        {
          text: 'Não possuo outro aparelho',
          action: 'nao-tem',
          gaAction: 'sem_outro_aparelho'
        },
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'trocado',
        },
      ],
      alert: getAlert('fixo', 'voltou_trocando_trocando_aparelho_telefonico'),
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'openPopup',
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
            call: 'goToConclusionPage',
            params: {
              id: 'outro-telefone-defeito'
            }
          }
        },
        {
          name: 'nao-tem',
          action: {
            call: 'nav',
            params: {
              id: getId(5)
            }
          }
        }
      ],
    },
  },
  {
    id: getId(3),
    gaPageName: 'desconectar_extensoes_aparelhos',
    fluxo: 'isolar_rede_sem_fio',
    layout: {
      title: 'Desconecte as extensões e outros aparelhos conectados na sua linha.',
      image: getImage('troca_aparelhos3.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        }
      ],
    },
  },
  {
    id: getId(4),
    gaPageName: 'conectar_telefone_direto_rj11',
    fluxo: 'isolar_rede_sem_fio',
    layout: {
      title: 'Conecte seu telefone direto na tomada RJ11 da parede.',
      image: getImage('isolar_rede2.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
      alert: getAlert('fixo', 'voltou_conectando_telefone'),
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'openPopup',
          }
        },
        {
          name: 'nao',
          action: {
            call: 'nav',
            params: {
              id: `${CatalogPrefix.CABO_RJ11}0`
            }
          }
        },
        {
          name: 'sim',
          action: {
            call: 'nav',
            params: {
              id: `${CatalogPrefix.CABO_RJ11}2`
            }
          }
        },
      ],
    },
  },
  {
    id: getId(5),
    gaPageName: 'desconectar_extensoes_aparelhos',
    fluxo: 'isolar_rede_com_fio',
    layout: {
      title: 'Desconecte as extensões e outros aparelhos conectados na sua linha.',
      image: getImage('troca_aparelhos3.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'nav',
            params: {
              id: getId(6)
            }
          }
        }
      ],
    },
  },
  {
    id: getId(6),
    gaPageName: 'conectar_telefone_direto_rj11',
    fluxo: 'isolar_rede_com_fio',
    layout: {
      title: 'Conecte seu telefone direto na tomada RJ11 da parede.',
      image: getImage('desconectar_extensoes2.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
      alert: getAlert('fixo', 'voltou_conectando_direto_tomada'),
    },
    state: {
      on: [
        {
          name: 'feito',
          action: {
            call: 'openPopup',
          }
        },
        {
          name: 'nao',
          action: {
            call: 'nav',
            params: {
              id: `${CatalogPrefix.CABO_RJ11}0`
            }
          }
        },
        {
          name: 'sim',
          action: {
            call: 'nav',
            params: {
              id: `${CatalogPrefix.CABO_RJ11}2`
            }
          }
        },
      ],
    },
  },
  ...FIXO_FILTRO_E_PROTETOR,
];

const catalogOnline = [
  ...FIXO_COM_RUIDO_CATALOG,
  ...CABO_RJ11(CatalogPrefix.FILTRO_E_PROTETOR + 0, CatalogPrefix.ABERTURA_BD + 10),
  ...ABERTURA_BD(getPage(CatalogPrefix.FIXO_RUIDO))
];

const catalogOffline = [
  ...FIXO_COM_RUIDO_CATALOG,
  ...CABO_RJ11(CatalogPrefix.FILTRO_E_PROTETOR + 0, 'conclusion'),
];

export const FIXO_COM_RUIDO: CatalogDTO = {
  authenticated: {
    catalog: catalogOnline,
    initialPage: getPage(CatalogPrefix.FIXO_RUIDO)
  },
  default: {
    catalog: catalogOffline,
    initialPage: getPage(CatalogPrefix.FIXO_RUIDO)
  }
};
