import { FIBRA_TV_REBOOT_MANUAL_STB_CABOS } from './fibra-tv-cabos.catalog';
import { FIBRA_TV_REBOOT_MANUAL_STB } from './fibra-tv-reboot-manual-stb';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { FIBRA_TV_MANUAL_STB } from './fibra-tv-manual-stb';
import { FIBRA_TV_REBOOT_AUTOMATICO_STB } from './fibra-tv-reboot-automatico-stb';
import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';
import { FIBRA_TV_VERIFICAR_CABOS_ETHERNET } from './fibra-tv-verificar-cabos-ethernet';
import { FIBRA_REBOOT_AUTOMATICO } from '../shared/fibra-reboot-automatico-catalog';
import { FIBRA_REBOOT_MANUAL } from '../shared/fibra-reboot-manual-catalog';
import { FIBRA_TV_ISOLAR_STB } from './fibra-tv-isolar-stb';

const getPage = (catalog, page= 0) => catalog + page;
const config = {alert: 'tv', alertReboot: 'tv'};

const catalogOnline = [
    ...FIBRA_TV_MANUAL_STB(getPage(CatalogPrefix.REBOOT_AUTOMATICO_STB)),
    ...FIBRA_TV_REBOOT_AUTOMATICO_STB(getPage(CatalogPrefix.ISOLAR_STB), getPage(CatalogPrefix.REBOOT_MANUAL_STB)),
    ...FIBRA_TV_REBOOT_MANUAL_STB(getPage(CatalogPrefix.REBOOT_MANUAL_STB_CABOS, 1)),
    ...FIBRA_TV_REBOOT_MANUAL_STB_CABOS(getPage(CatalogPrefix.ISOLAR_STB)),
    ...FIBRA_TV_ISOLAR_STB(getPage(CatalogPrefix.REBOOT_AUTOMATICO)),
    ...FIBRA_REBOOT_AUTOMATICO('conclusion', getPage(CatalogPrefix.REBOOT_MANUAL, 1), config),
    ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.TV_VERIFICAR_CABOS_ETHERNET), config),
    ...FIBRA_TV_VERIFICAR_CABOS_ETHERNET()
];

const catalogOffline = [
    ...FIBRA_TV_MANUAL_STB(getPage(CatalogPrefix.REBOOT_MANUAL_STB)),
    ...FIBRA_TV_REBOOT_MANUAL_STB(getPage(CatalogPrefix.REBOOT_MANUAL_STB_CABOS, 1)),
    ...FIBRA_TV_REBOOT_MANUAL_STB_CABOS(getPage(CatalogPrefix.REBOOT_MANUAL)),
    ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.TV_VERIFICAR_CABOS_ETHERNET), config),
    ...FIBRA_TV_VERIFICAR_CABOS_ETHERNET()
];

export const FIBRA_PROBLEMAS_TV: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.TV_MANUAL_STB)
    },
    default: {
        catalog: catalogOffline,
        initialPage: getPage(CatalogPrefix.TV_MANUAL_STB)
    }
};
