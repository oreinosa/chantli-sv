import { Payment } from './payment';
import { Details } from './details';
import { Product } from './product';
import { User } from './user';
export interface Order {
  id?: string;
  user?: User;
  products?: {
    tortillas?: number,    
    mainCourse?: string,
    sides?: string[],
    beverage?: string
  };
  details?: Details;
  payment?: Payment;
}
