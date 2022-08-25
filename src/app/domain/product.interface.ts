import { TecnologyEnum } from '../enums/tecnology.enum';
import { Feature } from './feature';
import { ProductCodeEnum, ProductIdentifierEnum } from '../enums/product.enum';
import { InteractionEnum } from './interactions';
export interface ProductInterface {
    displayName: string;
    productCode: ProductCodeEnum;
    features: Feature[];
    tecnology: TecnologyEnum;
    identifier: ProductIdentifierEnum;
    currentFeature?: Feature;
    homeInteractions?: InteractionEnum[];
    ga: string;
}
