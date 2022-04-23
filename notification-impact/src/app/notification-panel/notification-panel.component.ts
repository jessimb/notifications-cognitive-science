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

    tooltipText = '';
    simulationCount = 0;

    constructor(private notificationService: NotificationService) {
        this.appendBlankEntry();

        this.notificationService.graphCount$.subscribe(count => {
            this.simulationCount = 0;
        });
    }

    appendBlankEntry() {
        const entry = {
            type: '', 
            startTime: '',
            count: 0,
            interval: 0,
        } as NotificationConfigEntry;
        this.notificationSchedule.push(entry);
    }

    getSubmitValid(): boolean {
        if (this.notificationSchedule.length === 0) {
            this.tooltipText = 'Add a least one entry';
            return false;
        }
        for (const entry of this.notificationSchedule) {
            if (!entry.type || !entry.startTime || !entry.count || !entry.interval)  {
                this.tooltipText = 'Complete all entry fields';
                return false;
            }
        }
        return true;
    }

    submit() {
        this.notificationService.generateModel(this.notificationSchedule);
        this.simulationCount += 1;
        setTimeout(() => {
            const legendItem = document.querySelector(`ngx-charts-legend-entry > span[title="${this.simulationCount}"]`);
            legendItem?.setAttribute('title', JSON.stringify(this.notificationSchedule, null, '\t'));
        }, 500);
    }

    deleteEntry(index: number) {
        this.notificationSchedule.splice(index, 1);
    }
}