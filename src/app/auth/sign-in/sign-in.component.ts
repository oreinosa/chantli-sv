import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { slideRight } from './../../shared/animations';
import { SignIn } from './../../shared/classes/sign-in';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [slideRight]
})
export class SignInComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  signIn = new SignIn();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.userSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe(user => user ? this.router.navigate(['inicio']) : false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSignIn(signIn: SignIn) {
    // console.log('Submitted : ', this.signIn);
    this.auth.signIn('password',signIn);
  }

  onSignInProvider(provider: string) {
    // console.log('Submitted : ', this.signIn);
    this.auth.signIn(provider);
  }
}
