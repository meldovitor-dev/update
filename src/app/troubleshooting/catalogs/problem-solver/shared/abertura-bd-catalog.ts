import { FeatureEnum } from 'src/app/enums/feature.enum';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';
import { ABERTURA_BD_CORP } from './abertura-bd-corp-catalog';

const getId = id => CatalogPrefix.ABERTURA_BD + id;
const getCorpId = id => CatalogPrefix.ABERTURA_BD_CORP + id;

const getBdId = {
  call: 'prepareAberturaBD',
  params: {
    call: 'getBdInfo',
    interaction: InteractionEnum.efetuarAberturaBD,
    dataOk: {
      call: 'nav',
      params: {
        id: getId(6)
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
const ABERTURA_BD = (negativeId): CatalogModel[] =>
  JSON.parse(
    JSON.stringify([
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
                    path: 'omniChannel.consultaAberturaBD.enabled',
                    enable:  { id: getId(1) },
                    disable: { id: negativeId },
                  },
                },
              }
            ],
        }
      },
      {
        id: getId(1),
        gaPageName: 'consultando_status_modem',
        fluxo: 'abertura_reparo',
        layout: {
          title: 'Aguarde! Estamos verificando os dados da rede...',
          loading: TimerTypes.RING,
          interaction: InteractionEnum.consultaStatusTerminal
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'checkTicketPayload',
                params: {
                  interaction: InteractionEnum.consultaStatusTerminal,
                  call:  'nav',
                  params: {
                    id: getId(2)
                  }
                }
              }
            },
            {
              name: InteractionEnum.consultaStatusTerminal,
              action: {
                call: 'serviceResponse',
                params: {
                  timeout: {
                    call: 'getTicketResponse',
                    params: {
                      interaction: InteractionEnum.consultaStatusTerminal,
                      call:  'nav',
                      params: {
                        id: getId(2)
                      }
                    }
                  },
                  success: {
                    call: 'getTicketResponse',
                    params: {
                      interaction: InteractionEnum.consultaStatusTerminal,
                      call:  'nav',
                      params: {
                        id: getId(2)
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      },
      {
        id: getId(2),
        gaPageName: 'consultando_abertura_reparo',
        fluxo: 'abertura_reparo',
        layout: {
          loading: TimerTypes.LOADING,
          loadingLabel: 'Carregando',
          interaction: InteractionEnum.consultarAberturaBD
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'callServices',
                params: {
                  interaction: InteractionEnum.consultarAberturaBD
                }
              }
            },
            {
              name: InteractionEnum.consultarAberturaBD,
              action: {
                call: 'serviceResponse',
                params: {
                  timeout: {
                    call: 'changeModule',
                    params: {
                      id: negativeId
                    }
                  },
                  success: {
                    call: 'shouldOpenBD',
                    params: {
                      interaction: InteractionEnum.consultarAberturaBD,
                      openBD: {
                        call: 'nav',
                        params: {
                          id: getId(3)
                        }
                      },
                      noBD: {
                        call: 'changeModule',
                        params: {
                          id: negativeId
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      },
      {
        id: getId(3),
        gaPageName: 'abertura_reparo_necessaria',
        layout: {
          title: 'Identificamos um problema na sua rede.',
          paragraph: 'Um técnico precisa ir até o seu endereço pra resolver.',
          buttons: [
            {
              text: 'Agendar Visita Técnica',
              action: 'navigate',
              gaAction: 'comecar',
            }
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'nav', params: {
                id: getId(4) ,
                },
              },
            },
          ]
        }
      },
      {
        id: getId(4),
        gaPageName: 'adicionar_numero_celular',
        layout: {
          title: 'Pra continuar, adicione um número de telefone, de preferência com whatsapp.',
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
                  id: getId(5)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(5),
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
                  success: getBdId
                }
              }
            }
          ]
        }
      },
      {
        id: getId(6),
        gaPageName: 'agendar_visita_tecnica',
        layout: {
          title: 'Escolha uma data e horário pra visita técnica.',
          paragraph: 'ATENÇÃO! É preciso que uma pessoa com mais de 18 anos esteja em casa pra acompanhar a visita.',
          hiddenHeaderBackButton: true,
          buttons: [
            {
              text: 'Escolher data de agendamento',
              action: 'navigate',
              gaAction: 'escolher_data_visita_tecnica',
            }
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'goToBD', params: {
                featureId: FeatureEnum.BANDA_LARGA_AGENDAMENTO,
                },
              },
            },
          ]
        }
      },
      {
        id: getId(10),
        layout: {},
        state: {
          on:
            [
              {
                name: 'onInit',
                action: {
                  call: 'verifyClientCorp',
                  params: {
                    enable:  { id: getCorpId(0) },
                    normal: { id: getId(11) },
                    disable: { id: 'conclusion' },
                  },
                },
              }
            ],
        }
      },
      {
        id: getId(11),
        layout: {},
        state: {
          on:
            [
              {
                name: 'onInit',
                action: {
                  call: 'verifyServiceEnable',
                  params: {
                    path: 'omniChannel.consultaAberturaBD.enabled',
                    enable:  { id: getId(12) },
                    disable: { id: 'conclusion' },
                  },
                },
              }
            ],
        }
      },
      {
        id: getId(12),
        gaPageName: 'consultando_status_modem',
        fluxo: 'abertura_reparo',
        layout: {
          title: 'Aguarde! Estamos verificando os dados da rede...',
          loading: TimerTypes.RING,
          interaction: InteractionEnum.consultaStatusTerminal
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'checkTicketPayload',
                params: {
                  interaction: InteractionEnum.consultaStatusTerminal,
                  call:  'nav',
                  params: {
                    id: getId(13)
                  }
                }
              }
            },
            {
              name: InteractionEnum.consultaStatusTerminal,
              action: {
                call: 'serviceResponse',
                params: {
                  timeout: {
                    call: 'getTicketResponse',
                    params: {
                      interaction: InteractionEnum.consultaStatusTerminal,
                      call:  'nav',
                      params: {
                        id: getId(13)
                      }
                    }
                  },
                  success: {
                    call: 'getTicketResponse',
                    params: {
                      interaction: InteractionEnum.consultaStatusTerminal,
                      call:  'nav',
                      params: {
                        id: getId(13)
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      },
      {
        id: getId(13),
        gaPageName: 'consultando_abertura_reparo',
        fluxo: 'abertura_reparo',
        layout: {
          loading: TimerTypes.LOADING,
          loadingLabel: 'Carregando',
          interaction: InteractionEnum.consultarAberturaBD
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'callServices',
                params: {
                  interaction: InteractionEnum.consultarAberturaBD
                }
              }
            },
            {
              name: InteractionEnum.consultarAberturaBD,
              action: {
                call: 'serviceResponse',
                params: {
                  timeout: {
                    call: 'goToConclusionPage',
                    params: {
                      id: 'abertura-bd-erro'
                    }
                  },
                  success: {
                    call: 'shouldOpenBD',
                    params: {
                      interaction: InteractionEnum.consultarAberturaBD,
                      openBD: {
                        call: 'nav',
                        params: {
                          id: getId(3)
                        }
                      },
                      noBD: {
                        call: 'goToConclusionPage',
                        params: {
                          id: 'abertura-bd'
                        }
                      }
                    }
                  }
                }
              }
            }
          ]
        }
      },
      ...ABERTURA_BD_CORP
    ])
  );

export { ABERTURA_BD };
