import { UtilityModel } from '../models/utility.model';
import { ProductTicket } from '../models/product-ticket.model';

export class UtilitySet {
    static readonly type = '[Utility] Set';
    constructor(public payload: UtilityModel) {}
}

export class UtilityUnset {
    static readonly type = '[Utility] Unset';
    constructor() {}
}

export class PatchHomeTickets {
    static readonly type = '[PatchHomeTickets] HomePatch';
    constructor(public payload: ProductTicket) {}
}


export class ClearHomeTickets {
    static readonly type = '[ClearHomeTickets] HomeClear';
    constructor() {}
}

export class AddDiagnosticConclusion {
    static readonly type = '[DiagnosticConclusion] Path';
    constructor(public payload: any) {}
}

export class ClearDiagnosticConclusion {
    static readonly type = '[DiagnosticConclusion] Clear';
    constructor() {}
}

export class AddUrlParams {
  static readonly type = '[UrlParams] Path';
  constructor(public payload: any) {}
}

export class ClearUrlParams {
  static readonly type = '[UrlParams] Clear';
  constructor() {}
}

export class AddMinhaOiToken {
  static readonly type = '[MinhaOiToken] Path';
  constructor(public payload: any) {}
}

export class ClearMinhaOiToken {
  static readonly type = '[MinhaOiToken] Clear';
  constructor() {}
}

export class AddProductToken {
  static readonly type = '[ProducToken] Path';
  constructor(public payload: any) {}
}

export class ClearProductToken {
  static readonly type = '[ProducToken] Clear';
  constructor() {}
}
