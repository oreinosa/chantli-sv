import { MenuProducts } from './../../shared/classes/menu-products';
import { Product } from './../../shared/classes/product';
import { Menu } from './../../shared/classes/menu';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';
import { NotificationsService } from '../../notifications/notifications.service';
import { LoggerService } from '../../logger/logger.service';
import { DAO } from '../../shared/classes/dao';

@Injectable()
export class MenuService implements DAO<Menu>{
  selMenuSubject = new BehaviorSubject<Menu>(null);
  menuProductsSubject = new BehaviorSubject<MenuProducts>({
    mainCourses: [],
    sides: [],
  });

  private menusCol: AngularFirestoreCollection<Menu>;
  private menuDoc: AngularFirestoreDocument<Menu>;
  private productsCol: AngularFirestoreCollection<Product>;
  private beveragesCol: AngularFirestoreCollection<Product>;

  private currentMenu = new BehaviorSubject<{
    mainCourses: Product[],
    sides: Product[],
  }>(null);

  constructor(
    private fs: AngularFirestore,
    private notService: NotificationsService,
    private logger: LoggerService
  ) {
    this.logger.log('menu service init');
    this.beveragesCol = this.fs.collection('products', ref => ref.where('category', '==', 'Bebida').orderBy('name', 'asc'));
    this.menusCol = this.fs.collection('menus');
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

  getWeekMenus() {
    const d = new Date();
    console.log('Today date : ', d);
    console.log('Monday : ', this.getMonday(d));
    console.log('Friday : ', this.getFriday(d));

    this.menusCol = this.fs.collection<Menu>('menus',
      ref =>
        ref
          // .where('active', '==', true)
          .where('date', '>=', this.getMonday(d))
          .where('date', '<=', this.getFriday(d))
    );

    return this.menusCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Menu;
          const id = a.payload.doc.id;
          return { id, ...data } as Menu;
        });
      })
      .do(menus => this.logger.log('Menus : ', menus))
  }

  getAll() {
    this.menusCol = this.fs.collection<Menu>('menus');

    return this.menusCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Menu;
        });
      })
      .map(menus => menus.sort((a, b) => this.compare(a.date, b.date, false)));
  }

  get(id: string) {
    this.menuDoc = this.menusCol.doc(id);
    return this.menuDoc
      .snapshotChanges()
      .map(a => {
        let data = a.payload.data();
        const id = a.payload.id;
        return { id, ...data } as Menu;
      });
  }

  getMenuProducts(id: string) {
    this.menuDoc = this.menusCol.doc(id);
    this.productsCol = this.menuDoc.collection<Product>('products');
    return this.productsCol
      .snapshotChanges()
      .map(actions => {
        return actions
          .map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return { id, ...data } as Product;
          })
      })
      .map(product => product.sort((a, b) => this.compare(a.name, b.name, true)));

  }

  getBeverages() {
    return this.beveragesCol.valueChanges();
  }

  add(menu: Menu, products: Product[]) {
    return this.menusCol.add(menu)
      .then(doc => {
        this.menuDoc = this.menusCol.doc(doc.id);
        let productosCol: AngularFirestoreCollection<Product> = this.menuDoc.collection<Product>('products');
        const batch = firebase.firestore().batch();
        for (let product of products) {
          product.id = this.fs.createId();
          const ref = productosCol.doc(product.id).ref;
          batch.set(ref, product);
        }
        return batch.commit().then(() => doc.id)
      })
      .then(menuId => this.notService.show(`Menu agregado ${menuId}`, 'Menus', 'success'))
      .catch(e => this.notService.show(`Error agregando menu ${e}`, 'Menus', 'danger'));
  }

  update(id: string, menu: Menu, products: Product[], delProducts: Product[]) {
    this.menuDoc = this.menusCol.doc(id);
    return this.menuDoc.update(menu)
      .then(doc => {
        let productosCol: AngularFirestoreCollection<Product> = this.menuDoc.collection<Product>('products');
        const batch = firebase.firestore().batch();
        const allProducts = products.concat(delProducts).slice();
        for (let product of allProducts) {
          let flag = true;
          if (!product.id) { product.id = this.fs.createId(); flag = false };
          const ref = productosCol.doc(product.id).ref;
          flag ? batch.delete(ref) : batch.set(ref, product);
        }
        return batch.commit();
      })
      .then(() => this.notService.show(`Menu actualizado ${menu.id}`, 'Menus', 'info'))
      .catch(e => this.notService.show(`Error actualizando menu (ID : ${menu.id}) ${e}`, 'Menus', 'danger'));
  }

  delete(id: string): Promise<void> {
    return this.menusCol.doc(id).delete()
      .then(doc => this.notService.show(`Eliminado ${id}`, 'Menus', 'danger'))
      .catch(e => this.notService.show(`Error ${e}`, 'Menus', 'danger'));
  }

  updateActive(menu: Menu, value: boolean) {
    menu.active = value;
    return this.menusCol.doc(menu.id).update(menu);
  }

  private compare(a, b, isAsc) {
    if (a instanceof Date && b instanceof Date) {
      // this.logger.log(a, ' vs ', b);
      if (a.getTime() == b.getTime()) {
        return 0;
      }
      return (a.getTime() < b.getTime() ? -1 : 1) * (isAsc ? 1 : -1);
    }
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
