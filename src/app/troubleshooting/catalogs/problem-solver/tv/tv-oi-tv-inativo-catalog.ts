import { CatalogDTO, CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { TV_ENVIA_PULSO } from './envio-pulso-catalog';

const getId = (id) => CatalogPrefix.ENVIO_PULSO + id;

const catalogOffline: CatalogModel[] = [
  {
    id: 0,
    gaPageName: '',
    layout: {
    },
    state: {
      on: [
        {
          name: 'onInit',
          action: {
            call: 'goToConclusionPage'
          }
        }
      ]
    }
  }
];

const TV_OI_TV_INATIVO: CatalogDTO = {
    authenticated: {
        catalog: TV_ENVIA_PULSO,
        initialPage: getId(0)
    },
    default: {
        catalog: catalogOffline,
        initialPage: 0
    }
};

export { TV_OI_TV_INATIVO };
