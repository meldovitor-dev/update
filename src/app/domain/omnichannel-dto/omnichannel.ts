// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Omnichannel {
  export interface Ownership {
    product: string;
    productType: string;
  }

  export interface Repair {
    open: string;
    type: string;
    repairNumber?: string;
    scheduled?: string;
  }

  export interface Event {
    event: string;
    type: string;
  }

  export interface OS {
    opened: string;
    slot: string;
    type: string;
  }

  export interface CustomerInteraction {
    finale: string;
    type: string;
    code: string;
    initialGuide: string;
    defectClaimed: string;
    actionGenerated1: string;
    diagnosticAction1: string;
    diagnosticAction2?: string;
    startModemLinedUp?: string;
    details?: string;
    stage?: string;
    contact1?: string;
    contact2?: string;
    lastQuestion?: string;
  }

  export interface Test {
    testCode: string;
    fiberDiagnostic: string;
    statusFiberLine: number;
  }
}
