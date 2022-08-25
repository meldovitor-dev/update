export interface User {
    id?: string;
    cpfOrCnpj?: string;
    productCode?: number;
    identifier?: string;
    authorization?: string;
    callCenterNumber?: string;
    captchaResponse?: string;
    oneSignal?: string;
    portfolio?: string[];
    sessionUUID?: string;
    isHighSpeed?: boolean;
    nomeDoPlano?: string;
    contratos?: any[];
    needsActionContract?: boolean;
    isNovaFibra?: boolean;
}
