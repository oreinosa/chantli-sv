import { OrderingService } from './../ordering.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Menu } from '../../shared/classes/menu';
import { MenuService } from '../../admin/menus/menu.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-week-menu',
  templateUrl: './week-menu.component.html',
  styleUrls: ['./week-menu.component.css']
})
export class WeekMenuComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  menus: Menu[];

  constructor(
    private menuService: MenuService,
    private orderService: OrderingService
  ) { }

  ngOnInit() {
    this.initNewOrder();
    this.menuService
      .getWeekMenus()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(menus => this.menus = menus);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  initNewOrder() {
    this.orderService.stepSubject.next(1);
    this.orderService.selProductsSubject.next({
      mainCourse: null,
      sides: [],
      beverage: null
    });
    this.orderService.selSidesNamesSubject.next([]);
    this.menuService.selMenuSubject.next(null);
    this.menuService.menuProductsSubject.next({
      mainCourses: null,
      sides: [],
    });
  }

}
