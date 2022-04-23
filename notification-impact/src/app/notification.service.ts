import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface NotificationConfigEntry {
  type: string,  // Will be one of notificationTypes
  startTime: string,  // 24H format, e.g. 18:30
  count: number,  // How many notifications to send
  interval: number,  // Send 1 notificaton every X minutes (interval)
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
    private modelOutput = new Subject<any>();
    private graphCount = new Subject<number>();

    // Observable streams
    stressModel$ = this.modelOutput.asObservable();
    graphCount$ = this.graphCount.asObservable();

    constructor() { }

    updateChart(model: any) {
        this.modelOutput.next(model);
    }

    clearGraphCount() {
      this.graphCount.next(0);
    }

    generateModel(notifConfig: NotificationConfigEntry[]) {
        // console.log(notifConfig);

        let notifications = [];
        let stressArr = [];

        // Generate notifications
        for (let i  = 0; i < notifConfig.length; i++) {
            const startTimeNum = this.getTimeNum(notifConfig[i].startTime);

            // Create 'count' notifications per notif config entry
            for (let j = 0; j < notifConfig[i].count; j++) {
                const rtime = startTimeNum + (j * notifConfig[i].interval)
                const entry = {
                    type: notifConfig[i].type,
                    interval: notifConfig[i].interval,
                    receiveTime: rtime,
                    age: 0,
                    ttl: this.getTTL(rtime),
                }
                notifications.push(entry);
            }
        }

        // Calculate stress over 24H
        for (let currTime = 0; currTime < 1440 ; currTime++) {
            // Start at 0 stress for each minute
            let totalStress = 0;
            let typesArr = [];

            // Get stress for each notification at currTime
            for (let n = 0; n < notifications.length; n++) {
                if (notifications[n].receiveTime <= currTime) {
                    notifications[n].age++;
                    // Remove notification if expired
                    if (notifications[n].age == notifications[n].ttl) {
                        notifications.splice(n, 1);
                        continue;
                    } else {
                        totalStress += this.getStress(notifications[n]);
                        typesArr.push(notifications[n].type)
                    }
                }
            }

            // Add totalStress at currTime to output array
            const entry : any = {
                name: this.getDate(currTime),
                value: totalStress,
                prettyTime: this.getPrettyTime(currTime),
            };
            if (typesArr.length > 0) {
                // Add tooltipText iff there was a notif
                entry.tooltipText = 'Notifications(s): ' + typesArr.join(', ');
            }
            stressArr.push(entry);
        }

        const model = {
            series: stressArr,
        };

        // console.log(model);
        this.updateChart(model);
    }

    // Convert time represented as 0-1440 number to Date object
    getDate(timeNum: number){
        const hours = Math.floor(timeNum / 60);
        const min = timeNum % 60;

        return new Date(2022, 4, 1, hours, min);
    }

    getPrettyTime(timeNum: number): string {
      let hours = Math.floor(timeNum / 60);

      const min = (timeNum % 60);
      let minString = min.toString();
      if (min < 10) {
        minString = '0' + minString;
      }

      let suffix = 'AM';
      if (hours > 12) {
        suffix = 'PM';
        hours -= 12;
      }

      return `${hours}:${minString} ${suffix}`;
    }

    // Calculate stress
    getStress(notification: any) {
        let stressType = 0;
        let stressContext = 0;
        let stressFreq = 0;

        // Get stress due to notification type
        switch (notification.type) {
            case 'Social media':
                stressType = 3.34;
                break;
            case 'School or work':
                stressType = 3.67;
                break;
            case 'Entertainment':
                stressType = 3.23;
                break;
            case 'Productivity':
                stressType = 3.52;
                break;
            default:
                stressType = 0;
        }

        // Stress context constants
        const stressWorkSchool = 3.64;
        const stressVehicle = 3.58;
        const stressCaretaking = 3.11;
        const stressLeisure = 3.30;
        const stressFitness = 3.28;

        // Get stress due to notification context. Schedule should match what's
        // in app.component.html and getTTL.
        if (notification.receiveTime < this.getTimeNum('8:30')) {
          stressContext = stressCaretaking;
        } else if (notification.receiveTime < this.getTimeNum('9:00')) {
          stressContext = stressVehicle;
        } else if (notification.receiveTime < this.getTimeNum('17:00')) {
          stressContext = stressWorkSchool;
        } else if (notification.receiveTime < this.getTimeNum('18:00')) {
          stressContext = stressFitness;
        } else if (notification.receiveTime < this.getTimeNum('18:30')) {
          stressContext = stressVehicle;
        } else if (notification.receiveTime < this.getTimeNum('19:00')) {
          stressContext = stressLeisure;
        } else {
          stressContext = stressCaretaking;
        }

        // Get stress due to notification interval (fka frequency)
        if (notification.interval >= 1 && notification.interval < 5) {
            stressFreq = 3.73;
        } else if (notification.interval >= 5 && notification.interval < 15) {
            stressFreq = 3.58;
        } else if (notification.interval >= 15 && notification.interval < 30) {
            stressFreq = 3.43;
        } else if (notification.interval >= 30 && notification.interval < 60) {
            stressFreq = 3.48;
        } else if (notification.interval >= 60) {
            stressFreq = 3.31;
        }

        // Calculate stress factoring in TTL for decay
        let stress = stressType * stressContext * stressFreq
        stress *= (notification.ttl - notification.age / notification.ttl);
        return stress;
    }

    // Get TTL based on receive time of notification
    // Schedule should match what's in app.component.html and getStress.
    getTTL(receiveTime: number) {
        // TTL constants
        const ttlWorkSchool = 6;
        const ttlVehicle = 6;
        const ttlCaretaking = 6;
        const ttlLeisure = 5;
        const ttlFitness = 4;

        if (receiveTime < this.getTimeNum('8:30')) {
          return ttlCaretaking;
        } else if (receiveTime < this.getTimeNum('9:00')) {
          return ttlVehicle;
        } else if (receiveTime < this.getTimeNum('17:00')) {
          return ttlWorkSchool;
        } else if (receiveTime < this.getTimeNum('18:00')) {
          return ttlFitness
        } else if (receiveTime < this.getTimeNum('18:30')) {
          return ttlVehicle;
        } else if (receiveTime < this.getTimeNum('19:00')) {
          return ttlLeisure;
        } else {
          return ttlCaretaking;
        }
    }

    // Convert 24H time string to number 0-1440
    getTimeNum(timeStr: string) {
        const timeArr = timeStr.split(":");
        const timeNum = (parseInt(timeArr[0]) * 60) + parseInt(timeArr[1]);

        return timeNum;
    }
}
