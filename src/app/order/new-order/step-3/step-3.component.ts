import { fadeIn } from './../../../shared/animations';
import { SelectedProducts } from './../../../shared/classes/selected-products';
import { OrderingService } from './../../ordering.service';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../admin/menus/menu.service';
import { Menu } from '../../../shared/classes/menu';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css'],
  animations: [fadeIn]
})
export class Step3Component implements OnInit {
  menu: Menu;
  selProducts: SelectedProducts;
  tortillas: number = 2;

  constructor(
    private orderService: OrderingService,
    private menusService: MenuService
  ) { }

  ngOnInit() {
    this.menusService
      .selMenuSubject
      .take(1)
      .subscribe(menu => {
        // console.log(orderedForDate);
        this.menu = menu
      });

    this.orderService
      .selProductsSubject
      .take(1)
      .subscribe(selProducts => this.selProducts = selProducts);
  }

  onConfirm() {
    this.orderService.stepSubject.next(4);
    this.orderService.submitNewOrder(this.selProducts, this.tortillas, this.menu);
    console.log('Confirming order');
  }

  onStep(step: number) {
    this.orderService.stepSubject.next(step);
  }

}
