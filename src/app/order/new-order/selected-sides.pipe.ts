import { Product } from './../../shared/classes/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedSides'
})
export class SelectedSidesPipe implements PipeTransform {

  transform(sides: Product[], sideName?: string): boolean {
    const flag = sides.findIndex(_side => _side.name == sideName) >= 0;
    console.log(flag);
    return flag;
  }

}
