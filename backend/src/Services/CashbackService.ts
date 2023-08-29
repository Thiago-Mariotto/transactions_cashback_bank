export default class CashbackService {
  constructor() { }

  public calculateCashback(amount: number) {
    let rate = 0;

    if (amount <= 1000) {
      rate = 0.1;
    } else if (amount <= 1500) {
      rate = 0.15;
    } else {
      rate = 0.2;
    }

    return rate;
  }

  public async create(amount: number) {
    const rate = this.calculateCashback(amount);
    const totalCashback = amount * rate;

    const cashbackResult = {
      rate,
      totalCashback,
    };

    return cashbackResult;
  }
}