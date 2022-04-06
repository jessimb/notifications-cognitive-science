import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationConfigEntry {
  type: string,  // Will be one of notificationTypes
  startTime: string,  // 24H format, e.g. 18:30
  count: number,  // How many notifications to send
  frequency: number,  // Send notificaton every X minutes
}

interface Emotification {
    type: string;
    frequency: number,
    receiveTime: number,
    age: number,
    ttl: number,
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

    // Notifications generated from settings
    notifications: Emotification[] = [];

    // Stress

    constructor() { }

    updateChart(model: number) {
        this.modelOutput.next(model); // TODO - send model data
    }

    generateModel(notifConfig: NotificationConfigEntry[]) {
        // TODO calculate model output to send to chart
        console.log(notifConfig);

        // Array(1)
        //     0: 
        //         count: 5
        //         frequency: 30
        //         startTime: ""
        //         type: "School or work"
        
        console.log(notifConfig[0]);

        // Generate notifications
        // for each notif config entry:
        // make notification at start time (notification #1.receiveTime = start time)
        // add time + frequency to time
        // make y count notifs

        // Clear notifications array
        this.notifications.length = 0;

        // Generate notifications
        for (var i  = 0; i < notifConfig.length; i++) {
            const startTimeNum = this.getTimeNum(notifConfig[i].startTime);

            for (var j = 0; j < notifConfig[i].count; j++) {
                console.log("Creating notification " + i + " of " + notifConfig.length);
                const rtime = startTimeNum + (j * notifConfig[i].count)
                const entry = {
                    type: notifConfig[i].type,
                    frequency: notifConfig[i].frequency,
                    receiveTime: rtime,
                    age: 0,
                    ttl: this.getTTL(rtime),
                }
                this.notifications.push(entry);
            }
        }

        // Calculate stress and generate stress array
        
    }

    // Get TTL based on receive time of notification
    // Currently 9am-5pm is work/school, else is leisure
    getTTL(receiveTime: number) {
        // TTL constants
        const ttlWorkSchool = 6;
        const ttlVehicle = 6;
        const ttlCaretaking = 6;
        const ttlLeisure = 5;
        const ttlFitness = 4;

        if (this.getTimeNum("09:00") >= receiveTime && receiveTime <= this.getTimeNum("17:00")) {
            return ttlWorkSchool;
        }
        return ttlLeisure;
    }

    // Convert 24H time string to number 0-1440
    getTimeNum(timeStr: string) {
        var timeArr = timeStr.split(":");
        var timeNum = (parseInt(timeArr[0]) * 60) + parseInt(timeArr[1]);
        console.log("Converted " + timeStr + " to " + timeNum);
        return timeNum;
    }
}
