import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogDTO } from 'src/app/troubleshooting/troubleshooting-interface';
import { FIBRA_FIXO_CABOS_PORTAS } from './../shared/fibra-cabos-portas';
import { FIBRA_REBOOT_AUTOMATICO } from '../shared/fibra-reboot-automatico-catalog';
import { FIBRA_REBOOT_MANUAL } from '../shared/fibra-reboot-manual-catalog';
import { FIBRA_FIXO_VOLUME_RUIDO } from './fibra-fixo-volume-ruido';
import { FIBRA_FIXO_TROCA_APARELHOS } from '../shared/fibra-troca-aparelhos';

const config = {alert: 'fixo', alertReboot: 'fixo-reboot'};
const getPage = (catalog, page= 0) => `${catalog}${page}`;

const catalogOnline = [
    ...FIBRA_REBOOT_AUTOMATICO(getPage(CatalogPrefix.VOLUME_RUIDO), getPage(CatalogPrefix.REBOOT_MANUAL, 1), config),
    ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.VOLUME_RUIDO), config),
    ...FIBRA_FIXO_VOLUME_RUIDO(getPage(CatalogPrefix.CABOS_E_PORTAS)),
    ...FIBRA_FIXO_CABOS_PORTAS(getPage(CatalogPrefix.TROCA_APARELHOS), config),
    ...FIBRA_FIXO_TROCA_APARELHOS()
];

const catalogOffline = [
    ...FIBRA_REBOOT_MANUAL(getPage(CatalogPrefix.VOLUME_RUIDO), config),
    ...FIBRA_FIXO_VOLUME_RUIDO(getPage(CatalogPrefix.CABOS_E_PORTAS)),
    ...FIBRA_FIXO_CABOS_PORTAS(getPage(CatalogPrefix.TROCA_APARELHOS), config),
    ...FIBRA_FIXO_TROCA_APARELHOS()
];

export const FIBRA_FIXO_COM_RUIDO: CatalogDTO = {
    authenticated: {
        catalog: catalogOnline,
        initialPage: getPage(CatalogPrefix.REBOOT_AUTOMATICO)
    },
    default: {
        catalog: catalogOffline,
        initialPage: getPage(CatalogPrefix.REBOOT_MANUAL)
    }
};
