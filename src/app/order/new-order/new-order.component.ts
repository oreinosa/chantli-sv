import { Subject } from 'rxjs/Subject';
import { SelectedProducts } from './../../shared/classes/selected-products';
import { MenuProducts } from './../../shared/classes/menu-products';
import { Menu } from './../../shared/classes/menu';
import { Router } from '@angular/router';
import { Product } from './../../shared/classes/product';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrderingService } from '../ordering.service';
import { Order } from '../../shared/classes/order';
import { MenuService } from '../../admin/menus/menu.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  step: number; // STEP OF THE PROCESS

  constructor(
    private ordService: OrderingService,
    private menuService: MenuService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    console.log('init new order');
    this.menuService.menuProductsSubject
      .take(1)
      .subscribe(products => {
        // console.log(products);
        products.mainCourses.length && products.sides.length ? false : this.router.navigate(['menu']);
      }); // VERIFYING IF THERES A MENU SELECTED

    this.ordService.stepSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe(step => this.onStep(step)); // SUBSCRIBING TO STEP

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onStep(step: number) {
    console.log(`Step : ${step}`);
    if (step == 0 || step == 5) {
      this.router.navigate(['menu']);
    }
    this.step = step;
  }

}
