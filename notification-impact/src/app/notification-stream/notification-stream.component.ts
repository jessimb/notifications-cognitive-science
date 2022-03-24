import { Component } from '@angular/core';
import { Notification, NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-stream',
  templateUrl: './notification-stream.component.html',
  styleUrls: ['./notification-stream.component.scss']
})
export class NotificationStreamComponent {

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {
    notificationService.notificationLog$.subscribe(
      (notif: Notification) => {
        this.notifications.push(notif);
        
        // Keep notification stream scrolled to the bottom.
        requestAnimationFrame(() => {
          let element = document.getElementsByClassName("notifications")[0];
          element.scrollTop = element.scrollHeight;
        });
      });
   }

}
