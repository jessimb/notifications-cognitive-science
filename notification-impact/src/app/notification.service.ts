import { Injectable } from '@angular/core';

export interface Notification {
  type: string;
}

/**
 * Notification service handles the business logic for the app.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  triggerNotification(notif: Notification) {
    console.log("triggered! " + notif.type);
  }
}
