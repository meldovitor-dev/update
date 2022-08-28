import { FeatureEnum } from 'src/app/enums/feature.enum';
export enum CardTypes {
  DISPOSITIVOS = 1,
  REDES = 2,
  INTENSIDADE = 3,
  VISITAS = 4,
  OFFLINE = 5,
  COMPATIBILIDADE = 6
}
const cards = [
  {
    id: CardTypes.DISPOSITIVOS,
    featureCode: [
      FeatureEnum.FIBRA_DISPOSITIVOS_CONECTADOS,
      FeatureEnum.BANDA_LARGA_DISPOSITIVOS_CONECTADOS
    ],
    title: 'Dispositivos Conectados',
    label: 'Veja os dispositivos conectados na sua rede',
    icon: 'devices',
    isClickable: true,
    needTicket: true
  },
  {
    id: CardTypes.REDES,
    featureCode: [
      FeatureEnum.BANDA_LARGA_TROCA_NOME,
      FeatureEnum.FIBRA_TROCA_NOME,
      FeatureEnum.BANDA_LARGA_TROCA_SENHA,
      FeatureEnum.FIBRA_TROCA_SENHA
    ],
    title: 'Configure suas rede',
    icon: 'network',
    content: [
      {
        label: 'Trocar senha do Wi-Fi',
        icon: 'password',
        action: {
          call: 'changePassword'
        }
      },
      {
        label: 'Trocar nome da Rede',
        icon: 'name',
        action: {
          call: 'changeSsid'
        }
      }
    ],
    isClickable: false
  },
  {
    id: CardTypes.INTENSIDADE,
    featureCode: [FeatureEnum.FIBRA_INTENSIDADE_SINAL],
    title: 'Intensidade do Sinal',
    label: 'Verifique a intensidade do sinal Wi-Fi no ambiente',
    icon: 'signal',
    action: {
      call: 'signalVerify'
    },
    isClickable: true,
    platforms: ['android']
  },
  {
    id: CardTypes.COMPATIBILIDADE,
    featureCode: [
      FeatureEnum.FIBRA_COMPATIBILIDADE_VELOCIDADES,
    ],
    title: 'CAPACIDADE MÁXIMA DOS DISPOSITIVOS',
    label: 'Verifique a velocidade do seu dispositivo no Wi-Fi da Oi',
    icon: 'phone',
    isClickable: true,
    platforms: ['android'],
  },
];
const CARD_COLECTION = (feature: FeatureEnum) =>
  cards.find(el => el.featureCode.includes(feature));
export { CARD_COLECTION };

export const CARD_MODAL = [
  {
    id: CardTypes.DISPOSITIVOS,
    gaName: 'modal_dispositivos_conectados',
    title:
      'Alguns modelos de modem não permitem a verificação de dispositivos conectados pelo aplicativo.'
  },
  {
    id: CardTypes.REDES,
    gaName: 'modal_configuracao_redes',
    title:
      'Alguns modelos de modem não permitem a alteração de senha e nome da rede pelo aplicativo.',
    paragraph:
      'Você pode entrar em contato com a nossa central de atendimento e solicitar essa alteração para um dos nossos atendentes'
  },
  {
    id: CardTypes.OFFLINE,
    gaName: 'modal_offline_howTo',
    title:
      'Você precisa estar online para realizar esta operação',
    paragraph:
      'Conecte-se à internet pra ter acesso a todos os serviços do Técnico Virtual.',
    button: {
      label: 'Conectar',
      action: 'openWifi',
      params: {}
    }
  }
];
