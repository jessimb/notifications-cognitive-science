import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// TODO
export interface NotificationConfig {
    type: string;
    message?: string;
}

/**
 * Notification service handles the business logic for the app.
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    // Observable sources
    private modelOutput = new Subject<number>(); // TODO 

    // Observable streams
    stressModel$ = this.modelOutput.asObservable();

    constructor() { }

    updateChart(stress: number) {
        this.modelOutput.next(stress); // TODO
    }

    generateModel(notif: NotificationConfig) {
        // TODO take in input, calculate output
    }
}
