import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { getAlert } from '../shared/alert-catalog';

const getImage = (name: string) =>
  `assets/images/troubleshooting/problem-solver/fixo/${name}`;
const getId = id => CatalogPrefix.CABO_RJ11 + id;

export const CABO_RJ11 = (negativeId, moduleId = negativeId): CatalogModel[] =>
  JSON.parse(
    JSON.stringify([
      {
        id: getId(0),
        gaPageName: 'inverter_pontas_cabo_rj11',
        fluxo: 'inverter_pontas_cabo_rj11',
        layout: {
          title: 'Inverta as pontas do cabo RJ11.',
          image: getImage('inverter_cabos1.svg'),
          imageCaption:
            'Troque a ponta que está conectada ao telefone pela ponta que está na tomada.',
          buttons: [
            {
              text: 'Feito!',
              action: 'feito',
              gaAction: 'feito'
            }
          ],
          alert: getAlert('fixo','voltou_invertendo_as_pontas')
        },
        state: {
          on: [
            {
              name: 'feito',
              action: {
                call: 'openPopup'
              }
            },
            {
              name: 'nao',
              action: {
                call: 'nav',
                params: {
                  id: getId(1)
                }
              }
            },
            {
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(2)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(1),
        gaPageName: 'trocar_cabo_rj11',
        fluxo: 'inverter_pontas_cabo_rj11',
        layout: {
          title: 'Troque o cabo RJ11.',
          image: getImage('inverter_cabos2.svg'),
          imageCaption: 'Verifique se você possui outro cabo RJ11.',
          buttons: [
            {
              text: 'Não possuo',
              action: 'nao-tem',
              gaAction: 'sem_outro_cabo'
            },
            {
              text: 'Feito!',
              action: 'feito',
              gaAction: 'feito'
            }
          ],
          alert: getAlert('fixo','voltou_trocando_cabo')
        },
        state: {
          on: [
            {
              name: 'feito',
              action: {
                call: 'openPopup'
              }
            },
            {
              name: 'nao',
              action: {
                call: 'changeModule',
                params: {
                  id: moduleId
                }
              }
            },
            {
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(2)
                }
              }
            },
            {
              name: 'nao-tem',
              action: {
                call: 'changeModule',
                params: {
                  id: moduleId
                }
              }
            }
          ]
        }
      },
      {
        id: getId(2),
        fluxo: 'filtro_linha_protetor_surto',
        gaPageName: 'verificar_protetor_surto_filtro_linha',
        layout: {
          title:
            'Você tem protetor de surto ou Filtro de linha conectados ao seu telefone?',
          image: getImage('protetor_surto_filtro.svg'),
          buttons: [
            {
              text: 'Não tenho',
              action: 'nao',
              gaAction: 'nao_possui'
            },
            {
              text: 'Tenho',
              action: 'sim',
              gaAction: 'possui'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'nao',
              action: {
                call: 'goToSuccessPage'
              }
            },
            {
              name: 'sim',
              action: {
                call: 'nav',
                params: {
                  id: getId(3)
                }
              }
            }
          ]
        }
      },
      {
        id: getId(3),
        gaPageName: 'verificar_equipamento_problema',
        fluxo: 'filtro_linha_protetor_surto',
        layout: {
          title:
            'Vamos agora verificar qual dos equipamentos está com problema.',
          paragraph:
            'Vamos testar um a um para verificar qual está com problema.',
          buttons: [
            {
              text: 'Vamos lá!',
              action: 'navigate',
              gaAction: 'comecar'
            }
          ]
        },
        state: {
          on: [
            {
              name: 'navigate',
              action: {
                call: 'nav',
                params: {
                  id: negativeId
                }
              }
            }
          ]
        }
      }
    ])
  );
