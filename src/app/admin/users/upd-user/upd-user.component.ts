import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../../../shared/classes/user';
import { Subject } from 'rxjs/Subject';
import { LoggerService } from '../../../logger/logger.service';
import { WorkplacesService } from '../../workplaces/workplaces.service';
import { Observable } from 'rxjs/Observable';
import { Workplace } from '../../../shared/classes/workplace';

@Component({
  selector: 'app-upd-user',
  templateUrl: './upd-user.component.html',
  styleUrls: ['./upd-user.component.css']
})
export class UpdUserComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  user: User;
  workplaces: Observable<Workplace[]>;

  constructor(
    private usersService: UsersService,
    private wpService: WorkplacesService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    this.workplaces = this.wpService.getAll();
    
    this.route.paramMap
      .takeUntil(this.ngUnsubscribe)
      .do((params: ParamMap) => params.get('id') ? false : this.onBack())
      .switchMap(params => this.usersService.get(params.get('id')))
      .takeUntil(this.ngUnsubscribe)
      .do((user: User) => user ? false : this.onBack())
      .do(user => this.logger.log('User : ', user))
      .subscribe(user => this.user = user, e => this.onBack())
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(id: string, user: User) {
    this.usersService.update(id, user)
      .then(() => this.onBack());
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
