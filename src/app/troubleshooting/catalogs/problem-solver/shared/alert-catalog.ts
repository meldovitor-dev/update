import { AlertCalogModel } from '../../../troubleshooting-interface';

const alertCatalog: AlertCalogModel[] = [
  {
    id: 'internet',
    title: 'A sua internet voltou a funcionar?',
    message: 'Acesse novamente pra testar.',
    gaPageName: 'internet_melhorou_trocando_canal',
    buttons: [{
      text: 'Ainda não',
      gaAction: 'nao',
    },
    {
      text: 'Voltou',
      gaAction: 'sim',
    }]
  },
  {
    id: 'internet-reboot',
    title: 'A sua internet voltou a funcionar?',
    message: 'Aguarde as luzes do modem acenderem pra testar.',
    gaPageName: 'internet_voltou_reiniciando_modem',
    buttons: [{
      text: 'Ainda não',
      gaAction: 'nao',
    },
    {
      text: 'Voltou',
      gaAction: 'sim',
    }]
  },
  {
    id: 'internet-tomada',
    title: 'Após trocar de tomada, o modem ligou?',
    message: 'As luzes devem começar a acender.',
    gaPageName: 'modem_ligou',
    buttons: [{
      text: 'Não ligou',
      gaAction: 'nao',
    },
    {
      text: 'Ligou!',
      gaAction: 'sim',
    }]
  },
  {
    id: 'internet-reconectar-cabo',
    title: 'Após reconectar o cabo, o modem ligou?',
    message: 'As luzes devem começar a acender.',
    gaPageName: 'modem_ligou',
    buttons: [{
      text: 'Ainda não',
      gaAction: 'nao',
    },
    {
      text: 'Sim!',
      gaAction: 'sim',
    }]
  },
  {
    id: 'internet-lenta',
    title: 'A sua internet ficou mais rápida?',
    message: 'Acesse novamente pra testar.',
    gaPageName: 'internet_voltou',
    buttons: [{
      text: 'Ainda não',
      gaAction: 'nao',
    },
    {
      text: 'Sim!',
      gaAction: 'sim',
    }]
  },
  {
    id: 'internet-lenta-reboot',
    title: 'A sua internet ficou mais rápida?',
    message: 'Aguarde as luzes do modem acenderem pra testar.',
    gaPageName: 'internet_melhorou_reiniciando_modem',
    buttons: [{
      text: 'Ainda não',
      gaAction: 'nao',
    },
    {
      text: 'Sim!',
      gaAction: 'sim',
    }]
  },
  {
    id: 'fixo',
    title: 'O seu telefone voltou a funcionar?',
    message: 'Tente fazer pelo menos uma ligação pra testar.',
    gaPageName: 'fixo_voltou_aguardando_sinal',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'fixo-title',
    title: 'O telefone fixo voltou a funcionar?',
    gaPageName: 'fixo_voltou',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'fixo-ligacao',
    title: 'O número que você discou atendeu a ligação?',
    gaPageName: 'atendeu_ligacao_testando_outro_telefone',
    buttons: [
      {
        text: 'Não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Sim',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'fixo-volume',
    title: 'O seu telefone voltou a funcionar?',
    message: 'Ligue pro seu fixo de outro telefone pra testar.',
    gaPageName: 'fixo_voltou_aumentando_volume_telefone',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'fixo-reboot',
    title: 'O seu telefone voltou a funcionar?',
    message: 'Aguarde as luzes do modem acenderem pra testar.',
    gaPageName: 'fixo_voltou',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'tv-manual-stb',
    title: 'A TV voltou a funcionar?',
    message: 'Acesse pelo menos dois canais diferentes.',
    gaPageName: 'tv_voltou_pressionando_botoes_stb_guia',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'tv-canais',
    title: 'A TV voltou a funcionar?',
    message: 'Acesse pelo menos dois canais diferentes.',
    gaPageName: '',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'tv',
    title: 'A TV voltou a funcionar?',
    message: 'Aguarde as luzes do seu decodificador e modem acenderem pra testar.',
    gaPageName: 'tv_voltou_reiniciando_decodificador',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'tv-reboot-automatico-stb',
    title: 'A TV voltou a funcionar?',
    message: 'Após as luzes do seu decodificador acenderem, acesse dois canais diferentes pra testar.',
    gaPageName: 'tv_voltou_reiniciando_decodificador',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'tv-reboot-automatico-ont',
    title: 'A TV voltou a funcionar?',
    message: 'Aguarde as luzes do seu decodificador e modem acenderem pra testar.',
    gaPageName: 'internet_melhorou_reiniciando_modem',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'smart-tv',
    title: 'A sua TV conectou à internet?',
    message: 'Tente acessar um aplicativo da TV que utilize a internet: Oi Play, Netflix, Youtube…',
    gaPageName: 'tv_conectou_configurando_rede_cabo',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Sim',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'sem-hdm-ligando-modem',
    title: 'O modem está ligado agora?',
    message: 'Algumas luzes devem começar a acender.',
    gaPageName: 'modem_ligou',
    buttons: [
      {
        text: 'Não ligou',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Sim!',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'sem-hdm-reconecta-cabo',
    title: 'Após reconectar o cabo, o modem ligou?',
    message: 'As luzes devem começar a acender.',
    gaPageName: 'modem_ligou',
    buttons: [
      {
        text: 'Não ligou',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Sim!',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'sem-hdm-troca-tomada',
    title: 'Após trocar de tomada, o modem ligou?',
    message: 'As luzes devem começar a acender.',
    gaPageName: 'modem_ligou',
    buttons: [
      {
        text: 'Não ligou',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Sim!',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'ts-cabos-cobre',
    title: 'A sua internet continua funcionando?',
    message: 'Acesse novamente pra testar.',
    gaPageName: 'internet_continua_funcionando_adicionando_microfiltro',
    buttons: [
      {
        text: 'Não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Sim',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'tv-tela-preta',
    title: 'A imagem voltou a ficar colorida?',
    message: 'Verifique novamente na sua TV.',
    gaPageName: 'imagem_voltou_colorida',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'defeito-no-controle',
    title: 'O controle voltou a funcionar?',
    message: 'Acesse pelo menos dois canais diferentes',
    gaPageName: 'controle_voltou_reiniciando',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Voltou',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'alerta-netflix',
    title: 'A Netflix voltou a funcionar?',
    gaPageName: 'netflix_voltou',
    buttons: [
      {
        text: 'Ainda não',
        action: 'nao',
        gaAction: 'nao',
      },
      {
        text: 'Sim',
        action: 'sim',
        gaAction: 'sim'
      }
    ]
  },
  {
    id: 'feedback-alert',
    title: 'Estas informações foram úteis?',
    gaPageName: 'avaliar_dicas',
    buttons: [
      {
        text: 'Não',
        action: 'nao',
        gaAction: 'nao_util',
      },
      {
        text: 'Sim',
        action: 'sim',
        gaAction: 'util'
      }
    ]
  },
];

const getAlert = (service, ga?): AlertCalogModel => {
  const catalog = alertCatalog.find(el => (el.id === service))
  if (!catalog) {
    console.log('💣 => id not found on alert => ', service);
    return undefined;
  }
  return Object.assign({}, {
      ...catalog,
       ...{
         gaPageName: ga || catalog.gaPageName
       }
  });
};
export { getAlert };
