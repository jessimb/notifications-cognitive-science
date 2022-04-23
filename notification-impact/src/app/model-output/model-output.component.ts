import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';
import domtoimage from 'dom-to-image';

@Component({
    selector: 'app-model-output',
    templateUrl: './model-output.component.html',
    styleUrls: ['./model-output.component.scss']
})
export class ModelOutputComponent {

    modelData: any[] = [];

    constructor(private notificationService: NotificationService) { 
        this.notificationService.stressModel$.subscribe(model => {
            model.name = this.modelData.length + 1;
            this.modelData = [...this.modelData, model];
            // console.log(this.modelData)
        })
    }

    clearGraph() {
        this.modelData = [];
        this.notificationService.clearGraphCount();
    }

    saveChart() {
        const buttons = document.querySelectorAll('.chart-button');
        for (let i = 0; i < buttons.length; ++i) {
            (buttons[i] as HTMLButtonElement).style.visibility = "hidden";
        }
        const chart = document.getElementById('chart')!;
        domtoimage.toPng(chart).then((dataUrl: string) => {
            let downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', 'ModelOutput.png');
            let url = dataUrl.replace(/^data:image\/png/,'data:application/octet-stream');
            downloadLink.setAttribute('href', url);
            downloadLink.click();
            
            for (let i = 0; i < buttons.length; ++i) {
                (buttons[i] as HTMLButtonElement).style.visibility = "visible";
            }
        });
    }

    
}
