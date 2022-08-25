import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { getAlert } from '../../shared/alert-catalog';

const getId = (id) => CatalogPrefix.DEFEITO_NO_CONTROLE + id;
const alert = getAlert('defeito-no-controle') ;
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

export const FIBRA_TV_DEFEITO_NO_CONTROLE = (negativeId): CatalogModel[] => JSON.parse(JSON.stringify([

    {
        id: getId(0),
        gaPageName: 'aviso_reinicio_controle_remoto',
        fluxo: 'reinicio_controle_remoto',
        layout: {
            title: 'Neste caso, vamos reiniciar o seu controle.',
            // tslint:disable-next-line: max-line-length
            paragraph: 'Vamos reiniciá-lo para o modo de fábrica. Pra iniciar, você vai precisar seguir algumas etapas.',
            buttons: [
                {
                  text: 'Iniciar',
                  action: 'navigate',
                  gaAction: 'comecar'
                }
              ],
        },
        state: {
            on: [
              {
                name: 'navigate',
                action: {
                  call: 'nav',
                  params: {
                    id: getId(1),
                  }
                }
              }
            ]
        }
    },
    {
        id: getId(1),
        gaPageName: 'pressionar_botoes_controle',
        layout: {
            contentTop: true,
            title: 'Pressione o botão STB, e logo em seguida o botão OK junto.<br/>Aguarde 5 segundos e Libere os botões.',
            paragraph: 'As luzes STB, TV, DVD e AUX vão piscar duas vezes, simultâneamente.',
            image: getImage('botao_stb.svg'),
            hiddenHeaderBackButton: true,
            buttons: [
                {
                  text: 'Próximo',
                  action: 'navigate',
                  gaAction: 'proximo_passo'
                }
              ],
        },
        state: {
            on: [
              {
                name: 'navigate',
                action: {
                  call: 'nav',
                  params: {
                    id: getId(2),
                  }
                }
              }
            ]
        }
    },
    {
        id: getId(2),
        gaPageName: 'digitar_900_controle',
        layout: {
            contentTop: true,
            title: 'Agora digite 900 no teclado numérico após os botões STB, TV, DVD e AUX piscarem duas vezes.',
            paragraph: 'O botão STB vai piscar quatro vezes.<br>Pronto! Seu controle foi reiniciado. <br>' +
            'Caso não pisque refaça todo o processo.',
            image: getImage('digite900.svg'),
            alert: getAlert('defeito-no-controle', 'controle_voltou_reiniciando'),
            buttons: [
                {
                  text: 'Voltar',
                  action: 'previous',
                  gaAction: 'botao_voltar'
                },
                {
                  text: 'Finalizar',
                  action: 'navigate',
                  gaAction: 'feito'
                }
              ],
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
                    }
                },
                {
                    name: 'sim',
                    action: {
                        call: 'goToSuccessPage'
                    }
                },
                {
                  name: 'previous',
                  action: {
                    call: 'nav',
                    params: {
                      id: getId(1)
                    }
                  }
                }
            ],
        }
    }
])
);
