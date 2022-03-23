import { Component } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3MBl6rFoNChhex7zbCPH6KRZYiRSNo-A",
  authDomain: "emotifications.firebaseapp.com",
  projectId: "emotifications",
  storageBucket: "emotifications.appspot.com",
  messagingSenderId: "184982393967",
  appId: "1:184982393967:web:6bf54ce67176ca3df9a99a",
  measurementId: "G-2FGVH846HR"
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Emotifications';

    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(this.app);
}
