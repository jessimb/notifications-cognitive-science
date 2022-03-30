import { Component } from '@angular/core';
import { Notification, NotificationService } from '../notification.service';

@Component({
    selector: 'app-model-output',
    templateUrl: './model-output.component.html',
    styleUrls: ['./model-output.component.scss']
})
export class ModelOutputComponent {

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
