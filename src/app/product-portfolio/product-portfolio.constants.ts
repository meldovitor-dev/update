import { ProductCodeEnum } from 'src/app/enums/product.enum';
import { ProductIdentifierEnum } from '../enums/product.enum';

export const PRODUCT_PORTFOLIO_LIST = [
  {
    displayName: 'Internet',
    icon: 'internet',
    iconClass: 'large-icon',
    gaAction: 'internet',
    open: false,
    technologies: [
      {
        displayName: 'Internet Oi Fibra',
        icon: 'internetFibra',
        subTitle: 'Se você tem internet de Fibra Ótica',
        productCode: ProductCodeEnum.FIBRA,
        identifier: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
      },
      {
        displayName: 'Banda Larga',
        icon: 'internetCobre',
        subTitle: 'Se você tem internet via cabo telefônico',
        productCode: ProductCodeEnum.BANDA_LARGA,
        identifier: ProductIdentifierEnum.BANDA_LARGA,
      },
    ]
  },
  {
    displayName: 'Fixo',
    icon: 'fixo',
    gaAction: 'fixo',
    open: false,
    technologies: [
      {
        displayName: 'Fixo Oi Fibra',
        icon: 'fixoFibra',
        subTitle: 'Se você tem telefone por fibra Ótica',
        productCode: ProductCodeEnum.FIBRA,
        identifier: ProductIdentifierEnum.FIBRA_FIXO,
      },
      {
        displayName: 'Fixo Cobre',
        icon: 'fixoCobre',
        subTitle: 'Se você tem telefone por cabo',
        productCode: ProductCodeEnum.FIXO,
        identifier: ProductIdentifierEnum.FIXO,
      },
    ]
  },
  {
    displayName: 'TV',
    icon: 'tv',
    gaAction: 'tv',
    open: false,
    technologies: [
      {
        displayName: 'TV Oi Fibra',
        icon: 'tvFibra',
        subTitle: 'Se você tem TV por fibra Ótica',
        productCode: ProductCodeEnum.FIBRA,
        identifier: ProductIdentifierEnum.FIBRA_TV,
      },
      {
        displayName: 'TV por Satélite',
        icon: 'tvSatelite',
        subTitle: 'Se você tem Antena externa',
        productCode: ProductCodeEnum.TVDTH,
        identifier: ProductIdentifierEnum.TVDTH,
      },
    ]
  },
];

export const PRIVACY_FOOTER_LABEL = 'Para saber como a Oi trata seus dados pessoais, acesse aqui o ' +
  '<a href="https://www.oi.com.br/portal-de-privacidade" target="_blank">Portal de Privacidade</a>.';
