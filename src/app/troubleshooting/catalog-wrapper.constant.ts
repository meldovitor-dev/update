/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { FIBRA_TV_LOGO_OI } from './catalogs/problem-solver/fibra/tv/fibra-tv-logo-oi.catalog';
import { MANUAL_CONTROLE_DTH } from './catalogs/unlogged-area/controle-dth/manual-controle-DTH-modulo';
import { FIBRA_TELA_PRETA } from './catalogs/problem-solver/fibra/tv/fibra-tv-tela-preta-catalog';
import { FIXO_NAO_COMPLETA } from './catalogs/problem-solver/fixo/fixo-nao-completa-catalog';
import { FIXO_MUDO } from './catalogs/problem-solver/fixo/fixo-mudo-catalog';
import { FIXO_COM_RUIDO } from './catalogs/problem-solver/fixo/fixo-ruidos-catalog';
import { INTENSIDADE_SINAL } from './catalogs/problem-solver/fibra/banda-larga/intensidade-sinal-catalog';
import { BANDA_LARGA_TROCA_SENHA } from './catalogs/problem-solver/banda-larga/banda-larga-troca-senha-catalog';
import { FIBRA_PROBLEMAS_TV } from './catalogs/problem-solver/fibra/tv/fibra-tv-catalog';
import { TROCA_SENHA } from './catalogs/problem-solver/fibra/banda-larga/fibra-troca-senha-catalog';
import { TROCA_NOME } from './catalogs/problem-solver/fibra/banda-larga/fibra-troca-nome-catalog';
import { FIBRA_FIXO_COM_RUIDO } from './catalogs/problem-solver/fibra/fixo/fibra-fixo-com-ruido-catalog';
import { FIBRA_FIXO_NAO_RECEBE_CHAMADA } from './catalogs/problem-solver/fibra/fixo/fibra-fixo-nao-recebe-chamada-catalog';
import { FIBRA_FIXO_NAO_FAZ_CHAMADA } from './catalogs/problem-solver/fibra/fixo/fibra-fixo-nao-faz-chamada-catalog';
import { RECURSOS_AVANCADOS } from './catalogs/unlogged-area/recursos-avancados';
import { ORIENTACOES_CONTROLE } from './catalogs/unlogged-area/orientacoes-controle-catalog';
import { CONFIGURACAO_SMART_TV } from './catalogs/unlogged-area/configuracao-smartv';
import { CatalogModel, CatalogDTOProperty, CatalogDTO } from './troubleshooting-interface';
import { DICAS_E_BOAS_PRATICAS } from './catalogs/unlogged-area/dicas-boas-praticas-catalog';
import { MANUAL_CONTROLE } from './catalogs/unlogged-area/manual-controle-modulo';
import { FIBRA_SEM_CONEXAO } from './catalogs/problem-solver/fibra/banda-larga/fibra-sem-conexao-catalog';
import { FIBRA_FIXO_LINHA_MUDA } from './catalogs/problem-solver/fibra/fixo/fibra-fixo-linha-muda-catalog';
import { FIBRA_FIXO_NAO_FAZ_NAO_RECEBE_CHAMADA } from './catalogs/problem-solver/fibra/fixo/fibra-fixo-nao-faz-nao-recebe-catalog';
import { FIBRA_INTERNET_LENTA } from './catalogs/problem-solver/fibra/banda-larga/fibra-internet-lenta-catalog';
import {
    FIBRA_DISPOSITIVOS_CONECTADOS,
    FIBRA_DISPOSITIVOS_CONECTADOS_HOME
} from './catalogs/problem-solver/fibra/shared/fibra-dispositivos-conectados-catalog';
import { COMO_FAZER_LIGACOES } from './catalogs/unlogged-area/como-fazer-ligacoes';
import { BANDA_LARGA_SEM_CONEXAO } from './catalogs/problem-solver/banda-larga/banda-larga-sem-conexao-catalog';
import { BANDA_LARGA_QUEDAS_CONSTANTES } from './catalogs/problem-solver/banda-larga/banda-larga-quedas-constantes-catalog';
import { BANDA_LARGA_TROCA_NOME } from './catalogs/problem-solver/banda-larga/banda-larga-troca-nome';
import { BANDA_LARGA_DISPOSITIVOS_CONECTADOS_HOME } from './catalogs/problem-solver/banda-larga/banda-larga-dispositivos-conectados-catalog';
import { BANDA_LARGA_INTERNET_LENTA } from './catalogs/problem-solver/banda-larga/banda-larga-internet-lenta-catalog';
import { TV_TELA_PRETA } from './catalogs/problem-solver/tv/tv-tela-preta-catalog';
import { TV_CARTAO_INCOMPATIVEL } from './catalogs/problem-solver/tv/tv-cartao-incompativel-catalog';
import { TV_AUSENCIA_SINAL } from './catalogs/problem-solver/tv/tv-ausencia-sinal';
import { TV_OI_TV_INATIVO } from './catalogs/problem-solver/tv/tv-oi-tv-inativo-catalog';
import { FIBRA_COMPATIBILIDADE_MANUAL_HOME } from './catalogs/unlogged-area/configuracao-antena-modem';
import { CONFIG_MODEM_MANUAL } from './catalogs/problem-solver/banda-larga/config-modem-manual';
import { COMPATIBILIDADE_VELOCIDADE } from './catalogs/problem-solver/fibra/banda-larga/fibra-compatibilidade-velocidade.catalog';
import { LINHA_CRUZADA } from './catalogs/problem-solver/fixo/fixo-linha-cruzada';
import { ABERTURA_BD } from './catalogs/problem-solver/shared/abertura-bd-catalog';
import { WELCOME_KIT } from './catalogs/unlogged-area/welcome-kit.catalog';
import { VOICENET } from './catalogs/problem-solver/shared/voicenet.catalog';
import { RETIRADA_EQUIPAMENTO_FIBRA } from'./catalogs/unlogged-area/retirada-equipamento-fibra';
import { DEFEITO_NO_CONTROLE } from './catalogs/problem-solver/fibra/tv/fibra-tv-configuracao-controle';
import { TV_IMAGEM_TOMADA } from './catalogs/problem-solver/fibra/tv/fibra-tv-imagem-tomada';
import { FIBRA_NETFLIX_CATALOG } from './catalogs/problem-solver/fibra/tv/fibra_netflix.catalog';

const CATALOG_WRAPPER = {
    comoFazerLigacoes: COMO_FAZER_LIGACOES,
    dicasEBoasPraticas: DICAS_E_BOAS_PRATICAS,
    configuracaoSmartTv: CONFIGURACAO_SMART_TV,
    orientacoesControle: ORIENTACOES_CONTROLE,
    manualControle: MANUAL_CONTROLE,
    manualControleDTH: MANUAL_CONTROLE_DTH,
    recursosAvancados: RECURSOS_AVANCADOS,
    fibraSemConexao: FIBRA_SEM_CONEXAO,
    fibraInternetLenta: FIBRA_INTERNET_LENTA,
    fibraIntermitente: FIBRA_SEM_CONEXAO,
    fibraFixoMuda: FIBRA_FIXO_LINHA_MUDA,
    fibraFixoNaoFaz: FIBRA_FIXO_NAO_FAZ_CHAMADA,
    fibraFixoNaoRecebe: FIBRA_FIXO_NAO_RECEBE_CHAMADA,
    fibraFixoNaoFazNaoRecebe: FIBRA_FIXO_NAO_FAZ_NAO_RECEBE_CHAMADA,
    fibraFixoComRuido: FIBRA_FIXO_COM_RUIDO,
    fibraDispositivosConectados: FIBRA_DISPOSITIVOS_CONECTADOS_HOME,
    fibraTrocaNome: TROCA_NOME,
    fibraTrocaSenha: TROCA_SENHA,
    fibraProblemasTv: FIBRA_PROBLEMAS_TV,
    fibraTelaPreta: FIBRA_TELA_PRETA,
    fibraConfiguracaoAntenaModem: FIBRA_COMPATIBILIDADE_MANUAL_HOME,
    bandaLargaSemConexao: BANDA_LARGA_SEM_CONEXAO,
    bandaLargaIntermitente: BANDA_LARGA_QUEDAS_CONSTANTES,
    bandaLargaTrocaSenha: BANDA_LARGA_TROCA_SENHA,
    bandaLargaTrocaNome: BANDA_LARGA_TROCA_NOME,
    bandaLargaInternetLenta: BANDA_LARGA_INTERNET_LENTA,
    bandaLargaDispositivosConectados: BANDA_LARGA_DISPOSITIVOS_CONECTADOS_HOME,
    intensidadeSinal: INTENSIDADE_SINAL,
    fixoRuido: FIXO_COM_RUIDO,
    fixoMudo: FIXO_MUDO,
    fixoNaoFaz: FIXO_NAO_COMPLETA,
    fixoNaoRecebe: FIXO_MUDO,
    fixoNaoFazERecebe: FIXO_MUDO,
    fixoLinhaCruzada: LINHA_CRUZADA,
    tvTelaPreta: TV_TELA_PRETA,
    tvCartaoIncompativel: TV_CARTAO_INCOMPATIVEL,
    tvAusenciaSinal: TV_AUSENCIA_SINAL,
    tvOiInativo: TV_OI_TV_INATIVO,
    aberturaBD: ABERTURA_BD,
    configModemManual: CONFIG_MODEM_MANUAL,
    fibraCompatibilidadeVelocidade: COMPATIBILIDADE_VELOCIDADE,
    fibraWelcomeKit: WELCOME_KIT,
    voicenet: VOICENET,
    RetiradaEquipamentoFibra: RETIRADA_EQUIPAMENTO_FIBRA,
    defeitoNoControle: DEFEITO_NO_CONTROLE,
    fibraTvImagemTomada: TV_IMAGEM_TOMADA,
    fibraTvLogoOi: FIBRA_TV_LOGO_OI,
    fibraNetflix: FIBRA_NETFLIX_CATALOG,
};

export const GET_CATALOG_BY_IDENTIFIER = (id: string ): CatalogModel[] | CatalogDTO => CATALOG_WRAPPER[id];
