import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-cognitive-load-bar',
  templateUrl: './cognitive-load-bar.component.html',
  styleUrls: ['./cognitive-load-bar.component.scss']
})
export class CognitiveLoadBarComponent {

  cognitiveLoadLevel = 0;
  decayAmount = .5;
  decayFrequencyMs = 5000;

  constructor(private notificationService: NotificationService) {
    notificationService.cognitiveLoad$.subscribe(
      (cognitiveLoad: number) => {
        this.cognitiveLoadLevel += cognitiveLoad;
      });

      setInterval(() => {
        this.cognitiveLoadLevel -= this.decayAmount;
        this.cognitiveLoadLevel = Math.round(this.cognitiveLoadLevel * 100) / 100;
        if (this.cognitiveLoadLevel < 0) {
          this.cognitiveLoadLevel = 0;
        }
      }, this.decayFrequencyMs);
   }
}
