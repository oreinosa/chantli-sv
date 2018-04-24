import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatListModule,  
  MatRadioModule,
  MatMenuModule,
  MatButtonToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationsModule } from '../notifications/notifications.module';
import { CalTotalPipe } from './pipes/cal-total.pipe';
import { DowPipe } from './pipes/dow.pipe';
import { MenuProductsPipe } from './pipes/menu-products.pipe';

import "rxjs/add/operator/take";
import "rxjs/add/operator/takeUntil";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import "rxjs/add/operator/share"
import { merge } from 'rxjs/observable/merge';
import { switchMap } from 'rxjs/operators/switchMap';
import { skip } from 'rxjs/operators/skip';
import { startWith } from 'rxjs/operators/startWith';

@NgModule({
  imports: [],
  declarations: [CalTotalPipe, DowPipe, MenuProductsPipe],
  exports: [
    CommonModule,
    DowPipe,
    MenuProductsPipe,
    CalTotalPipe,
    NotificationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatListModule,    
    MatMenuModule,
    MatButtonToggleModule
  ]
})
export class SharedModule { }
