import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Probably want more properties than this.
export interface Notification {
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
  private cognitiveLoadObserver = new Subject<number>();
  private stressObserver = new Subject<number>();
  private notificationLogObserver = new Subject<Notification>();

  // Observable streams
  cognitiveLoad$ = this.cognitiveLoadObserver.asObservable();
  stress$ = this.stressObserver.asObservable();
  notificationLog$ = this.notificationLogObserver.asObservable();

  constructor() { }

  addCognitiveLoad(cognitiveLoad: number) {
    this.cognitiveLoadObserver.next(cognitiveLoad);
  }

  addStress(stress: number) {
    this.stressObserver.next(stress);
  }

  updateNotificationLog(notif: Notification) {
    notif = this.getNotificationMessage(notif);
    this.notificationLogObserver.next(notif);
  }

  triggerNotification(notif: Notification) {
    this.addCognitiveLoad(1);
    this.addStress(2);
    this.updateNotificationLog(notif);
  }

  getNotificationMessage(notif: Notification) {
    // let updatedNotif = notif;
    notif.message = "This is a " + notif.type + "!";

    return notif;
  }
}
