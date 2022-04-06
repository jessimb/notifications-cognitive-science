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
    stressArr: Number[] = [];

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

        // Calculate stress over 24H
        for (var currTime = 0; currTime < 1440 ; currTime++) {
            // Start at 0 stress for each minute
            var totalStress = 0;

            // Get stress for each notification at currTime
            for (var n = 0; n < this.notifications.length; n++) {
                if (this.notifications[n].receiveTime <= currTime) {
                    // Remove notification if expired
                    if (this.notifications[n].age == this.notifications[n].ttl) {
                        this.notifications.splice(n, 1);
                    }
                    totalStress += this.getStress(this.notifications[n]);
                }
            }

            // Add stress at currTime to output array
            this.stressArr.push(totalStress);

            // TODO Add stress to series:
            // modelData = [
            //     {
            //         "name": "Stress",
            //         "series": [
            //             {
            //                 "name": new Date(2021, 4, 1, 0, 0, 0),
            //                 "value": 0,
            //             },
            //             {
            //                 "name": new Date(2021, 4, 1, 9, 0, 0),
            //                 "value": 15,
            //                 "tooltipText": 'work text'
            //             },
            //         ]
            //     },
            // ]
        }

        // Print stress values
        console.log(this.stressArr);

        // 
    }

    // Calculate stress
    getStress(notification: Emotification) {
        // Stress due to notificaton type
        const stressTypeSocialMedia = 0;
        const stressTypeSchoolWork = 0;
        const stressTypeEntertainment = 0;
        const stressTypeProductivity = 0;

        // Stress due to notification context
        const stressContextWorkSchool = 0;
        const stressContextVehicle = 0;
        const stressContextCaretaking = 0;
        const stressContextLeisure = 0;
        const stressContextFitness = 0;

        // Stress due to notification frequency
        const stressFreq1min = 0;
        const stressFreq5min = 0;
        const stressFreq15min = 0;
        const stressFreq30min = 0;
        const stressFreq1hour = 0;

        var stressType = 0;
        var stressContext = 0;
        var stressFreq = 0;

        // Get stress due to notification type
        switch (notification.type) {
            case 'Social media':
                stressType = 0;
                break;
            case 'School or work':
                stressType = 0;
                break;
            case 'Entertainment':
                stressType = 0;
                break;
            case 'Productivity':
                stressType = 0;
                break;
            default:
                stressType = 0;
        }

        // Get stress due to notification context
        if (notification.receiveTime >= this.getTimeNum('9:00') && notification.receiveTime <= this.getTimeNum("17:00")) {
            stressContext = 0;
        }

        // Get stress due to notification frequency
        if (notification.frequency >= 1 && notification.frequency < 5) {
            stressFreq = 0;
        } else if (notification.frequency >= 5 && notification.frequency < 15) {
            stressFreq = 0;
        } else if (notification.frequency >= 15 && notification.frequency < 30) {
            stressFreq = 0;
        } else if (notification.frequency >= 30 && notification.frequency < 60) {
            stressFreq = 0;
        } else if (notification.frequency >= 60) {
            stressFreq = 0;
        }

        var stress = stressType * stressContext * stressFreq
        return stress;
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
        // console.log("Converted " + timeStr + " to " + timeNum);

        return timeNum;
    }
}
