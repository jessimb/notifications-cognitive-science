import { Component } from '@angular/core';
import { NotificationConfig, NotificationService } from '../notification.service';

@Component({
    selector: 'app-notification-panel',
    templateUrl: './notification-panel.component.html',
    styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent {

    notificationTypes = ["Social Media", "Phone call", "Text Message"];
    selectedNotificationType = '';

    constructor(private notificationService: NotificationService) { }

    // TODO - this should submit a schedule of notifications
    submit() {
        console.log(this.selectedNotificationType);
        const notif = {
            type: this.selectedNotificationType
        } as NotificationConfig;
        this.notificationService.generateModel(notif);
    }
}