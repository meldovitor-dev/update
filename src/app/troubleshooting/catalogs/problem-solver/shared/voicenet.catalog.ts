import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';

const getId = id => CatalogPrefix.VOICENET + id;

export const VOICENET: CatalogModel[] = [
  /*
  * FLUXO INCIAL
  */
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
            call: 'goToConclusionPage',
            params: {
              id: 'voicenet',
            },
          },
        },
      ],
    },
  }
]
