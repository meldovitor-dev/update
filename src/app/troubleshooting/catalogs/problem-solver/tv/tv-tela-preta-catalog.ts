import { CatalogDTO, CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CABO_COAXIAL } from './cabo-coaxial-catalog';
import { SINTONIZAR_CANAL } from './sintonizar-canal-catalog';

const getPage = (catalogName, page= 0) => `${catalogName}${page}`;
const getId = (id) => CatalogPrefix.TV_TELA_PRETA + id;
const catalog: CatalogModel[] = [
    {
        id: getId(0),
        gaPageName: '',
        layout: {
        },
        state: {
          on: [
            {
              name: 'onInit',
              action: {
                call: 'nav',
                params: {
                  id: getPage(CatalogPrefix.CABO_COAXIAL)
                }
              }
            }
          ],
        },
      },
    ...CABO_COAXIAL(getPage(CatalogPrefix.SINTONIZAR_CANAL)),
    ...SINTONIZAR_CANAL
];

const TV_TELA_PRETA: CatalogDTO = {
    authenticated: {
        catalog,
        initialPage: getId(0)
    },
    default: {
        catalog,
        initialPage: getId(0)
    }
};

export { TV_TELA_PRETA };
