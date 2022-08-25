import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';
const getId = (id) => CatalogPrefix.FIBRA_TV_IMAGEM_TOMADA + id;
const alert = getAlert('tv') ;
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;
export const FIBRA_TV_IMAGEM_TOMADA = (negativeId, ): CatalogModel[] => JSON.parse(JSON.stringify([

    {
        id: getId(0),
        gaPageName: '',
        fluxo: '',
        layout: {
            title: 'Verifique se essa imagem está aparecendo na tela.',
            hiddenHeaderBackButton: true,
            buttons: [
                {
                  text: 'Sim, é essa!',
                  action: 'nextModule',
                  gaAction: ''
                },
                {
                    text: 'Não, voltar',
                    action: 'previous',
                    gaAction: ''
                  },
              ],
        },
        state: {
            on: [
                {
                    name: 'nextModule',
                    action: {
                          call: 'changeModule',
                          params: {
                            id: negativeId
                        }
                    }
                },
                {
                    name: 'previous',
                    action: {
                    call: 'goToHome'
                    }
                }
            ]
        }
    },
    {
        id: getId(1),
        gaPageName: '',
        fluxo: '',
        layout: {
            title: 'Atenção! As próximas ações devem ser feitas em cada ponto de TV que apresentar problema, tudo bem?',
            hiddenHeaderBackButton: true,
            buttons: [
                {
                  text: 'Iniciar',
                  action: 'navigate',
                  gaAction: ''
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
                }
            ]
        }
    },
    {
        id: getId(2),
        gaPageName: '',
        fluxo: '',
        layout: {
            title: 'Verifique os cabos Ethernet e HDMI atrás do decodificador.',
            hiddenHeaderBackButton: true,
            paragraph: 'Confirme se os cabos estão bem conectados.',
            buttons: [
                {
                  text: 'Feito!',
                  action: 'navigate',
                  gaAction: ''
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
                        id: getId(3)
                        }
                    }
                },
                {
                    name: 'previous',
                    action: {
                    call: 'goToHome'
                    }
                }
            ]
        }
    },
    {
        id: getId(3),
        gaPageName: '',
        fluxo: '',
        layout: {
            title: 'Agora verifique o cabo HDMI atrás da sua TV.',
            paragraph: 'Veja se o cabo HDMI está conectado corretamente na televisão.',
            buttons: [
                {
                  text: 'Feito!',
                  action: 'navigate',
                  gaAction: ''
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
                        id: getId(4)
                        }
                    }
                },
                {
                    name: 'previous',
                    action: {
                    call: 'goToHome'
                    }
                }
            ]
        }
    },
    {
        id: getId(4),
        gaPageName: '',
        fluxo: '',
        layout: {
            title: 'Por fim, verifique a entrada do sinal na TV.',
            paragraph: 'Veja se a entrada do sinal da TV é a mesma da entrada do cabo HDMI.',
            buttons: [
                {
                  text: 'Feito!',
                  action: 'navigate',
                  gaAction: ''
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
                        id: getId(5)
                        }
                    }
                },
                {
                    name: 'previous',
                    action: {
                    call: 'goToHome'
                    }
                }
            ]
        }
    },
    {
        id: getId(5),
        gaPageName: '',
        fluxo: '',
        layout: {
            title: 'Você realizou estas ações em todos os pontos de TV com problema?',
            paragraph: 'Repita estes passos caso você tenha mais de um ponto de TV.',
            alert: getAlert('tv'),
            buttons: [
                {
                  text: 'Ver novamente',
                  action: 'repeat',
                  gaAction: ''
                },
                {
                    text: 'Sim, feito!',
                    action: 'navigate',
                    gaAction: ''
                  }
              ],
        },
        state: {
            on: [
                {
                    name: 'repeat',
                    action: {
                        call: 'nav',
                        params: {
                        id: getId(1)
                        }
                    }
                },
                {
                    name: 'navigate',
                    action: {
                      call: 'openPopup'
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

])
);
