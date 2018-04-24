import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { slideLeft } from '../../shared/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [slideLeft]
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.forgotPassword(this.email)
      .then(() => this.router.navigate(['ingresar']));
  }

}
