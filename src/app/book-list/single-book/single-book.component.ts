import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {
  
  book: Book;
  
  constructor(private route: ActivatedRoute,
              private bookService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.book=new Book('','');//on initialise un book vide car lorsque la page se charge avant que les informations n arrive si on ne fait pas ca cela peut ameuner un bug
    const id=this.route.snapshot.params['id'];//on recupere l'id depuis l'url qui sera un string
    this.bookService.getSingleBook(+id).then(//le plus pour le caster en numbur
      (book:Book)=>{
        this.book=book;
      }
    )
  }
  onBack(){
    this.router.navigate(['/books']);
  }

}
