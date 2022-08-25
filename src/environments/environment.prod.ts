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
const ENVIRONMENT = 'QA';
const isPWA = false;
const DISABLE_CONSOLE = false;
const DISABLE_LOG_GA = false;
// fim variaveis alteradas via script

const serverLocation = SERVER_LOCATIONS[ENVIRONMENT];
const TECNICO_VIRTUAL_API = `${serverLocation}/api/v2`;
const CONFIG_CONSTANTS = {
    DEFAULT_HTTP_TIMEOUT: 120000,
    DEFAULT_POLLER_INTERVAL: 5000,
    rebootManual: {
        timeout_ms: 90000,
    },
    rebootSTBManual: {
        timeout_ms: 40000,
    },
    telefoneGancho: {
        timeout_ms: 30000,
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
    production: true,
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
