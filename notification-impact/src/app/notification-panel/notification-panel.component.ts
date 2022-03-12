import { Component } from '@angular/core';

@Component({
    selector: 'app-notification-panel',
    templateUrl: './notification-panel.component.html',
    styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent {

    notificationTypes = ["Social Media", "Phone call", "Text Message"];
    selectedNotificationType = '';

    constructor() { }

    submit() {
        console.log(this.selectedNotificationType);
    }
}