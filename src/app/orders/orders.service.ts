import { Details } from './../shared/classes/details';
import { Order } from './../shared/classes/order';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { User } from 'firebase/app';

@Injectable()
export class OrdersService {

  private ordersCol: AngularFirestoreCollection<Order>;
  private orderDoc: AngularFirestoreDocument<Order>;

  private usersCol: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User>;

  constructor(
    private fs: AngularFirestore
  ) {
    this.ordersCol = this.fs.collection<Order>('orders');
    this.usersCol = this.fs.collection<User>('users', ref => ref.orderBy('name', 'asc'));
  }

  getUsers() {
    return this.usersCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Order;
        });
      });
  }

  getOrders(orderedForDate?: Date) {

    this.ordersCol = this.fs.collection<Order>('orders', ref =>
      ref
        .orderBy('details.orderedByDate', 'desc')
        // .orderBy('details.orderedForDate', 'desc')
    );
    return this.ordersCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Order;
        })
      })
  }

  private compare(a, b, isAsc) {
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onUpdateStatus(order: Order, status: string) {
    console.log(order.id, ' set to ', status);
    order.details.status = status;
    return this.ordersCol.doc<Order>(order.id).update(order);
  }

  onPay(order: Order) {
    const date = new Date();
    console.log(order.id, ' paid by ', date);
    order.details.paid = true;
    order.payment.paidDate = date;
    this.ordersCol.doc(order.id).update(order);
  }

}
