import {  InteractionEnum } from 'src/app/domain/interactions';
import { CatalogPrefix } from 'src/app/enums/catalog.enum';
import { FeatureEnum } from './../enums/feature.enum';
import { PlatformType } from './feature.interface';
export class Feature {
  readonly displayName: string;
  readonly icon: string;
  readonly featureCode: FeatureEnum;
  readonly displayOnHome: string;
  readonly catalogConfig: {
    name: string;
    initialPage: number | string;
  };
  readonly renderRouter: string = 'solucao-de-problemas';
  readonly interactions: InteractionEnum[] = [];
  readonly diagnostic = [];
  readonly ga: string;
  readonly protocol?: string;
  readonly needsLogin?: boolean;
  readonly modalInfo?: boolean;
  readonly problemType?: string;
  readonly skipDiagnostic?: boolean;
  platforms?: PlatformType[];
}

// BANDA LARGA COBRE FEATURES

export class BandaLargaLenta extends Feature {
  ga = 'internet_lenta';
  displayName = 'Internet Lenta';
  problemType = 'internet';
  featureCode = FeatureEnum.BANDA_LARGA_LENTA;
  displayOnHome = 'problem';
  diagnostic = [
    [
      InteractionEnum.consultaStatusFinanceiro,
      InteractionEnum.consultaEventosVulto,
      InteractionEnum.consultaStatusTerminal,
      InteractionEnum.resetDSL
    ]
  ];
  interactions = [
    InteractionEnum.authenticateHdm,
    InteractionEnum.bandaLargaSetChannelWifi,
    InteractionEnum.bandaLargaRebootModem,
    InteractionEnum.bandaLargaListClients
  ];
  catalogConfig = {
    name: 'bandaLargaInternetLenta',
    initialPage: 0
  };
}
export class BandaLargaSemConexao extends Feature {
  ga = 'sem_conexao';
  displayName = 'Sem Conexão';
  problemType = 'internet';
  featureCode = FeatureEnum.BANDA_LARGA_SEM_CONEXAO;
  displayOnHome = 'problem';
  interactions = [
    InteractionEnum.authenticateHdm,
    InteractionEnum.reconfigDns,
    InteractionEnum.bandaLargaRebootModem
  ];
  catalogConfig = {
    name: 'bandaLargaSemConexao',
    initialPage: 0
  };
}
export class BandaLargaIntermitente extends Feature {
  ga = 'quedas_constantes';
  displayName = 'Quedas Constantes';
  problemType = 'internet';
  featureCode = FeatureEnum.BANDA_LARGA_INTERMITENTE;
  displayOnHome = 'problem';
  interactions = [
    InteractionEnum.authenticateHdm,
    InteractionEnum.bandaLargaSetChannelWifi,
    InteractionEnum.bandaLargaRebootModem
  ];
  catalogConfig = {
    name: 'bandaLargaIntermitente',
    initialPage: 0
  };
}
export class BandaLargaTrocaSenha extends Feature {
  ga = 'trocar_senha_wifi';
  displayName = 'Trocar senha do Wi-Fi';
  featureCode = FeatureEnum.BANDA_LARGA_TROCA_SENHA;
  displayOnHome = 'cards-multi-feature';
  interactions = [
    InteractionEnum.authenticateHdm,
    InteractionEnum.bandaLargaSetPasswordWifi
  ];
  catalogConfig = {
    name: 'bandaLargaTrocaSenha',
    initialPage: `${CatalogPrefix.TROCA_SENHA}0`
  };
}
export class BandaLargaTrocaNome extends Feature {
  ga = 'trocar_nome_wifi';
  displayName = 'Trocar nome da Rede';
  featureCode = FeatureEnum.BANDA_LARGA_TROCA_NOME;
  displayOnHome = 'cards-multi-feature';
  interactions = [
    InteractionEnum.authenticateHdm,
    InteractionEnum.bandaLargaSetSSIDWifi
  ];
  catalogConfig = {
    name: 'bandaLargaTrocaNome',
    initialPage: `${CatalogPrefix.TROCA_NOME}0`
  };
}
export class BandaLargaAgendamento extends Feature {
  ga = 'visitas_tecnicas';
  displayName = 'Visitas Técnicas';
  featureCode = FeatureEnum.BANDA_LARGA_AGENDAMENTO;
  displayOnHome = 'cards-agendamento';
}

export class BandaLargaDispositivosConectadosHome extends Feature {
  ga = 'consultar_dispositivos_conectados';
  displayName = 'Dispositivos Conectados';
  featureCode = FeatureEnum.BANDA_LARGA_DISPOSITIVOS_CONECTADOS;
  displayOnHome = 'cards-single-feature';
  interactions = [
    InteractionEnum.authenticateHdm,
    InteractionEnum.bandaLargaSetPasswordWifi,
    InteractionEnum.bandaLargaListClients
  ];
  catalogConfig = {
    name: 'bandaLargaDispositivosConectados',
    initialPage: `${CatalogPrefix.DISPOSITIVOS_CONECTADOS}0`
  };
}
export class ConfigurarWifiHome extends Feature {
  ga = 'configurar_internet_tv';
  displayName = 'Configurar internet na TV';
  featureCode = FeatureEnum.SMARTV_WIFI;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'configuracaoSmartTv',
    initialPage: 0
  };
}

export class MelhorarSinalHome extends Feature {
  ga = 'melhorar_sinal_wifi';
  displayName = 'Como melhorar o sinal Wi-Fi';
  featureCode = FeatureEnum.MELHORAR_WIFI;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'dicasEBoasPraticas',
    initialPage: 0
  };
}

export class FazerLigacoesHome extends Feature {
  ga = 'dicas_ligacoes_ddd_ddi';
  displayName = 'Como fazer ligações DDD e DDI';
  featureCode = FeatureEnum.FAZER_LIGACAO;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'comoFazerLigacoes',
    initialPage: 0
  };
}

// FIXO COBRE FEATURES

export class FixoLinhaMuda extends Feature {
  ga = 'linha_muda';
  displayName = 'Linha Muda';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIXO_LINHA_MUDA;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'fixoMudo',
    initialPage: `${CatalogPrefix.FIXO_MUDO}0`
  };
}
export class FixoNaoFaz extends Feature {
  ga = 'nao_faz_chamada';
  displayName = 'Não faz chamada';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIXO_NAO_FAZ_CHAMADA;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'fixoNaoFaz',
    initialPage: `${CatalogPrefix.FIXO_NAO_COMPLETA}0`
  };
}
export class FixoNaoRecebe extends Feature {
  ga = 'nao_recebe_chamada';
  displayName = 'Não recebe chamada';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIXO_NAO_RECEBE_CHAMADA;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'fixoMudo',
    initialPage: `${CatalogPrefix.FIXO_MUDO}0`
  };
}
export class FixoNaoFazNemRecebe extends Feature {
  ga = 'nao_faz_recebe_chamada';
  displayName = 'Não faz nem recebe chamada';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIXO_NAO_FAZ_NEM_RECEBE_CAHAMDA;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'fixoMudo',
    initialPage: `${CatalogPrefix.FIXO_MUDO}0`
  };
}
export class FixoComRuido extends Feature {
  ga = 'ruido';
  displayName = 'Telefone com ruído';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIXO_TELEFONE_COM_RUIDO;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'fixoRuido',
    initialPage: `${CatalogPrefix.FIXO_RUIDO}0`
  };
}
export class FixoLinhaCruzada extends Feature {
  ga = 'linha_cruzada';
  displayName = 'Linha Cruzada';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIXO_LINHA_CRUZADA;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'fixoLinhaCruzada',
    initialPage: `${CatalogPrefix.LINHA_CRUZADA}0`
  };
}

// TV DTH FEATURES
export class TvAusenciaSinal extends Feature {
  ga = 'ausencia_sinal';
  displayName = 'Ausência de Sinal';
  problemType = 'tv';
  featureCode = FeatureEnum.TV_AUSENCIA_SINAL;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'tvAusenciaSinal',
    initialPage: 0
  };
}
export class TvTelaPreta extends Feature {
  ga = 'tela_preta_azul';
  displayName = 'Tela preta ou azul';
  problemType = 'tv';
  featureCode = FeatureEnum.TV_TELA_PRETA;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'tvTelaPreta',
    initialPage: 0
  };
}
export class TvCartaoIncompativel extends Feature {
  ga = 'cartao_incompativel';
  displayName = 'Cartão Incompatível';
  problemType = 'tv';
  featureCode = FeatureEnum.TV_CARTAO_INCOMPATIVEL;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'tvCartaoIncompativel',
    initialPage: 0
  };
  interactions = [InteractionEnum.tvEnvioPulso];
}
export class TvServicoInativo extends Feature {
  ga = 'oi_tv_inativo';
  displayName = 'Serviço OI TV Inativo';
  problemType = 'tv';
  featureCode = FeatureEnum.TV_SERVICO_INATIVO;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'tvOiInativo',
    initialPage: 0
  };
  interactions = [InteractionEnum.tvEnvioPulso];
}

export class TvControleRemotoHome extends Feature {
  ga = 'conhecendo_controle_remoto';
  displayName = 'Conhecendo o Controle Remoto';
  featureCode = FeatureEnum.TV_CONTROLE_REMOTO;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'manualControleDTH',
    initialPage: 0
  };
}

// Fibra
export class FibraDispositivosConectadosHome extends Feature {
  ga = 'consultar_dispositivos_conectados';
  displayName = 'Dispositivos Conectados';
  featureCode = FeatureEnum.FIBRA_DISPOSITIVOS_CONECTADOS;
  displayOnHome = 'cards-single-feature';
  interactions = [InteractionEnum.fibraDiagnosticoCompleto];
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraDispositivosConectados',
    initialPage: `${CatalogPrefix.DISPOSITIVOS_CONECTADOS}0`
  };
}

export class FibraTrocaSenha extends Feature {
  ga = 'trocar_senha_wifi';
  displayName = 'Trocar senha do Wi-Fi';
  featureCode = FeatureEnum.FIBRA_TROCA_SENHA;
  displayOnHome = 'cards-multi-feature';
  interactions = [InteractionEnum.fibraDiagnosticoCompleto,
    InteractionEnum.fibraSetPasswordWifi
  ];
  diagnostic = [
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraTrocaSenha',
    initialPage: `${CatalogPrefix.TROCA_SENHA}0`
  };
}
export class FibraTrocaNome extends Feature {
  ga = 'trocar_nome_wifi';
  displayName = 'Trocar nome da Rede';
  featureCode = FeatureEnum.FIBRA_TROCA_NOME;
  displayOnHome = 'cards-multi-feature';
  interactions = [InteractionEnum.fibraDiagnosticoCompleto,
    InteractionEnum.fibraSetSSIDWifi
  ];
  diagnostic = [
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraTrocaNome',
    initialPage: `${CatalogPrefix.TROCA_NOME}0`
  };
}

export class FibraIntensidadeSinalHome extends Feature {
  ga = 'intensidade_sinal_wifi';
  displayName = 'Intensidade do Sinal Wi-fi';
  featureCode = FeatureEnum.FIBRA_INTENSIDADE_SINAL;
  displayOnHome = 'cards-single-feature';
  catalogConfig = {
    name: 'intensidadeSinal',
    initialPage: `${CatalogPrefix.WIFI_SIGNAL}0`
  };
}

export class FibraControleRemotoHome extends Feature {
  ga = 'conhecendo_controle_remoto';
  displayName = 'Conhecendo o Controle Remoto';
  featureCode = FeatureEnum.FIBRA_CONTROLE_REMOTO;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'manualControle',
    initialPage: 0
  };
}

export class FibraRecursosAvancadosHome extends Feature {
  ga = 'recursos_avancados_tv';
  displayName = 'Recursos avançados da TV';
  featureCode = FeatureEnum.FIBRA_RECURSOS_AVANCADOS;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'recursosAvancados',
    initialPage: 0
  };
}

export class FibraGuiaProgramacaoHome extends Feature {
  ga = 'guia_programacao';
  displayName = 'Como usar o guia de Programação';
  featureCode = FeatureEnum.FIBRA_GUIA_PROGRAMACAO;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'orientacoesControle',
    initialPage: 0
  };
}
export class FibraLenta extends Feature {
  ga = 'internet_lenta';
  displayName = 'Internet Lenta';
  problemType = 'internet';
  featureCode = FeatureEnum.FIBRA_LENTA;
  displayOnHome = 'problem';
  interactions = [InteractionEnum.fibraDiagnosticoCompleto,
    InteractionEnum.fibraReboot,
    InteractionEnum.fibraSetChannelWifi
  ];
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraInternetLenta',
    initialPage: 0
  };
}
export class FibraSemConexao extends Feature {
  ga = 'sem_conexao';
  displayName = 'Sem Conexão';
  problemType = 'internet';
  featureCode = FeatureEnum.FIBRA_SEM_CONEXAO;
  displayOnHome = 'problem';
  interactions = [InteractionEnum.fibraDiagnosticoCompleto,
    InteractionEnum.fibraReboot,
    InteractionEnum.fibraSetChannelWifi
  ];
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraSemConexao',
    initialPage: 0
  };
}
export class FibraIntermitente extends Feature {
  ga = 'quedas_constantes';
  displayName = 'Quedas Constantes';
  problemType = 'internet';
  featureCode = FeatureEnum.FIBRA_INTERMITENTE;
  displayOnHome = 'problem';
  interactions = [InteractionEnum.fibraDiagnosticoCompleto,
    InteractionEnum.fibraReboot,
    InteractionEnum.fibraSetChannelWifi
  ];
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraIntermitente',
    initialPage: 0
  };
}

export class FibraLinhaMuda extends Feature {
  ga = 'linha_muda';
  displayName = 'Linha Muda';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIBRA_LINHA_MUDA;
  displayOnHome = 'problem';
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraFixoMuda',
    initialPage: 0
  };
}
export class FibraNaoFaz extends Feature {
  ga = 'nao_faz_chamada';
  displayName = 'Não faz chamada';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIBRA_NAO_FAZ_CHAMADA;
  displayOnHome = 'problem';
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraFixoNaoFaz',
    initialPage: 0
  };
}
export class FibraNaoRecebe extends Feature {
  ga = 'nao_recebe_chamada';
  displayName = 'Não recebe chamada';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIBRA_NAO_RECEBE_CHAMADA;
  displayOnHome = 'problem';
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraFixoNaoRecebe',
    initialPage: 0
  };
}
export class FibraNaoFazNemRecebe extends Feature {
  ga = 'nao_faz_recebe_chamada';
  displayName = 'Não faz nem recebe chamada';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIBRA_NAO_FAZ_NEM_RECEBE_CAHAMDA;
  displayOnHome = 'problem';
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraFixoNaoFazNaoRecebe',
    initialPage: 0
  };
}
export class FibraComRuido extends Feature {
  ga = 'ruido';
  displayName = 'Telefone com ruído';
  problemType = 'fixo';
  featureCode = FeatureEnum.FIBRA_TELEFONE_COM_RUIDO;
  displayOnHome = 'problem';
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraFixoComRuido',
    initialPage: 0
  };
}
export class FibraProblemasTv extends Feature {
  ga = 'outros_problemas_tv';
  displayName = 'outros problemas na tv';
  problemType = 'tv';
  featureCode = FeatureEnum.FIBRA_PROBLEMAS_TV;
  displayOnHome = 'problem';
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  interactions = [
    InteractionEnum.fibraReboot,
    InteractionEnum.fibraRebootStb
  ];
  catalogConfig = {
    name: 'fibraProblemasTv',
    initialPage: 0
  };
}
export class FibraTelaPreta extends Feature {
  ga = 'imagem_preta_branca';
  displayName = 'IMAGEM PRETA E BRANCA';
  problemType = 'tv';
  featureCode = FeatureEnum.FIBRA_TV_TELA_PRETA;
  displayOnHome = 'problem';
  diagnostic = [
    InteractionEnum.fibraConsultaStatus,
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  interactions = [
    InteractionEnum.fibraRebootStb
  ];
  catalogConfig = {
    name: 'fibraTelaPreta',
    initialPage: 0
  };
}

export class DefeitoNoControle extends Feature {
  ga = 'defeito_controle_remoto';
  displayName = 'DEFEITO NO CONTROLE';
  problemType = 'TV';
  featureCode = FeatureEnum.DEFEITO_NO_CONTROLE;
  skipDiagnostic = true;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'defeitoNoControle',
    initialPage: 0
  };
}
export class FibraTVImagemTomada extends Feature {
  ga = 'imagem_tomada';
  displayName = 'IMAGEM DA TOMADA';
  problemType = 'TV';
  featureCode = FeatureEnum.FIBRA_TV_IMAGEM_TOMADA;
  skipDiagnostic = true;
  displayOnHome = 'problem';
  catalogConfig = {
    name: 'fibraTvImagemTomada',
    initialPage: 0
  };
}
export class FibraLogoDaOi extends Feature {
  ga = 'logo_oi';
  displayName = 'IMAGEM LOGO DA OI';
  problemType = 'TV';
  featureCode = FeatureEnum.FIBRA_TV_IMAGEM_LOGO_OI;
  skipDiagnostic = true;
  displayOnHome = 'problem';
  interactions = [
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraTvLogoOi',
    initialPage: 0
  };
}
export class FibraNetflix extends Feature {
  ga = 'acesso_netflix';
  displayName = 'ACESSO À NETFLIX';
  problemType = 'TV';
  featureCode = FeatureEnum.FIBRA_NETFLIX;
  skipDiagnostic = true;
  displayOnHome = 'problem';
  interactions = [
    InteractionEnum.fibraDiagnosticoCompleto
  ];
  catalogConfig = {
    name: 'fibraNetflix',
    initialPage: 0
  };
}
export class FibraConfiguracaoAntenaModem extends Feature {
  ga = 'dicas_antenas_altas_velocidades';
  displayName = 'Compatibilidade dos dispositivos';
  featureCode = FeatureEnum.FIBRA_CONFIG_ANTENA_MODEM;
  displayOnHome = 'icon';
  platforms: PlatformType[] = ['ios', 'mobileweb', 'desktop'];
  catalogConfig = {
    name: 'fibraConfiguracaoAntenaModem',
    initialPage: `${CatalogPrefix.COMPATIBILIDADE_MANUAL}0`
  };
}
export class FibraCompatibilidadeVelocidade extends Feature {
  ga = 'capacidade_dispositivos';
  displayName = 'Capacidade dos dispositivos';
  featureCode = FeatureEnum.FIBRA_COMPATIBILIDADE_VELOCIDADES;
  displayOnHome = 'cards-single-feature';
  needsLogin = true;
  catalogConfig = {
    name: 'fibraCompatibilidadeVelocidade',
    initialPage: `${CatalogPrefix.COMPATIBILIDADE}0`
  };
}

export class FibraWelcomeKit extends Feature {
  ga = 'boas_vindas_manuais_aparelhos';
  displayName = 'Boas Vindas e manuais de aparelhos';
  featureCode = FeatureEnum.FIBRA_WELCOME_KIT;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'fibraWelcomeKit',
    initialPage: 0
  };
}

export class RetiradaEquipamentoFibra extends Feature {
  ga = 'devolucao_aparelho';
  displayName = 'Retirada do equipamento Fibra';
  featureCode = FeatureEnum.RETIRADA_EQUIPAMENTO_FIBRA;
  displayOnHome = 'icon';
  catalogConfig = {
    name: 'RetiradaEquipamentoFibra',
    initialPage: 0
  };
}
export class OiProducts extends Feature {
  ga = 'servicos_produtos_oi';
  displayName = 'Serviços e produtos da Oi';
  featureCode = FeatureEnum.OI_PRODUCTS;
  displayOnHome = 'icon';
  modalInfo = true;
}

export class DiagnosticHome extends Feature {
  ga = 'diagnostico_home';
  featureCode = FeatureEnum.DIAGNOSTICO_HOME;
}
export class FibraDiagnosticHome extends Feature {
  ga = 'diagnostico_home';
  featureCode = FeatureEnum.FIBRA_DIAGNOSTICO_HOME;
}
