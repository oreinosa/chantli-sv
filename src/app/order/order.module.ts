import { MenuService } from './../admin/menus/menu.service';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';
import { NewOrderComponent } from './new-order/new-order.component';
import { WeekMenuComponent } from './week-menu/week-menu.component';
import { DayMenuComponent } from './day-menu/day-menu.component';
import { OrderingService } from './ordering.service';
import { SelectedSidesPipe } from './new-order/selected-sides.pipe';
import { Step1Component } from './new-order/step-1/step-1.component';
import { Step2Component } from './new-order/step-2/step-2.component';
import { Step3Component } from './new-order/step-3/step-3.component';
import { Step4Component } from './new-order/step-4/step-4.component';

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  declarations: [
    NewOrderComponent,
    WeekMenuComponent,
    DayMenuComponent,
    SelectedSidesPipe,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component
  ],
  providers: [OrderingService, MenuService]
})
export class OrderModule { }
