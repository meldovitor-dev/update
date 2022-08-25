export class FeatureSet {
    static readonly type = '[Feature] set';
    constructor(public payload) { }
}

export class FeatureUnset {
    static readonly type = '[Feature] Unset';
    constructor() { }
}
