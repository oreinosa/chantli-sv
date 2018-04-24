import { Product } from './product';
export interface Menu {
  id?: string;
  date?: Date;
  active?: boolean;
  price?: number,
  products?: {
    mainCourses?: Product[],
    sides?: Product[],
  }

}
export class Menu {
  constructor(
    public id?: string,
    public date?: Date,
    public active?: boolean,
    public price?: number,
    public products?: {
      mainCourses?: Product[],
      sides?: Product[],
    }
  ) { }
}