import { CatalogPrefix } from './../../../../enums/catalog.enum';
import { CatalogDTO } from './../../../troubleshooting-interface';
import { CatalogModel } from '../../../troubleshooting-interface';
import { getAlert } from '../shared/alert-catalog';
import { FIXO_FILTRO_E_PROTETOR } from './filtro-protetor-catalog';
import { CABO_RJ11 } from './cabos-rj11-catalog';
import { ABERTURA_BD } from '../shared/abertura-bd-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fixo/${name}`;
const getId = (id) => CatalogPrefix.FIXO_MUDO + id;
const getPage = (catalog, page = 0) => `${catalog}${page}`;

const FIXO_MUDO_CATALOG: CatalogModel[] = [
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
              id: getId(6)
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
        },
        {
          name: 'nao-tem',
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
    id: getId(2),
    gaPageName: 'desconectar_extensoes_aparelhos',
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
              id: getId(3)
            }
          }
        }
      ],
    },
  },
  {
    id: getId(3),
    gaPageName: 'ligar_outra_tomada',
    layout: {
      title: 'Ligue seu telefone em outra tomada de energia.',
      image: getImage('troca_aparelhos4.svg'),
      buttons: [
        {
          text: 'Feito! Liguei em outra tomada',
          action: 'feito',
          gaAction: 'feito'
        },
        {
            text: 'Não possuo outra tomada',
            action: 'nao-tem',
            gaAction: 'nao_tem',
          },
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
    id: getId(4),
    gaPageName: 'verificar_telefone_ligado',
    layout: {
      title: 'O seu telefone está ligado?',
      image: getImage('troca_aparelhos5.svg'),
      buttons: [
        {
          text: 'Não, ainda está desligado',
          action: 'nao',
          gaAction: 'nao'
        },
        {
            text: 'Sim, está ligado!',
            action: 'sim',
            gaAction: 'sim',
          },
      ],
    },
    state: {
      on: [
        {
          name: 'nao',
          action: {
            call: 'goToConclusionPage',
            params: {
              id: 'telefone-defeito'
            }
          }
        },
        {
          name: 'sim',
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
    id: getId(5),
    gaPageName: 'conectar_telefone_direto_rj11',
    fluxo: 'isolar_rede_sem_fio',
    layout: {
      title: 'Conecte seu telefone direto na tomada RJ11 da parede.',
      image: getImage('isolar_rede1.svg'),
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        }
      ],
      alert: getAlert('fixo')
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
        }
      ],
    },
  },
  {
    id: getId(6),
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
              id: getId(7)
            }
          }
        }
      ],
    },
  },
  {
    id: getId(7),
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
      alert: getAlert('fixo')
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
        }
      ],
    },
  },
  ...FIXO_FILTRO_E_PROTETOR
];

const catalogOnline = [
  ...FIXO_MUDO_CATALOG,
  ...CABO_RJ11(CatalogPrefix.FILTRO_E_PROTETOR + 0, CatalogPrefix.ABERTURA_BD + 10),
  ...ABERTURA_BD(getPage(CatalogPrefix.FIXO_MUDO))
];

const catalogOffline = [
  ...FIXO_MUDO_CATALOG,
  ...CABO_RJ11(CatalogPrefix.FILTRO_E_PROTETOR + 0, 'conclusion'),
];

export const FIXO_MUDO: CatalogDTO = {
  authenticated: {
    catalog: catalogOnline,
    initialPage: getPage(CatalogPrefix.FIXO_MUDO)
  },
  default: {
    catalog: catalogOffline,
    initialPage: getPage(CatalogPrefix.FIXO_MUDO)
  }
};
