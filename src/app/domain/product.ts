/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { TecnologyEnum } from './../enums/tecnology.enum';
import { Feature, FibraDispositivosConectadosHome, FibraIntensidadeSinalHome, BandaLargaDispositivosConectadosHome, ConfigurarWifiHome, MelhorarSinalHome, FazerLigacoesHome, FibraControleRemotoHome, FibraRecursosAvancadosHome, FibraGuiaProgramacaoHome, BandaLargaLenta, BandaLargaIntermitente, BandaLargaSemConexao, FixoLinhaMuda, FixoNaoFaz, FixoNaoRecebe, FixoNaoFazNemRecebe, FixoComRuido, FibraLenta, FibraSemConexao, FibraIntermitente, FibraLinhaMuda, FibraNaoFaz, FibraNaoRecebe, FibraNaoFazNemRecebe, FibraComRuido, TvAusenciaSinal, TvTelaPreta, TvCartaoIncompativel, TvServicoInativo, FibraProblemasTv, FixoLinhaCruzada, BandaLargaTrocaNome, BandaLargaTrocaSenha, FibraTrocaNome, FibraTrocaSenha, BandaLargaAgendamento, DiagnosticHome, FibraCompatibilidadeVelocidade, FibraTelaPreta, OiProducts, TvControleRemotoHome, FibraConfiguracaoAntenaModem, FibraWelcomeKit, RetiradaEquipamentoFibra, DefeitoNoControle, FibraTVImagemTomada, FibraLogoDaOi, FibraNetflix } from './feature';
import { ProductCodeEnum, ProductIdentifierEnum } from './../enums/product.enum';
import { ProductInterface } from './product.interface';
import { InteractionEnum } from './interactions';
export abstract class Product implements ProductInterface {
    ga: string;
    displayName: string;
    identifier: ProductIdentifierEnum;
    productCode: ProductCodeEnum;
    features: Feature[];
    tecnology: TecnologyEnum;
    homeInteractions: InteractionEnum[];

    public handlerExceptionsOnLogin(data: any) {
        // TODO tratamento de excecoes nos logins dos produtos
    }
}

export class ProductBandaLarga extends Product {
    ga = 'banda_larga';
    constructor() {
        super();
        this.displayName = 'Banda Larga';
        this.productCode = ProductCodeEnum.BANDA_LARGA;
        this.identifier = ProductIdentifierEnum.BANDA_LARGA;
        this.features = [
            new BandaLargaLenta(),
            new BandaLargaSemConexao(),
            new BandaLargaIntermitente(),
            new BandaLargaDispositivosConectadosHome(),
            new BandaLargaTrocaSenha(),
            new BandaLargaTrocaNome(),
            new BandaLargaAgendamento(),
            new ConfigurarWifiHome(),
            new DiagnosticHome(),
            new OiProducts(),
        ];
        this.homeInteractions = [
            InteractionEnum.bandaLargaConsultaRegistro,
            InteractionEnum.terminalAgendamentoConsulta,
            InteractionEnum.consultaStatusFinanceiro,
            InteractionEnum.consultaEventosVulto,
            InteractionEnum.consultarMigracao
        ];
        this.tecnology = TecnologyEnum.COBRE;
    }
}


export class ProductFixo extends Product {
    ga = 'fixo';
    constructor() {
        super();
        this.displayName = 'Fixo';
        this.productCode = ProductCodeEnum.FIXO;
        this.features = [
            new FixoLinhaMuda(),
            new FixoNaoFaz(),
            new FixoNaoRecebe(),
            new FixoNaoFazNemRecebe(),
            new FixoComRuido(),
            new FixoLinhaCruzada(),
            new FazerLigacoesHome(),
            new DiagnosticHome(),
            new BandaLargaAgendamento(),
            new OiProducts(),
        ];
        this.homeInteractions = [
            InteractionEnum.terminalAgendamentoConsulta,
            InteractionEnum.consultaStatusFinanceiro,
            InteractionEnum.consultaEventosVulto
        ];
        this.identifier = ProductIdentifierEnum.FIXO;
        this.tecnology = TecnologyEnum.COBRE;
    }
}

export class ProductTv extends Product {
    ga = 'tv_dth';
    constructor() {
        super();
        this.displayName = 'TV por satélite';
        this.productCode = ProductCodeEnum.TVDTH;
        this.features = [
            new TvAusenciaSinal(),
            new TvTelaPreta(),
            new TvCartaoIncompativel(),
            new TvServicoInativo(),
            new ConfigurarWifiHome(),
            new TvControleRemotoHome(),
            new OiProducts(),
        ];
        this.homeInteractions = [
        ];
        this.identifier = ProductIdentifierEnum.TVDTH;
        this.tecnology = TecnologyEnum.DTH;
    }
}

export class ProductFibraBandaLarga extends Product {
    ga = 'fibra_internet';
    constructor() {
        super();
        this.displayName = 'Fibra Internet';
        this.productCode = ProductCodeEnum.FIBRA;
        this.features = [
            new FibraLenta(),
            new FibraSemConexao(),
            new FibraIntermitente(),
            new FibraTrocaSenha(),
            new FibraTrocaNome(),
            new FibraCompatibilidadeVelocidade(),
            new FibraDispositivosConectadosHome(),
            new FibraIntensidadeSinalHome(),
            new ConfigurarWifiHome(),
            new MelhorarSinalHome(),
            new DiagnosticHome(),
            new FibraConfiguracaoAntenaModem(),
            new OiProducts(),
            new FibraWelcomeKit(),
            new RetiradaEquipamentoFibra(),
        ];
        this.homeInteractions = [
            InteractionEnum.fibraConsultaStatus
        ];
        this.identifier = ProductIdentifierEnum.FIBRA_BANDA_LARGA;
        this.tecnology = TecnologyEnum.FIBRA;
    }
}


export class ProductFibraFixo extends Product {
    ga = 'fibra_fixo';
    constructor() {
        super();
        this.displayName = 'Fibra Fixo';
        this.productCode = ProductCodeEnum.FIBRA;
        this.features = [
            new FibraLinhaMuda(),
            new FibraNaoFaz(),
            new FibraNaoRecebe(),
            new FibraNaoFazNemRecebe(),
            new FibraComRuido(),
            new FazerLigacoesHome(),
            new DiagnosticHome(),
            new OiProducts(),
            new FibraWelcomeKit(),
            new RetiradaEquipamentoFibra(),

        ];
        this.homeInteractions = [
            InteractionEnum.fibraConsultaStatus
        ];
        this.identifier = ProductIdentifierEnum.FIBRA_FIXO;
        this.tecnology = TecnologyEnum.FIBRA;
    }
}

export class ProductFibraTv extends Product {
    ga = 'fibra_tv';
    constructor() {
        super();
        this.displayName = 'Fibra TV';
        this.productCode = ProductCodeEnum.FIBRA;
        this.features = [
            new FibraLogoDaOi(),
            new FibraTVImagemTomada(),
            new DefeitoNoControle(),
            new FibraTelaPreta(),
            new FibraNetflix(),
            new FibraProblemasTv(),
            new FibraControleRemotoHome(),
            new FibraRecursosAvancadosHome(),
            new ConfigurarWifiHome(),
            new FibraGuiaProgramacaoHome(),
            new DiagnosticHome(),
            new OiProducts(),
            new FibraWelcomeKit(),
            new RetiradaEquipamentoFibra(),

        ];
        this.homeInteractions = [
            InteractionEnum.fibraConsultaStatus
        ];
        this.tecnology = TecnologyEnum.FIBRA;
        this.identifier = ProductIdentifierEnum.FIBRA_TV;
    }
}

export const createProduct = (product: ProductIdentifierEnum): Product => {
    const productPortfolio = {
        bl: ProductBandaLarga,
        fixo: ProductFixo,
        tv: ProductTv,
        fibra_bl: ProductFibraBandaLarga,
        fibra_fixo: ProductFibraFixo,
        fibra_tv: ProductFibraTv,
    };
    return new productPortfolio[product]();
};
