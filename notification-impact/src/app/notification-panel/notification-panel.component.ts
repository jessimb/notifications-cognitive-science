import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-notification-panel',
    templateUrl: './notification-panel.component.html',
    styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent {


    notifTypeOptions = [{ name: "Social Media", val: 'social' },
    { name: "Phone call", val: 'call' },
    { name: "Text Message", val: 'text' }];
    notificationType = '';

    constructor() { }

    submit() {
        console.log(this.notificationType);
    }

}
