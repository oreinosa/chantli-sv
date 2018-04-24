import { Pipe, PipeTransform } from '@angular/core';
import { SelectedProducts } from '../classes/selected-products';

@Pipe({
  name: 'calTotal'
})
export class CalTotalPipe implements PipeTransform {

  transform(total: number, selProducts: SelectedProducts, tortillas: number, amount: number = 1): number {
    let _total = total + ((tortillas > 2 ? (tortillas - 2) : 0) * 0.10);
    const extra = selProducts.beverage.extra;
    if (extra) {
      _total += extra;
    }
    // _total *= amount;
    return _total;
  }

}
