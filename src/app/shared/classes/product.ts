export interface Product {
  id?: string;
  name?: string;
  imageURL?: string;
  cost?: number;
  category?: string;
  extra: number;
  noSides: boolean;
  // description?: string
}
export class Product {
  constructor(
    public id?: string,
    public name?: string,
    public imageURL?: string,
    public cost?: number,
    public category?: string,
    public extra: number = 0,
    public noSides: boolean = false
    // public description?: string
  ) { }
}