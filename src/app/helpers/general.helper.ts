import { ProductCodeEnum } from './../enums/product.enum';
import { FeatureEnum } from '../enums/feature.enum';
export class GeneralHelper {
  public static maskMaxLength = {
    cep: 9
  };
  public static maskMinLength = {
    cep: 9
  };
  public static onlyNumbers(input) {
    return (input.match(/[0-9]/g) || []).join('');
  }
  public static arrayIndexToLetter(index) {
    return String.fromCharCode(index + 97);
  }
  public static mask(key, data) {
    const basicMasks = {
      cpf: (input: string) => input
        .replace(new RegExp('([0-9]{4})'), ($1) => `${$1.slice(0, 3)}.${$1.slice(3)}`)
        .replace(new RegExp('([0-9]{3}.[0-9]{4})'), ($1) => `${$1.slice(0, 7)}.${$1.slice(7)}`)
        .replace(new RegExp('([0-9]{3}.[0-9]{3}.[0-9]{4})'), ($1) => `${$1.slice(0, 11)}-${$1.slice(11)}`),
      cnpj: (input: string) => input
        .replace(new RegExp('([0-9]{3})'), ($1) => `${$1.slice(0, 2)}.${$1.slice(2)}`)
        .replace(new RegExp('([0-9]{2}.[0-9]{4})'), ($1) => `${$1.slice(0, 6)}.${$1.slice(6)}`)
        .replace(new RegExp('([0-9]{2}.[0-9]{3}.[0-9]{4})'), ($1) => `${$1.slice(0, 10)}/${$1.slice(10)}`)
        .replace(new RegExp('([0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{5})'), ($1) => `${$1.slice(0, 15)}-${$1.slice(15)}`),
      phone: (input: string) => input
        .replace(new RegExp('([0-9]{3})'), ($1) => `(${$1.slice(0, 2)}) ${$1.slice(2)}`)
        .replace(new RegExp('([0-9]{8})$'), ($1) => `${$1.slice(0, 4)}-${$1.slice(4)}`),
      phoneMasked: (input: string) => input.length < 4 ? input : input
        .replace(new RegExp('([0-9]{3})'), ($1) => `(${$1.slice(0, 2)}) ${$1.slice(2)}`)
        .replace(new RegExp('([0-9]{8})$'), ($1) => `****-${$1.slice(4)}`),
      cep: (input: string) => input
        .replace(new RegExp('([0-9]{8})$'), ($1) => `${$1.slice(0, 5)}-${$1.slice(5)}`),
      contractMasked: (input: string) => input.length < 4 ? input : input
        .replace(new RegExp('([0-9]*)$'), ($1) => `${'*'.repeat($1.length - 4)}${$1.slice($1.length - 4)}`)
    };
    const masks = {
      ...basicMasks,
      cpfOrCnpj: (input: string) => input.length <= 11 ? basicMasks.cpf(input) : basicMasks.cnpj(input),
    };
    return masks[key](data);
  }
  public static compareInputs(values: string[]): string {
    let campo = '';
    for (const item of values) {
      if (campo === '') {
        campo = item;
      } else {
        if (campo !== item) {
          return 'Os campos não coincidem!';
        }
      }
    }
    return '';
  }
  public static maxlengthInput(values: string[], length: number): string {
    for (const item of values) {
      if (item.length > length) {
        return 'É necessário ter no máximo ' + length + ' caracteres';
      }
    }
    return '';
  }
  public static minlengthInput(values, length): string {
    for (const item of values) {
      if (item.trim() === '' || item.length < length) {
        return 'É necessário ter no mínimo ' + length + (length === 1 ? ' caractere' : ' caracteres');
      }
    }
    return '';
  }
  public static charactersInput(values: string) {
    if (values.match('[^a-zA-Z0-9]')) {
      return 'Não é permitido nenhum caractere especial ou espaços';
    } else {
      return '';
    }
  }
  public static phoneInput(values: string) {
    const tel = values.trim().match(/[0-9]/g);
    if (tel.length < 10 || tel.length > 11 || (tel.length === 11 && tel[2] !== '9')) {
      return 'Telefone Inválido';
    } else {
      return '';
    }
  }
  public static validadePassword(valuesInput) {
    let values: string[] = valuesInput;
    let error = '';
    if (values.length === 0) {
      values = ['', ''];
    } else if (values.length === 1) {
      values.push('');
    }
    error = this.minlengthInput(values, 8);
    if (error.length === 0) {
      error = this.maxlengthInput(values, 63);
    }
    if (error.length === 0) {
      error = this.charactersInput(values[0]);
    }
    if (error.length === 0) {
      error = this.compareInputs(values);
    }
    return error;
  }
  public static validadePhone(valuesInput) {
    return this.phoneInput(valuesInput);
  }
  public static validadeSsid(valueInput) {
    let values: string[] = [valueInput, valueInput];
    let error = '';
    if (values.length === 0) {
      values = ['', ''];
    } else if (values.length === 1) {
      values.push('');
    }
    if (error.length === 0) {
      error = this.maxlengthInput(values, 32);
    }
    if (error.length === 0) {
      error = this.charactersInput(values[0]);
    }
    if (error.length === 0) {
      error = this.compareInputs(values);
    }
    return error;
  }
  public static isEmpresarial(cpfOrCnpj: string = '') {
    return cpfOrCnpj.length > 11;
  }
  public static keyCpfOrCnpj(cpfOrCnpj: string = '') {
    return cpfOrCnpj.length > 11 ? 'CNPJ' : 'CPF';
  }
  public static keyIdentifier(product: ProductCodeEnum) {
    if (product === ProductCodeEnum.FIBRA) {
      return 'Nº Cliente';
    }
    if (product === ProductCodeEnum.TVDTH) {
      return 'Nº Contrato';
    }
    return 'Tel';
  }
  public static getProblemIcon(featureCode) {
    const basePath = 'assets/icon/problems-home/';
    switch (featureCode) {
      case FeatureEnum.BANDA_LARGA_LENTA:
      case FeatureEnum.FIBRA_LENTA:
        return basePath + 'internetLenta.svg';
      case FeatureEnum.BANDA_LARGA_INTERMITENTE:
      case FeatureEnum.FIBRA_INTERMITENTE:
        return basePath + 'quedasConstantes.svg';
      case FeatureEnum.BANDA_LARGA_SEM_CONEXAO:
      case FeatureEnum.FIBRA_SEM_CONEXAO:
        return basePath + 'semConexao.svg';
      case FeatureEnum.FIXO_LINHA_MUDA:
      case FeatureEnum.FIBRA_LINHA_MUDA:
        return basePath + 'linhaMuda.svg';
      case FeatureEnum.FIXO_NAO_FAZ_CHAMADA:
      case FeatureEnum.FIBRA_NAO_FAZ_CHAMADA:
        return basePath + 'naoChamada.svg';
      case FeatureEnum.FIXO_NAO_RECEBE_CHAMADA:
      case FeatureEnum.FIBRA_NAO_RECEBE_CHAMADA:
        return basePath + 'naoRecebe.svg';
      case FeatureEnum.FIXO_NAO_FAZ_NEM_RECEBE_CAHAMDA:
      case FeatureEnum.FIBRA_NAO_FAZ_NEM_RECEBE_CAHAMDA:
        return basePath + 'naoChamadaRecebe.svg';
      case FeatureEnum.FIXO_TELEFONE_COM_RUIDO:
      case FeatureEnum.FIBRA_TELEFONE_COM_RUIDO:
        return basePath + 'comRuido.svg';
      case FeatureEnum.FIXO_LINHA_CRUZADA:
        return basePath + 'linhaCruzada.svg';
      case FeatureEnum.FIBRA_PROBLEMAS_TV:
        return basePath + 'problemasTV.svg';
      case FeatureEnum.FIBRA_TV_TELA_PRETA:
        return basePath + 'icone_tv_pb.svg';
      case FeatureEnum.TV_AUSENCIA_SINAL:
        return basePath + 'ausenciaSinal.svg';
      case FeatureEnum.TV_TELA_PRETA:
        return basePath + 'telaPreta.svg';
      case FeatureEnum.TV_CARTAO_INCOMPATIVEL:
        return basePath + 'cartaoIncompativel.svg';
      case FeatureEnum.TV_SERVICO_INATIVO:
        return basePath + 'servicoInativo.svg';
      case FeatureEnum.DEFEITO_NO_CONTROLE:
        return basePath + 'controle_remoto.svg';
      case FeatureEnum.FIBRA_TV_IMAGEM_TOMADA:
        return basePath + 'imagem-tomada.svg';
      case FeatureEnum.FIBRA_TV_IMAGEM_LOGO_OI:
        return basePath + 'logo-oi.svg';
      case FeatureEnum.FIBRA_NETFLIX:
        return basePath + 'acesso-netflix.svg';
      default:
        return basePath + '';
    }
  }
  public static getDate(timestamp) {
    const time = timestamp.toTimeString().slice(0, 5);
    const months = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Septembro', 'Outubro', 'Novembro', 'Dezembro');
    const day = `${timestamp.getDate()} de ${months[timestamp.getMonth()]}`;
    return `${time} do dia ${day}`;
  }
  public static getWeekDay(timestamp) {
    const semana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    return semana[timestamp.getDay()];
  }
  public static getFakeDate(timestamp) {
    const date = new Date(timestamp);
    const dateList = [];

    if (date.getDay() === 6) {
      for (const days of [2, 3, 4]) {
        const appointmentDay = this.addDays(date, days);
        dateList.push(appointmentDay);
      }
      return dateList;
    }

    let weekendFlag = false;
    for (const days of [1, 2, 3]) {
      let appointmentDay = this.addDays(date, days);
      if (appointmentDay.getDay() === 0 || appointmentDay.getDay() === 6 || weekendFlag) {
        appointmentDay = this.addDays(appointmentDay, 2);
        weekendFlag = true;
      }
      dateList.push(appointmentDay);
    }
    return dateList;
  }

  public static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public static getUserRegion(terminalNumber: string) {
    const firstTerminalNumber: string = terminalNumber.charAt(0);
    const rules = [
      ['1', ['2', '3', '7', '8', '9']],
      ['2', ['4', '5', '6']],
      ['3', ['1']],
    ];
    return this.determineRegion(rules, firstTerminalNumber);
  }
  public static determineRegion(rules: any, firstTerminalNumber: string): string {
    for (const rule of rules) {
      if (rule[1].indexOf(firstTerminalNumber) !== -1) {
        return rule[0];
      }
    }
    return 'invalid';
  }

  public static compareSpeed(plano, rede) {
    let planoSpeed = parseInt(plano.match(/\d+/g)[0], 10);
    if (plano.includes('Giga')) {
      planoSpeed = planoSpeed * 1000;
    }
    const redeSpeed = parseInt(rede.match(/\d+/g)[0], 10);
    return redeSpeed >= planoSpeed;
  }

  public static determineWifiInfoEvt(planoContratado, rede5, rede24, isCompatible5Ghz) {
    if (isCompatible5Ghz && rede5 && rede24 && planoContratado) {
      if (this.compareSpeed(planoContratado, rede5.velocidadeAparelho)) {
        return 'dual-band-duplo-maior';
      }
      return 'dual-band-duplo-menor';
    }
    if (isCompatible5Ghz && rede5 && rede24) {
      return 'dual-band-duplo-sem-plano';
    }
    if (isCompatible5Ghz && rede5 && planoContratado) {
      if (this.compareSpeed(planoContratado, rede5.velocidadeAparelho)) {
        return 'dual-band-5-maior';
      }
      return 'dual-band-5-menor';
    }
    if (isCompatible5Ghz && rede5) {
      return 'dual-band-5-sem-plano';
    }
    if (isCompatible5Ghz && planoContratado) {
      if (this.compareSpeed(planoContratado, rede24.velocidadeAparelho)) {
        return 'dual-band-24-maior';
      }
      return 'dual-band-24-menor';
    }
    if (isCompatible5Ghz) {
      return 'dual-band-24-sem-plano';
    }
    if (planoContratado) {
      if (this.compareSpeed(planoContratado, rede24.velocidadeAparelho)) {
        return 'single-band-maior';
      }
      return 'single-band-menor';
    }
    return 'single-band-sem-plano';
  }
}
