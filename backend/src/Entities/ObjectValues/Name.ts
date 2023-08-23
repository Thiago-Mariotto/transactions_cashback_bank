import BadRequest from '../../Errors/BadRequest';

export default class Name {
  private name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public equals(name: Name): boolean {
    return this.name === name.value;
  }

  public static fromString(name: string) {
    Name.validateLength(name);
    return new Name(name);
  }

  private static validateLength(name: string): BadRequest | void {
    if (name.length < 2) throw new BadRequest('Nome precisa ter pelo menos 2 caracteres');
    if (name.length > 64) throw new BadRequest('Nome precisa ter no máximo 64 caracteres');
  }

  public get value(): string {
    return this.name;
  }
}
