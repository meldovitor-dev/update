/* eslint-disable @typescript-eslint/naming-convention */
export enum AppsOiEnum {
  MinhaOi = 'minhaOi',
  OiMaisEmpresas = 'oiMaisEmpresas',
  OiWifi = 'oiWifi',
  OiPlay = 'oiPlay'
}

export interface AppsOiModel {
  id: AppsOiEnum;
  gaClickApp: string;
  title: string;
  description: string;
  icon: string;
  linkAndroid?: string;
  linkIOS?: string;
}

export const APPS_OI = [
  {
    id: AppsOiEnum.MinhaOi,
    gaClickApp: 'abrir_link_minha_oi',
    title: 'Minha Oi',
    description: 'Acesse sua conta, emita 2ª via, mude de oferta, consulte saldo / benefícios e muito mais.',
    icon: './assets/images/apps/minhaoi.svg',
    linkAndroid: 'market://details?id=br.com.mobicare.minhaoi',
    linkIOS: 'https://itunes.apple.com/br/app/minha-oi/id564319331?mt=8',

  },
  {
    id: AppsOiEnum.OiMaisEmpresas,
    gaClickApp: 'abrir_link_oi_mais_empresas',
    title: 'Oi Mais Empresas',
    description: 'Solicite 2ª via, informe pagamento atrasado, mude de plano e muito mais pra ajudar o seu negócio.',
    icon: './assets/images/apps/oimaisempresas.png',
    linkAndroid: 'market://details?id=br.com.mobicare.minhaoiempresas&hl=pt_BR',
    linkIOS: 'https://itunes.apple.com/br/app/oi-mais-empresas/id1062682517?mt=8',

  },
  {
    id: AppsOiEnum.OiWifi,
    gaClickApp: 'abrir_link_oi_wifi',
    title: 'Oi WiFi',
    description: 'Navegue com a internet sem fio da Oi. São milhões de pontos de acesso em todo o Brasil.',
    icon: './assets/images/apps/oiwifi.svg',
    linkAndroid: 'market://details?id=br.com.mobicare.oiwifi&hl=pt_BR',
    linkIOS: 'https://itunes.apple.com/br/app/oi-wifi/id550441376?mt=8',

  },
  {
    id: AppsOiEnum.OiPlay,
    gaClickApp: 'abrir_link_oi_play',
    title: 'Oi Play',
    description: 'Assista em um único app mais de 30 mil títulos de filmes, séries, esportes, shows e desenhos.',
    icon: './assets/images/apps/oiplay.svg',
    linkAndroid: 'market://details?id=com.smartbox.monetize.whitelabel.marketplace.oiplay&hl=pt-br',
    linkIOS: 'https://itunes.apple.com/br/app/oi-play/id1101468070?l=en&mt=8',

  },
];
