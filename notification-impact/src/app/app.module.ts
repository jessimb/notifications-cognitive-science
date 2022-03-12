import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';

@NgModule({
    declarations: [
        AppComponent,
        NotificationPanelComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // FormsModule,
        // ReactiveFormsModule,
        MatRadioModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
