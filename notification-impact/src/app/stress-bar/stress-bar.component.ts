import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-stress-bar',
    templateUrl: './stress-bar.component.html',
    styleUrls: ['./stress-bar.component.scss']
})
export class StressBarComponent {

    stressLevel = 0;
    decayAmount = .1;
    decayFrequencyMs = 3000;

    constructor(private notificationService: NotificationService) {
        //     notificationService.stress$.subscribe(
        //       (stress: number) => {
        //         this.stressLevel += stress;
        //       });

        //       setInterval(() => {
        //         this.stressLevel -= this.decayAmount;
        //         this.stressLevel = Math.round(this.stressLevel * 100) / 100;
        //         if (this.stressLevel < 0) {
        //           this.stressLevel = 0;
        //         }
        //       }, this.decayFrequencyMs);
    }
}
