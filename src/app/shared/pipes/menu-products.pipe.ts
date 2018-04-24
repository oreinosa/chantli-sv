import { Pipe, PipeTransform } from '@angular/core';
import { MenuService } from '../../admin/menus/menu.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../classes/product';

@Pipe({
  name: 'menuProducts'
})
export class MenuProductsPipe implements PipeTransform {
  constructor(
    private menuService: MenuService
  ){}
  
  transform(menuId: string): Observable<Product[]> {
    return this.menuService.getMenuProducts(menuId);
  }

}
