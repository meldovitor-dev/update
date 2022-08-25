/* eslint-disable @typescript-eslint/naming-convention */
import { ProductCodeEnum } from '../enums/product.enum';

export enum AgendamentoActions {
    CANCELAR = 'cancelar',
    REAGENDAR = 'reagendar',
    AGENDAR = 'agendar',
}
export interface Agendamento {
    tipo_agendamento?: string;
    isReparo?: boolean;
    telefone?: string;
    tipo?: string;
    tipo_produto?: ProductCodeEnum;
    id?: string;
    serviceOrder?: string;
    idAgendamento?: string;
    when?: string;
    hora_ini?: string;
    hora_fim?: string;
    turno?: string;
    data?: string;
    dia?: string;
    mes?: string;
    ano?: string;
    semana?: string;
    periodo?: string;
    isInvalido?: boolean;
    isPendente?: boolean;
    isAgendavel?: boolean;
    isReagendavel?: boolean;
    isCancelavel?: boolean;
    isEditavel?: boolean;
    isInstalacaoConjunta?: boolean;
    categoryTitle?: string;
}

export interface AgendamentoSlot {
        turno?: string;
        selected?: boolean;
        slot?: {
          startDate: string;
          endDate: string;
        };
        start: string;
        horario: string;
}

export interface AgendamentoDisponibilidade {
      dia?: string;
      semana?: string;
      data?: string;
      start?: string;
      periodos?: AgendamentoSlot[];
}
