export interface Status {
  id?: string;
  name?: string;
  description?: string;
  color?: string;
}
export class Status {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public color?: string,
  ) { }
}