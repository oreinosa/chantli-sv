import { Injectable } from '@angular/core';
import { DAO } from '../../shared/classes/dao';
import { User } from '../../shared/classes/user';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotificationsService } from '../../notifications/notifications.service';

@Injectable()
export class UsersService implements DAO<User> {
  private usersCol: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User>;

  constructor(
    private fs: AngularFirestore,
    private notService: NotificationsService
  ) {
    this.usersCol = this.fs.collection<User>('users');
  }

  getAll(forMenu?: boolean): Observable<User[]> {
    // this.usersCol = this.fs.collection<User>('users');
    return this.usersCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;
          return { id, ...data } as User;;
        });
      });;
  }

  get(id: string): Observable<User> {
    this.userDoc = this.usersCol.doc(id);
    return this.userDoc
      .snapshotChanges()
      .map(a => {
        const data = a.payload.data();
        const id = a.payload.id;
        return { id, ...data } as User;;
      });
  }

  add(user: User): Promise<void> {
    return this.usersCol.add(user)
      .then(doc => this.notService.show(`Agregado ${doc.id}`, 'Usuarios', 'success'))
      .catch(e => this.notService.show(`Error ${e}`, 'Usuarios', 'danger'));
  }

  update(id: string, user: User): Promise<void> {
    return this.usersCol.doc(id).update(user)
      .then(doc => this.notService.show(`Actualizado ${id}`, 'Usuarios', 'info'))
      .catch(e => this.notService.show(`Error ${e}`, 'Usuarios', 'danger'));
  }

  delete(id: string): Promise<void> {
    return this.usersCol.doc(id).delete()
      .then(doc => this.notService.show(`Eliminado ${id}`, 'Usuarios', 'danger'))
      .catch(e => this.notService.show(`Error ${e}`, 'Usuarios', 'danger'));
  }

}
