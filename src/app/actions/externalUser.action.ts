export class ExternalUserSet {
  static readonly type = '[ExternalUser] set';
  constructor(public payload) { }
}

export class ExternalUserUnset {
  static readonly type = '[ExternalUser] Unset';
  constructor(public productCode) { }
}

export class ExternalNovaFibra {
  static readonly type = '[ExternalUser] patch';
  constructor(public payload) { }
}
