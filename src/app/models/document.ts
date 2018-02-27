export class Document {
  private id: number;
  private name: string;
  private date: string;

  get Id(): number {
    return this.id;
  }

  set Id(value: number) {
    this.id = value;
  }

  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  get Date(): string {
    return this.date;
  }

  set Date(value: string) {
    this.date = value;
  }
}
