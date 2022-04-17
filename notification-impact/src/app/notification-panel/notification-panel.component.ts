import { HashLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationConfigEntry, NotificationService } from '../notification.service';

@Component({
    selector: 'app-notification-panel',
    templateUrl: './notification-panel.component.html',
    styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent {

    // Keep up to date with notification service
    notificationTypes = ['Social media', 'School or work', 'Entertainment', 'Productivity'];
    
    notificationSchedule: NotificationConfigEntry[] = [];

    constructor(private notificationService: NotificationService) {
        this.appendBlankEntry();
    }

    appendBlankEntry() {
        const entry = {
            type: '', 
            startTime: '',
            count: 0,
            frequency: 0,
        } as NotificationConfigEntry;
        this.notificationSchedule.push(entry);
    }

    getSubmitValid(): boolean {
        for (const entry of this.notificationSchedule) {
            if (!entry.type) return false;
            if (!entry.startTime) return false;
            if (!entry.count) return false;
            if (!entry.frequency) return false;
        }
        return true;
    }

    submit() {
        this.notificationService.generateModel(this.notificationSchedule);
    }

    deleteEntry(index: number) {
        this.notificationSchedule.splice(index, 1);
    }
}