import { NewOrderComponent } from './new-order/new-order.component';
import { WeekMenuComponent } from './week-menu/week-menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { WorkplaceGuard } from '../shared/guards/workplace.guard';

const routes: Routes = [
  { path: 'menu', component: WeekMenuComponent},
  { path: 'nueva-orden/:id', component: NewOrderComponent, canActivate: [AuthGuard, WorkplaceGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
