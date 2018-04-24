import { fadeIn, shrinkX } from './../../../shared/animations';
import { OrderingService } from './../../ordering.service';
import { Observable } from 'rxjs/Observable';
import { MenuService } from './../../../admin/menus/menu.service';
import { Product } from './../../../shared/classes/product';
import { SelectedProducts } from './../../../shared/classes/selected-products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.css'],
  animations: [fadeIn, shrinkX]
})
export class Step2Component implements OnInit {
  selProducts: SelectedProducts;
  beverages: Observable<Product[]>;

  constructor(
    private orderService: OrderingService,
    private menusService: MenuService
  ) { }

  ngOnInit() {
    this.orderService.selProductsSubject
      .take(1)
      .subscribe(selProducts => this.selProducts = selProducts);
    this.beverages = this.menusService.getBeverages();
  }

  onSelectBeverage(beverage: Product) {
    this.selProducts.beverage = beverage;
    console.log('Selected order.beverage : ', this.selProducts.beverage);
  }

  onStep(step: number) {
    this.orderService.stepSubject.next(step);
  }

}
