import { User } from './../models/user.model';
import { ProductCodeEnum } from '../enums/product.enum';

export class UserSet {
    static readonly type = '[User] Set';
    constructor(public payload: User) { }
}

export class UserUnset {
    static readonly type = '[User] Unset';
    constructor(public payload: User) { }
}

export class UserPatch {
    static readonly type = '[User] Patch';
    constructor(public payload: User) { }
}

export class UserUnlogged {
    static readonly type = '[User] pushEmpty';
    constructor(public payload: User) { }
}

export class UserSessionSet {
    static readonly type = '[User] Set User Session';
    constructor(public payload: ProductCodeEnum) { }
}

export class UserCpfOrCnpjSet {
    static readonly type = '[User] Set User CPF or CNPJ';
    constructor(public payload: User) { }
}
