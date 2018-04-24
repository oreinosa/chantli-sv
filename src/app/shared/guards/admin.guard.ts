import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';

import { NotificationsService } from '../../notifications/notifications.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private notService: NotificationsService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const user = this.auth.userSubject.getValue();
    if (this.auth.authenticated && user) {
      if (user.role == "Admin") { return true; }
    }
    return this.auth.userSubject
      .asObservable()
      .take(2)
      .skip(1)
      .map(user => user && user.role == "Admin")
      .do(admin => {
        if (!admin) {
          console.log("access denied")
          this.router.navigate(['/menu']);
        }
      })
  }
}