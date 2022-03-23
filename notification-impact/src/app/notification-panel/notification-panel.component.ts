import { Component } from '@angular/core';
import { Notification, NotificationService } from '../notification.service';

@Component({
    selector: 'app-notification-panel',
    templateUrl: './notification-panel.component.html',
    styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent {

    notificationTypes = ["Social Media", "Phone call", "Text Message"];
    selectedNotificationType = '';

    constructor(private notificationService: NotificationService) { }

    submit() {
        console.log(this.selectedNotificationType);
        const notif = {
            type: this.selectedNotificationType
        } as Notification;
        this.notificationService.triggerNotification(notif);
    }
}