import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[]=[]
  bookSubject=new Subject<Book[]>()
  constructor() { }
  emitBooks(){
    this.bookSubject.next(this.books);
  }
  saveBooks(){
    firebase.database().ref('/books').set(this.books);//dans firebase il va creer un noeud appelé /books ou il stockera les livres
  }
  getBooks(){//creer une methode assync si on utilise pas firebase car ici le on() l a geré
    firebase.database().ref('/books')
    .on('value', (data)=>{//on() reagit à la modification de la base de donnée comme ca s il y a plusieurs personnes connectés on voit la mise à jour en temps reel
      this.books=data.val()?data.val():[]; //data.val() retour les livres ...ternaire
      this.emitBooks();
    });
  }
  getSingleBook(id: number){
    return new Promise(
      (resolve,reject)=>{
        firebase.database().ref('/books/'+id).once('value').then(//à la fin
          (data)=>{
            resolve(data.val());
          },
          (error)=>{
            reject(error);
          }
        );
      }
    )
  }
  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
  removeBook(book: Book){
    if(book.photo){
      const storageRef=firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        ()=>{
          console.log('photo supprimée!')
        }
      ).catch(
        (error)=>{
          console.log('Fichier non trouvé : '+error);
        }
      );
    }
    const bookIndexToRemove=this.books.findIndex(
      (bokkEl)=>{
        if(bokkEl==book){
          return true
        }
      }
    )
    this.books.splice(bookIndexToRemove,1);
    this.saveBooks();
    this.emitBooks();
  }
  uploadFile(file: File){
    return new Promise(
      (resolve,reject)=>{
        const almostUniqueFileName=Date.now().toString();
        const upload=firebase.storage().ref().child('images/'+almostUniqueFileName+file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, //À CHAQUE CHANGEMENT D ETAT DU TELECHARGEMENT
          ()=>{//encour
            console.log('chargement...');
          },
          (error)=>{
            console.log('Erreur de chargement :'+error);
            reject();
          },
          ()=>{
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    )
  }

}
