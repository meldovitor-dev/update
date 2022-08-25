/* eslint-disable @typescript-eslint/naming-convention */
import { SERVER_LOCATIONS } from './server.config';
import { CANAIS } from './canais';

/**
 * As variaveis a seguir são editadas via script.
 *
 * ENVIRONMENT: string => 'BMIX'; // environment BE, possiveis valores ['BMIX', 'BMIX_AC', 'PROD', 'HML', 'DEV', 'QA']
 * isPWA: boolean => true; // se true, registra o service work, para build de apps deve ser false;
 * DISABLE_CONSOLE: boolean => false; // desabilitar console log na aplicacao [em producao deve ser true]
 * DISABLE_LOG_GA: boolean => false; // desabilitar console do GA [em producao deve ser true]
 */

// inicio variaveis alteradas via script
const ENVIRONMENT = 'DEV';
const isPWA = false;
const DISABLE_CONSOLE = false;
const DISABLE_LOG_GA = true;
// fim variaveis alteradas via script

const serverLocation = SERVER_LOCATIONS[ENVIRONMENT];
const TECNICO_VIRTUAL_API = `${serverLocation}/api/v2`;
const CONFIG_CONSTANTS = {

    DEFAULT_POLLER_INTERVAL: 5000,
    DEFAULT_HTTP_TIMEOUT: 120000,
    rebootManual: {
        timeout_ms: 2000,
    },
    rebootSTBManual: {
        timeout_ms: 2000,
    },
    telefoneGancho: {
        timeout_ms: 2000,
    },
    testeVelocidade: {
        timeout_ms: 5000,
    }
};
const PHONE = {
    atendimento: {
        telefone_default_r1: '10331',
        telefone_default_r2: '10314',
        fibra: {
            empresarial: '08000318000',
            residencial: '08000318000'
        },
        telefone_default_tv: '10631',
        offline: '08000247416',
        fibraOffer: '0800 031 0453',
        oi_solucoes: '0800 031 80 31',
    },
};
const CREDENTIALS = {
    onesignal: 'f315614b-ec26-450d-836a-f41c13334621',
    firebase: '172228722022',
    appsflyer: {
        devKey: 'c4ehuPyBbhQH4tC84pXrZn',
        appId: '1178728288'
    },
    recaptcha: '6LfZLzEbAAAAAFezO2baHweZx4TaQ0qaVZIDuekT'
};

export const environment = {
    production: false,
    isPWA,
    TECNICO_VIRTUAL_API,
    CANAIS,
    CONFIG_CONSTANTS,
    PHONE,
    CREDENTIALS,
    DISABLE_CONSOLE,
    DISABLE_LOG_GA,
    ENVIRONMENT
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
