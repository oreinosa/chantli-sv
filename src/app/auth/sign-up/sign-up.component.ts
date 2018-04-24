import { Subject } from 'rxjs/Subject';
import { SignUp } from './../../shared/classes/sign-up';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { slideLeft } from '../../shared/animations';
import { Workplace } from '../../shared/classes/workplace';
import { WorkplacesService } from '../../admin/workplaces/workplaces.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [slideLeft]
})
export class SignUpComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  signUp = new SignUp();
  workplaces: Observable<Workplace[]>;

  constructor(
    private wpService: WorkplacesService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.workplaces = this.wpService.getAll();
    this.auth.userSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe(user => user ? this.router.navigate(['home']) : false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSignUp(signUp: SignUp) {
    // console.log('Submitted : ', this.signUp);
    this.auth.signUp('password', signUp);
  }


}
