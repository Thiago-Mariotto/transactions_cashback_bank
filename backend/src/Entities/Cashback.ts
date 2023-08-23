export default class Cashback {
  private _id?: string;
  private _rate: number;
  private _accountId: string;
  private _transactionId: string;

  constructor(accountId: string, transactionId: string, rate: number) {
    this._rate = rate;
    this._accountId = accountId;
    this._transactionId = transactionId;
  }

  get rate(): number {
    return this._rate;
  }

  set rate(rate: number) {
    this._rate = rate;
  }

  get accountId(): string {
    return this._accountId;
  }

  get transactionId(): string {
    return this._transactionId;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}