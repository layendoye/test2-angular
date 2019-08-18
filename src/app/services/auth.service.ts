import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  createNewUser(email: string, password: string){
    return new Promise(
      (resolve, reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
          ()=>{//si tous ce passe bien
            resolve();
          },
          (error)=>{
            reject(error);
          }
        );
      }
    );
  }
  signInUser(email: string, password: string){ 
    return new Promise(//methode assynchronne ,il nous aidera pour recuperer les erreurs aussi
      (resolve, reject)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          ()=>{//si tous ce passe bien
            resolve();
          },
          (error)=>{
            reject(error);
          }
        );
      }
    );
  }
  signOut(){
    firebase.auth().signOut();
  }
}
