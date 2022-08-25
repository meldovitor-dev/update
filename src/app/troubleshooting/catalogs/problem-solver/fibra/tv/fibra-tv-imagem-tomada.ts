import { FIBRA_TV_REBOOT_MANUAL_STB_CABOS } from './fibra-tv-cabos.catalog';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogDTO, CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { FIBRA_TV_IMAGEM_TOMADA } from "./fibra-tv-imagem-tomada-catalog";
import { FIBRA_TV_REBOOT_MANUAL_STB } from './fibra-tv-reboot-manual-stb';

const getPage = (catalog, page = 0) => catalog + page;
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

const EXTRA_PAGES: CatalogModel[] = [{
  id: 'extraPage-0',
  gaPageName: 'confirmar_imagem_exibida',
  fluxo: 'imagem_tomada',
  layout: {
    title: 'Verifique se essa imagem está aparecendo na tela.',
    image: getImage('imagem-tomada.svg'),
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
  gaPageName: 'aviso_executar_todos_decodificadores',
  fluxo: 'imagem_tomada',
  layout: {
    title: 'Lembre-se: Você vai precisar fazer a próxima ação em cada decodificador com problema, tudo bem?',
    hiddenHeaderBackButton: true,
    buttons: [{
      text: 'Iniciar',
      action: 'nextModule',
      gaAction: 'comecar'
    }],
  },
  state: {
    on: [{
      name: 'nextModule',
      action: {
        call: 'changeModule',
        params: {
          id: getPage(CatalogPrefix.REBOOT_MANUAL_STB, 1)
        }
      }
    }]
  }
}];

const catalog = [
  ...EXTRA_PAGES,
  ...FIBRA_TV_REBOOT_MANUAL_STB_CABOS('extraPage-1'),
  ...FIBRA_TV_REBOOT_MANUAL_STB('conclusion'),
];

export const TV_IMAGEM_TOMADA: CatalogDTO = {
  authenticated: {
    catalog,
    initialPage: 'extraPage-0'
  },
  default: {
    catalog,
    initialPage: 'extraPage-0'
  }
}
