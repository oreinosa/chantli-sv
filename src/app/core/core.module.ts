import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { MatToolbarModule } from '@angular/material';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    CoreRoutingModule
  ],
  declarations: [
    NotFoundComponent, 
    ToolbarComponent, HomeComponent
  ],
  exports: [ToolbarComponent]
})
export class CoreModule { }
