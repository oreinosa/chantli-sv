import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Workplace } from '../../shared/classes/workplace';
import { DAO } from '../../shared/classes/dao';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from '../../notifications/notifications.service';

@Injectable()
export class WorkplacesService implements DAO<Workplace>{

  private workplacesCol: AngularFirestoreCollection<Workplace>;
  private workplaceDoc: AngularFirestoreDocument<Workplace>;

  constructor(
    private fs: AngularFirestore,
    private notService: NotificationsService
  ) {
    this.workplacesCol = this.fs.collection('workplaces', ref => ref.orderBy('name', 'asc'));
  }

  getAll(...filters: any[]): Observable<Workplace[]> {
    this.workplacesCol = this.fs.collection('workplaces', ref => ref.orderBy('name', 'asc'));
    return this.workplacesCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Workplace;
        });
      })
  }
  get(id: string): Observable<Workplace> {
    this.workplaceDoc = this.workplacesCol.doc(id);
    return this.workplaceDoc
      .snapshotChanges()
      .map(a => {
        let data = a.payload.data();
        const id = a.payload.id;
        return { id, ...data } as Workplace;
      });
  }
  add(workplace: Workplace): Promise<void> {
    return this.workplacesCol.add(workplace)
      .then(doc => this.notService.show(`Agregado ${doc.id}`, 'Lugares de trabajo', 'success'))
      .catch(e => this.notService.show(`Error ${e}`, 'Lugares de trabajo', 'danger'));
  }

  update(id: string, workplace: Workplace): Promise<void> {
    return this.workplacesCol.doc(id).update(workplace)
      .then(doc => this.notService.show(`Actualizado ${id}`, 'Lugares de trabajo', 'info'))
      .catch(e => this.notService.show(`Error ${e}`, 'Lugares de trabajo', 'danger'));
  }

  delete(id: string): Promise<void> {
    return this.workplacesCol.doc(id).delete()
      .then(doc => this.notService.show(`Eliminado ${id}`, 'Lugares de trabajo', 'danger'))
      .catch(e => this.notService.show(`Error ${e}`, 'Lugares de trabajo', 'danger'));
  }

}
