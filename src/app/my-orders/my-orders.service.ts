import { Order } from './../shared/classes/order';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { User } from '../shared/classes/user';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MyOrdersService {

  private ordersCol: AngularFirestoreCollection<Order>;
  private orderDoc: AngularFirestoreDocument<Order>;

  private user: User;

  constructor(
    private fs: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.userSubject
      .filter(user => !!user)
      .do(user => this.ordersCol = this.fs.collection<Order>('orders', ref => ref.where('user.id', '==', user.id)))
      .subscribe(user => this.user = user);

  }

  getMyOrders(user: User) {
    this.ordersCol = this.fs.collection<Order>('orders', ref => ref.where('user.id', '==', user.id).orderBy('details.orderedForDate', "desc"));
    return this.ordersCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Order;
        });
      });
  }

  alreadyOrdered(date: Date) {
    this.ordersCol = this.fs.collection('orders', ref => ref
      .where('user.id', '==', this.user.id)
      .where('details.orderedForDate', '==', date));
    return this.ordersCol
      .valueChanges()
      .map(orders => orders.length);
  }

  onCancelOrder(order: Order) {
    console.log(order.id, ' set to ', status);
    order.details.status = 'Cancelada';
    this.ordersCol.doc(order.id).update(order);
  }


}
