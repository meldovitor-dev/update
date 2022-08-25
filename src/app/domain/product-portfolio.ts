import { createProduct, Product } from './product';
import { ProductIdentifierEnum } from '../enums/product.enum';

export const PRODUCT_PORTFOLIO = [
    createProduct(ProductIdentifierEnum.BANDA_LARGA),
    createProduct(ProductIdentifierEnum.FIXO),
    createProduct(ProductIdentifierEnum.TVDTH),
    createProduct(ProductIdentifierEnum.FIBRA_BANDA_LARGA),
    createProduct(ProductIdentifierEnum.FIBRA_FIXO),
    createProduct(ProductIdentifierEnum.FIBRA_TV),
];

export const getProductByIdentifier = (id: ProductIdentifierEnum): Product => PRODUCT_PORTFOLIO.find(el => el.identifier === id);
