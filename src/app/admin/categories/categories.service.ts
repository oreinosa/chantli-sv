import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/classes/category';
import { NotificationsService } from '../../notifications/notifications.service';
import { DAO } from '../../shared/classes/dao';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriesService implements DAO<Category> {

  private categoriesCol: AngularFirestoreCollection<Category>;
  private categoryDoc: AngularFirestoreDocument<Category>;

  constructor(
    private fs: AngularFirestore,
    private notService: NotificationsService
  ) {
    this.categoriesCol = this.fs.collection<Category>('categories');
  }

  getAll(forMenu?: boolean): Observable<Category[]> {
    // this.categoriesCol = this.fs.collection<Category>('categories');
    return this.categoriesCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;
          return { id, ...data } as Category;;
        });
      });;
  }

  get(id: string): Observable<Category> {
    this.categoryDoc = this.categoriesCol.doc(id);
    return this.categoryDoc
      .snapshotChanges()
      .map(a => {
        const data = a.payload.data();
        const id = a.payload.id;
        return { id, ...data } as Category;;
      });
  }

  add(category: Category): Promise<void> {
    return this.categoriesCol.add(category)
      .then(doc => this.notService.show(`Agregado ${doc.id}`, 'Categorías', 'success'))
      .catch(e => this.notService.show(`Error ${e}`, 'Categorías', 'danger'));
  }

  update(id: string, category: Category): Promise<void> {
    return this.categoriesCol.doc(id).update(category)
      .then(doc => this.notService.show(`Actualizado ${id}`, 'Categorías', 'info'))
      .catch(e => this.notService.show(`Error ${e}`, 'Categorías', 'danger'));
  }

  delete(id: string): Promise<void> {
    return this.categoriesCol.doc(id).delete()
      .then(doc => this.notService.show(`Eliminado ${id}`, 'Categorías', 'danger'))
      .catch(e => this.notService.show(`Error ${e}`, 'Categorías', 'danger'));
  }

}
