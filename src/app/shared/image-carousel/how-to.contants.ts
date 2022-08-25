import { ProductIdentifierEnum } from 'src/app/enums/product.enum';

const getImage = (nameImg) => `./assets/images/howTo/${nameImg}`;

const howToSlidesFibraInternet = [
  {
    id: 0,
    thumbnail: getImage('internet_400mb.jpg'),
    label: 'Conheça as vantagens da internet 400 Mega',
    call: 'openModal',
    videoURL: 'tDM1dpCLuCc',
    gaAction: ''
  },
  {
    id: 1,
    thumbnail: getImage('wifi_24_50.jpg'),
    label: 'Wi-Fi 2.4 GHz ou 5 GHz: Entenda a diferença',
    call: 'openModal',
    videoURL: '6MDzn3BGfEY',
    gaAction: ''
  },
  {
    id: 2,
    thumbnail: getImage('cuidados_oi_fibra.jpg'),
    label: 'Boas práticas - Dicas e cuidados para evitar danos ao seu modem de internet',
    call: 'openModal',
    videoURL: 'u0Hp8h6UAWA',
    gaAction: ''
  },
  {
    id: 3,
    thumbnail: getImage('wifi_UP_Oi_Play.jpg'),
    label: 'Como funciona sua conexão à internet com modem WiFi Up e seu Oi Play',
    call: 'openModal',
    videoURL: 'XwNTYewZbSE',
    gaAction: ''
  },
  {
    id: 4,
    thumbnail: getImage('roteador_wifi_mesh.jpg'),
    label: 'Conheça o Wi-Fi Mesh e potencialize a cobertura do sinal Wi-Fi na sua casa',
    call: 'openModal',
    videoURL: 'ZWpv9ANYYD8',
    gaAction: ''
  },
];

const howToSlidesFibraTV = [
  {
    id: 0,
    thumbnail: getImage('internet_TV_fibra.jpg'),
    label: 'Conheça a internet fibra ótica FTTH e TV por assinatura IPTV',
    call: 'openModal',
    videoURL: '8gIKUuNs46k',
    gaAction: ''
  },
  {
    id: 1,
    thumbnail: getImage('controle_remoto.jpg'),
    label: 'Funções do controle remoto da TV por fibra ótica',
    call: 'openModal',
    videoURL: '0uYb-VRUsdY',
    gaAction: ''
  },
  {
    id: 2,
    thumbnail: getImage('cuidados_oi_fibra.jpg'),
    label: 'Boas práticas - Dicas e cuidados para evitar danos ao seu modem de internet',
    call: 'openModal',
    videoURL: 'u0Hp8h6UAWA',
    gaAction: ''
  },
  {
    id: 3,
    thumbnail: getImage('wifi_UP_Oi_Play.jpg'),
    label: 'Como funciona sua conexão à internet com modem WiFi Up e seu Oi Play',
    call: 'openModal',
    videoURL: 'XwNTYewZbSE',
    gaAction: ''
  },
];

const howToSlidesFibraFixo = [
  {
    id: 0,
    thumbnail: getImage('fixo_fibra.jpg'),
    label: 'Conheça o VoIP, seu telefone fixo via internet',
    call: 'openModal',
    videoURL: 'XmxRQNHHlEw',
    gaAction: ''
  },
  {
    id: 1,
    thumbnail: getImage('cuidados_oi_fibra.jpg'),
    label: 'Boas práticas - Dicas e cuidados para evitar danos ao seu modem de internet',
    call: 'openModal',
    videoURL: 'u0Hp8h6UAWA',
    gaAction: ''
  },
  {
    id: 2,
    thumbnail: getImage('wifi_24_50.jpg'),
    label: 'Wi-Fi 2.4 GHz ou 5 GHz: Entenda a diferença',
    call: 'openModal',
    videoURL: '6MDzn3BGfEY',
    gaAction: ''
  },
  {
    id: 3,
    thumbnail: getImage('wifi_UP_Oi_Play.jpg'),
    label: 'Como funciona sua conexão à internet com modem WiFi Up e seu Oi Play',
    call: 'openModal',
    videoURL: 'XwNTYewZbSE',
    gaAction: ''
  },
];
const gethowToSlides = (currentProduct?) => {
  const howtoSlides = {
    [ProductIdentifierEnum.FIBRA_BANDA_LARGA]: howToSlidesFibraInternet,
    [ProductIdentifierEnum.FIBRA_FIXO]: howToSlidesFibraFixo,
    [ProductIdentifierEnum.FIBRA_TV]: howToSlidesFibraTV,
    default:howToSlidesFibraInternet,
  };
  return howtoSlides[currentProduct] || howtoSlides.default;
};
export { gethowToSlides };
