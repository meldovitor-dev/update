import { ProductCodeEnum } from './../enums/product.enum';
export interface ProductModel {
    displayName?: string;
    productCode: ProductCodeEnum;
    config: any;
    diagnostic: any;
}
