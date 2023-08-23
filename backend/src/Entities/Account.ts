import Email from './ObjectValues/Email';
import Name from './ObjectValues/Name';
import Password from './ObjectValues/Password';

export default class Account {
  private _id?: number;
  private _name: Name;
  private _email: Email;
  private _password: Password;
  private _active: boolean;

  constructor(name: string, email: string, password: string) {
    this._name = Name.fromString(name);
    this._email = Email.fromString(email);
    this._password = Password.fromString(password);
    this._active = true;
  }

  get name(): string {
    return this._name.value;
  }

  set name(value: string) {
    this._name = Name.fromString(value);
  }

  get email(): string {
    return this._email.value;
  }

  public set email(value: string) {
    this._email = Email.fromString(value);
  }

  get password(): string {
    return this._password.value;
  }

  set password(value: string) {
    this._password = Password.fromString(value);
  }

  get active(): boolean {
    return this._active;
  }

  get id(): number | undefined {
    return this._id;
  }
}