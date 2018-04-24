import { AuthGuard } from './../shared/guards/auth.guard';
import { NotAuthGuard } from './../shared/guards/not-auth.guard';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  { path: 'ingresar', component: SignInComponent, canActivate: [NotAuthGuard] },
  { path: 'registrarse', component: SignUpComponent, canActivate: [NotAuthGuard] },
  { path: 'reset-password', component: ForgotPasswordComponent, canActivate: [NotAuthGuard]},
  { path: 'perfil/:id', component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
