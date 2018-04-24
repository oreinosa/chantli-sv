import { fadeIn, fadeOut } from './../../shared/animations';
import { User } from './../../shared/classes/user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WorkplacesService } from '../../admin/workplaces/workplaces.service';
import { Observable } from 'rxjs/Observable';
import { Workplace } from '../../shared/classes/workplace';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn, fadeOut]
})
export class UserComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  user: User;
  workplace: string;
  workplaces: Observable<Workplace[]>;
  constructor(private auth: AuthService, private wpService: WorkplacesService) { }

  ngOnInit() {
    this.workplaces = this.wpService.getAll();

    this.auth.userSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onUpdateWorkplace() {
    this.auth.updateWorkplace(this.workplace, this.user);
  }

}
