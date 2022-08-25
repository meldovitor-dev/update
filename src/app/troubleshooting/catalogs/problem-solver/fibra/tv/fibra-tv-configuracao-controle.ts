import { FIBRA_TV_MANUAL_STB } from "./fibra-tv-manual-stb";
import { CatalogPrefix } from "src/app/enums/catalog.enum";
import { CatalogDTO } from "src/app/troubleshooting/troubleshooting-interface";
import { FIBRA_TV_DEFEITO_NO_CONTROLE } from "./fibra-defeito-no-controle";

const getPage = (catalog, page = 0 ) => catalog + page;
const config = {alert: 'defeito-no-controle'};

const catalogOnline = [
...FIBRA_TV_MANUAL_STB(getPage(CatalogPrefix.DEFEITO_NO_CONTROLE), config),
...FIBRA_TV_DEFEITO_NO_CONTROLE('conclusion'),

];

const catalogOffline = [
...FIBRA_TV_MANUAL_STB(getPage(CatalogPrefix.DEFEITO_NO_CONTROLE), config),
...FIBRA_TV_DEFEITO_NO_CONTROLE('conclusion'),
];

export const DEFEITO_NO_CONTROLE: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.TV_MANUAL_STB)
    },
    default: {
        catalog: catalogOffline,
        initialPage: getPage(CatalogPrefix.TV_MANUAL_STB)
    }
};