import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogDTO, CatalogModel } from './../../../../troubleshooting-interface';
import { FIBRA_TV_ISOLAR_STB } from './fibra-tv-isolar-stb';
import { FIBRA_TV_REBOOT_AUTOMATICO_STB } from './fibra-tv-reboot-automatico-stb';
import { FIBRA_TV_REBOOT_MANUAL_STB } from './fibra-tv-reboot-manual-stb';
import { FIBRA_TV_REBOOT_MANUAL_STB_CABOS } from './fibra-tv-cabos.catalog';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { InteractionEnum } from 'src/app/domain/interactions';

const getPage = (catalog, page = 0) => catalog + page;
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

const EXTRA_PAGES: CatalogModel[] = [
  {
    id: 'extraPage-0',
    gaPageName: 'confirmar_imagem_exibida',
    fluxo: 'logo_oi',
    layout: {
      title: 'Verifique se essa imagem está aparecendo na tela.',
      image: getImage('logo-oi.svg'),
      hiddenHeaderBackButton: true,
      buttons: [{
          text: 'Sim, é essa!',
          action: 'nextModule',
          gaAction: 'sim'
        },
        {
          text: 'Não, voltar',
          action: 'previous',
          gaAction: 'nao'
        },
      ],
    },
    state: {
      on: [{
          name: 'nextModule',
          action: {
            call: 'changeModule',
            params: {
              id: getPage(CatalogPrefix.REBOOT_MANUAL_STB_CABOS)
            }
          }
        },
        {
          name: 'previous',
          action: {
            call: 'goToHome'
          }
        }
      ]
    }
  },
  {
    id: 'extraPage-1',
    gaPageName: 'verificando_dispositivos',
    description: 'faz o diagnostico completo',
    layout: {
      hiddenHeaderBackButton: true,
      loading: TimerTypes.RING,
      title: 'Estamos identificando os decodificadores.',
      paragraph: 'Aguarde enquanto o processo é concluído.'
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'callServices',
            params: {
              keepTicket: true,
              interaction: InteractionEnum.fibraDiagnosticoCompleto
            }
          }
        },
        {
          name: InteractionEnum.fibraDiagnosticoCompleto,
          action: {
            call: 'serviceResponse',
            params: {
              timeout: {
                call: 'changeModule',
                params: {
                  id: getPage(CatalogPrefix.REBOOT_MANUAL_STB)
                }
              },
              success: {
                call: 'changeModule',
                params: {
                  id: getPage(CatalogPrefix.ISOLAR_STB)
                }
              },
            }
          }
        }
      ]
    }
  },
];


const catalogoOnline = [
  ...EXTRA_PAGES,
  ...FIBRA_TV_REBOOT_MANUAL_STB_CABOS('extraPage-1'),
  ...FIBRA_TV_ISOLAR_STB(getPage(CatalogPrefix.REBOOT_AUTOMATICO_STB)),
  ...FIBRA_TV_REBOOT_AUTOMATICO_STB(getPage(CatalogPrefix.REBOOT_MANUAL_STB), getPage(CatalogPrefix.REBOOT_MANUAL_STB)),
  ...FIBRA_TV_REBOOT_MANUAL_STB('conclusion'),
];
const catalogoOffline = [
  ...EXTRA_PAGES,
  ...FIBRA_TV_REBOOT_MANUAL_STB_CABOS(getPage(CatalogPrefix.REBOOT_MANUAL_STB)),
  ...FIBRA_TV_REBOOT_MANUAL_STB('conclusion'),
];

export const FIBRA_TV_LOGO_OI: CatalogDTO = {
  authenticated: {
    catalog: catalogoOnline,
    initialPage: 'extraPage-0'
  },
  default: {
    catalog: catalogoOffline,
    initialPage: 'extraPage-0'
  },
}
