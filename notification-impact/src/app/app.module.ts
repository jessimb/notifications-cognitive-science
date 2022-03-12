import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationStreamComponent } from './notification-stream/notification-stream.component';

@NgModule({
    declarations: [
        AppComponent,
        NotificationPanelComponent,
        NotificationStreamComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatRadioModule,
        FormsModule,
        MatButtonModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
