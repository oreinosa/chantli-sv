import { NotificationsService } from './../notifications/notifications.service';
import { Payment } from './../shared/classes/payment';
import { SelectedProducts } from './../shared/classes/selected-products';
import { Product } from './../shared/classes/product';
import { Menu } from './../shared/classes/menu';
import { AuthService } from './../auth/auth.service';
import { Order } from './../shared/classes/order';
import { User } from './../shared/classes/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';

@Injectable()
export class OrderingService {
  selSidesNamesSubject = new BehaviorSubject<string[]>([]);
  selProductsSubject = new BehaviorSubject<SelectedProducts>({
    mainCourse: null,
    sides: [],
    beverage: null
  });
  stepSubject = new BehaviorSubject<number>(1);

  private user: User;

  private ordersCol: AngularFirestoreCollection<Order>;
  private orderDoc: AngularFirestoreDocument<Order>;

  constructor(
    private fs: AngularFirestore,
    private auth: AuthService,
    private notService: NotificationsService
  ) {
    this.auth.userSubject
      .subscribe(user => this.user = user);

    this.ordersCol = this.fs.collection('orders');
  }

  submitNewOrder(selProducts: SelectedProducts, tortillas: number, menu: Menu) {

    let selSides: string[] = [];
    let payment: Payment = {
      balance: menu.price,
      cost: 0,
      // paidDate: new Date()
    };
    selProducts.sides.forEach(side => {
      payment.cost += side.cost;
      selSides.push(side.name); // adding names to order
    });

    // CALCULATE TOTAL COST AND ASSIGN TO ORDER 
    payment.cost += selProducts.mainCourse.cost + selProducts.beverage.cost + (tortillas * 0.05); // 5 cents per tortilla

    // ADD 0.1 PER EXTRA TORTILLAS (> 2)
    payment.balance += ((tortillas > 2 ? (tortillas - 2) : 0) * 0.10);

    // ADD 0.25 PER DIFFERENT SODA
    if (selProducts.beverage.extra) {
      payment.balance += selProducts.beverage.extra;
    }

    const order: Order = {
      user: {
        name: this.user.name,
        id: this.user.id
      },
      details: {
        status: 'Nueva orden',
        paid: false,
        orderedByDate: new Date(),
        orderedForDate: menu.date,
      },
      payment: payment,
      products: {
        tortillas: tortillas,
        mainCourse: selProducts.mainCourse.name,
        sides: selSides,
        beverage: selProducts.beverage.name
      }
    };
    console.log('Submitting newOrder : ', order);
    return this.ordersCol.add(order)
      .then(order => {
        this.notService.show('Orden exitosa', 'Ordenar', 'success');
        this.stepSubject.next(5);
        console.log('added ', order);
      })
      .catch(e => console.log('error adding ', e));
  }

  cancelOrder(id: string) {
    this.ordersCol.doc(id)
      .update({

      })
  }

  deleteOrder(id: string) {

  }

}
