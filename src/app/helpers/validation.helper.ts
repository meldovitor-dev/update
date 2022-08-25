/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/naming-convention */
const LOGIN = {
    BLOCKED: {
        CPFS: [
            '00000000000', '11111111111',
            '22222222222', '33333333333',
            '44444444444', '55555555555',
            '66666666666', '77777777777',
            '88888888888', '99999999999',
            '12345678909',
        ],
        TERMINALS: [
            '0000000000', '1111111111',
            '2222222222', '3333333333',
            '4444444444', '5555555555',
            '6666666666', '7777777777',
            '8888888888', '9999999999',
        ],
        CNPJS: [
            '00000000000000', '11111111111111',
            '22222222222222', '33333333333333',
            '44444444444444', '55555555555555',
            '66666666666666', '77777777777777',
            '88888888888888', '99999999999999',
        ],
        NUMS_RESERVED: [],
    },
    ALLOWED: {
        DDDS: [
            '11', '12', '13', '14', '15', '16', '17', '18', '19',
            '21', '22', '24', '27', '28',
            '31', '32', '33', '34', '35', '37', '38',
            '41', '42', '43', '44', '45', '46', '47', '48', '49',
            '51', '53', '54', '55',
            '61', '62', '63', '64', '65', '66', '67', '68', '69',
            '71', '73', '74', '75', '77', '79',
            '81', '82', '83', '84', '85', '86', '87', '88', '89',
            '91', '92', '93', '94', '95', '96', '97', '98', '99',
        ],
    },
};

export class ValidationHelper {
    public static validateCNPJ(cnpj: string): boolean {
        const cnpjsBlocked = LOGIN.BLOCKED.CNPJS;

        if (cnpjsBlocked.indexOf(cnpj) !== -1 || cnpj.length !== 14 || cnpj.trim() === '') {
            // this.loggingProvider.logEventGA('validation_service', 'erro_aplicativo_validacao_cnpj', 'validacao');
            return false;
        }
        let size: number;
        let num: string;
        let dig: string;
        let sum: number;
        let pos: number;
        let result: number;
        // Valida DVs
        for (let n = 0; n < 2; n++) {
            size = (n === 0) ? cnpj.length - 2 : size + 1;
            num = cnpj.substring(0, size);
            dig = n === 0 ? cnpj.substring(size) : dig;
            sum = 0;
            pos = size - 7;
            for (let i = size; i >= 1; i--) {
                sum += parseInt(num.charAt(size - i), 10) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            result = sum % 11 < 2 ? 0 : 11 - sum % 11;
            if (result !== parseInt(dig.charAt(n), 10)) {
                // this.loggingProvider.logEventGA('validation_service', 'erro_aplicativo_validacao_cnpj', 'validacao');
                return false;
            }
        }
        return true;
    }

    public static validateCPF(cpfToValidate): boolean {
        const cpf = String(cpfToValidate);
        let num = 9;
        const cpfsBlocked = LOGIN.BLOCKED.CPFS;
        if (cpfsBlocked.indexOf(cpf) !== -1 || cpf.length !== 11 || cpf.trim() === '') {
            // this.loggingProvider.logEventGA('validation_service', 'erro_aplicativo_validacao_cpf', 'validacao');
            return false;
        } else {
            for (num; num < 11; num++) {
                let dig = 0;
                let char = 0;
                for (char; char < num; char++) {
                    dig += parseInt(cpf.charAt(char), 10) * ((num + 1) - char);
                }
                dig = ((10 * dig) % 11) % 10;
                if (parseInt(cpf.charAt(char), 10) !== dig) {
                    // this.loggingProvider.logEventGA('validation_service', 'erro_aplicativo_validacao_cpf', 'validacao');
                    return false;
                }
            }
            return true;
        }
    }

    public static validateTerminal(terminal): boolean {
        terminal = String(terminal);
        const terminalsBlocked = LOGIN.BLOCKED.TERMINALS;
        const dddsAllowed = LOGIN.ALLOWED.DDDS;
        const ddd = terminal.substring(0, 2);
        if (this.hasMoreThan8EqualChars(terminal) || this.isNumReserved(terminal) ||
            dddsAllowed.indexOf(ddd) === -1 || terminalsBlocked.indexOf(terminal) !== -1 ||
            terminal.length !== 10 || terminal.trim() === '') {
            // this.loggingProvider.logEventGA('validation_service', 'erro_aplicativo_validacao_terminal', 'validacao');
            return false;
        }
        return true;
    }

    public static isCPForCNPJ(length) {
        if (!this.isCNPJ(length) && !this.isCPF(length)) {
            // this.loggingProvider.logEventGA('validation_service', 'erro_aplicativo_validacao_cpf_cnpj', 'validacao');
            return false;
        } else {
            return true;
        }
    }
    // this method is to validation of terminal or cpf cnpj if is an terminal or any string example: 'blabla'
    public static isNotANumber(value) {
        if (isNaN(parseInt(value, 10)) || value === '') {
            // this.loggingProvider.logEventGA('validation_service', 'erro_aplicativo_validacao_cpf_cnpj_terminal', 'validacao');
            return true;
        } else {
            return false;
        }
    }
    // this event dont log because is an single validation terminal
    /** ->BEGIN VERIFY IF HAS MORE THAN 8 CHARS EQUAL OCCURRENCES(9 OCCURRENCES)
     * this function validate if for example an terminal is 2100000000 or 3199999999
     * terminal in this condition is invalid
     */
    public static hasMoreThan8EqualChars(terminal): boolean {
        terminal = String(terminal).substring(2);
        const termSplit = terminal.split('');
        const temp = {};
        // tslint:disable-next-line: forin
        for (const i in termSplit) {
            const index = termSplit[i];
            temp[index] = (temp[index] !== undefined) ? (parseInt(temp[index], 10) + 1) : 1;
        }
        for (const i in temp) {
            if (temp[i] >= 8) {
                return true;
            }
        }
        return false;
    }

    public static isNumReserved(terminal) {
        // this event dont log because is an single validation terminal
        terminal = String(terminal).substring(2);
        const reservedNumbers = LOGIN.BLOCKED.NUMS_RESERVED;
        return reservedNumbers.indexOf(terminal) !== -1;
    }

    public static isCPF(length) {
        // this event dont log because is an single validation CPF OR CNPJ
        return length === 11;
    }

    public static isCNPJ(length) {
        // this event dont log because is an single validation CPF OR CNPJ
        return length === 14;
    }
}
