export class Agent {
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
  private _rs: string;
  private _ks: string;
  private _bank: string;
  private _bik: string;
  private _phone: string;

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

  get rs(): string {
    return this._rs;
  }

  set rs(value: string) {
    this._rs = value;
  }

  get ks(): string {
    return this._ks;
  }

  set ks(value: string) {
    this._ks = value;
  }

  get bank(): string {
    return this._bank;
  }

  set bank(value: string) {
    this._bank = value;
  }

  get bik(): string {
    return this._bik;
  }

  set bik(value: string) {
    this._bik = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }
}
