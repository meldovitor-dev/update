import { ProductCodeEnum } from 'src/app/enums/product.enum';
enum ProductsOiEnum {
  OiPlace = 'oiPlace',
  OiExpert = 'oiExpert'
}

export interface ProductsOiModel {
  id: ProductsOiEnum;
  products: any,
  gaClickApp: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export const OI_PRODUCTS: ProductsOiModel[] = [
  {
    id: ProductsOiEnum.OiPlace,
    products: [ProductCodeEnum.FIBRA, ProductCodeEnum.BANDA_LARGA, ProductCodeEnum.TVDTH, ProductCodeEnum.FIXO],
    gaClickApp: 'acessar_oi_place',
    title: 'Oi Place',
    description: 'No marketplace da Oi, você encontra produtos incríveis pra conectar a casa inteira e ampliar a sua experiência digital.',
    icon: './assets/images/apps/oi_place.png',
    link: ' https://www.oiplace.com.br/?utm_source=apptecnicovirtual&utm_medium=interacoes&utm_campaign=conhecaoiplace',
  },
  {
    id: ProductsOiEnum.OiExpert,
    products: [ProductCodeEnum.FIBRA, ProductCodeEnum.BANDA_LARGA],
    gaClickApp: 'acessar_oi_expert',
    title: 'Oi Expert',
    description: 'Quer descomplicar sua vida digital? O Oi Expert é seu especialista pra te ajudar com problemas de tecnologia sempre que precisar. ' +
      'Com ele, você tem acesso à assistência qualificada 24 horas pra tirar suas dúvidas dos seus computadores, celulares, tablets, Smart TVs e roteadores Wi-Fi Mesh.',
    icon: './assets/images/apps/oiexpert.png',
    link: 'https://bit.ly/oi_sva7',
  }
];

export const getOiProduct = (productCode: ProductCodeEnum) => {
  return OI_PRODUCTS.filter(el => el.products.includes(productCode));
};
