import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-cognitive-load-bar',
  templateUrl: './cognitive-load-bar.component.html',
  styleUrls: ['./cognitive-load-bar.component.scss']
})
export class CognitiveLoadBarComponent {

  cognitiveLoadLevel = 0;

  constructor(private notificationService: NotificationService) {
    notificationService.cognitiveLoad$.subscribe(
      (cognitiveLoad: number) => {
        this.cognitiveLoadLevel += cognitiveLoad;
      });
   }
}
