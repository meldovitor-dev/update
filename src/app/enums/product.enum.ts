/* eslint-disable @typescript-eslint/naming-convention */
/**
 * To be used on BE interactions and requests
 */
export enum ProductCodeEnum {
    BANDA_LARGA = 0,
    FIXO = 1,
    TVDTH = 2,
    FIBRA = 3,
    FIBRA_BANDA_LARGA = 30,
    FIBRA_FIXO = 31,
    FIBRA_TV = 32
}

/**
 * To be used on application general, select class and services factory
 */
export enum ProductIdentifierEnum {
    BANDA_LARGA = 'bl',
    FIXO = 'fixo',
    TVDTH = 'tv',
    FIBRA_BANDA_LARGA = 'fibra_bl',
    FIBRA_FIXO = 'fibra_fixo',
    FIBRA_TV = 'fibra_tv'
}
