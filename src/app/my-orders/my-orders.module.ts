import { MyOrdersService } from './my-orders.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';
import { MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MyOrdersRoutingModule
  ],
  declarations: [MyOrdersComponent],
  exports: [MyOrdersComponent],
  providers: [MyOrdersService]
})
export class MyOrdersModule { }
