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
        // {
        //     "name": "Stress",
        //     "series": [
        //         {
        //             "name": new Date(2021, 4, 1, 0, 0, 0),
        //             "value": 0,
        //         },
        //         {
        //             "name": new Date(2021, 4, 1, 9, 0, 0),
        //             "value": 15,
        //             "tooltipText": 'work text'
        //         },
        //         {
        //             "name": new Date(2021, 4, 1, 12, 0, 0),
        //             "value": 30,
        //             "tooltipText": 'text here shows up in a tooltip'
        //         },
        //         {
        //             "name": new Date(2021, 4, 1, 18, 0, 0),
        //             "value": 25,
        //             "tooltipText": 'we\'ll put notification info in here'
        //         },
        //         {
        //             "name": new Date(2021, 4, 1, 20, 0, 0),
        //             "value": 55,
        //         },
        //         {
        //             "name": new Date(2021, 4, 1, 22, 0, 0),
        //             "value": 15,
        //         },
        //         {
        //             "name": new Date(2021, 4, 1, 23, 0, 0),
        //             "value": 5,
        //         }
        //     ]
        // },
    // ]

    constructor(private notificationService: NotificationService) { 
        this.notificationService.stressModel$.subscribe(model => {
            model.name = this.modelData.length + 1;
            this.modelData = [...this.modelData, model];
            console.log(this.modelData)
        })
    }

    clearGraph() {
        this.modelData = [];
    }

    saveChart() {
        const buttons = document.querySelectorAll('.chart-button');
        for (let i = 0; i < buttons.length; ++i) {
            // TODO - make this less jarring or find alt.
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
