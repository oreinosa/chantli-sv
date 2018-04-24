import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../shared/classes/product';

@Pipe({
  name: 'productByCategory'
})
export class ProductByCategoryPipe implements PipeTransform {

  transform(products: Product[], categoryName?: string, refresh?: boolean): any {
    return products.filter(product => product.category == categoryName);
  }

}
