import { MyOrdersModule } from './../my-orders/my-orders.module';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { WorkplacesService } from '../admin/workplaces/workplaces.service';

@NgModule({
  imports: [
    SharedModule,
    MyOrdersModule,
    AuthRoutingModule
  ],
  declarations: [SignInComponent, SignUpComponent, UserComponent, ForgotPasswordComponent],
  providers: [WorkplacesService]
})
export class AuthModule { }
