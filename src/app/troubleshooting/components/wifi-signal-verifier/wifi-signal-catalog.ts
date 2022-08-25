import { ButtonCatalogModel } from './../../troubleshooting-interface';
import { WifiLevelEnum } from './../../../services/wifi-manager.service';

export interface WifiSignalPageModel {
  id: WifiLevelEnum | string;
  title: string;
  paragraph: string;
  gaPageName: string;
  image?: any;
  buttons: ButtonCatalogModel[];
}

const wifiSignalCatalog: WifiSignalPageModel[] = [
  {
    id: WifiLevelEnum.NO_SIGNAL,
    title: 'Este ambiente está sem sinal de Wi-Fi.',
    paragraph: 'Conecte-se a uma rede Wi-Fi da Oi ou verifique o sinal perto do modem.',
    gaPageName: 'sinal_ausente',
    buttons: [
      {
        text: 'Dicas pra melhorar o sinal Wi-Fi',
        action: 'tips',
        gaAction: 'dicas_melhorar_sinal'
      },
      {
        text: 'Verificar sinal perto do Modem',
        action: 'near-modem',
        gaAction: 'verificar_perto_modem'
      }
    ]
  },
  {
    id: WifiLevelEnum.WEAK,
    title: 'O sinal Wi-Fi está fraco neste ambiente.',
    paragraph: 'Verifique o sinal perto do modem ou veja dicas de como melhorar.',
    gaPageName: 'sinal_fraco',
    buttons: [
      {
        text: 'Dicas pra melhorar o sinal Wi-Fi',
        action: 'tips',
        gaAction: 'dicas_melhorar_sinal'
      },
      {
        text: 'Verificar sinal perto do Modem',
        action: 'near-modem',
        gaAction: 'verificar_perto_modem'
      }
    ]
  },
  {
    id: WifiLevelEnum.MEDIUM,
    title: 'O sinal Wi-Fi está bom neste ambiente.',
    paragraph: 'Siga as dicas pra melhorar o sinal em outros ambientes.',
    gaPageName: 'sinal_bom',
    buttons: [
      {
        text: 'Dicas pra melhorar o sinal Wi-Fi',
        action: 'tips',
        gaAction: 'dicas_melhorar_sinal'
      },
      {
        text: 'Verificar em outro ambiente',
        action: 'other-room',
        gaAction: 'verificar_outro_ambiente'
      },
    ]
  },
  {
    id: WifiLevelEnum.STRONG,
    title: 'O sinal Wi-Fi está ótimo neste ambiente.',
    paragraph: 'Siga as dicas pra melhorar o sinal em outros ambientes.',
    gaPageName: 'sinal_forte',
    buttons: [
      {
        text: 'Dicas pra melhorar o sinal Wi-Fi',
        action: 'tips',
        gaAction: 'dicas_melhorar_sinal'
      },
      {
        text: 'Verificar em outro ambiente',
        action: 'other-room',
        gaAction: 'verificar_outro_ambiente'
      },
    ]
  },
  {
    id: 'no-signal-near-modem',
    title: 'Você está sem sinal perto do modem.',
    paragraph: 'Vamos realizar um diagnóstico e tentar resolver o problema.',
    gaPageName: 'sinal_ausente_perto_modem',
    buttons: [
      {
        text: 'Realizar diagnóstico da Rede',
        action: 'sem-conexao',
        gaAction: 'seguir_diagnostico_rede'
      },
    ]
  },
  {
    id: 'weak-near-modem',
    title: 'Mesmo perto do modem, o sinal Wi-Fi ainda não melhorou.',
    paragraph: 'Vamos realizar um diagnóstico e tentar resolver o problema.',
    gaPageName: 'sinal_ausente_perto_modem',
    buttons: [
      {
        text: 'Realizar diagnóstico da Rede',
        action: 'internet-lenta',
        gaAction: 'seguir_diagnostico_rede'
      },
    ]
  },
  {
    id: 'medium-near-modem',
    title: 'O sinal Wi-Fi está ótimo perto do modem.',
    paragraph: 'Siga as dicas pra melhorar o sinal em outros ambientes.',
    gaPageName: 'sinal_bom_perto_modem',
    buttons: [
      {
        text: 'Dicas pra melhorar o sinal Wi-Fi',
        action: 'tips',
        gaAction: 'dicas_melhorar_sinal'
      },
      {
        text: 'Verificar em outro ambiente',
        action: 'other-room',
        gaAction: 'verificar_outro_ambiente'
      }
    ]
  },
  {
    id: 'strong-near-modem',
    title: 'O sinal Wi-Fi está ótimo perto do modem.',
    paragraph: 'Siga as dicas pra melhorar o sinal em outros ambientes.',
    gaPageName: 'sinal_forte_perto_modem',
    buttons: [
      {
        text: 'Dicas pra melhorar o sinal Wi-Fi',
        action: 'tips',
        gaAction: 'dicas_melhorar_sinal'
      },
      {
        text: 'Verificar em outro ambiente',
        action: 'other-room',
        gaAction: 'verificar_outro_ambiente'
      }
    ]
  },
  {
    id: 'tips',
    gaPageName: 'compatibilidade_duas_frequencias',
    title: 'Os modens de Fibra são Dual Band e usam duas bandas de frequência: 2.4 GHz e 5 GHz.',
    paragraph: 'A frequência de 5 GHz é mais veloz.<br><br>' +
               'Porém nem todos os celulares, tvs e notebooks são compatíveis com a frequência de 5 GHz.<br><br>' +
               'Para verificar se os equipamentos da sua residência são compatíveis consulte os manuais dos fornecedores.',
    image: {
      has5ghz: './assets/images/troubleshooting/problem-solver/fibra/internet/sinal-wifi/support5ghz.svg',
      no5ghz: './assets/images/troubleshooting/problem-solver/fibra/internet/sinal-wifi/dontsupport5ghz.svg',
    },
    buttons: [
      {
        text: 'Ok, entendi',
        action: 'navigate',
        gaAction: 'entendido'
      }
    ]
  }
];

const getWifiPage = (level) => wifiSignalCatalog.find(el => el.id === level);
export { getWifiPage };
