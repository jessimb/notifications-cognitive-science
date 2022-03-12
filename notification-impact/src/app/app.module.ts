import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationPanelComponent
=======

@NgModule({
  declarations: [
    AppComponent
>>>>>>> 15dae2721f65d7d961fe64b6ebb4ba1c20f988ec
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
