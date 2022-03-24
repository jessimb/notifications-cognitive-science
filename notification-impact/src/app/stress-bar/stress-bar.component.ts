import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-stress-bar',
  templateUrl: './stress-bar.component.html',
  styleUrls: ['./stress-bar.component.scss']
})
export class StressBarComponent {

  stressLevel = 0;

  constructor(private notificationService: NotificationService) {
    notificationService.stress$.subscribe(
      (stress: number) => {
        this.stressLevel += stress;
      });
   }
}
