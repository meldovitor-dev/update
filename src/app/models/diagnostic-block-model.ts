/* eslint-disable @typescript-eslint/member-delimiter-style */
export interface DiagnosticBlockButtonsModel {
    texto: string;
    acao: {
        nome: string,
        params?: any
    };
    gaAction: string;
    icon?: string;
}

export interface DiagnosticBlockModel {
    id?: string;
    skipExtraInfoTxt?: boolean;
    alert?: any;
    forecastTxt?: string;
    titulo?: string;
    gaPageName: string;
    condicao?: any;
    descricao?: string;
    botoes?: DiagnosticBlockButtonsModel[];
}
