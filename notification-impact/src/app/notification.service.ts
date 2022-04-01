import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationConfigEntry {
  type: string,  // Will be one of notificationTypes
  startTime: string,  // 24H format, e.g. 18:30
  count: number,  // How many notifications to send
  frequency: number,  // Send notificaton every X minutes
}

// Keep up to date with notification-panel
export const notificationTypes = ['Social media', 'School or work', 'Entertainment', 'Productivity'];

/**
 * Notification service handles the business logic for the app.
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    // Observable sources
    private modelOutput = new Subject<number>(); // TODO - change to model output type

    // Observable streams
    stressModel$ = this.modelOutput.asObservable();

    constructor() { }

    updateChart(model: number) {
        this.modelOutput.next(model); // TODO - send model data
    }

    generateModel(notifConfig: NotificationConfigEntry[]) {
        // TODO calculate model output to send to chart
        console.log(notifConfig);
    }
}
