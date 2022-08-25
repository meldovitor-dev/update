import { CatalogPrefix } from './../../../../../enums/catalog.enum';
import { getAlert } from '../../shared/alert-catalog';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';

const getId = (id) => CatalogPrefix.TV_VERIFICAR_CABOS_ETHERNET + id;
const alert = getAlert('tv-manual-stb');
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

export const FIBRA_TV_VERIFICAR_CABOS_ETHERNET = (): CatalogModel[] => JSON.parse(JSON.stringify([
    {
        id: getId(0),
        gaPageName: 'verificar_cabos_ethernet',
        fluxo: 'cabos_ethernet',
        layout: {
            title: 'Verifique se os cabos Ethernet do modem estão bem conectados.',
            image: getImage('ts_tv_fibra_8.png'),
            buttons: [
                {
                    text: 'Feito!',
                    gaAction: 'feito',
                    action: 'navigate'
                },
            ],
            alert
        },
        state: {
            on: [
                {
                    name: 'navigate',
                    action: {
                        call: 'openPopup'
                    }
                },
                {
                    name: 'nao',
                    action: {
                        call: 'goToConclusionPage',
                    },
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToSuccessPage',
                    },
                }
            ],
        },
    },
]));
