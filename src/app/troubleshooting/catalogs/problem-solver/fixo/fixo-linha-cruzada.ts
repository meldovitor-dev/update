import { FixoLinhaCruzada } from './../../../../domain/feature';
import { CatalogModel } from '../../../troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';

const getImage = (name: string) => `assets/images/troubleshooting/problem-solver/fixo/${name}`;
const getId = (id) => CatalogPrefix.LINHA_CRUZADA + id;

export const LINHA_CRUZADA: CatalogModel[] = [
  {
    id: getId(0),
    gaPageName: 'selecionar_tipo_aparelho',
    fluxo: 'linha_cruzada',
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
        },
      ],
    },
  },
  {
    id: getId(1),
    gaPageName: 'trocar_aparelho_por_com_fio',
    fluxo: 'linha_cruzada',
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
                    id: getId(3)
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
          },
        {
          name: 'nao-tem',
          action: {
            call: 'nav',
            params: {
                id: getId(3)
                }
            }
        },
      ],
    },
  },
  {
    id: getId(2),
    gaPageName: 'trocar_aparelho_por_com_fio',
    fluxo: 'linha_cruzada',
    layout: {
      title: 'Troque seu aparelho por um outro com fio.',
      image: getImage('troca_aparelhos6.svg'),
      buttons: [
        {
          text: 'Não possuo outro aparelho',
          action: 'nao-tem',
          gaAction: 'sem_aparelho_com_fio'
        },
        {
            text: 'Feito!',
            action: 'feito',
            gaAction: 'trocado',
          },
      ],
      alert: getAlert('fixo')
    },
    state: {
      on: [
        {
            name: 'nao-tem',
            action: {
              call: 'nav',
              params: {
                  id: getId(4)
                }
            }
        },
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
                        id: getId(4)
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
        },
      ],
    },
  },
  {
    id: getId(3),
    gaPageName: 'desconectar_extensoes_aparelhos',
    layout: {
      title: 'Desconecte as extensões e outros aparelhos conectados na sua linha.',
      image: getImage('tirar_extensao_sem_fio.svg'),
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
          name: 'sim',
          action: {
              call: 'nav',
              params: {
                  id: getId(6)
              }
          }
        },
        {
          name: 'nao',
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
    gaPageName: 'desconectar_extensoes_aparelhos',
    layout: {
      title: 'Desconecte as extensões e outros aparelhos conectados na sua linha.',
      image: getImage('tirar_extensao_com_fio.svg'),
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
              call: 'goToConclusionPage',
              params: {
                  id: 'entre-contato'
              }
          }
        },
        {
          name: 'sim',
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
    id: getId(5),
    gaPageName: 'outro_telefone_defeito',
    layout: {
      title: 'O outro telefone pode estar com defeito',
      paragraph: 'Possíveis causas:<br>' +
        '- Aparelho pode estar com falha<br>' +
        '- Cabo de energia pode estar danificado<br>' +
        '- Bateria do telefone não funciona mais.',
      buttons: [
        {
          text: 'Ok, entendi.',
          action: 'entendido',
          gaAction: 'entendido'
        },
      ],
    },
    state: {
      on: [
        {
          name: 'entendido',
          action: {
            call: 'goToSuccessPage',
          }
        },
      ],
    },
  },
  {
    id: getId(6),
    gaPageName: 'extensao_linha_cruzada',
    layout: {
      title: 'A sua extensão pode estar gerando a linha cruzada.',
      paragraph:'Por enquanto use seu telefone sem a extensão<br>'+
      'Entre em contato com um técnico particular para verificar sua extensão',
      buttons: [
        {
          text: 'Ok, entendi.',
          action: 'ok',
          gaAction: 'ok'
        },
      ],
    },
    state: {
      on: [
        {
          name: 'ok',
          action: {
            call: 'goToSuccessPage',

          }
        },
      ],
    },
  }
];
