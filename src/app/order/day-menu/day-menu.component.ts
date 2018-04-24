import { Subject } from 'rxjs/Subject';
import { MenuProducts } from './../../shared/classes/menu-products';
import { Product } from './../../shared/classes/product';
import { Router } from '@angular/router';
import { Menu } from './../../shared/classes/menu';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Input } from '@angular/core';
import { slideLeft } from '../../shared/animations';
import { MenuService } from '../../admin/menus/menu.service';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { MyOrdersService } from '../../my-orders/my-orders.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.component.html',
  styleUrls: ['./day-menu.component.css'],
  animations: [slideLeft]
})
export class DayMenuComponent implements OnInit, OnDestroy {
  @Input() menu: Menu;
  private ngUnsubscribe = new Subject();
  products: MenuProducts;
  myOrders: Observable<number>;

  constructor(
    private menuService: MenuService,
    private auth: AuthService,
    private myOrdersService: MyOrdersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.auth
      .userSubject
      .filter(user => !!user)
      .take(1)
      .subscribe(user => this.myOrders = this.myOrdersService.alreadyOrdered(this.menu.date));

    this.menuService
      .getMenuProducts(this.menu.id)
      .take(1)
      .subscribe(products => {
        // console.log(`Menu products for ${this.menu.id}`, products);
        this.products = {
          mainCourses: products.filter(product => product.category == "Principal"),
          sides: products.filter(product => product.category == "Acompañamiento")
        };
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelect() {
    this.menuService.menuProductsSubject.next(this.products);
    this.menuService.selMenuSubject.next(this.menu);
    this.router.navigate(['nueva-orden', this.menu.id]);
  }

}
