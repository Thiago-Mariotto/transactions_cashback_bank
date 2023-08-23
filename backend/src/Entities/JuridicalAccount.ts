import BadRequest from '../Errors/BadRequest';
import Account from './Account';

export default class JuridicalAccount extends Account {
  private _CNPJ: string;

  constructor(name: string, email: string, password: string, CNPJ: string) {
    super(name, email, password);
    this._CNPJ = this.validateCNPJ(CNPJ);
  }

  get CNPJ(): string {
    return this._CNPJ;
  }

  private formatCNPJ(value: number[]) {
    // Formatação do CNPJ: 99.999.999/9999-99
    return value.join('').replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  }

  private validCalc(x: number, numbers: number[]) {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  }

  private matchNumbers(value: string | number) {
    const match = value.toString().match(/\d/g);
    return Array.isArray(match) ? match.map(Number) : [];
  }

  private checkBlacklist(CNPJ: string) {
    const BLACKLIST: Array<string> = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999'
    ];

    const numbers = CNPJ.replace(/[^\d]+/g, '');
    return BLACKLIST.includes(numbers);
  }

  private validateCNPJ(CNPJ: string) {
    const numbers = this.matchNumbers(CNPJ);

    // Separa os 2 últimos dígitos verificadores
    const digits = numbers.slice(12);

    // Valida 1o. dígito verificador
    const digit0 = this.validCalc(12, numbers);
    if (digit0 !== digits[0]) throw new BadRequest('CNPJ inválido');

    // Valida 2o. dígito verificador
    const digit1 = this.validCalc(13, numbers);
    if (digit1 !== digits[1]) throw new BadRequest('CNPJ inválido');

    // Formatação do CNPJ: 99.999.999/9999-99
    const formatedCNPJ = this.formatCNPJ(numbers);
    if (this.checkBlacklist(formatedCNPJ)) throw new BadRequest('CNPJ inválido');

    return formatedCNPJ;
  }
}