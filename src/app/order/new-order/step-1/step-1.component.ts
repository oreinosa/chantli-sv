import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { fadeIn, shrinkX } from './../../../shared/animations';
import { SelectedProducts } from './../../../shared/classes/selected-products';
import { MenuProducts } from './../../../shared/classes/menu-products';
import { MenuService } from './../../../admin/menus/menu.service';
import { OrderingService } from './../../ordering.service';
import { Product } from './../../../shared/classes/product';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css'],
  animations: [fadeIn, shrinkX]
})
export class Step1Component implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  menuProducts: Observable<MenuProducts>;
  selProducts: SelectedProducts;

  selSides: string[] = [];
  doubleSide: boolean = false;

  constructor(
    private menuService: MenuService,
    private orderService: OrderingService
  ) { }

  ngOnInit() {
    this.menuProducts = this.menuService.menuProductsSubject;
    this.orderService
      .selProductsSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe(selProducts => this.selProducts = selProducts);
    this.orderService
      .selSidesNamesSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe(selSides => this.selSides = selSides);
    // console.log(this.menuProducts);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onDoubleSide() {
    if (this.doubleSide) {
      this.selProducts.sides = [];
      this.selSides = [];
    }
  }

  onSelectMainCourse(mainCourse: Product) {
    this.selProducts.mainCourse = mainCourse;
    // console.log('Selected order.mainCourse : ', this.selProducts.mainCourse);
  }

  onSelectSide(side: Product) {
    let position = -1, lastPos;
    if (this.doubleSide) {
      this.selProducts.sides = [];
      this.selSides = [];
    } else {
      if (this.selProducts.sides.length) {
        position = this.selProducts.sides.findIndex(_side => _side.name == side.name);
        lastPos = this.selProducts.sides.length - 1;
      }
    }
    let action;
    if (position >= 0) {
      action = 'Removed ';
      this.selProducts.sides.splice(position, 1);
      this.selSides.splice(position, 1);
    } else {
      if (this.selProducts.sides.length < 2) {
        action = 'Added ';
        this.selProducts.sides.push(side);
        this.selSides.push(side.name);
        if (this.doubleSide) {
          this.selProducts.sides.push(side);
          this.selSides.push(side.name);
        }
      } else {
        action = 'Replaced ' + this.selProducts.sides[lastPos].name + ' with ';
        this.selProducts.sides[lastPos] = side;
        this.selSides[lastPos] = side.name;
      }
    }

    // console.log(action + side.name);
    console.log('Selected order.sides : ', this.selProducts.sides);
  }

  onStep(step: number) {
    if (step == 2) {
      // this.orderService.selProductsSubject.next(this.selProducts);
    }
    // this.orderService.selSidesNames.next(this.selSides);
    this.orderService.stepSubject.next(step);
  }

}
