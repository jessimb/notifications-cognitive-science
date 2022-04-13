import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-model-output',
    templateUrl: './model-output.component.html',
    styleUrls: ['./model-output.component.scss']
})
export class ModelOutputComponent {

    // TODO allow multiple lines on the graph
    modelData = [];
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
        // TODO provide way to clear chart (once it has multiple lines)
        this.notificationService.stressModel$.subscribe(model => {
            this.modelData = model;
        })
    }

}
