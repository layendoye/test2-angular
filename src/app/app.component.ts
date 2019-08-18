import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookshelves';
  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyDeknPcFeii6MuMxNd_RFXyGd11DfrAU2Q",
      authDomain: "bookshelves-e3668.firebaseapp.com",
      databaseURL: "https://bookshelves-e3668.firebaseio.com",
      projectId: "bookshelves-e3668",
      storageBucket: "",
      messagingSenderId: "740005967180",
      appId: "1:740005967180:web:f8d999cca762479c"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
