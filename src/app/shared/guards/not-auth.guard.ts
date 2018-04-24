import { NotificationsService } from './../../notifications/notifications.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private notService: NotificationsService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.userSubject
      .take(1)
      .map(user => !user)
      .do(loggedIn => {
        // console.log(loggedIn);
        if (!loggedIn) {
          this.notService.show('Access denied', undefined, 'danger');          
          // console.log('access denied')
          this.router.navigate(['/']);
        }
        
      });
  }
}