import BadRequest from '../../Errors/BadRequest';

export default class Email {
  private email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public equals(email: Email): boolean {
    return this.email === email.value;
  }

  public static fromString(email: string) {
    if (!Email.validateEmail(email)) throw new BadRequest('Email inválido');
    return new Email(email);
  }

  private static validateEmail(email: string): boolean {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isValid.test(email);
  }

  public get value(): string {
    return this.email;
  }
}
