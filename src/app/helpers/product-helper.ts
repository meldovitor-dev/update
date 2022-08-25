/* eslint-disable @typescript-eslint/naming-convention */
import { ProductIdentifierEnum } from 'src/app/enums/product.enum';
import { environment } from 'src/environments/environment';
import { InteractionEnum, INTERACTIONS, InteractionModel, InteractionAsyncMethodsEnum } from './../domain/interactions';
import { ProductTicket } from './../models/product-ticket.model';
import { ProductCodeEnum } from './../enums/product.enum';
export class ProductHelper {
    public static getInteraction(interaction: InteractionEnum): InteractionModel {
        return INTERACTIONS.find(el => el.id === interaction);
    }
    public static getIdentifierForBackEnd(id: ProductCodeEnum) {
        switch (id) {
            case ProductCodeEnum.BANDA_LARGA:
            case ProductCodeEnum.FIXO:
                return 'terminal';
            default:
                return 'contrato';
        }
    }

    public static extractOnlyPayloadFromTicketResponse(payload) {
        delete payload.originalResponse;
        delete payload.timestamp;
        delete payload.isEmExecucao;
        delete payload.idOrdem;
        delete payload.result;
        const newPayload = {
            ...payload,
            ...payload.status
        };
        delete newPayload.status;
        return Object.assign({}, {
            payload: newPayload
        });
    }

    public static createTicket(interaction: InteractionModel, config?): ProductTicket {
        if (!config) {
            config = {};
        }
        const newTicket: ProductTicket = {
            contextIdentifier: interaction.id,
            id: config.id || '',
            requestedTime: config.requestedTime || new Date().getTime(),
            responseMethod: interaction.asyncMethod || InteractionAsyncMethodsEnum.sync,
            isEmExecucao: true,
        };
        return Object.assign({}, newTicket);
    }
    public static extractConfig(interaction: InteractionModel, config: string) {
        if (!interaction.configPath || !config) {
            return {};
        }
        let innerObj = JSON.parse(config);
        const getProp = (props) => {
            props.forEach(element => {
                innerObj = innerObj[element];
            });
            return innerObj;
        };
        return getProp(interaction.configPath.split('.'));
    }
    public static extractConfigValue(config, configPath) {
        if (!configPath || !config) {
            return {};
        }
        let innerObj = JSON.parse(config);
        const getProp = (props) => {
            props.forEach(element => {
                innerObj = innerObj[element];
            });
            return innerObj;
        };
        return getProp(configPath.split('.'));
    }
    public static isTicketDone(ticket) {
        return (!!ticket && !ticket.isEmExecucao);
    }
    public static getConfig(config: string) {
        return environment.CONFIG_CONSTANTS[config];
    }
    public static getPhoneConfig() {
        return environment.PHONE.atendimento;
    }
    public static getDDD(user) {
        const { productCode, identifier } = user;
        if ((productCode === ProductCodeEnum.BANDA_LARGA || productCode === ProductCodeEnum.FIXO) && identifier && identifier.length >= 2) {
            return identifier.substr(0, 2);
        }
        return '';
    }
    public static generateUnipro(): string {
        const date = new Date();
        const year = date.getFullYear();
        let sequence = `${date.getTime()}`;
        sequence = (sequence.substr(sequence.length - 9));
        let dv = parseInt(year + sequence, 10) % 11;
        if (dv >= 10) {
            dv = 0;
        }
        return `${year}${dv}${sequence}`;
    }
    public static productCodeToProductIdentifier(productCode) {
        const adapter = {
            [ProductCodeEnum.BANDA_LARGA]: ProductIdentifierEnum.BANDA_LARGA,
            [ProductCodeEnum.TVDTH]: ProductIdentifierEnum.TVDTH,
            [ProductCodeEnum.FIXO]: ProductIdentifierEnum.FIXO,
            [ProductCodeEnum.FIBRA_BANDA_LARGA]: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
            [ProductCodeEnum.FIBRA_FIXO]: ProductIdentifierEnum.FIBRA_FIXO,
            [ProductCodeEnum.FIBRA_TV]: ProductIdentifierEnum.FIBRA_TV,
            [ProductCodeEnum.FIBRA]: ProductIdentifierEnum.FIBRA_BANDA_LARGA,
        };
        return adapter[productCode] || '';
    }
    public static productIdentifierToProductCode(productIdentifier) {
        const adapter = {
            [ProductIdentifierEnum.BANDA_LARGA]: ProductCodeEnum.BANDA_LARGA,
            [ProductIdentifierEnum.TVDTH]: ProductCodeEnum.TVDTH,
            [ProductIdentifierEnum.FIXO]: ProductCodeEnum.FIXO,
            [ProductIdentifierEnum.FIBRA_BANDA_LARGA]: ProductCodeEnum.FIBRA_BANDA_LARGA,
            [ProductIdentifierEnum.FIBRA_FIXO]: ProductCodeEnum.FIBRA_FIXO,
            [ProductIdentifierEnum.FIBRA_TV]: ProductCodeEnum.FIBRA_TV,
        };
        return adapter[productIdentifier] || '';
    }
    public static omnichannelProductTranslator(productCode) {
        switch (productCode) {
            case ProductCodeEnum.BANDA_LARGA:
                return 'VELOX';
            case ProductCodeEnum.FIXO:
                return 'FIXO';
            case ProductCodeEnum.TVDTH:
                return 'TV';
            default:
                return 'FIBRA';
        }
    }
    public static omnichannelFeatureTranslator(ga) {
        const translate = {
            sem_conexao: 'NAO CONECTA',
            internet_lenta: 'LENTIDAO',
            quedas_constantes: 'QUEDAS',
            trocar_senha_wifi: 'SENHA REDE',
            trocar_nome_wifi: 'NOME REDE',
            linha_muda: 'LINHA MUDA',
            nao_faz_chamada: 'NAO COMPLETA',
            nao_recebe_chamada: 'NAO RECEBE',
            nao_faz_recebe_chamada: 'NAO RECEBE NEM COMPLETA CHAMADAS',
            ruido: 'RUIDO',
        };
        return translate[ga] || '0';
    }
    public static isFibra(code: ProductCodeEnum) {
        return (
            code === ProductCodeEnum.FIBRA ||
            code === ProductCodeEnum.FIBRA_FIXO ||
            code === ProductCodeEnum.FIBRA_BANDA_LARGA ||
            code === ProductCodeEnum.FIBRA_TV
        );
    }
    public static isCobre(code: ProductCodeEnum) {
        return (
            code === ProductCodeEnum.BANDA_LARGA ||
            code === ProductCodeEnum.FIXO
        );
    }
    public static isTVDTH(code: ProductCodeEnum) {
        return (
            code === ProductCodeEnum.TVDTH
        );
    }
}
