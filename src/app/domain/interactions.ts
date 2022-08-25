/* eslint-disable @typescript-eslint/naming-convention */

export enum InteractionEnum {
    // Fibra
    fibraConsultaStatus = 'fibraConsultaStatus',
    fibraDiagnosticoCompleto = 'fibraDiagnosticoCompleto',
    fibraReboot = 'fibraReboot',
    fibraRebootStb = 'fibraRebootStb',
    fibraSetChannelWifi = 'fibraSetChannelWifi',
    fibraSetPasswordWifi = 'fibraSetPasswordWifi',
    fibraSetSSIDWifi = 'fibraSetSSIDWifi',
    // Banda Larga
    consultaStatusFinanceiro = 'consultaStatusFinanceiro',
    consultaEventosVulto = 'consultaEventosVulto',
    terminalAgendamentoConsulta = 'terminalAgendamentoConsulta',
    consultaStatusTerminal = 'consultaStatusTerminal',
    resetDSL = 'resetDSL',
    reprofile = 'reprofile',
    authenticateHdm = 'authenticateHdm',
    reconfigDns = 'reconfigDns',
    bandaLargaConsultaRegistro = 'bandaLargaConsultaRegistro',
    bandaLargaRebootModem = 'bandaLargaRebootModem',
    bandaLargaSetChannelWifi = 'bandaLargaSetChannelWifi',
    bandaLargaSetPasswordWifi = 'bandaLargaSetPasswordWifi',
    bandaLargaSetSSIDWifi = 'bandaLargaSetSSIDWifi',
    bandaLargaListClients = 'bandaLargaListClients',
    bandaLargaResetPorta = 'bandaLargaResetPorta',
    consultarAberturaBD = 'consultarAberturaBD',
    efetuarAberturaBD = 'efetuarAberturaBD',
    consultarMigracao = 'consultarMigracao',
    // TVDTH
    tvConsultaStatus = 'tvConsultaStatus',
    tvEnvioPulso = 'tvEnvioPulso',
    omnichannelInfo = 'omnichannelInfo',

    consultarViabilidadeFibra = 'consultarViabilidadeFibra'
}

export enum InteractionAsyncMethodsEnum {
    sync = 'sync',
    poller = 'poller',
    socket = 'socket'
}

export interface InteractionModel {
    id?: InteractionEnum;
    asyncMethod?: InteractionAsyncMethodsEnum;
    configPath?: string;
    relativePath?: string;
    requestMethod?: string;
    motorCCI?: boolean;
    stepsResolve?: string[];
}

const FibraInteractions: InteractionModel[] = [
    {
        id: InteractionEnum.fibraConsultaStatus,
        asyncMethod: InteractionAsyncMethodsEnum.sync,
        configPath: 'diagnostico.fibraStatus',
        relativePath: '/fibra/{id}/consultaStatus?produto={idProduct}',
        requestMethod: 'get',
        stepsResolve: ['financial', 'weather', 'repair']
    },
    {
        id: InteractionEnum.fibraDiagnosticoCompleto,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'fibra.diagnosticoCompleto',
        relativePath: '/fibra/{id}/modem/diagnosticoCompleto',
        requestMethod: 'post',
        stepsResolve: ['line']
    },
    {
        id: InteractionEnum.fibraReboot,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'fibra.reboot',
        relativePath: '/fibra/{id}/modem/reboot',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.fibraRebootStb,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'fibra.rebootSTB',
        relativePath: '/fibra/{id}/modem/rebootSTB',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.fibraSetChannelWifi,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'fibra.setChannel',
        relativePath: '/fibra/{id}/modem/setChannelWifi',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.fibraSetPasswordWifi,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'fibra.setPassword',
        relativePath: '/fibra/{id}/modem/setPasswordWifi',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.fibraSetSSIDWifi,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'fibra.setSSID',
        relativePath: '/fibra/{id}/modem/setSSIDWifi',
        requestMethod: 'post',
    },
];

const BandaLargaInteractions: InteractionModel[] = [
    {
        id: InteractionEnum.consultaStatusFinanceiro,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'diagnostico.terminalStatusFinanceiro',
        relativePath: '/terminal/{id}/consultaStatusFinanceiro',
        requestMethod: 'get',
        motorCCI: true,
        stepsResolve: ['financial', 'repair']
    },
    {
        id: InteractionEnum.consultaEventosVulto,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'diagnostico.terminalEventosVulto',
        relativePath: '/terminal/{id}/consultaEventosVulto',
        requestMethod: 'get',
        motorCCI: true,
        stepsResolve: ['weather']
    },
    {
        id: InteractionEnum.consultaStatusTerminal,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'diagnostico.terminalStatusTerminal',
        relativePath: '/terminal/{id}/consultaStatusTerminal',
        requestMethod: 'get',
        motorCCI: true,
        stepsResolve: ['line']
    },
    {
        id: InteractionEnum.bandaLargaResetPorta,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'diagnostico.terminalResetPorta',
        relativePath: '/terminal/{id}/resetPorta',
        requestMethod: 'post',
        motorCCI: true,
        stepsResolve: ['line']
    },
    {
        id: InteractionEnum.reprofile,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'diagnostico.terminalReprofile',
        relativePath: '/terminal/{id}/reprofile',
        requestMethod: 'get',
        motorCCI: true
    },
    {
        id: InteractionEnum.resetDSL,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'diagnostico.terminalResetDsl',
        relativePath: '/terminal/{id}/resetDsl',
        requestMethod: 'post',
        motorCCI: true
    },
    {
        id: InteractionEnum.terminalAgendamentoConsulta,
        asyncMethod: InteractionAsyncMethodsEnum.sync,
        configPath: 'agendamento.terminalAgendamentoConsulta',
        relativePath: '/usuarios/{idModel}/agendamento',
        requestMethod: 'get',
    },
    {
        id: InteractionEnum.authenticateHdm,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'modem.auth',
        relativePath: '/terminal/{id}/modem/auth',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.reconfigDns,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'modem.dnsConfig',
        relativePath: '/terminal/{id}/modem/DNSReconfigurar',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.bandaLargaRebootModem,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'modem.reboot',
        relativePath: '/terminal/{id}/modem/reboot',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.bandaLargaSetChannelWifi,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'modem.setChannel',
        relativePath: '/terminal/{id}/modem/setChannelWifi',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.bandaLargaSetPasswordWifi,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'modem.setPassword',
        relativePath: '/terminal/{id}/modem/setPasswordWifi',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.bandaLargaSetSSIDWifi,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'modem.setSSID',
        relativePath: '/terminal/{id}/modem/setSSIDWifi',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.bandaLargaListClients,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'modem.listClients',
        relativePath: '/terminal/{id}/modem/listClients',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.bandaLargaConsultaRegistro,
        asyncMethod: InteractionAsyncMethodsEnum.sync,
        relativePath: '/terminal/{id}/modem/consultaRegistro',
        requestMethod: 'get'
    },
    {
        id: InteractionEnum.consultarAberturaBD,
        asyncMethod: InteractionAsyncMethodsEnum.sync,
        configPath: 'omniChannel.consultaAberturaBD',
        relativePath: '/usuarios/consultaAberturaBD',
        requestMethod: 'post',
    },
    {
        id: InteractionEnum.efetuarAberturaBD,
        asyncMethod: InteractionAsyncMethodsEnum.poller,
        configPath: 'efetuarAberturaBD',
        relativePath: '/usuarios/{idModel}/efetuarAberturaBD',
        requestMethod: 'post',
    },
    {
      id: InteractionEnum.consultarMigracao,
      asyncMethod: InteractionAsyncMethodsEnum.sync,
      configPath: 'omniChannel.consultaMigracao',
      relativePath: '/usuarios/consultaMigracao',
      requestMethod: 'post',
    },
];

const TVDTHInteractions: InteractionModel[] = [
    {
        id: InteractionEnum.tvConsultaStatus,
        asyncMethod: InteractionAsyncMethodsEnum.sync,
        relativePath: '/tv/{id}/consultaStatus',
        configPath: 'diagnostico.tvStatusFinanceiro',
        requestMethod: 'get',
        stepsResolve: ['financial', 'weather', 'repair']
    },
    {
        id: InteractionEnum.tvEnvioPulso,
        asyncMethod: InteractionAsyncMethodsEnum.sync,
        configPath: 'diagnostico.tvEnvioPulso',
        relativePath: '/tv/{id}/envioPulso',
        requestMethod: 'post',
    }
];

const MiscInteractions: InteractionModel[] = [
    {
        id: InteractionEnum.consultarViabilidadeFibra,
        asyncMethod: InteractionAsyncMethodsEnum.sync,
        //configPath: '',
        relativePath: '/usuarios/consultarViabilidadeFibra',
        requestMethod: 'get',
    },
    {
      id: InteractionEnum.omnichannelInfo,
      asyncMethod: InteractionAsyncMethodsEnum.sync,
      relativePath: '/omnichannel/customer-history',
      requestMethod: 'post',
    },
];

export const INTERACTIONS = [
    ...BandaLargaInteractions,
    ...FibraInteractions,
    ...TVDTHInteractions,
    ...MiscInteractions
];
