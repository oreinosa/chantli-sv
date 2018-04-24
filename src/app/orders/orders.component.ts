import { Subject } from 'rxjs/Subject';
import { Menu } from './../shared/classes/menu';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from '../shared/classes/order';
import { merge } from 'rxjs/observable/merge';
import { MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/classes/user';
import { shrinkY } from '../shared/animations';
import { Payment } from '../shared/classes/payment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [shrinkY]
})
export class OrdersComponent implements OnInit, OnDestroy, AfterViewInit {
  private ngUnsubscribe = new Subject();
  visibility: boolean = true;
  displayedColumns = ['user-name', 'products', 'status', 'date', 'payment', 'paid', 'actions'];
  dataSource = new MatTableDataSource<Order>([]);
  allOrders: Order[] = [];
  filteredData: Order[];

  filters = {
    allOrders: false,
    anyDate: false,
    anyStatus: true,
    anyPaid: true,
    anyUser: true
  }

  columnsFilters = {
    products: true,
    status: true,
    date: true,
    payment: true,
    paid: true
  }

  allPayment = {
    charged: 0,
    pending: 0,
    cost: 0,
  }


  allStatus = {
    new: 0,
    confirmed: 0,
    packaged: 0,
    delivered: 0
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users: Observable<User[]>;

  status: string = 'Nueva orden';
  orderedForDateFrom: string = new Date().toISOString().substr(0, 10);
  orderedForDateTo: string = new Date().toISOString().substr(0, 10);
  paid: boolean = false;
  user: User;

  newRowIndex: string = '';

  constructor(
    private ordersService: OrdersService,
  ) {
  }

  highlight(id: string) {
    console.log(id);
    this.newRowIndex = id;
    setTimeout(() => {
      this.newRowIndex = '';
    }, 3000);
  }

  onFiltersVisibility() {
    this.visibility = !this.visibility;
  }

  onColumnsFilters() {
    this.displayedColumns = ['user-name'];
    this.columnsFilters.products ? this.displayedColumns.push('products') : false;
    this.columnsFilters.status ? this.displayedColumns.push('status') : false;
    this.columnsFilters.date ? this.displayedColumns.push('date') : false;
    this.columnsFilters.payment ? this.displayedColumns.push('payment') : false;
    this.columnsFilters.paid ? this.displayedColumns.push('paid') : false;
    this.displayedColumns.push('actions');
  }

  ngOnInit() {
    this.users = this.ordersService.getUsers()
    // .do(users => console.log('Usuarios : ', users));
    this.onThisDay();

    this.ordersService
      .getOrders()
      .takeUntil(this.ngUnsubscribe)
      .do(orders => console.log('All orders: ', orders))
      .do(orders => !this.filteredData ? this.filteredData = orders : false)
      .subscribe(orders => {
        this.allOrders = orders;
        this.onFilter();
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sortData(sort: Sort) {
    let data = this.filteredData.slice();
    if (!sort.active || sort.direction == '') {
    } else {
      data = data.sort((a: Order, b: Order) => {
        let isAsc = sort.direction == 'asc';
        // console.log(isAsc, ' ', sort.active);
        switch (sort.active) {
          case 'user-name': return this.compare(a.user.name, b.user.name, isAsc);
          case 'status': return this.compare(a.details.status, b.details.status, isAsc);
          case 'orderedForDate': return this.compare(a.details.orderedForDate, b.details.orderedForDate, isAsc);
          case 'paid': return this.compare(+a.details.paid, +b.details.paid, isAsc);
          default: return 0;
        }
      });
    }
    this.dataSource.data = data;
    console.log('Data after sort : ', this.dataSource.data);
  }

  private compare(a, b, isAsc) {
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onUpdateStatus(order: Order, status: string) {
    this.ordersService.onUpdateStatus(order, status);
  }

  onPay(order: Order) {
    this.ordersService.onPay(order);
  }

  onFilter() {
    console.log('filters : ', this.filters);
    let data = this.allOrders.slice();
    if (!this.filters.allOrders) {
      if (!this.filters.anyUser) {
        data = data.filter(order =>
          order.user.id == this.user.id);
      }
      if (!this.filters.anyDate) {
        const dateFrom = new Date(this.orderedForDateFrom);
        const dateTo = new Date(this.orderedForDateTo);
        dateFrom.setDate(dateFrom.getDate() + 1);
        dateTo.setDate(dateTo.getDate() + 1);
        // console.log('From : ', dateFrom, '. To : ', dateTo);
        data = data.filter(order => {
          // console.log(order.details.orderedForDate, ' ', date);
          // return order;
          return order.details.orderedForDate.getTime() >= dateFrom.getTime() && order.details.orderedForDate.getTime() <= dateTo.getTime();
        });
      }
      if (!this.filters.anyStatus) {
        data = data.filter(order =>
          order.details.status == this.status);

      }
      if (!this.filters.anyPaid) {
        data = data.filter(order =>
          order.details.paid == this.paid);
      }
    }
    console.log(data);
    this.getAllPayments(data);
    this.getAllStatues(data);
    this.filteredData = data;
    this.dataSource.data = data;
  }

  getAllPayments(orders: Order[]) {
    this.allPayment = {
      cost: 0,
      charged: 0,
      pending: 0
    }
    orders.forEach(order => {
      // console.log(!order.payment.balance ? order.id : 'balance');
      this.allPayment.cost += order.payment.cost;
      if (order.details.paid) {
        this.allPayment.charged += order.payment.balance;
      } else {
        this.allPayment.pending += order.payment.balance;
      }
    });
    // console.log(this.allPayment);
  }

  getAllStatues(orders: Order[]) {
    this.allStatus = {
      confirmed: 0,
      new: 0,
      packaged: 0,
      delivered: 0
    }
    orders.forEach(order => {
      switch (order.details.status) {
        case 'Nueva orden':
          this.allStatus.new++;
          break;
        case 'Confirmado':
          this.allStatus.confirmed++;
          break;
        case 'Empaquetado':
          this.allStatus.packaged++;
          break;
        case 'Entregado':
          this.allStatus.delivered++;
          break;
      }
    });
  }

  onAllOrders(flag: boolean) {
    if (flag) {
      this.filters = {
        allOrders: true,
        anyDate: true,
        anyStatus: true,
        anyUser: true,
        anyPaid: true
      }
    }
  }

  onThisWeek() {
    const d = new Date();
    this.orderedForDateFrom = this.getMonday(d).toISOString().substr(0, 10);
    this.orderedForDateTo = this.getFriday(d).toISOString().substr(0, 10);
  }

  onThisDay() {
    const d = new Date();
    this.orderedForDateFrom = this.orderedForDateTo = d.toISOString().substr(0, 10);
  }


  onCheckFilters() {
    if (this.filters.anyUser && this.filters.anyDate && this.filters.anyStatus && this.filters.anyPaid) {
      this.filters.allOrders = true;
    } else {
      this.filters.allOrders = false;
    }
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 1;
    if (day == 6) {
      diff += 7;
    }
    d.setDate(diff);
    d.setHours(17, 0, 0);
    return new Date(d);
  }

  private getFriday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 5;
    if (day == 6 || day == 0) {
      // diff += day == 6 ? 3 : 7;
    }
    d.setDate(diff);
    d.setHours(19, 0, 0);
    return new Date(d);
  }

}
