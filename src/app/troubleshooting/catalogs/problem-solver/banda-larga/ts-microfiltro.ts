import { CatalogModel } from '../../../troubleshooting-interface';
import { TimerTypes } from 'src/app/troubleshooting/general.constants';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';


const getId = (id) => CatalogPrefix.TS_MICROFILTRO + id;
const getImage = (img) => `./assets/images/troubleshooting/problem-solver/shared/${img}`;
const TS_MICROFILTRO = (negativeId, config: {alert?: string} = {}): CatalogModel[] => JSON.parse(JSON.stringify([
    {

        id: getId(0),
        gaPageName: 'adicionar_microfiltro',
        layout: {
          title: 'Adicione o microfiltro novamente pra testar',
          image: './assets/images/troubleshooting/problem-solver/shared/microfiltro-02.svg',
          alert: getAlert('ts-cabos-cobre','internet_continua_funcionando_adicionando_microfiltro'),
          buttons: [
            {
              text: 'Feito!',
              action: 'navigate',
              gaAction: 'feito',
            },
          ],
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'openPopup',
              }
            },
            {
              name: 'nao',
              action: {
                call: 'nav',
                params: {
                  id: getId(1),
                }
              }
            },
            {
              name: 'sim',
              action: {
                call: 'goToSuccessPage'
              }
            }
          ]
        }
      },
      {
        id: getId(1),
        gaPageName: 'trocar_microfiltro',
        layout: {
          title: 'Retire seu microfiltro pra usar a internet e troque-o por um novo.',
          image: getImage('decodificador_desligar_tomada.svg'),
          paragraph: 'Não é possível usar o telefone fixo sem o microfiltro, troque-o por um novo. Você encontra o microfiltro em lojas de informática.',
          buttons: [
            {
              text: 'Ok, entendi!',
              action: 'navigate',
              gaAction: 'entendido'
            },
          ],
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'goToHome',
              }
            }
          ]
        }
      },
]));
export { TS_MICROFILTRO };
