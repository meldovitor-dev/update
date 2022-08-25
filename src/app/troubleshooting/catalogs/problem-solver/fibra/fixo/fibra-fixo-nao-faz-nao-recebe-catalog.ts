import { FIBRA_FIXO_TROCA_APARELHOS_NAO_FAZ_NAO_RECEBE } from './fibra-fixo-troca-aparelhos-nao-faz-nao-recebe';
import { CatalogPrefix } from './../../../../../enums/catalog.enum';
import { FIBRA_REBOOT_AUTOMATICO } from '../shared/fibra-reboot-automatico-catalog';
import { FIBRA_REBOOT_MANUAL } from '../shared/fibra-reboot-manual-catalog';
import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';
import { FIBRA_FIXO_CABOS_PORTAS } from '../shared/fibra-cabos-portas';

const config = {alert: 'fixo', alertReboot: 'fixo-reboot'};
const getPage = (catalog, page= 0) => `${catalog}${page}`;

const catalogOnline = [
    ...FIBRA_REBOOT_AUTOMATICO(getPage(CatalogPrefix.CABOS_E_PORTAS), getPage(CatalogPrefix.REBOOT_MANUAL, 1), config),
    ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.CABOS_E_PORTAS), config),
    ...FIBRA_FIXO_CABOS_PORTAS(getPage(CatalogPrefix.TROCA_APARELHOS_NAO_FAZ_NAO_RECEBE), config),
    ...FIBRA_FIXO_TROCA_APARELHOS_NAO_FAZ_NAO_RECEBE()
];

const catalogOffline = [
    ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.CABOS_E_PORTAS), config),
    ...FIBRA_FIXO_CABOS_PORTAS(getPage(CatalogPrefix.TROCA_APARELHOS_NAO_FAZ_NAO_RECEBE), config),
    ...FIBRA_FIXO_TROCA_APARELHOS_NAO_FAZ_NAO_RECEBE()
];

export const FIBRA_FIXO_NAO_FAZ_NAO_RECEBE_CHAMADA: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.REBOOT_AUTOMATICO)
    },
    default: {
        catalog: catalogOffline,
        initialPage: getPage(CatalogPrefix.REBOOT_MANUAL)
    }
};
