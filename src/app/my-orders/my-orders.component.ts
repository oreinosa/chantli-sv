import { User } from './../shared/classes/user';
import { MyOrdersService } from './my-orders.service';
import { Order } from './../shared/classes/order';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSort, MatPaginator, MatTableDataSource, Sort } from '@angular/material';
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, AfterViewInit {
  @Input() user: User;
  private ngUnsubscribe = new Subject();
  displayedColumns = ['products', 'status', 'orderedForDate', 'price', 'paid'];
  dataSource = new MatTableDataSource<Order>([]);
  dataSubject = new BehaviorSubject<Order[]>([]);
  // allOrders: Order[] = []
  // filters = {
  //   allOrders: true,
  //   anyDate: true,
  //   anyDelivered: true,
  //   anyPaid: true
  // }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  status: string = 'Nueva orden';
  orderedForDate: string = new Date().toISOString().substr(0, 10);
  paid: boolean = false;

  constructor(
    private myOrdersService: MyOrdersService,
  ) {
  }

  ngOnInit() {
    this.myOrdersService
      .getMyOrders(this.user)
      .takeUntil(this.ngUnsubscribe)
      .do(orders => console.log(orders))
      .subscribe(orders => this.dataSubject.next(orders));

    this.dataSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe(orders => this.dataSource.data = orders)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sortData(sort: Sort) {
    const data = this.dataSubject.getValue().slice();
    if (!sort.active || sort.direction == '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a: Order, b: Order) => {
      let isAsc = sort.direction == 'asc';
      // console.log(isAsc, ' ', sort.active);
      switch (sort.active) {
        case 'status': return this.compare(a.details.status, b.details.status, isAsc);
        case 'orderedForDate': return this.compare(a.details.orderedForDate, b.details.orderedForDate, isAsc);
        case 'price': return this.compare(a.payment.balance, b.payment.balance, isAsc);
        case 'paid': return this.compare(+a.details.paid, +b.details.paid, isAsc);
        // case 'protein': return this.compare(+a.protein, +b.protein, isAsc);
        default: return 0;
      }
    });
    for (let object of this.dataSource.data) {
      const _object: Order = object as Order;
      console.log(_object.details.status);
    }
  }

  private compare(a, b, isAsc) {
    const value = (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    console.log(value);
    return value;
  }
}
