export class Product {
  private name: string;
  private measure: string;
  private number: number;
  private price: number;
  private packageNumber: number;
  private weight: number;
  private note: string;


  constructor(name: string, measure: string, number: number, price: number) {
    this.name = name;
    this.measure = measure;
    this.number = number;
    this.price = price;
  }

  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  get Measure(): string {
    return this.measure;
  }

  set Measure(value: string) {
    this.measure = value;
  }

  get Number(): number {
    return this.number;
  }

  set Number(value: number) {
    this.number = value;
  }

  get Price(): number {
    return this.price;
  }

  set Price(value: number) {
    this.price = value;
  }

  get PackageNumber(): number {
    return this.packageNumber;
  }

  set PackageNumber(value: number) {
    this.packageNumber = value;
  }

  get Weight(): number {
    return this.weight;
  }

  set Weight(value: number) {
    this.weight = value;
  }

  get Note(): string {
    return this.note;
  }

  set Note(value: string) {
    this.note = value;
  }
}
