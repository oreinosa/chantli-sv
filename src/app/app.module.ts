import { MessagingService } from './notifications/messaging.service';
import { AdminModule } from './admin/admin.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NotAuthGuard } from './shared/guards/not-auth.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { NotificationsService } from './notifications/notifications.service';
import { AuthService } from './auth/auth.service';
import { LoggerService } from './logger/logger.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { OrdersModule } from './orders/orders.module';

import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WorkplaceGuard } from './shared/guards/workplace.guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    CoreModule,
    AdminModule,
    AuthModule,
    OrderModule,
    OrdersModule,
    NotificationsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AppRoutingModule
  ],
  providers: [
    LoggerService,
    AuthService,
    NotificationsService,
    MessagingService,
    AuthGuard,
    NotAuthGuard,
    AdminGuard,
    WorkplaceGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
