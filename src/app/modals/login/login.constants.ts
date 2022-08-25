/* eslint-disable @typescript-eslint/naming-convention */
import { ProductCodeEnum } from './../../enums/product.enum';
import { ToastModel, ToastTypes } from 'src/app/models/toast.model';

const getImage = (name: string) => `assets/images/login/${name}`;
export interface LoginStepsModel {
    cpfOrCnpj: any;
    identifier: any;

}

const gaCpfOrCnpj = 'digitar_cpf_cnpj';
const gaIndentify = 'digitar_numero_cliente';
const CPFCPNJTitle = 'Digite o número do CPF ou CNPJ do titular ';
const buttonLoginOption = {
    txt: 'Acessar com dados da Minha Oi',
    gaAction: 'logar_com_minha_oi',
    action: {
        call: 'loginMinhaOi',
    }
};

const otherLoginFibraOption = {
    button: buttonLoginOption,
    title: 'Não tem o número do cliente?',
};
const otherLoginTVFTHOption = {
    button: buttonLoginOption,
    title: 'Não tem o número do contrato?',
};

const defaultActionFowardCpf = {
    call: 'validCpfOrCnpj',
    params: {
        call: 'dispatchDataAndForward',
        params: {
            key: 'cpfOrCnpj'
        }
    }
};

const fibraNovaFibraCheckerFowardCpf = {
  call: 'validCpfOrCnpj',
    params: {
        call: 'callNovaFibraChecker',
        params: {
            onlyNovaFibra: {
              call: 'handlerNovaFibraUser',
                params: {
                }
            },
            hasLegacy: {
              call: 'dispatchDataAndForward',
                params: {
                    key: 'cpfOrCnpj'
                }
            }
        }
    }
};

const restartProcessAction = {
    action: {
        call: 'restartProcess',
        params: {

        }
    }
};

const specialAreaFibra = {
    items: [
        'Verifique se o CPF / CNPJ é do titular',
        'Veja se possui o produto Fibra',
        'Verifique o Número do Cliente'
    ],
    wildcard: {
        title: 'Veja aqui como achar o número do cliente',
        slides: [{
            title: 'O número do cliente está do lado direito da sua conta:',
            img: 'conta_login_fibra.png'
        },
        {
            title: 'Ou encontre no app da Minha Oi:',
            img: 'conta_minha_oi.png'
        }]
    }
};

const specialAreaTVDTH = {
    items: [
        'Verifique se o CPF / CNPJ é do titular',
        'Veja se possui o produto TV',
        'Verifique o Número do Contrato'
    ],
    wildcard: {
        title: 'Veja aqui como achar o Número do Contrato',
        slides: [{
            title: 'O Número do Contrato está do lado direito da sua conta:',
            img: 'conta_tvdth_slide.png'
        },
        {
            title: 'Ou encontre no app da Minha Oi:',
            img: 'conta_minha_oi.png'
        }]
    }
};


const defaultActionFowardIdentifier = {
    call: 'dispatchDataAndForward',
    params: {
        key: 'identifier',
        action: {
            call: 'login'
        }
    }
};
const BANDA_LARGA_STEPS = {
    cpfOrCnpj: {
        gaPageName: gaCpfOrCnpj,
        fluxo: 'login_tradicional',
        header: 'Login Banda Larga',
        title: CPFCPNJTitle,
        subTitle: '',
        buttons: [{
            txt: 'AVANÇAR',
            gaAction: 'proximo_passo',
            action: defaultActionFowardCpf
        }],
        cpfOrCnpjForm: true,
        formLabel: 'CPF ou CNPJ do titular',

    },
    identifier: {
        gaPageName: 'digitar_ddd_numero_telefone_fixo',
        header: 'Login Banda Larga',
        title: 'Digite o número do seu telefone fixo com DDD.',
        mask: 'phone',
        buttons: [{
            txt: 'Entrar',
            gaAction: 'logar',
            action: defaultActionFowardIdentifier
        }],
        identifierForm: true,
        formLabel: 'DDD + Número do telefone fixo',
    }
};

const FIXO_STEPS = {
    cpfOrCnpj: {
        gaPageName: gaCpfOrCnpj,
        header: 'Login Fixo',
        fluxo: 'login_tradicional',
        title: CPFCPNJTitle,
        mask: 'phone',
        buttons: [{
            txt: 'AVANÇAR',
            gaAction: 'proximo_passo',
            action: defaultActionFowardCpf
        }],
        cpfOrCnpjForm: true,
        formLabel: 'CPF ou CNPJ do titular',

    },
    identifier: {
        gaPageName: 'digitar_ddd_numero_telefone_fixo',
        header: 'Login Fixo',
        title: 'Digite o número do seu telefone fixo com DDD.',
        mask: 'phone',
        buttons: [{
            txt: 'Entrar',
            gaAction: 'logar',
            action: defaultActionFowardIdentifier
        }],
        identifierForm: true,
        formLabel: 'DDD + Número do telefone fixo',
    }
};

const TVDTH_STEPS = {
    cpfOrCnpj: {
        gaPageName: gaCpfOrCnpj,
        fluxo: 'login_tradicional',
        header: 'Login Tv por satélite',
        title: CPFCPNJTitle,
        buttons: [{
            txt: 'AVANÇAR',
            gaAction: 'proximo_passo',
            action: defaultActionFowardCpf
        }],
        cpfOrCnpjForm: true,
        formLabel: 'CPF ou CNPJ do titular',

    },
    identifier: {
        gaPageName: 'digitar_numero_contrato',
        header: 'Login Tv por satélite',
        title: 'Informe o "Número do contrato" que está no lado direito da sua conta:',
        img: 'conta_tvdth.png',
        buttons: [{
            txt: 'Entrar',
            gaAction: 'logar',
            action: defaultActionFowardIdentifier
        }],
        identifierForm: true,
        otherLoginOption: otherLoginTVFTHOption,
        formLabel: 'Número do contrato',
    }
};

const FIBRA_LOGIN_STEPS = {
    cpfOrCnpj: {
        gaPageName: gaCpfOrCnpj,
        fluxo: 'login_tradicional',
        header: 'Login fibra',
        title: CPFCPNJTitle,
        buttons: [{
            txt: 'AVANÇAR',
            gaAction: 'proximo_passo',
            action: fibraNovaFibraCheckerFowardCpf
        }],
        cpfOrCnpjForm: true,
        formLabel: 'CPF ou CNPJ do titular',
    },
    identifier: {
        gaPageName: gaIndentify,
        header: 'Login fibra',
        title: 'Informe o "Número do Cliente" que está no lado direito da sua conta:',
        buttons: [{
            txt: 'Entrar',
            gaAction: 'logar',
            action: defaultActionFowardIdentifier
        }],
        otherLoginOption: otherLoginFibraOption,
        identifierForm: true,
        formLabel: 'Número do cliente',
    }
};

export const GET_LOGIN_STEPS = (code): LoginStepsModel => {
    switch (code) {
        case ProductCodeEnum.BANDA_LARGA:
            return BANDA_LARGA_STEPS;
        case ProductCodeEnum.FIXO:
            return FIXO_STEPS;
        case ProductCodeEnum.TVDTH:
            return TVDTH_STEPS;
        default:
            return FIBRA_LOGIN_STEPS;

    }
};

const DEFAULT_ERROR_HANDLER_LOGIN = {
    invalidData: {
        type: 'invalidData',
        gaPageName: 'erro_dados_invalidos',
        title: 'Dados inválidos.',
        warningIcon: true,
        paragraph: 'Veja alguns possíveis erros:<br/><br/>' +
        '- O CPF não é dessa conta<br/>' +
        '- O número do telefone está errado<br/>' +
        '- Você não possui este produto',
        cpfOrCnpjForm: 'CPF ou CNPJ do titular',
        identifierForm: 'DDD + Número do telefone fixo',
        mask: 'phone',
        buttons: [{
            txt: 'Entrar',
            action: {
                call: 'validCpfOrCnpj',
                params: {
                  call: 'login'
                }
            }
        }]
    },
    invalidDataTV: {
        type: 'invalidData',
        gaPageName: 'erro_dados_invalidos',
        title: 'Dados inválidos.',
        warningIcon: true,
        specialArea: specialAreaTVDTH,
        cpfOrCnpjForm: 'CPF ou CNPJ do titular',
        identifierForm: 'Número do contrato',
        buttons: [{
            txt: 'Entrar',
            action: {
                call: 'validCpfOrCnpj',
                params: {
                    call: 'login'
                }
            }
        }]
    },
    invalidDataFibra: {
        gaPageName: 'erro_dados_invalidos',
        type: 'invalidData',
        title: 'Dados inválidos.',
        warningIcon: true,
        specialArea: specialAreaFibra,
        otherLoginOption: otherLoginFibraOption,
        cpfOrCnpjForm: 'CPF ou CNPJ do titular',
        identifierForm: 'Número do cliente',
        buttons: [{
            txt: 'Entrar',
            action: {
                call: 'validCpfOrCnpj',
                params: {
                    call: 'login'
                }
            }
        }]
    },
    offline: {
        type: 'offline',
        errorPage: true,
        title: 'Você está offline!',
        paragraph: 'Conecte-se a uma rede de internet ou 3G/4G para resolver seu problema mais rapidamente.<br>' +
          'Se preferir, você ainda pode continuar offline para encontrar uma solução.',
        buttons: [
          {
              txt: 'Fechar',
              action: {
                  call: 'dismiss',
                  params: {
                  }
              }
          }
      ]

    },
    minhaOiunavailable: {
        gaPageName: 'erro_servico_login_minha_oi_indisponivel',
        fluxo: 'login_minha_oi',
        errorPage: true,
        type: 'minhaOiunavailable',
        title: 'O login da Minha Oi está indisponível no momento.',
        paragraph: 'Mas você ainda pode acessar o app com os seus dados da Oi.',
        buttons: [{
            txt: 'Acessar com os dados da #product#',
            ...restartProcessAction,
        }]
    },
    notOk: {
        gaPageName: 'erro_cadastro_nao_positivado',
        errorPage: true,
        fluxo: 'login_minha_oi',
        type: 'notOk',
        title: 'Parece que você ainda não concluiu o cadastro da Minha Oi.',
        paragraph: 'Enquanto isso, entre no Técnico Virtual com dados da Oi',
        buttons: [{
            txt: 'Acessar com os dados da #product#',
            ...restartProcessAction
            }
        ]
    },
    noPortfolio: {
        gaPageName: 'erro_nao_possui_produto',
        errorPage: true,
        fluxo: 'login_minha_oi',
        type: 'noPortfolio',
        title: 'Aparentemente você não possui o produto selecionado.',
        paragraph: 'Confirme qual é o seu produto contratado e tente entrar novamente.<br/><br/>' +
            'Você pode acessar esta informação na sua conta.',
        buttons: [{
            txt: 'Fechar',
            gaAction: 'fechar',
            action: {
                call: 'dismiss',
                params: {
                }
            }
        }]
    },
    unavailable: {
        errorPage: true,
        gaPageName: 'erro_servico_login',
        type: 'unavailable',
        title: 'Não conseguimos verificar os seus dados.',
        paragraph: 'Neste momento estamos com problemas no serviço. Tente novamente mais tarde. <br/><br/>' +
            'Você também pode acessar com os dados da Minha Oi.',
        buttons: [
            {
                txt: 'Acessar com dados da Minha Oi',
                action: {
                    call: 'loginMinhaOi',
                    params: {

                    }
                }
            }
        ]
    },
    unavailableCobre: {
        errorPage: true,
        gaPageName: 'erro_servico_login',
        type: 'unavailable',
        title: 'Não conseguimos verificar os seus dados.',
        paragraph: 'Neste momento estamos com problemas no serviço.<br>Tente novamente mais tarde.<br>' +
            'Você ainda pode resolver seus problemas de internet sem fazer login.',
        buttons: [
            {
                txt: 'Fechar',
                action: {
                    call: 'dismiss',
                    params: {
                    }
                }
            }
        ]
    },
    unavailableMaintenance: {
      errorPage: true,
      gaPageName: '',
      type: 'unavailable',
      title: 'Estamos em manutenção!',
      paragraph: 'No momento, o nosso serviço está passando por uma manutenção importante.<br><br>' +
          'Aguarde e tente novamente mais tarde.',
      buttons: [
          {
              txt: 'Voltar pro início',
              action: {
                  call: 'dismiss',
                  params: {
                  }
              }
          }
      ]
  },
    invalidProduct: {
        errorPage: true,
        type: 'invalidProduct',
        gaPageName: 'erro_nao_possui_produto',
        title: 'Atenção! Você não possui o produto de #product#.',
        paragraph: 'Selecione abaixo um dos seus produtos de fibra:',
        portfolioButtons: true,
    },
    invalidProductMinhaOi: {
        errorPage: true,
        type: 'invalidProductMinhaOi',
        fluxo: 'login_minha_oi',
        gaPageName: 'erro_nao_possui_produto',
        title: 'Atenção! Você não possui o produto de #product#.',
        paragraph: 'Selecione abaixo um dos seus produtos de fibra:',
        portfolioButtons: true,
    },
    warningLogin: {
        title: 'Você está iniciando um atendimento limitado',
        errorPage: true,
        paragraph: 'Este é um passo a passo manual.<br/><br/>' +
        'Faça login pra ter acesso a todos os serviços do ' +
        'Técnico Virtual e realizar operações automáticas que podem resolver seu problema.',
        buttons: [
            {
                txt: 'Fazer login',
                action: {
                    call: 'goToCpfOrCnpjStep'
                }
            },
            {
                txt: 'Continuar sem login',
                action: {
                    call: 'continueWithoutLogin'
                }
            }
        ]
    },
    novaFibraAndroid: {
      gaPageName: 'aviso_oi_e',
      header: 'Login Fibra',
      title: 'Tenha uma nova experiência com sua <br>Oi Fibra pelo app <b>Oi_e</b>!',
      paragraph: 'Conheça o <b>novo aplicativo</b> Oi pra clientes que têm Oi Fibra.',
      errorPage: true,
      img: getImage('oie.png'),
      buttons: [
        {
            txt: 'Acessar Oi_e',
            gaAction: 'acessar',
            greenStyle: true,
            action: {
                call: 'openLinkExterno',
                params: {
                    link: 'https://oifibra.page.link/home'
                  }
            }
        }
      ]
    },
    novaFibraIos: {
        gaPageName: 'aviso_oi_e',
        header: 'Login Fibra',
        title: 'Tenha uma nova experiência com sua <br>Oi Fibra pelo app <b>Oi_e</b>!',
        paragraph: 'Conheça o <b>novo aplicativo</b> Oi pra clientes que têm Oi Fibra.',
        errorPage: true,
        img: getImage('oie.png'),
        buttons: [
          {
            txt: 'Acessar Oi_e',
            gaAction: 'acessar',
            greenStyle: true,
              action: {
                call: 'openLinkExterno',
                params: {
                    link: 'https://oifibra.page.link/home'
              }
          },
        }
        ]
      },
      naoSouCliente: {
        gaPageName: 'login_alerta_sem_cpf',
        header: 'ALERTA!',
        title: 'Não encontramos seu CPF. Saiba mais sobre os produtos Oi ou navegue sem login pelo app Técnico Vitual!',
        errorPage: true,
        carousel: true,
        skipLoginButton: {
                txt: 'Continuar sem login',
                gaAction:'continuar_sem_login',
                action: {
                    call: 'continueWithoutLogin'
                }
            }
      },
      unavailableLogin: {
        errorPage: true,
        header: 'ALERTA!',
        gaPageName: 'erro_servico_login',
        type: 'unavailable',
        title: 'Não conseguimos verificar os seus dados.',
        paragraph: 'Neste momento estamos com indisponibilidade no serviço.<br><br>' +
            'Você também pode continuar utilizando o app sem login.',
            skipLoginButton: {
                txt: 'Continuar sem login',
                gaAction:'continuar_sem_login',
                action: {
                    call: 'continueWithoutLogin'
                }
            }
    },
};


export const LOGIN_ERROR_PAGE_CATALOG = {
    unavailable: 'unavailable',
    unavailableCobre: 'unavailableCobre',
    unavailableMaintenance: 'unavailableMaintenance',
    offline: 'offline',
    invalidData: 'invalidData',
    invalidDataFibra: 'invalidDataFibra',
    invalidDataTV: 'invalidDataTV',
    notOk: 'notOk',
    noPortfolio: 'noPortfolio',
    invalidProduct: 'invalidProduct',
    invalidProductMinhaOi: 'invalidProductMinhaOi',
    warningLogin: 'warningLogin',
    novaFibraAndroid: 'novaFibraAndroid',
    novaFibraIos: 'novaFibraIos',
    naoSouCliente: 'naoSouCliente',
    unavailableLogin: 'unavailableLogin'
};

export const GET_LOGIN_ERROR_PAGE = (pageId: string) => (DEFAULT_ERROR_HANDLER_LOGIN[pageId] || DEFAULT_ERROR_HANDLER_LOGIN.invalidData);

export const TOAST_LOGIN_SUCCESS: ToastModel = {
    type: ToastTypes.SUCCESS,
    message: 'Login realizado com sucesso!',
    gaAction: 'aviso_login_tradicional_sucesso',
};
export const TOAST_LOGIN_SUCCESS_MINHA_OI: ToastModel = {
    type: ToastTypes.SUCCESS,
    message: 'Login realizado com sucesso!',
    gaAction: 'aviso_login_minha_oi_sucesso',
};
export const TOAST_LOGIN_ERROR: ToastModel = {
  type: ToastTypes.ERROR,
  message: 'Não foi possível ralizar o Login. Tente novamente.',
  gaAction: 'aviso_erro_login_deeplink_minha_oi',
};

export const CPF_OR_CNPJ_PAGE = {
  gaPageName: gaCpfOrCnpj,
  fluxo: '',
  title: CPFCPNJTitle,
  buttons: [{
      txt: 'AVANÇAR',
      gaAction: 'novo_login_avancar',
  }],
  formLabel: 'CPF ou CNPJ do titular',
};
