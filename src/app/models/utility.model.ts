import { ProductTicket } from './product-ticket.model';

export interface UtilityModel {
    firebaseToken: string;
    homeTickets?: {
        [key: string]: ProductTicket;
    };
    diagnosticConclusion?: any;
    urlParams?: any;
    minhaOiToken?: string;
    prodToken?: string;
}
