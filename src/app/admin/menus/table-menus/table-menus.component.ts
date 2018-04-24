import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Menu } from '../../../shared/classes/menu';
import { Subject } from 'rxjs/Subject';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-table-menus',
  templateUrl: './table-menus.component.html',
  styleUrls: ['./table-menus.component.css']
})
export class TableMenusComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  displayedColumns = ['date', 'products', 'price', 'actions'];
  dataSource: MatTableDataSource<Menu>;
  loaded = false;

  constructor(
    private menusService: MenuService,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.menusService
      .getAll()
      .takeUntil(this.ngUnsubscribe)
      .do(() => this.loaded = true)
      .filter(orders => !(this.dataSource.data.length == orders.length))
      .subscribe(orders => {
        console.log(orders);
        this.dataSource.data = orders;
        // this.loaded = true;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onUpdateActive(menu: Menu, value: boolean) {
    // console.log(value);
    this.menusService.updateActive(menu, value);
  }

}
