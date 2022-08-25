/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { FalhaMassivaInfoService } from './../../services/falha-massiva-info.service';
import { FeatureEnum } from 'src/app/enums/feature.enum';
import { blocks } from '../diagnostic-blocks/diagnostic-blocks.constants';
import { ProductIdentifierEnum } from 'src/app/enums/product.enum';
import { GeneralHelper } from 'src/app/helpers/general.helper';
import { DIAGNOSTIC_BLOCK_BANDA_LARGA, BANDA_LARGA_FIXO_BLOCK_PAGES, GET_TYPE_FALHA } from '../diagnostic-blocks/bandalarga-diagnostic.constants';
import { BLOCK_FIBRA_NETQ_NOK } from '../diagnostic-blocks/blocks-catalog/blocks-catalog-fibra';
import { BlockTypes } from 'src/app/enums/catalog.enum';
import { InteractionEnum } from 'src/app/domain/interactions';
export class DiagnosticHandler {
    public static featureCodes: FeatureEnum[] = [];
    constructor(public falhaMassivaInfo: FalhaMassivaInfoService) {

    }
    handlerBlocks(response) {
        console.log('hanlder blocks method should be overhided on DIAGNOSTIC HANDLER');
        return undefined;
    }
    // debug propose
    getHandler() {
        return 'GENERIC';
    }
    getExtraInfoFalhaMassiva(response) {
      return;
    }
}

export class FibraDiagnosticHandler extends DiagnosticHandler {
    public static featureCodes: FeatureEnum[] = [
        FeatureEnum.FIBRA_INTERMITENTE,
        FeatureEnum.FIBRA_LENTA,
        FeatureEnum.FIBRA_SEM_CONEXAO,
        FeatureEnum.FIBRA_TELEFONE_COM_RUIDO,
        FeatureEnum.FIBRA_NAO_FAZ_CHAMADA,
        FeatureEnum.FIBRA_NAO_FAZ_NEM_RECEBE_CAHAMDA,
        FeatureEnum.FIBRA_NAO_RECEBE_CHAMADA,
        FeatureEnum.FIBRA_LINHA_MUDA,
        FeatureEnum.FIBRA_PROBLEMAS_TV,
        FeatureEnum.FIBRA_TV_TELA_PRETA,
        FeatureEnum.FIBRA_DIAGNOSTICO_HOME,
    ];
    constructor(public falhaMassivaInfo: FalhaMassivaInfoService) {
        super(falhaMassivaInfo);
    }
    getHandler() {
        return 'FIBRA';
    }
    fibraDiagnosticoCompleto(response) {
        if (response && response.ticket && response.ticket.isEmExecucao === false && response.ticket.payload) {
            const isSuccess = response.ticket.payload.success;
            if (isSuccess === false) {
                return BLOCK_FIBRA_NETQ_NOK;
            } else {
                return isSuccess;
            }
        }
        return undefined;
    }
    async fibraConsultaStatus(response) {
        response = await this.getExtraInfoFalhaMassiva(response);
        const blocked = blocks.fibra.filter((block) => {
            if (!block.condicao) {
                return false;
            }
            const condicoes = Object.keys(block.condicao);
            for (const condicao of condicoes) {
                if (typeof(block.condicao[condicao]) === 'object') {
                    if (!this.applyCondition(block.condicao[condicao], response[condicao])) {
                        return false;
                    }
                } else if (block.condicao[condicao] !== response[condicao]) {
                    return false;
                }
            }
            return true;
        });
        if (blocked.length > 0) {
            const blockPage = JSON.parse(JSON.stringify(blocked[0]));
            if (response.forecastDate) {
                blockPage.descricao = this.replaceParagraph(blockPage.descricao, response.forecastDate);
            }
            if ( response.itens) {
                blockPage.descricao = this.replaceCanais(blockPage.descricao, response.itens);
            }
            return blockPage;
        }
        return undefined;
    }
    async getExtraInfoFalhaMassiva(response) {
      let falhaInfo;
      if (response.tipo === BlockTypes.FALHA_MASSIVA) {
        falhaInfo = await this.falhaMassivaInfo.getFalhaMassivaById(response.idFalhaMassiva);
        if (!falhaInfo) {
          falhaInfo = await this.falhaMassivaInfo.postFalhaMassiva(response);
          falhaInfo = {...response, ...falhaInfo};
          return falhaInfo;
        }
        falhaInfo = await this.falhaMassivaInfo.patchFalhaMassiva(response);
        if(falhaInfo && falhaInfo.finished) {
          falhaInfo.isFalhaMassiva = false;
          falhaInfo.tipo = '';
        }
        falhaInfo = {...response,  ...falhaInfo};
        return falhaInfo;
      }
      return response;
    }
    private applyCondition(condition: any, value: any) {
        switch (Object.keys(condition)[0]) {
            case 'exists':
                return (value !== undefined) === condition.exists;
            case 'neq':
                return value !== condition.neq;
            case 'leq':
                return value <= condition.leq;
            case 'geq':
                return value >= condition.geq;
            default:
                return true;
        }
    }
    replaceCanais(p: string, canais: []) {
        if (!Array.isArray(canais) || !canais.length) {
            return p;
        }
        let channelList = '';
        canais.forEach((el, index, arr) => {
            if (index === arr.length - 1 ) {
                return channelList += el;
            }
            return channelList += el + ', ';
        });
        return p.replace('::canais::', channelList);
    }
    replaceParagraph(p: string, timestamp: string){
        if (!timestamp) {
            return p;
        }
        const get2last = (str) => {
            const formated = '00' + str;
            return formated.substring(formated.length - 2);
        };
        const date = new Date(timestamp);
        const hours = get2last(date.getHours());
        const minutes = get2last(date.getMinutes());
        const day =  get2last(date.getDate());
        const month = get2last(date.getMonth() + 1);
        return p.replace('::hora::', `${hours}:${minutes}h`).replace('::dia::', `${day}/${month}`)
                .replace('::forecastDate::', `${day}/${month}`);
    }
}

export class TVDTHDiagnosticHandler extends DiagnosticHandler {
    public static featureCodes: FeatureEnum[] = [
        FeatureEnum.TV_AUSENCIA_SINAL,
        FeatureEnum.TV_CARTAO_INCOMPATIVEL,
        FeatureEnum.TV_SERVICO_INATIVO,
        FeatureEnum.TV_TELA_PRETA
    ];
    constructor(public falhaMassivaInfo: FalhaMassivaInfoService) {
        super(falhaMassivaInfo);
    }

    getHandler() {
        return 'TVDTH';
    }
    tvConsultaStatus(response) {
        const blocked = blocks.tv.filter((block) => {
            if (!block.condicao) {
                return false;
            }
            const condicoes = Object.keys(block.condicao);
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < condicoes.length; i++) {
                const condicao = condicoes[i];
                //console.log('condicao => ', block.id, condicao, block.condicao[condicao], response[condicao], 'last compare', typeof(block.condicao[condicao]) == 'object');
                if (typeof(block.condicao[condicao]) == 'object') {
                    if(!this.applyCondition(block.condicao[condicao], response[condicao])) {
                        return false;
                    }
                } else if (block.condicao[condicao] !== response[condicao]) {
                    return false;
                }
            }
            return true;
        });
        //console.log('TvDiagnosticHandler filtered - ', blocked);
        if (blocked.length > 0) {
            const blockPage = JSON.parse(JSON.stringify(blocked[0]));
            const forecast = response.forecastDate || response.dataInicioAgendamento;
            if (forecast) {
                blockPage.descricao = this.replaceParagraph(blockPage.descricao, forecast);
            }
            if ( response.itens) {
                blockPage.descricao = this.replaceCanais(blockPage.descricao, response.itens);
            }
            blockPage.descricao = this.replaceNameService(blockPage.descricao, response);
            return blockPage;
        }
        return undefined;
    }
    replaceCanais(p: string, canais: []) {
        if (!Array.isArray(canais) || !canais.length) {
            return p;
        }
        let channelList = '';
        canais.forEach((el, index, arr) => {
            if (index === arr.length - 1 ) {
                return channelList += el;
            }
            return channelList += el + ', ';
        });
        return p.replace('::canais::', channelList);
    }

    replaceNameService(p, response) {
        const { nome_servico } = response;
        return p.replace('::nome_servico::', `${nome_servico || ''}`);
    }

    private applyCondition(condition: any, value: any) {
        switch (Object.keys(condition)[0]) {
            case 'exists':
                return (value !== undefined) === condition.exists;
            case 'neq':
                return value !== condition.neq;
            case 'leq':
                return value <= condition.leq;
            case 'geq':
                return value >= condition.geq;
            default:
                return true;
        }
    }
    replaceParagraph(p: string, timestamp: string){
        if (!timestamp) {
            return p;
        }
        const get2last = (str) => {
            const formated = '00' + str;
            return formated.substring(formated.length - 2);
        };
        const date = new Date(timestamp);
        const hours = get2last(date.getHours());
        const minutes = get2last(date.getMinutes());
        const day =  get2last(date.getDate());
        const month = get2last(date.getMonth() + 1);
        return p.replace('::hora::', `${hours}:${minutes}h`).replace('::dia::', `${day}/${month}`)
                .replace('::forecastDate::',`${day}/${month}`);
    }
}


export class BandalargaDiagnosticHandler extends DiagnosticHandler {
    public static featureCodes: FeatureEnum[] = [
        FeatureEnum.BANDA_LARGA_LENTA,
        FeatureEnum.BANDA_LARGA_INTERMITENTE,
        FeatureEnum.BANDA_LARGA_SEM_CONEXAO,
        FeatureEnum.FIXO_LINHA_MUDA,
        FeatureEnum.FIXO_LINHA_CRUZADA,
        FeatureEnum.FIXO_NAO_RECEBE_CHAMADA,
        FeatureEnum.FIXO_NAO_FAZ_CHAMADA,
        FeatureEnum.FIXO_NAO_FAZ_NEM_RECEBE_CAHAMDA,
        FeatureEnum.FIXO_TELEFONE_COM_RUIDO,
        FeatureEnum.DIAGNOSTICO_HOME,
    ];
    empresarial = false;
    productFixo = false;
    constructor(public falhaMassivaInfo: FalhaMassivaInfoService) {
        super(falhaMassivaInfo);
    }
    getHandler() {
        return 'BANDA LARGA';
    }
    isFixo() {
        return this.productFixo;
    }
    isEmpresarial() {
        return this.empresarial;
    }
    async consultaEventosVulto(status) {
        if (!status || !status.ticket || !status.ticket.payload) {
            return undefined;
        }
        const {ticket} = status;
        if (!ticket.payload.isFalhaMassiva) {
            return undefined;
        }
        // Colocar funçao da classe pai passando o payload e sobrescrevendo o mesmo
        let result = await this.handleFalhaMassiva(status.ticket.payload);
        result = this.addPriority(result, 2);
        return result;
    }
    consultaStatusTerminal(status) {
        if (!status || !status.ticket || !status.ticket.payload) {
            return undefined;
        }
        const {ticket} = status;
        if (ticket.payload.isPortaModemOk === false) {
            const block = {
                interaction: InteractionEnum.bandaLargaResetPorta
            };
            return block;
        }
        return undefined;
    }
    public bandaLargaResetPorta(status) {
        if (!status || !status.ticket || !status.ticket.payload) {
            return undefined;
        }
        const {ticket} = status;
        let modal = DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.TERMINAL.FALHA_DESBLOQUEIO;
        if (ticket.payload.isResetPortaSuccess) {
            modal = DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.TERMINAL.LINHA_IDENTIFICADA;
        }
        return this.getPage(modal);
    }
    public reprofile(status) {
        const { ticket } = status;
        const { payload } = ticket;
        if (payload && payload.isReprofile && payload.reprofileSuccess) {
            const realizouReprofileComSucesso = true;
            return {realizouReprofileComSucesso};
        }
        return undefined;
    }
    public resetDSL(status) {
        const { ticket } = status;
        const { payload } = ticket;
        if ( payload && payload.isResetDslSuccess ) {
            const validByStatusTerminal = true;
            return {validByStatusTerminal};
        }
        return undefined;
    }
    public async consultaStatusFinanceiro(status) {
        this.productFixo = status.product === ProductIdentifierEnum.FIXO;
        this.empresarial = GeneralHelper.isEmpresarial(status.cpfOrCnpj);
        const response = status.ticket.payload;
        if (!response || (!response.isBloqueio && !response.isReparoEmAberto && !response.isOSEmAberto && !response.isFalhaMassiva)) {
            return undefined;
        }
        let result;
        // Financial Block
        if (response.isBloqueioFinanceiro) {
            result = this.handleFinancialBlock(response);
            result = this.addPriority(result, 4);
            return result;
        }
        // Adicionando prioridade para esta falha massiva;
        if (response.isFalhaMassiva) {
            result = await this.handleFalhaMassiva(response);
            result = this.addPriority(result, 3);
            return result;
        }
        // OS aberta ou Reparo
        if (response.isReparoEmAberto || response.isOSEmAberto) {
            result = this.handleRepairOrOsBlock(response);
            result = this.addPriority(result, 1);
            return result;
        }
        result = this.handleOthersBlock(response);
        result = this.addPriority(result, 1);
        return result;
    }
    public handleOthersBlock(data) {
        const modal = DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.FINANCEIRO.BLOQUEIO_OUTROS;
        return this.getPage(modal);
    }
    async handleFalhaMassiva(data) {
        if (data.idFalhaMassiva) {
          data = await this.getExtraInfoFalhaMassiva(data);
        }
        if(!data.isFalhaMassiva) {
          return undefined;
        }
        const modal = GET_TYPE_FALHA(data);
        let page = Object.assign({}, this.getPage(modal));
        const descricao = this.replaceParagraphWithForecast(page.descricao, data.forecastDate, page.forecastTxt);
        page = {
            ...page ,
            ...{ descricao }
        };
        return page;
    }
    public async getExtraInfoFalhaMassiva(response) {
      let falhaInfo;
      if (response.isFalhaMassiva) {
        falhaInfo = await this.falhaMassivaInfo.getFalhaMassivaById(response.idFalhaMassiva);
        if (!falhaInfo) {
          falhaInfo = await this.falhaMassivaInfo.postFalhaMassiva(response);
          falhaInfo = {...response, ...falhaInfo};
          return falhaInfo;
        }
        falhaInfo = await this.falhaMassivaInfo.patchFalhaMassiva(response);
        if(falhaInfo && falhaInfo.finished) {
          falhaInfo.isFalhaMassiva = false;
          falhaInfo.tipo = '';
        }
        falhaInfo = {...response,  ...falhaInfo};
        return falhaInfo;
      }
      return response;
    }
    public handleFinancialBlock(data: any) {
        const C = DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.FINANCEIRO;
        let modal = this.getModalPfPj(C.BLOQUEIO_PARCIAL);
        if (data.isBloqueioParcial && !data.isBloqueioVelox && this.isFixo()) {
            modal = this.isEmpresarial() ? C.BLOQUEIO_PACIAL_FIXO_PERGUNTA_PJ : C.BLOQUEIO_PACIAL_FIXO_PERGUNTA_PF;
            return this.getPage(modal);
        }
        if (data.isBloqueioParcial && data.isBloqueioVelox && !this.isFixo()) {
            return this.getPage(modal);
        }
        if (data.isBloqueioTotal) {
            modal = this.getModalPfPj(C.BLOQUEIO_TOTAL);
            return this.getPage(modal);
        }
        return this.getPage(modal);
    }
    public handleRepairOrOsBlock(data: any) {
        const C = DIAGNOSTIC_BLOCK_BANDA_LARGA.MODAL_ID.FINANCEIRO;
        const agendamento = data.agendamento;
        const repairSufix = data.isReparoEmAberto;
        let modal = this.getRepairSufix(repairSufix, C.REPARO_PJ);

        if (this.isEmpresarial()) {
            return this.getPage(modal);
        }
        if (!agendamento) {
            modal = this.getRepairSufix(repairSufix, C.REPARO_NAO_AGENDADO);
            return this.getPage(modal);
        }
        let params;
        if (agendamento.ligar_atendimento && !agendamento.agendado) {
            if (agendamento.isEditavel) {
                modal = this.getRepairSufix(repairSufix, C.REPARO_AGENDADAMENTO_DISPONIVEL);
                params = { agendamento };
                return this.getPage(modal);
            }
            modal = this.getRepairSufix(repairSufix, C.REPARO_AGENDADAMENTO_INDISPONIVEL);
            return this.getPage(modal);
        }
        modal = this.getRepairSufix(repairSufix, C.REPARO_AGENDADO);
        params = { agendamento };
        return this.getPage(modal);

    }
    public getRepairSufix(repair, title: string) {
        let fixTitle = title;
        if (fixTitle.includes('aberto')) {
            fixTitle = repair ? fixTitle : fixTitle.replace('aberto', 'aberta');
        }
        return repair ? `reparo_${fixTitle}` : `os_${fixTitle}`;
    }

    addPriority(page, priority = 0) {
        const pageResult = {
            ...page,
            ...{ priority }
        };
        return pageResult;
    }

    public getModalPfPj(title: string): string {
        return this.isEmpresarial() ? `${title}_pj` : `${title}_pf`;
    }
    public getPage(id) {
        return BANDA_LARGA_FIXO_BLOCK_PAGES[id];
    }
    replaceParagraphWithForecast(p: string, timestamp: string, forecastTxt: string) {
        if (!timestamp) {
            return p.replace('#forecast#', '');
        }
        p = p.replace('#forecast#', forecastTxt);
        const get2last = (str) => {
            const formated = '00' + str;
            return formated.substring(formated.length - 2);
        };
        const date = new Date(timestamp);
        const hours = get2last(date.getHours());
        const minutes = get2last(date.getMinutes());
        const day =  get2last(date.getDate());
        const month = get2last(date.getMonth() + 1);
        return p.replace('::hora::', `${hours}:${minutes}h`).replace('::dia::', `${day}/${month}`);
    }
}



const listHandlerClassesWithCustomImplementations = [
    FibraDiagnosticHandler,
    BandalargaDiagnosticHandler,
    TVDTHDiagnosticHandler,
];

export const createDiagnosticHandler = (featureCode, falhaMassivaInfo) => {
    //console.log({featureCode})
    const instance = (listHandlerClassesWithCustomImplementations
        .find(f => f.featureCodes.includes(featureCode)) || DiagnosticHandler);
    return new instance(falhaMassivaInfo);
};
