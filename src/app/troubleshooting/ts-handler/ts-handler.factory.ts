/* eslint-disable @typescript-eslint/naming-convention */
import { TsFixoHandler } from './ts-fixo-handler';
import { TsTvHandler } from './ts-tv-handler';
import { TsBandaLargaHandler } from './ts-banda-larga-handler';
import { TsFibraHandler } from './ts-fibra-handler';
import { TsHandler } from './ts-handler';
import { ProductIdentifierEnum } from './../../enums/product.enum';

export const createTsHandler = (product: ProductIdentifierEnum) => {
    const objs = {
        fibra_bl: TsFibraHandler,
        fibra_fixo: TsFibraHandler,
        fibra_tv:  TsFibraHandler,
        bl: TsBandaLargaHandler,
        tv: TsTvHandler,
        fixo: TsFixoHandler,
    };
    return new (objs[product] || TsHandler)();
};
