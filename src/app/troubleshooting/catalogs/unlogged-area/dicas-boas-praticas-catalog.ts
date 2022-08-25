import { CatalogModel, PageConfigModel } from '../../troubleshooting-interface';

const getImage = (name: string) => `assets/images/troubleshooting/unlogged-area/dicas-boas-praticas/${name}`;
const defaultNavState = (id) => {
  return Object.assign({}, {
    name: 'navigate', action: {
      call: 'nav',
      params: {id},
    },
  });
}

const pageConfig: PageConfigModel = {
  feedback: {
    gaPageName: 'avaliar_dicas',
    title: 'Estas dicas foram úteis?',
    buttons: [
      {
        text: 'Não',
        action: 'goHomeFeedback',
        gaAction: 'nao_util'
      },
      {
        text: 'Sim',
        action: 'goHomeFeedback',
        gaAction: 'util'
      }
    ],
    state:
    {
      name: 'goHomeFeedback',
      action: {
        call: 'navigateToHome'
      }
    }
  }
};

export const DICAS_E_BOAS_PRATICAS: CatalogModel[] = [
  {
    id: 0,
    gaPageName: 'informacao_frequencias_rede',
    fluxo: 'dicas_sinal_wifi',
    pageConfig,
    layout: {
      title: 'O modem de fibra geralmente tem duas redes Wi-Fi: <b>2.4 GHz</b> e <b>5.0 GHz</b>.',
      image: getImage('01_redes.svg'),
      contentTop: true,
      imageCaption: 'Veja a seguir como essas duas redes influenciam na internet.<br><br>'+
      'E confira dicas de como melhorar o sinal Wi-Fi e a conexão.',
      buttons: [
        {
          text: 'Avançar',
          action: 'navigate',
          gaAction: 'proximo_passo',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(1),
      ],
    },
  },
  {
    id: 1,
    gaPageName: 'explicacao_rede_5ghz',//olhar mapa de metricas
    fluxo: 'dicas_sinal_wifi',
    pageConfig,
    layout: {
      title: 'A Rede 5.0 GHz possui <b>maior velocidade de internet</b>.',
      image: getImage('02_rede5.svg'),//ver com o leo
      contentTop: true,
      imageCaption: 'Se você estiver perto do modem, acesse a internet usando a rede 5.0 GHz.<br><br>'+
      'Nesta rede a velocidade da internet é maior e pode alcançar o máximo do plano contratado.<br><br>'+
      'Porém a rede 5.0 GHz não alcança lugares longe do modem.<br><br>'+
      'Nem todos os celulares ou dispositivos com Wi-Fi têm capacidade de acessar a rede 5.0 GHz.',
      buttons: [
        {
          text: 'Avançar',
          action: 'navigate',
          gaAction: 'proximo_passo',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(2),
      ],
    },
  },
  {
    id: 2,
    gaPageName: 'explicacao_rede_24ghz',//olhar mapa de metricas
    fluxo: 'dicas_sinal_wifi',
    pageConfig,
    layout: {
      title: 'A Rede 2.4 GHz possui <b>maior alcance</b>.',
      image: getImage('03_rede24.svg'),//ver com o leo
      contentTop: true,
      imageCaption: 'A rede 2.4 GHz alcança lugares mais longes do modem.<br><br>'+
      'Porém nesta rede a velocidade da internet é menor, e pode não alcançar o máximo de velocidade do plano contratado.<br><br>'+
      'Se você estiver longe do modem, acesse a internet usando a rede 2.4 GHz.<br><br>'+
      'Todos os celulares e dispositivos com Wi-Fi têm capacidade de acessar a rede 2.4 GHz.',
      buttons: [
        {
          text: 'Avançar',
          action: 'navigate',
          gaAction: 'proximo_passo',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on:
        [
          {
            name: 'navigate',
            action: {
              call: 'verifyPlatform',
              params: {
                platform: 'android',
                enable:  { id: 3 },
                disable: { id: 4 },
              },
            },
          }
        ],
    }
  },
  {
    id: 3, //android
    gaPageName: 'verificar_compatibilidade_celular',//olhar mapa de metricas
    layout: {
      contentTop: true,
      title: 'Saiba se o seu celular ou dispositivo acessa a rede 5.0 GHz.',
      image: getImage('04_celular_android.svg'),//falar com o leo
      imageCaption: 'Nem todos os dispositivos são compatíveis com a rede 5.0 GHz.<br><br>'+
      'Você pode verificar se o seu dispositivo tem a capacidade de acessar a rede 5.0 GHz clicando em "<b>Capacidade máxima dos dispositivos</b>" na home do app.',
      buttons: [
        {
          text: 'Avançar',
          action: 'navigate',
          gaAction: 'proximo_passo',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [defaultNavState(5)],
    },
  },
  {
    id: 4,//ios
    gaPageName: 'verificar_compatibilidade_celular',//olhar mapa de metricas
    layout: {
      contentTop: true,
      title: 'Saiba se o seu celular ou dispositivo acessa a rede 5.0 GHz.',
      image: getImage('05_celular_ios.svg'),//falar com o leo
      imageCaption: 'Nem todos os dispositivos são compatíveis com a rede 5.0 GHz.<br><br>'+
      'Você pode verificar se o seu dispositivo é compatível no site "<b>www.tudocelular.com</b>", em "<b>Conectividade</b>", e verifique qual padrão ele se encaixa:<br><br>'+
      '- <b>802.11 a/b/g:</b><br>Acessa somente a rede 2.4 GHz;<br><br>'+
      '- <b>802.11 a/b/g/n:</b><br>Acessa as duas redes 2.4 GHz e 5.0 GHz. (Conecta com 5.0 GHz, mas não alcança a velocidade máxima);<br><br>'+
      '- <b>802.11 a/b/g/n/ac/ax:</b><br>Acessa as duas redes 2.4 GHz e 5.0 GHz',
      buttons: [
        {
          text: 'Avançar',
          action: 'navigate',
          gaAction: 'proximo_passo',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [defaultNavState(5)],
    },
  },
  {
    id: 5,
    gaPageName: 'usar_repetidor_rede_mesh_locais_distantes',
    layout: {
      title: 'Pra locais mais distantes do modem, use um <b>Roteador Mesh que amplifica a internet</b> de forma inteligente</b>.',
      image: getImage('ilustracao3.svg'),
      contentTop: true,
      imageCaption: 'Outra opção menos indicada, é o uso de um repetidor que tenha uma tecnologia mais simples.',
      buttons: [
        {
          text: 'Saiba mais sobre Roteador Mesh',
          gaAction: 'orientacoes_rede_mesh',
          action: 'navigate-roteador',
        },
        {
          text: 'Saiba mais sobre o Repetidor',
          gaAction: 'orientacoes_repetidor',
          action: 'navigate-repetidor',
        },
        {
          text: 'Avançar',
          action: 'proximo',
          gaAction: 'proximo_passo',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'navigate-repetidor',
          action: {
            call: 'nav',
            params: {id: 7},
          },
        },
        {
          name: 'navigate-roteador',
          action: {
            call: 'nav',
            params: {id: 6},
          },
        },
        {
          name: 'proximo',
          action: {
            call: 'nav',
            params: {id: 8},
          },
        },
      ],
    },
  },
  {
    id: 6,
    gaPageName: 'orientacoes_rede_mesh',
    layout: {
      contentTop: true,
      title: 'O <b>Roteador Mesh aumenta o alcance do Wi-Fi</b> e distribui uniformemente a potência do sinal nos ambientes.',
      image: getImage('roteador_mesh.svg'),
      imageCaption: 'O Roteador Mesh cria uma rede inteligente porque automaticamente faz a conexão do seu smartphone/tablet no melhor hotspot (antena do roteador).<br><br>'+
        'Como o Mesh é dualband, as redes de 2.4 GHz e 5.0 GHz terão o mesmo nome.<br><br>' +
        'A tecnologia mesh garante que você esteja sempre conectado ao hotspot com melhor sinal Wi-Fi.<br><br>' +
        'Pra instalar é bem simples. É só seguir as orientações do fabricante.',
      linkShare: {
        link: 'https://www.oiplace.com.br/categorias/casa-inteligente?utm_source=apptecnicovirtual&utm_medium=interacoes&utm_campaign=maisroteadoresmesh',
        label: 'Clique aqui e confira as ofertas de roteadores Mesh no Oi Place!',
        gaAction: 'acessar_oi_place',
      },
      buttons: [
        {
          text: 'Ok, entendi!',
          gaAction: 'entendi',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(8)
      ],
    },
  },
  {
    id: 7,
    gaPageName: 'orientacoes_repetidor_sinal',
    layout: {
      contentTop: true,
      title: 'O <b>Repetidor replica o sinal Wi-Fi</b>, aumentando a área de alcance Wi-Fi.',
      image: getImage('repetidor.svg'),
      imageCaption: 'Nem todos os Repetidores estão preparados para conectar na frequência 5.0 GHz, limitando um pouco a velocidade da navegação.<br><br>'+
        'Os repetidores mais modernos funcionam tanto na frequência 5.0 GHz quanto na 2.4 GHz. Verifique os limites de velocidade do repetidor.<br><br>'+
        'Pra instalar é bem simples. É só seguir as orientações do fabricante.',
      linkShare: {
        link: 'https://www.oiplace.com.br/categorias/casa-inteligente?utm_source=apptecnicovirtual&utm_medium=interacoes&utm_campaign=maisroteadores',
        label: 'Clique aqui e confira as ofertas de repetidores no Oi Place!',
        gaAction: 'acessar_oi_place',
      },
      buttons: [
        {
          text: 'Ok, entendi!',
          gaAction: 'entendi',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(8)
      ],
    },
  },
  {
    id: 8,
    gaPageName: 'interferencia_paredes_espelhos_aquarios',
    layout: {
      title: 'Paredes, espelhos e aquários interferem na força do sinal.',
      image: getImage('ilustracao4.svg'),
      imageCaption: 'Além disso, dispositivos eletrônicos que geram sinal de rádio também podem interferir na conexão.',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(9)
      ],
    },
  },
  {
    id: 9,
    gaPageName: 'interferencia_capas_metalizadas',
    layout: {
      title: 'Capas de celular com efeitos metalizados também reduzem a recepção do Wi-Fi.',
      image: getImage('10_capa_celular.svg'),
      // tslint:disable-next-line: max-line-length
      imageCaption: 'Evite usar capas com efeitos metalizados.<br>Ao fazer testes de velocidade retire a capa do celular.',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(10)
      ],
    },
  },
  {
    id: 10,
    gaPageName: 'aproximar_equipamentos_modem',
    layout: {
      title: 'Use os equipamentos próximos ao modem.',
      image: getImage('ilustracao5.svg'),
      // tslint:disable-next-line: max-line-length
      imageCaption: 'A distância pode interfirir na intensidade e na velocidade do Wi-Fi.<br/><br/>Por isso quanto mais perto do modem você estiver do seu dispostivo, melhor será a conexão e velocidade da internet.',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(11)
      ],
    },
  },
  {
    id: 11,
    gaPageName: 'reiniciar_equipamentos',
    layout: {
      title: 'Reiniciar seus equipamentos pode ajudar a reestabelecer a conectividade do Wi-Fi.',
      image: getImage('13_reiniciar_celular.svg'),
      // tslint:disable-next-line: max-line-length
      imageCaption: 'Reiniciar o celular, notebook e computador pode ajudar a reestabelecer a conexão do Wi-Fi com melhor conectividade.',
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(12)
      ],
    },
  },
  {
    id: 12,
    gaPageName: 'baixar_arquivos_assistir_videos',
    layout: {
      title: 'Baixar muitos arquivos ao mesmo tempo e assistir vídeos, podem consumir a capacidade da internet.',
      image: getImage('ilustracao6.svg'),
      buttons: [
        {
          text: 'Avançar',
          gaAction: 'proximo_passo',
          action: 'navigate',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        defaultNavState(13)
      ],
    },
  },
  {
    id: 13,
    gaPageName: 'manter_modem_posicao_instalacao',
    layout: {
      title: 'Evite mexer no modem e no cabo de fibra ótica.',
      image: getImage('12_cabo_fibra.svg'),
      // tslint:disable-next-line: max-line-length
      imageCaption: 'Tenha cuidado ao limpar o modem e o cabo de fibra ótica, pois este é frágil.<br><br>'+
      'Mantenha o modem na posição que o técnico instalou. Não é recomendável mudá-lo de posição.',
      buttons: [
        {
          text: 'Voltar pro início',
          gaAction: 'voltar_inicio',
          action: 'finalizar',
          customClasses: 'button-gray',
        },
      ],
    },
    state: {
      on: [
        {
          name: 'finalizar',
          action: {
            call: 'goToHome',
          }
        }
      ]
    }
  },
];
