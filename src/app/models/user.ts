export class User {
  private _id: number;
  private _username: string;
  private _password: string;
  private _firstName: string;
  private _middleName: string;
  private _lastName: string;
  private _unp: string;
  private _organization: string;
  private _position: string;
  private _address: string;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get middleName(): string {
    return this._middleName;
  }

  set middleName(value: string) {
    this._middleName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get unp(): string {
    return this._unp;
  }

  set unp(value: string) {
    this._unp = value;
  }

  get organization(): string {
    return this._organization;
  }

  set organization(value: string) {
    this._organization = value;
  }

  get position(): string {
    return this._position;
  }

  set position(value: string) {
    this._position = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
}
