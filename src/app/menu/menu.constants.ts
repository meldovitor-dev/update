import { ProductIdentifierEnum, ProductCodeEnum } from './../enums/product.enum';
export const FIBRA_PRODUCTS = [
  {
    displayName: 'Internet',
    icon: 'internet',
    identifier: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
    productCode: ProductCodeEnum.FIBRA_BANDA_LARGA,
    isFibra: true
  },
  {
    displayName: 'TV Fibra',
    icon: 'tv',
    identifier: ProductIdentifierEnum.FIBRA_TV,
    productCode: ProductCodeEnum.FIBRA_TV,
    isFibra: true
  },
  {
    displayName: 'Fixo',
    icon: 'fixo',
    identifier: ProductIdentifierEnum.FIBRA_FIXO,
    productCode: ProductCodeEnum.FIBRA_FIXO,
    isFibra: true
  }
];

export const PRODUCT_MENU_LIST = [
  {
    displayName: 'Banda Larga',
    identifier: ProductIdentifierEnum.BANDA_LARGA
  },
  {
    displayName: 'Fixo',
    identifier: ProductIdentifierEnum.FIXO
  },
  {
    displayName: 'TV por satélite',
    identifier: ProductIdentifierEnum.TVDTH
  },
  {
    displayName: 'Fibra',
    productCode: ProductCodeEnum.FIBRA,
  }
];
