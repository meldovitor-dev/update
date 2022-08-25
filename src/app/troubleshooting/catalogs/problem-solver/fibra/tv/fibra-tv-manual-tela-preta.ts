import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';

const getId = id => CatalogPrefix.TV_TELA_PRETA + id;
const alert = getAlert('tv-tela-preta');
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

export const FIBRA_TV_MANUAL_TELA_PRETA = (negativeId): CatalogModel[] =>JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'verificar_imagem_preta_branca_todos_canais',
    fluxo: 'ts_tv_preta_branca',
    layout: {
      title: 'A imagem da TV está preta e branca em todos os canais?',
      buttons: [
        {
          text: 'Somente em alguns canais',
          action: 'some-channels',
          gaAction: 'alguns_canais'
        },
        {
          text: 'Em todos os canais',
          action: 'all-channels',
          gaAction: 'todos_canais'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'some-channels',
          action: {
            call: 'nav',
            params: {
              id: getId(1)
            }
          }
        },
        {
          name: 'all-channels',
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
    id: getId(1),
    gaPageName: 'verificar_programa_produzido_preto_branco',
    layout: {
      contentTop: true,
      title: 'O programa que está vendo foi produzido em preto e branco?',
      image: getImage('tv_preta.svg'),
      imageCaption: 'Alguns programas, geralmente mais antigos, foram produzidos em preto e branco.',
      buttons: [
        {
          text: 'Foi produzido em preto e branco',
          action: 'produzido',
          gaAction: 'preto_branco'
        },
        {
          text: 'Deveria ser colorido',
          action: 'continuar',
          gaAction: 'colorido'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'produzido',
          action: {
            call: 'nav',
            params: {
              id: getId(6)
            }
          }
        },
        {
          name: 'continuar',
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
    gaPageName: 'acessar_configuracoes_imagem_av',
    layout: {
      title: 'Certo! Entre nas configurações da sua TV, depois vá em "<b>Imagem</b>" ou "<b>AV</b>" (Áudio e Vídeo)',
      paragraph: 'Use o controle remoto pra acessar o menu de configurações.',
      buttons: [
        {
          text: 'Não encontrei',
          action: 'nao-encontrei',
          gaAction: 'nao_identificado'
        },
        {
          text: 'Feito',
          action: 'feito',
          gaAction: 'feito'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'nao-encontrei',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId
            }
          }
        },
        {
          name: 'feito',
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
    gaPageName: 'verificar_formato_imagem',
    layout: {
      title: 'Agora verifique o sistema da imagem da sua TV: "<b>PAL-M</b>" ou "<b>NTSC</b>".',
      paragraph: 'Caso não encontre essa opcão, provavelmente sua TV já reconhece automaticamente o formato.',
      buttons: [
        {
          text: 'Não encontrei',
          action: 'nao-encontrei',
          gaAction: 'nao_identificado'
        },
        {
          text: 'Está em PAL-M',
          action: 'PAL-M',
          gaAction: 'pal_m'
        },
        {
          text: 'Está em NTSC',
          action: 'NTSC',
          gaAction: 'ntsc'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'nao-encontrei',
          action: {
            call: 'changeModule',
            params: {
              id: negativeId
            }
          }
        },
        {
          name: 'PAL-M',
          action: {
            call: 'nav',
            params: {
              id: getId(4)
            }
          }
        },
        {
          name: 'NTSC',
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
    id: getId(4),
    gaPageName: 'alterar_formato_ntsc',
    layout: {
      title: 'Neste caso mude o formato para "<b>NTSC</b>"',
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        },
      ],
      alert
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
        }
      ]
    }
  },
  {
    id: getId(5),
    gaPageName: 'alterar_formato_pal_m',
    layout: {
      title: 'Neste caso mude o formato para "<b>PAL-M</b>"',
      buttons: [
        {
          text: 'Feito!',
          action: 'feito',
          gaAction: 'feito'
        },
      ],
      alert
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
        }
      ]
    }
  },
  {
    id: getId(6),
    gaPageName: 'conclusao_sem_acao',
    layout: {
      title: 'Neste caso não há nenhuma ação a ser feita, pois o programa será reproduzido em preto e branco na sua TV.',
      buttons: [
        {
          text: 'Voltar pro início',
          action: 'entendi',
          gaAction: 'voltar_inicio'
        }
      ]
    },
    state: {
      on: [
        {
          name: 'entendi',
          action: {
            call: 'goToHome'
          }
        }
      ]
    }
  },
]));
