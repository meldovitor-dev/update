import { FIBRA_TROCA_DE_CANAL } from './../shared/fibra-troca-canal-catalog';
import { FIBRA_REBOOT_AUTOMATICO } from '../shared/fibra-reboot-automatico-catalog';
import { FIBRA_REBOOT_MANUAL } from '../shared/fibra-reboot-manual-catalog';
import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';

const getPage = (catalog, page= 0) => `${catalog}${page}`;
const config = {alert: 'internet', alertReboot: 'internet-reboot'};
const catalogOnline = [
    ...FIBRA_TROCA_DE_CANAL(getPage(CatalogPrefix.REBOOT_AUTOMATICO)),
    ...FIBRA_REBOOT_AUTOMATICO('conclusion', getPage(CatalogPrefix.REBOOT_MANUAL,1), config),
    ...FIBRA_REBOOT_MANUAL('conclusion', config)
];

const FIBRA_SEM_CONEXAO: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.TROCA_CANAL)
    },
    default: {
        catalog: FIBRA_REBOOT_MANUAL('conclusion'),
        initialPage: getPage(CatalogPrefix.REBOOT_MANUAL)
    }
};

export { FIBRA_SEM_CONEXAO };
