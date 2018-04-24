import { NotificationsService } from './../../notifications/notifications.service';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/classes/product';
import { DAO } from '../../shared/classes/dao';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsService implements DAO<Product> {
  private productsCol: AngularFirestoreCollection<Product>;
  private productDoc: AngularFirestoreDocument<Product>;

  constructor(
    private fs: AngularFirestore,
    private notService: NotificationsService
  ) {
    this.productsCol = this.fs
      .collection('products',
      ref => ref
        .orderBy('category', 'desc')
        .orderBy('name', 'asc')
      );
  }

  getAll(forMenu?: boolean): Observable<Product[]> {
    this.productsCol = this.fs
      .collection('products',
      ref => ref
        .orderBy('category', 'desc')
        .orderBy('name', 'asc')
      );

    return this.productsCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return (forMenu ? data : { id, ...data }) as Product;
        });
      })
      .map(products => {
        if (forMenu) {
          return products
            .filter(product =>
              product.category == "Principal" || product.category == "Acompañamiento"
            );
        }
        return products;
      })
      .map(products => products);
  }

  get(id: string): Observable<Product> {
    this.productDoc = this.productsCol.doc(id);
    return this.productDoc
      .snapshotChanges()
      .map(a => {
        const data = a.payload.data()
        const id = a.payload.id;
        return { id, ...data } as Product;;
      });
  }

  add(product: Product): Promise<void> {
    return this.productsCol.add(product)
      .then(doc => this.notService.show(`Agregado ${doc.id}`, 'Productos', 'success'))
      .catch(e => this.notService.show(`Error ${e}`, 'Products', 'danger'));
  }

  update(id: string, product: Product): Promise<void> {
    return this.productsCol.doc(id).update(product)
      .then(doc => this.notService.show(`Actualizado ${id}`, 'Productos', 'info'))
      .catch(e => this.notService.show(`Error ${e}`, 'Products', 'danger'));
  }

  delete(id: string): Promise<void> {
    return this.productsCol.doc(id).delete()
      .then(doc => this.notService.show(`Eliminado ${id}`, 'Productos', 'danger'))
      .catch(e => this.notService.show(`Error ${e}`, 'Products', 'danger'));
  }

  // private compare(a, b, isAsc) {
  //   if (a == b) {
  //     return 0;
  //   }
  //   const flag = (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //   console.log(flag);
  //   return flag;
  // }
}
