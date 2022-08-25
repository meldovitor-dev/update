import { InteractionEnum } from './interactions';

export const BANDA_LARGA_INTERACTION_ESPECIAL_CASES = [
    {
        interaction: InteractionEnum.reprofile,
        subInteraction: InteractionEnum.consultaStatusTerminal,
        stopCondition: {
            isDslamOk: true
        }
    },
    {
        interaction: InteractionEnum.resetDSL,
        subInteraction: InteractionEnum.consultaStatusTerminal,
        stopCondition: {
            isDslamOk: true
        }
    },
];
