import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelOutputComponent } from './model-output/model-output.component';
import { NotificationService } from './notification.service';
import { StressBarComponent } from './stress-bar/stress-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        NotificationPanelComponent,
        ModelOutputComponent,
        StressBarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatRadioModule,
        FormsModule,
        MatButtonModule,
        BrowserAnimationsModule,
        NgxChartsModule,
    ],
    providers: [NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
