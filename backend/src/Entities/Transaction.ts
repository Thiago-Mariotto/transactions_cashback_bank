import Amount from './ObjectValues/Amount';

export default class Transaction {
  private _id?: string;
  private _accountId: string;
  private _amount: Amount;
  private _date: Date;

  constructor(accountId: string, value: number,) {
    this._amount = Amount.fromNumber(value);
    this._accountId = accountId;
    this._date = new Date();
  }

  get value(): number {
    return this._amount.value;
  }

  set value(value: number) {
    this._amount = Amount.fromNumber(value);
  }

  get accountId(): string {
    return this._accountId;
  }

  get date(): Date {
    return this._date;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}