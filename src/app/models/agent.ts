export class Agent {
  private id: number;
  private firstName: string;
  private middleName: string;
  private lastName: string;
  private unp: string;
  private organization: string;
  private position: string;
  private address: string;
  private rs: string;
  private ks: string;
  private bank: string;
  private bik: string;
  private phone: string;

  get Id(): number {
    return this.id;
  }

  set Id(value: number) {
    this.id = value;
  }

  get FirstName(): string {
    return this.firstName;
  }

  set FirstName(value: string) {
    this.firstName = value;
  }

  get MiddleName(): string {
    return this.middleName;
  }

  set MiddleName(value: string) {
    this.middleName = value;
  }

  get LastName(): string {
    return this.lastName;
  }

  set LastName(value: string) {
    this.lastName = value;
  }

  get Unp(): string {
    return this.unp;
  }

  set Unp(value: string) {
    this.unp = value;
  }

  get Organization(): string {
    return this.organization;
  }

  set Organization(value: string) {
    this.organization = value;
  }

  get Position(): string {
    return this.position;
  }

  set Position(value: string) {
    this.position = value;
  }

  get Address(): string {
    return this.address;
  }

  set Address(value: string) {
    this.address = value;
  }

  get Rs(): string {
    return this.rs;
  }

  set Rs(value: string) {
    this.rs = value;
  }

  get Ks(): string {
    return this.ks;
  }

  set Ks(value: string) {
    this.ks = value;
  }

  get Bank(): string {
    return this.bank;
  }

  set Bank(value: string) {
    this.bank = value;
  }

  get Bik(): string {
    return this.bik;
  }

  set Bik(value: string) {
    this.bik = value;
  }

  get Phone(): string {
    return this.phone;
  }

  set Phone(value: string) {
    this.phone = value;
  }
}
