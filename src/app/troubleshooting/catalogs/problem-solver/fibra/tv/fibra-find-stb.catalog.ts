import { CatalogModel } from 'src/app/troubleshooting/troubleshooting-interface';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';

const getId = id => CatalogPrefix.FIND_STB + id;
const getImage = (img: string) => `assets/images/troubleshooting/problem-solver/fibra/tv/${img}`;

export const FIBRA_FIND_STB =  JSON.parse(JSON.stringify([
  {
    id: getId(0),
    gaPageName: 'selecionar_menu_configuracoes',
    title:
      'Selecione "MENU" no controle remoto e depois "Configurações" na TV.',
    image: getImage('menu_config.png'),
    buttons: [
      {
        text: 'Próximo',
        action: {
          call: 'nav',
          params: {
            id: getId(1)
          }
        },
        gaAction: 'proximo_passo'
      },
      {
        text: 'Não consegui acessar',
        action: {
          call: 'nav',
          params: {
            id: getId(3)
          }
        },
        gaAction: 'dificuldade_acessar'
      }
    ]
  },
  {
    id: getId(1),
    gaPageName: 'selecionar_informacao_sistema',
    title: 'Agora, selecione Informações do Sistema',
    image: getImage('info_sistema.png'),
    buttons: [
      {
        text: 'Próximo',
        action: {
          call: 'nav',
          params: {
            id: getId(2)
          }
        },
        gaAction: 'proximo_passo'
      }
    ]
  },
  {
    id: getId(2),
    gaPageName: 'anotar_numero_serie',
    title: 'Anote o "Número de série da Set-Top Box".',
    paragraph:
      'Realize esta ação e anote o número do decodificador com problema conectado à TV',
    image: getImage('serie_stb.png'),
    buttons: [
      {
        text: 'Encontrei o número!',
        action: {
          call: 'closeRender',
          params: {
            success: true
          }
        },
        gaAction: 'localizado'
      },
      {
        text: 'Não encontrei',
        action: {
          call: 'nav',
          params: {
            id: getId(3)
          }
        },
        gaAction: 'nao_localizado'
      }
    ]
  },
  {
    id: getId(3),
    gaPageName: 'localizar_numero_serie',
    contentTop: true,
    title:
      'O número de série pode ser encontrado na parte de baixo do decodificador.',
    paragraph: 'Este está escrito neste formato: "S/N: 123456789"',
    image: getImage('numero_serie.png'),
    buttons: [
      {
        text: 'Encontrei o número!',
        action: {
          call: 'closeRender',
          params: {
            success: true
          }
        },
        gaAction: 'numero_serie_encontrado'
      },
      {
        text: 'Não encontrei',
        action: {
          call: 'closeRender',
          params: {
            success: false
          }
        },
        gaAction: 'numero_serie_nao_encontrado'
      }
    ]
  },
]))
