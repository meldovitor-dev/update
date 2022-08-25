import { InteractionAsyncMethodsEnum } from './../domain/interactions';
export interface ProductTicket {
    id?: string;
    responseMethod: InteractionAsyncMethodsEnum;
    requestedTime?: number;
    isEmExecucao?: boolean;
    result?: string | object;
    contextIdentifier?: string; // unique identifier interactions with BE
    payload?: object;
}
