export interface Category {
  id?: string
  name?: string;
  description?: string;
}

export class Category {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string
  ) { }
}
