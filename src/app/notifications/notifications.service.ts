import { Subject } from 'rxjs/Subject';
import { Notification } from './notification';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {
  notificationSubject = new Subject<{ notification: Notification, timeout: number }>();

  constructor(
  ) {
    console.log('notifications service');
  }

  show(body: string, title: string = 'Notification!', type: string = 'info', timeout: number = 4500) {
    let icon, background;
    switch (type) {
      case 'info':
        icon = 'info_outline';
        background = 'light-blue lighten-1';
        break;
      case 'success':
        icon = 'check_circle';
        background = 'green lighten-1';
        break;
      case 'danger':
        icon = 'sms_failed';
        background = 'red lighten-1';
        break;
      case 'warning':
        icon = 'sms_failed';
        background = 'orange lighten-2';
        break;
    }
    const notification = new Notification(title, body, background, icon);
    this.notificationSubject.next({
      notification: notification,
      timeout: timeout
    });
  }

}
