import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';

const getId = id => CatalogPrefix.FILTRO_E_PROTETOR + id;
const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fixo/${name}`;
export const FIXO_FILTRO_E_PROTETOR: CatalogModel[] = [
  {
    id: getId(0),
    fluxo: 'filtro_linha_protetor_surto',
    gaPageName: 'conectar_filtro_linha',
    layout: {
      title: 'Agora conecte o filtro de linha entre o telefone e a tomada.',
      image: getImage('adicionar_filtro_protetor1.svg'),
      buttons: [
        {
          text: 'Não tenho filtro de linha',
          action: 'nao-tem',
          gaAction: 'nao_possui'
        },
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
            call: 'openPopup'
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
        },
        {
          name: 'sim',
          action: {
            call: 'nav',
            params: {
              id: getId(1)
            }
          }
        },
        {
          name: 'nao-tem',
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
    id: getId(1),
    gaPageName: 'conectar_protetor_surto',
    layout: {
      title: 'Agora conecte o protetor de surto entre a tomada e o filtro de linha.',
      image: getImage('adicionar_filtro_protetor2.svg'),
      buttons: [
        {
          text: 'Não tenho protetor de surto',
          action: 'nao-tem',
          gaAction: 'nao_possui'
        },
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
            call: 'openPopup'
          }
        },
        {
          name: 'nao',
          action: {
            call: 'nav',
            params: {
              id: getId(2)
            }
          }
        },
        {
          name: 'sim',
          action: {
            call: 'goToSuccessPage',
          }
        },
        {
          name: 'nao-tem',
          action: {
            call: 'goToSuccessPage',
          }
        }
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'retirar_protetor_surto',
    layout: {
      title: 'Retire o protetor de surto e use o telefone sem este equipamento.',
      image: getImage('adicionar_filtro_protetor4.svg'),
      buttons: [
        {
          text: 'Ok, entendi!',
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
            call: 'goToSuccessPage',
          }
        }
      ],
    },
  },
  {
    id: getId(3),
    gaPageName: 'microfiltro_defeito',
    layout: {
      title: 'O microfiltro deve estar com defeito.',
      image: getImage('adicionar_filtro_protetor3.svg'),
      imageCaption: 'Recomendamos efetuar a troca do adaptador. Você encontra em lojas de informática ou de material de construção. ' +
        'Você pode continuar, se tiver alguma dúvida, ou encerrar por aqui.',
      buttons: [
        {
          text: 'Concluir',
          action: 'concluir',
          gaAction: 'encerrar'
        },
        {
          text: 'Continuar',
          action: 'continuar',
          gaAction: 'seguir'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'concluir',
          action: {
            call: 'goToSuccessPage',
          }
        },
        {
          name: 'continuar',
          action: {
            call: 'goToConclusionPage',
            params: {
              id: 'entre-contato'
            }
          }
        }
      ],
    },
  },
  {
    id: getId(4),
    gaPageName: 'conectar_protetor_surto_tomada',
    layout: {
      title: 'Agora conecte o protetor de surto na tomada.',
      image: getImage('adicionar_filtro_protetor5.svg'),
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
            call: 'goToSuccessPage',
          }
        }
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'retirar_protetor_surto',
    layout: {
      title: 'Retire o protetor de surto e use o telefone sem este equipamento.',
      image: getImage('adicionar_filtro_protetor4.svg'),
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
    gaPageName: 'instalar_filtro_linha',
    layout: {
      title: 'Recomendamos a instalação de um filtro de linha.',
      image: getImage('adicionar_filtro_protetor1.svg'),
      imageCaption: ' Você pode encontrar em lojas de informática ou de material de construção. ',
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'concluir',
          gaAction: 'entendido'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'concluir',
          action: {
            call: 'goToSuccessPage',
          }
        }
      ],
    },
  },
];
//adicionar_tagueamento