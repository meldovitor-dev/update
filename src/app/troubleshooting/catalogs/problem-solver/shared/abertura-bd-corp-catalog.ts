import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from './alert-catalog';
import { InteractionEnum } from 'src/app/domain/interactions';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';

const getId = id => CatalogPrefix.ABERTURA_BD_CORP + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/shared/${img}`;

const getBdRes = {
  call: 'prepareAberturaBD',
  params: {
    call: 'getBdInfo',
    interaction: InteractionEnum.efetuarAberturaBD,
    dataOk: {
      call: 'nav',
      params: {
        id: getId(4)
      }
    },
    dataNok: {
      call: 'goToConclusionPage',
      params: {
        id: 'agendamento-erro',
      }
    },
    dataHasBd: {
      call: 'goToConclusionPage',
      params: {
        id: 'has-bd-aberto',
      }
    }
  }
};
const ABERTURA_BD_CORP = [
  {
    id: getId(0),
    layout: {},
    state: {
      on:
        [
          {
            name: 'onInit',
            action: {
              call: 'verifyServiceEnable',
              params: {
                path: 'efetuarAberturaBDCorp.enabled',
                enable:  { id: getId(1) },
                disable: { id: 'conclusion' },
              },
            },
          }
        ],
    }
  },
  {
    id: getId(1),
    gaPageName: 'abertura_reparo_necessaria',
    fluxo: 'abertura_reparo_corporativo',
    layout: {
      title: 'Identificamos a necessidade de agendar uma visíta técnica.',
      paragraph: 'Um técnico precisa ir até o seu endereço pra checar o problema.<br>Vamos precisar de alguns dados.',
      buttons: [
        {
          text: 'Avançar',
          action: 'navigate',
          gaAction: 'comecar'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'nav',
            params: {
              id: getId(2)
            }
          }
        },
      ]
    }
  },
  {
    id: getId(2),
    gaPageName: 'adicionar_numero_celular',
    layout: {
      title: 'Pra continuar, adicione um número de celular, de preferência com whatsapp.',
      paragraph: 'O técnico pode precisar entrar em contato via whatsapp no horário da visita.',
      input: 'phone',
    },
    state: {
      on: [
        {
          name: 'phoneOpenBD',
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
    gaPageName: 'abrindo_reparo',
    layout: {
      title: 'Aguarde as verificações finais, que podem levar <b>no máximo 4 minutos</b>. ' +
          'Por favor, continue nesta tela até que o reparo seja aberto.',
      loading: TimerTypes.RING,
      hiddenHeaderBackButton: true,
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices',
            params: {
              interaction: InteractionEnum.efetuarAberturaBD
            }
          }
        },
        {
          name: InteractionEnum.efetuarAberturaBD,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'goToConclusionPage',
                params: {
                  id: 'agendamento-erro',
                }
              },
              success: getBdRes
            }
          }
        }
      ]
    }
  },
  {
    id: getId(4),
    gaPageName: 'sucesso',
    layout: {
      title: 'A visita técnica foi agendada com sucesso!',
      paragraph: 'Em até 48h o técnico vai estar no seu endereço.',
      hiddenHeaderBackButton: true,
      buttons: [
        {
          text: 'Ok, entendi!',
          action: 'navigate',
          gaAction: 'entendido'
        }
      ],
    },
    state: {
      on: [
        {
          name: 'navigate',
          action: {
            call: 'goToHome',
          }
        }
      ]
    }
  },
];


export { ABERTURA_BD_CORP };
