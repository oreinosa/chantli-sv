import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Link } from '../../shared/classes/link';
import { Action } from '../../shared/classes/action';
import { User } from '../../shared/classes/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  links: Link[];
  actions: Action[];
  user: Observable<User>;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.navigationSubject
      .subscribe(navigation => {
        this.links = navigation.links;
        this.actions = navigation.actions;
      });
    this.user = this.auth.userSubject;
  }

  onSignOut(){
    this.auth.signOut();
  }

}
