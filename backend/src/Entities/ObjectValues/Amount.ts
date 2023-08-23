import BadRequest from '../../Errors/BadRequest';

export default class Amount {
  private amount: number;

  constructor(value: number) {
    this.amount = value;
  }

  public equals(value: Amount): boolean {
    return this.amount === value.amount;
  }

  public static fromNumber(value: number) {
    if (!Amount.validateValue(value)) throw new BadRequest('Valor da transação inválido');
    return new Amount(value);
  }

  private static validateValue(value: number): boolean {
    if (value < 0) return false;
    const isNumber = /^[0-9]+$/;
    return isNumber.test(value.toString());
  }

  public get value(): number {
    return this.amount;
  }
}