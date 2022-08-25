import { ConclusionModel } from './../troubleshooting-interface';
import { AlertCalogModel } from '../troubleshooting-interface';

const conclusionCatalog: ConclusionModel[] = [
  {
    id: 'aparelho_problema',
    title: 'Um dos aparelhos pode estar com problemas.',
    paragraph: 'O defeito pode estar no Fax, Bina ou extensão que você desconectou.<br>' +
    'É preciso consertá-lo ou trocar por um aparelho novo.',
    gaPageName: 'nao_sucesso_problema_aparelhos',
    buttons: [{
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'aparelho-telefonico',
    title: 'O problema pode estar no seu aparelho telefônico.',
    gaPageName: 'nao_sucesso_problema_aparelho_telefonico',
    buttons: [{
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'troca-senha',
    title: 'Não foi possível realizar a troca da senha por aqui.',
    paragraph: 'Você pode ligar pra gente se quiser alterar a senha. A ligação é gratuita.',
    gaPageName: 'erro_trocando_senha',
    buttons: [{
      text: 'Ligar',
      action: 'goToCallCenter',
      gaAction: 'ligar',
    },
    {
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'troca-senha-sem-ligar',
    title: 'Não foi possível realizar a troca da senha por aqui.',
    paragraph: 'Você pode ligar pra gente se quiser alterar a senha. A ligação é gratuita.',
    gaPageName: 'erro_trocando_senha',
    buttons: [
    {
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'troca-senha-timeout',
    title: 'Verifique se a senha foi alterada com sucesso.',
    paragraph: 'Não conseguimos confirmar se a operação foi efetuada.<br>' +
    'Tente atualizar os seus dispositivos com a nova senha pra conectar.',
    gaPageName: 'confirmar_troca_senha',
    buttons: [{
      text: 'Deu certo!',
      action: 'goToSuccessPage',
      gaAction: 'senha_trocada',
    },
    {
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'troca-nome',
    title: 'Não foi possível trocar o nome.',
    paragraph: 'Você pode ligar pra gente se quiser alterar o nome. A ligação é gratuita.',
    gaPageName: 'nao_sucesso_trocando_nome',
    buttons: [{
      text: 'Ligar',
      action: 'goToCallCenter',
      gaAction: 'ligar',
    },
    {
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'troca-nome-sem-tel',
    title: 'Não foi possível trocar o nome.',
    paragraph: 'Você pode ligar pra gente se quiser alterar o nome. A ligação é gratuita.',
    gaPageName: 'nao_sucesso_trocando_nome',
    buttons: [
    {
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'troca-nome-timeout',
    title: 'Verifique se o nome da rede foi alterado com sucesso.',
    paragraph: 'Não conseguimos identificar se a ação foi efetuada.<br>' +
    'Verifique se houve sucesso na troca de nome. Caso contrário, tente novamente mais tarde.',
    gaPageName: 'nao_sucesso_comunicacao_perdida',
    buttons: [{
      text: 'Deu certo!',
      action: 'goToSuccessPage',
      gaAction: 'funcionou',
    },
    {
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'cabo-danificado',
    title: 'O cabo de energia está com problema.',
    paragraph: 'Você vai precisar falar com um de nossos especialistas.<br>A ligação é gratuita.',
    gaPageName: 'nao_sucesso_cabo_energia',
    buttons: [{
      text: 'Ligar',
      action: 'goToCallCenter',
      gaAction: 'ligar',
    },
    {
      text: 'Voltar pro início',
      action: 'goToHome',
      gaAction: 'voltar_inicio',
    }]
  },
  {
    id: 'modem-ruim',
    title: 'O modem está com problema.',
    paragraph: 'Você vai precisar falar com um de nossos especialistas.<br>A ligação é gratuita.',
    gaPageName: 'nao_sucesso_modem_problema',
    buttons: [
      {
        text: 'Ligar',
        action: 'goToCallCenter',
        gaAction: 'ligar',
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'outro-telefone-defeito',
    title: 'O outro telefone pode estar com defeito.',
    paragraph: 'Possíveis causas:<br>' +
    '- Aparelho pode estar com falha<br>' +
    '- Cabo de energia pode estar danificado<br>' +
    '- Bateria do telefone não funciona mais.',
    gaPageName: 'nao_sucesso_problema_outro_aparelho_telefonico',
    buttons: [{
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'telefone-defeito',
    title: 'Seu telefone pode estar com defeito.',
    paragraph: 'Possíveis causas:<br>' +
    '- Aparelho pode estar com falha<br>' +
    '- Cabo de energia pode estar danificado<br>' +
    '- Bateria do telefone não funciona mais.',
    gaPageName: 'nao_sucesso_problema_aparelho_telefonico',
    buttons: [{
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'entre-contato',
    title: 'Entre em contato com o atendimento',
    paragraph: 'Ligue para um dos nossos especialistas para concluir o atendimento.<br>'+
    'A ligação é gratuita.',
    gaPageName: 'nao_sucesso',
    buttons: [{
        text: 'Ligar',
        gaAction: 'finalizar',
        action: 'goToCallCenter'
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'entre-contato-senha',
    title: 'Entre em contato com o nosso atendimento.',
    paragraph: ' Você pode ligar pra gente se quiser alterar a senha.<br>'+
    'A ligação é gratuita.',
    gaPageName: 'nao_sucesso',
    buttons: [{
        text: 'Ligar',
        gaAction: 'finalizar',
        action: 'goToCallCenter'
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },

  {
    id: 'destino-ligacao',
    title: 'O problema deve estar no destino da ligação.',
    paragraph: 'Tente fazer esta chamada novamente mais tarde.',
    gaPageName: 'nao_sucesso_problema_destino_ligacao',
    buttons: [{
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'telefone-anterior',
    title: 'O problema deve estar no seu telefone anterior.',
    paragraph: 'Tente trocar o aparelho por um novo ou solicitar a visita de um técnico particular para efetuar o conserto.',
    gaPageName: 'nao_sucesso_defeito_aparelho_anterior',
    buttons: [{
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'internet-lenta-dispositivos-conectados-erro',
    title: 'Não foi possível encontrar as suas redes.',
    paragraph: 'O próximo passo seria verificar os dispositivos conectados ao Wi-Fi.<br>' +
    'Você pode realizar este passo na sua tela inicial.',
    gaPageName: 'nao_sucesso',
    buttons: [{
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'nao-podemos-ajudar',
    title: 'Não podemos te ajudar por aqui.',
    paragraph: 'Pra concluirmos a sua solicitação, ligue pro nosso atendimento.<br>A ligação é gratuita.',
    gaPageName: 'nao_sucesso',
    buttons: [
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }
    ]
  },
  {
    id: 'modem-sem-conexao',
    title: 'Não conseguimos comunicação com o modem.',
    paragraph: 'Clique em continuar pra fazermos um diagnóstico da sua internet.',
    gaPageName: 'nao_sucesso_sem_conexao_modem',
    buttons: [{
        text: 'Continuar',
        gaAction: 'seguir_proxima_etapa',
        action: 'goToSemConexao'
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'troca-nome-fibra-netq-timeout',
    //description: 'redes nao encontradas',
    title: 'Não foi possível fazer conexão com o seu modem.',
    paragraph: 'Você pode ligar pra gente se quiser alterar o nome.<br>A ligação é gratuita.',
    gaPageName: 'nao_sucesso_sem_conexao_modem',
    buttons: [{
        text: 'Ligar',
        action: 'goToCallCenter',
        gaAction: 'ligar',
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'abertura-bd',
    title: 'Nenhum problema de rede foi identificado por aqui.',
    paragraph: 'Para continuar o seu atendimento, ligue pra um dos nossos especialistas.<br>A ligação é gratuita.',
    gaPageName: 'reparo_nao_autorizado',
    buttons: [{
        text: 'Ligar',
        action: 'goToCallCenter',
        gaAction: 'ligar',
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'abertura-bd-erro',
    title: 'Não foi possível concluir a verificação.',
    paragraph: 'Para continuar o seu atendimento, ligue pra um dos nossos especialistas.<br>A ligação é gratuita.',
    gaPageName: 'erro_consultando_abertura_reparo',
    buttons: [{
        text: 'Ligar',
        action: 'goToCallCenter',
        gaAction: 'ligar',
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'agendamento-erro',
    title: 'Não foi possível fazer o agendamento neste momento.',
    paragraph: 'Um dos nossos especialistas irá ajudá-lo na próxima etapa.<br>A ligação é gratuita.',
    gaPageName: 'erro_abrindo_reparo',
    buttons: [{
        text: 'Ligar',
        action: 'goToCallCenter',
        gaAction: 'ligar',
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'has-bd-aberto',
    title: 'Identicamos que você já possui um agendamento',
    paragraph: 'Dentro do prazo de 48h um técnico irá atendê-lo, por favor aguarde.',
    gaPageName: 'ja_possui_agendamento',
    buttons: [
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'voicenet',
    title: 'Para este atendimento entre em contato com um dos nossos especialistas.',
    paragraph: 'A ligação é gratuita.',
    gaPageName: 'nao_sucesso',
    fluxo: 'voicenet_pwa',
    buttons: [{
        text: 'Ligar',
        action: 'goToCallCenter',
        gaAction: 'ligar',
      },
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'stb-sem-netflix',
    title: 'O seu decodificador não acessa a Netflix, mas você pode acessar direto por uma Smart TV ou dispositivos móveis.',
    paragraph: 'Em caso de dúvidas entre em contato com nosso atendimento.',
    gaPageName: 'nao_sucesso_decodificador_nao_compativel',
    buttons: [
      {
        text: 'Entendi, voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'stb-sem-netflix-plural',
    title: 'Os seus decodificadores não acessam a Netflix, mas você pode acessar direto por uma Smart TV ou dispositivos móveis.',
    paragraph: 'Em caso de dúvidas entre em contato com nosso atendimento.',
    gaPageName: 'nao_sucesso_decodificadores_nao_compativeis',
    buttons: [
      {
        text: 'Entendi, voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'lista-sem-stb-netflix',
    title: 'Por esse decodificador você não conseguirá acessar a Netflix. O acesso deverá ser feito por uma Smart TV ou dispositivos móveis.',
    paragraph: 'Em caso de dúvidas entre em contato com nosso atendimento.',
    gaPageName: 'nao_sucesso_acessar_direto_tv_celular',
    buttons: [
      {
        text: 'Voltar pro inicio',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'criar-conta-netflix',
    title: 'Você vai precisar criar sua conta no site da Netflix.',
    gaPageName: 'nao_sucesso_criar_conta',
    buttons: [
      {
        text: 'Voltar pro inicio',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  },
  {
    id: 'padrao_sem_ligar',
    title: 'Não foi possível resolver esse problema por aqui.',
    paragraph: 'Um dos nossos especialistas irá ajudá-lo.<br>' +
    'A ligação é gratuita.',
    gaPageName: 'nao_sucesso',
    buttons: [
      {
        text: 'Voltar pro início',
        action: 'goToHome',
        gaAction: 'voltar_inicio',
      }]
  }
];

const getConclusion = (service): ConclusionModel => conclusionCatalog.find(el => (el.id === service));
export { getConclusion };
