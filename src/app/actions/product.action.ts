export class ProductSet {
    static readonly type = '[Product] Set';
    constructor(public payload: any) { }
}

export class ProductUnset {
    static readonly type = '[Product] Unset';
    constructor() { }
}

export class ProductConfigSet {
    static readonly type = '[Product] Set Config';
    constructor(public payload) { }
}
