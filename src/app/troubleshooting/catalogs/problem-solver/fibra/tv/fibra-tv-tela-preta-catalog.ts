import { FIBRA_TV_REBOOT_MANUAL_STB_CABOS } from './fibra-tv-cabos.catalog';
import { FIBRA_TV_MANUAL_TELA_PRETA } from './fibra-tv-manual-tela-preta';
import { FIBRA_TV_REBOOT_MANUAL_STB } from './fibra-tv-reboot-manual-stb';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { FIBRA_TV_REBOOT_AUTOMATICO_STB } from './fibra-tv-reboot-automatico-stb';
import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';

const getPage = (catalog, page= 0) => catalog + page;
const config = {alert: 'tv-tela-preta'};

const catalogOnline = [
  ...FIBRA_TV_MANUAL_TELA_PRETA(getPage(CatalogPrefix.REBOOT_AUTOMATICO_STB)),
  ...FIBRA_TV_REBOOT_AUTOMATICO_STB('conclusion', getPage(CatalogPrefix.REBOOT_MANUAL_STB), config),
  ...FIBRA_TV_REBOOT_MANUAL_STB(getPage(CatalogPrefix.REBOOT_MANUAL_STB_CABOS, 1), config),
  ...FIBRA_TV_REBOOT_MANUAL_STB_CABOS('conclusion', config)
];

const catalogOffline = [
  ...FIBRA_TV_MANUAL_TELA_PRETA(getPage(CatalogPrefix.REBOOT_MANUAL_STB)),
  ...FIBRA_TV_REBOOT_MANUAL_STB(getPage(CatalogPrefix.REBOOT_MANUAL_STB_CABOS, 1), config),
  ...FIBRA_TV_REBOOT_MANUAL_STB_CABOS('conclusion', config),
];

export const FIBRA_TELA_PRETA: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.TV_TELA_PRETA)
    },
    default: {
        catalog: catalogOffline,
        initialPage: getPage(CatalogPrefix.TV_TELA_PRETA)
    }
};
