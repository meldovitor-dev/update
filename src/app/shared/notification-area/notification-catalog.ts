import { NotificationModel } from 'src/app/models/notification.model';
import { ProductCodeEnum } from 'src/app/enums/product.enum';
export const FIXED_NOTIFICATIONS: NotificationModel[] = [

  {
    id: 'new-app',
    title: 'Estamos de cara nova!',
    paragraph: 'O app se transformou pra te oferecer uma nova experiência. ' +
      'Agora é bem mais simples encontrar soluções pros seus produtos Oi. ' +
      'Melhoramos as funções de atendimento e assistência técnica, que vão ' +
      'te ajudar a solucionar problemas com mais facilidade, inclusive off-line. ',
    icon: 'novidades',
    creationDate: 1591291684916,
    unread: true,
    products: [ProductCodeEnum.FIBRA, ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.FIXO, ProductCodeEnum.TVDTH],
  },
  {
    id: 'oi-place',
    title: 'Conheça o Oi Place, o marketplace da Oi',
    paragraph: 'Lá você encontra produtos que vão ampliar sua experiencia digital.',
    icon: 'anuncio',
    creationDate: 1608033600000,
    unread: true,
    products: [ProductCodeEnum.FIBRA, ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.FIXO, ProductCodeEnum.TVDTH],
    button: {
      text: 'Acesse agora',
      gaAction: 'acessar_oi_place'
    },
    link: 'https://www.oiplace.com.br/?utm_source=apptecnicovirtual&utm_medium=interacoes&utm_campaign=conhecaoiplace'
  },
  {
    id: 'oi-expert',
    title: 'Conheça o Oi Expert',
    paragraph: 'Quer descomplicar sua vida digital? O Oi Expert é seu especialista pra te ajudar com problemas de tecnologia sempre que precisar.<br>' +
      ' Com ele, você tem acesso à assistência qualificada 24 horas pra tirar suas dúvidas dos seus computadores, celulares, tablets, Smart TVs e roteadores Wi-Fi Mesh.',
    icon: 'anuncio',
    creationDate: 1608033600000,
    unread: true,
    products: [ProductCodeEnum.FIBRA, ProductCodeEnum.BANDA_LARGA],
    button: {
      text: 'Acesse agora',
      gaAction: 'acessar_oi_expert'
    },
    link: 'https://bit.ly/oi_sva7'
  },
  {
    id: 'oi-place-ad',
    title: 'Hoje tem cupom para ficar conectado!',
    paragraph: '20% de desconto usando o cupom MESH20 no Roteador Wi-Fi Mesh COVR 1102 da D-Link no Oi Place ' +
      'para potencializar e ampliar a cobertura Wi-Fi dentro da sua casa.',
    icon: 'desconto',
    creationDate: 1614250800000,
    expirationDate: 1633057199000,
    unread: true,
    products: [ProductCodeEnum.FIBRA, ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.FIXO, ProductCodeEnum.TVDTH],
    button: {
      text: 'Compre agora',
      gaAction: 'acessar_oferta_mesh_oi_place'
    },
    link: 'https://www.oiplace.com.br/d-link/produto/' +
      'covr-1102-sistema-mesh-wi-fi-kit-x2-ac-1200mbps?utm_source=tecnicovirtual&utm_medium=alertas&utm_campaign=ofertamesh'
  },
  {
    id: 'agendar-devolucao-aparelho',
    title: 'Agende a devolução do aparelho Oi Fibra',
    paragraph: 'Se você cancelou o seu plano Oi Fibra, selecione a melhor data para a devolução do seu decodificador ou modem.',
    icon: 'icone_equipamento_notificacoes',
    creationDate: 1622480400000,
    unread: true,
    products: [ProductCodeEnum.FIBRA],
    button: {
      text: 'Agendar devolução',
      gaAction: 'agendar_devolucao_aparelho'
    },
    link: 'https://www.oi.com.br/minha-oi/contato/coleta-aparelhos/?utm_source=tecnicovirtual&utm_medium=banner&utm_campaign=moi-coleta-modem-oi-fibra&utm_term=hmd',
  },
];
