import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  { path: 'ordenes', component: OrdersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'orden/:id', component: OrderComponent, canActivate: [AuthGuard, ] },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
