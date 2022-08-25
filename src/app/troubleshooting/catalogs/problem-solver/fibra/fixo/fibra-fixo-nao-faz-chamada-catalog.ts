import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';
import { FIBRA_REBOOT_AUTOMATICO } from '../shared/fibra-reboot-automatico-catalog';
import { FIBRA_REBOOT_MANUAL } from '../shared/fibra-reboot-manual-catalog';
import { FIBRA_FIXO_TROCA_APARELHOS_NAO_FAZ } from './fibra-fixo-troca-aparelhos-nao-faz';

const config = {alert: 'fixo', alertReboot: 'fixo-reboot'};
const getPage = (catalog, page= 0) => `${catalog}${page}`;

const catalogOnline = [
    ...FIBRA_REBOOT_AUTOMATICO(getPage(CatalogPrefix.TROCA_APARELHOS_NAO_FAZ), getPage(CatalogPrefix.REBOOT_MANUAL, 1), config),
    ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.TROCA_APARELHOS_NAO_FAZ), config),
    ...FIBRA_FIXO_TROCA_APARELHOS_NAO_FAZ()
];

const catalogOffline = [
    ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.TROCA_APARELHOS_NAO_FAZ), config),
    ...FIBRA_FIXO_TROCA_APARELHOS_NAO_FAZ()
];

export const FIBRA_FIXO_NAO_FAZ_CHAMADA: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.REBOOT_AUTOMATICO)
    },
    default: {
        catalog: catalogOffline,
        initialPage: getPage(CatalogPrefix.REBOOT_MANUAL)
    }
};
