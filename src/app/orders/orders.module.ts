import { OrdersService } from './orders.service';
import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrderComponent,
    OrdersComponent
  ],
  providers: [OrdersService]
})
export class OrdersModule { }
