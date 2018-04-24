// import { MessagingService } from './../notifications/messaging.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/classes/user';
import { Link } from '../shared/classes/link';
import { Action } from '../shared/classes/action';
import { SignIn } from '../shared/classes/sign-in';
import { SignUp } from '../shared/classes/sign-up';
import { NotificationsService } from '../notifications/notifications.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private links: Link[] = [];
  private actions: Action[] = [];
  private user: User = null;
  navigationSubject = new BehaviorSubject<{ links: Link[], actions: Action[] }>({ links: [], actions: [] });
  userSubject = new BehaviorSubject<User>(null);
  private usersCol: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User>;

  constructor(
    private fs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private notService: NotificationsService,
    // private msgService: MessagingService
  ) {
    this.usersCol = this.fs.collection('users');
    this.afAuth.authState
      .switchMap((fbUser: firebase.User) => {
        // console.log(fbUser);
        if (fbUser) {
          // if (fbUser.emailVerified) {
          return this.usersCol.doc<User>(fbUser.uid).valueChanges();
          // }
          // this.signOut();
          // fbUser.sendEmailVerification()
          //   .then((a) => this.notService.show('Verifica tu correo, por favor!', 'Inicio de sesión', 'info'));
        }
        return Observable.of(null);
      })
      .subscribe((user: User) => {
        // console.log(user);
        this.setUser(user);
      });
  }

  getAll() {
    this.usersCol = this.fs.collection('users');
    return this.usersCol
      .snapshotChanges()
    // .map(doc)
  }

  signIn(method: string, signIn?: SignIn) {
    switch (method) {
      case 'password':
        return this.afAuth.auth.signInWithEmailAndPassword(signIn.email, signIn.password)
          .catch(() => this.notService.show('Correo/contraseña incorrectos', 'Inicio de sesión', 'danger'));
      // break;
      case 'google':
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.afAuth.auth
          .signInWithPopup(provider)
          .then(a => {
            console.log(a.user.uid);
            return this.fs.firestore.doc(`users/${a.user.uid}`)
              .get()
              .then(user => {
                console.log(user);
                return user.exists ? null : a.user;
              });
          })
          .then(fbUser => {
            console.log(fbUser);
            if (fbUser) {
              return this.updateUserData({
                id: fbUser.uid,
                name: fbUser.displayName,
                email: fbUser.email,
                role: 'Cliente'
              })
            }
            return fbUser;
          });
    }

  }

  signUp(method: string, signUp?: SignUp) {
    switch (method) {
      case 'password':
        this.afAuth.auth.createUserWithEmailAndPassword(signUp.email, signUp.password)
          .catch(e => this.notService.show(e, 'Registrarse', 'danger'))
          .then((fbUser: firebase.User) => {
            // console.log(signUp);            
            return fbUser.updateProfile({
              displayName: signUp.name,
              photoURL: ''
            }).then(() => {
              fbUser.sendEmailVerification().then();
              return this.updateUserData({
                id: fbUser.uid,
                name: fbUser.displayName,
                email: fbUser.email,
                workplace: signUp.workplace,
                role: 'Cliente'
              })
                .then(() => fbUser);
            });
          })
          .then(fbUser => this.notService.show(`Bienvenido, ${fbUser.displayName}!`, 'Registrarse', 'success'))
          .catch(e => this.notService.show(e, 'Registrarse', 'danger'));;
        break;
    }
  }

  updateWorkplace(workplace: string, user: User) {
    user.workplace = workplace;
    return this.updateUserData(user);
  }

  forgotPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(a => this.notService.show(`Hemos enviado un correo a ${email}`, 'Contraseña', 'info'));
  }

  signOut() {
    // console.log('signout');
    return this.router.navigate(['']).then(() => this.afAuth.auth.signOut());
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get authenticated(): boolean {
    return this.user !== null && this.user.id !== null;
  }

  private setUser(user: User) {
    this.user = user;
    this.setNavigation(this.user ? this.user.role : null);
    this.userSubject.next(this.user);
    if (user) {
      // this.msgService.getPermission(user)
      // this.msgService.receiveMessages();
      // this.msgService.currentMessage
      //   .filter(message => !!message)
      //   .subscribe(message => {
      //     this.notService.show(message, 'Notification', 'info');
      //   });

      let navigateTo;
      switch (user.role) {
        case 'Cliente':
          navigateTo = 'menu';
          this.router.navigateByUrl(navigateTo);
          break;
        // case 'Admin':
        //   navigateTo = 'ordenes';
        //   break;
        // default:
        //   navigateTo = 'ingresar';
        //   break;
      }
    }
  }

  private updateUserData(user: User) {
    // Sets user data to firestore on login
    // console.log(user);
    const userRef: AngularFirestoreDocument<User> = this.fs.doc(`users/${user.id}`);
    return userRef.set(user);
  }

  private setNavigation(rol?: string) {
    this.links = [
      // new Link('inicio', 'Inicio', 'home'),
    ];
    this.actions = [
      new Action(`perfil/${this.user ? this.user.id : ''}`, 'Mis pedidos', 'person_pin'),
    ];

    switch (rol) {
      case 'Admin':
        this.links.push(
          new Link('admin', 'Admin', 'build')
        );
      case 'Gestor':
        this.links.push(
          new Link('ordenes', 'Ordenes', 'assignment')
        );
      case 'Cliente':
        this.links.push(
          new Link('menu', 'Ordenar!', 'shopping_cart')
        );
        break;
      default:
        this.actions = [
          new Action('ingresar', 'Ingresar', 'person'),
          new Action('registrarse', 'Registrarse', 'person_add'),
        ];
        break;
    }

    // console.log('Links : ', this.links);
    // console.log('Actions : ', this.actions);
    this.navigationSubject.next({ links: this.links, actions: this.actions });
  }
}