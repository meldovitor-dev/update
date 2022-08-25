const getImage = (name: string) =>`assets/images/troubleshooting/unlogged-area/modem-antena/${name}`;
const COMMON_CONTENT = [
  {
    sub: [
      {
        text: 'Acesse o site<br><a class="antena-link" href="http://www.wi-fi.org" target="_blank">http://www.wi-fi.org</a>',
        image: getImage('common1.png'),
      },
      {
        text: 'Selecione o campo de busca localizado no topo direito da página, <b>cole aqui as informações copiadas</b>, ' +
        'e clique no botão "search".',
        image: getImage('common2.svg'),
        paragraph: 'Caso o modelo do seu aparelho não seja localizado, será necessário procurar essa informação direto com o fornecedor'
      },
      {
        text: 'No resultado da busca, <b>clique no ícone/símbolo do certificado</b> que fica localizado no lado esquerdo.',
        image: getImage('common3.png'),
      },
      {
        text: 'Após clicar, iniciará o <b>download</b> de um arquivo (.PDF) para o seu computador.',
        image: getImage('common4.svg'),
        paragraph: 'Obs: o nome deste arquivo vai variar de acordo com o seu dispositivo.'
      },
    ]
  },
  {
    sub: [
      {
        text: 'Abra o arquivo .PDF baixado e vá até o item: "<b>Role</b>" na página 2.',
        image: getImage('common5.png'),
      },
      {
        text: 'Verifique qual informação aparece sobre o seu dispositivo.',
        card: [
          {
            table: [
              ['2.4 GHz', '1', '1']
            ],
            subtitle: 'Esse é um dispositivo compatível <b>apenas</b> com a rede <b>2.4 GHz</b>.',
            paragraph: 'Na rede 2.4 GHz, esse dispositivo tem capacidade máxima de <span class="label-info">36 Mega</span>, limitado ao seu plano contratado. '
          },
          {
            table: [
              ['2.4 GHz', '1', '1'],
              ['5 GHz', '1', '1']
            ],
            subtitle: 'Esse é um dispositivo compatível com as redes <b>2.4 GHz e 5 GHz</b>',
            paragraph: 'Na rede 2.4 GHz, esse dispositivo tem capacidade máxima de <span class="label-info">36 Mega</span>.<br><br>' +
            'Na rede 5 GHz, esse dispositivo tem capacidade máxima de <span class="label-info">260 Mega</span>, limitado ao seu plano contratado.',
          },
          {
            table: [
              ['2.4 GHz', '2', '2']
            ],
            subtitle: 'Esse é um dispositivo compatível <b>apenas</b> com a rede <b>2.4 GHz</b>.',
            paragraph: 'Na rede 2.4 GHz, esse dispositivo tem capacidade máxima de <span class="label-info">72 Mega</span>, limitado ao seu plano contratado.'
          },
          {
            table: [
              ['2.4 GHz', '2', '2'],
              ['5 GHz', '2', '2']
            ],
            subtitle: 'Esse é um dispositivo compatível com as redes <b>2.4 GHz e 5 GHz</b>',
            paragraph: 'Na rede 2.4 GHz, esse dispositivo tem capacidade máxima de <span class="label-info">72 Mega</span>.<br><br>' +
            'Na rede 5 GHz, esse dispositivo tem capacidade máxima de <span class="label-info">520 Mega</span>, limitado ao seu plano contratado.',
          },
        ]
      },
    ]
  }
]

export const ANTENAS_TRIPAS_CONTENT = [
  {
    id: 'windows',
    passos: [
      {
        sub: [
          {
            text: 'Vá até o atalho "Meu computador" pela área de trabalho ou pelo gerenciador de documentos',
            image: getImage('windows1.png'),
          },
          {
            text: 'Clique com o <b>botão direito do mouse</b> sobre o atalho "Meu computador" e em seguida clique em "<b>Gerenciar</b>"',
            image: getImage('windows2.png'),
          },
          {
            text: 'Na janela que se abrirá selecione:"<b>Gerenciador de dispositivos</b>"',
            image: getImage('windows3.png'),
          },
          {
            text: 'E em seguida selecione: "<b>Adaptadores de Rede</b>"',
            image: getImage('windows4.png'),
          },
          {
            text: 'Localize dentre os adaptadores de rede, qual possui descrição como: "<b>Wireless</b>" ou "<b>802.11</b>"',
            image: getImage('windows5.png'),
          },
          {
            text: 'Clique com o botão direito do mouse sobre o adaptador e clique em "<b>Propriedades</b>"',
            image: getImage('windows6.png'),
          },
          {
            text: 'Uma nova janela abrirá. Clique na aba "<b>Detalhes</b>"',
            image: getImage('windows7.png'),
          },
          {
            text: 'Em seguida, clique com o botão direito do mouse sobre o nome do dispositivo e selecione "<b>Copiar</b>"',
            image: getImage('windows8.png'),
          },
        ]
      },
      ...COMMON_CONTENT
    ]
  },
  {
    id: 'samsung',
    passos: [
      {
        sub: [
          {
            text: 'Acesse as <b>configurações</b> do seu celular e ' +
            'Clique no item "<b>Sobre o telefone</b>" ou "<b>Sobre o dispositivo</b>".',
            image: getImage('samsung1.png'),
          },
          {
            text: 'Anote ou copie o "<b>Número do modelo</b>".',
            image: getImage('samsung2.png'),
          }
        ]
      },
      ...COMMON_CONTENT
    ]
  },
  {
    id: 'motorola',
    passos: [
      {
        sub: [
          {
            text: 'Acesse as <b>configurações</b> do seu celular e Clique no item "<b>Sistema</b>"',
            image: getImage('moto1.png'),
          },
          {
            text: 'Clique no item "<b>Sobre o dispositivo</b>".',
            image: getImage('moto2.png'),
          },
          {
            text: 'Anote ou copie o "<b>SKU</b>" ou "<b>Número do modelo</b>".',
            image: getImage('moto3.png'),
          }
        ]
      },
      ...COMMON_CONTENT
    ]
  },
  {
    id: 'xiaomi',
    passos: [
      {
        sub: [
          {
            text: 'Acesse as <b>configurações</b> do seu celular e ' +
            'Clique no item "<b>Sobre o telefone</b>" ou "<b>Sobre o dispositivo</b>".',
            image: getImage('xiaomi1.png'),
          },
          {
            text: 'Anote ou copie o "<b>Número do modelo</b>" ou "<b>Modelo</b>".',
            image: getImage('xiaomi2.png'),
          }
        ]
      },
      ...COMMON_CONTENT
    ]
  }
];

const TRIPA_COLECTION = (tripa) => ANTENAS_TRIPAS_CONTENT.find(el => el.id === tripa);
export { TRIPA_COLECTION };
