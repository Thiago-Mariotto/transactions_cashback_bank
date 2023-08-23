import BadRequest from '../Errors/BadRequest';
import Account from './Account';

export default class PersonAccount extends Account {
  private _CPF: string;

  constructor(name: string, email: string, password: string, CPF: string) {
    super(name, email, password);
    if (!this.validCpf(CPF)) throw new BadRequest('CPF inválido');
    this._CPF = this.formatCPF(CPF);
  }

  get CPF(): string {
    return this._CPF;
  }

  private validCpf(cpf: string) {
    if (!cpf) return false;
    cpf = this.cleanCpf(cpf);
    if (!this.isValidLength(cpf)) return false;
    if (this.hasAllDigitsEqual(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, 10);
    const digit2 = this.calculateDigit(cpf, 11);
    const checkDigit = this.extractDigit(cpf);
    const calculatedDigit = `${digit1}${digit2}`;
    return checkDigit == calculatedDigit;
  }

  private formatCPF(value: string) {
    const strCPF = this.cleanCpf(value);
    return strCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    );
  }

  private cleanCpf(cpf: string) {
    return cpf.replace(/[^\d]+/g, '');
  }

  private isValidLength(cpf: string) {
    return cpf.length === 11 || cpf.length === 14;
  }

  private hasAllDigitsEqual(cpf: string) {
    const [firstDigit] = cpf;
    return cpf.split('').every(digit => digit === firstDigit);
  }

  private extractDigit(cpf: string) {
    return cpf.slice(9);
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
  }
}