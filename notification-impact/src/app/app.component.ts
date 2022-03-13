import { Component } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwGEfo2yN-jH3gHTc6-QGPugjMc2eohJU",
    authDomain: "emotifications.firebaseapp.com",
    projectId: "emotifications",
    storageBucket: "emotifications.appspot.com",
    messagingSenderId: "947181223723",
    appId: "1:947181223723:web:9e9655bb679cec3edbcf6e",
    measurementId: "G-BZE8G3FSNG"
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
