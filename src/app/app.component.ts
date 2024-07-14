import { Component } from '@angular/core';
import { allBooks } from './variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  allBooks = allBooks;
  bookTitles: any = [];
  recommenders: any = [];

  ngOnInit() {
    this.setBooks();
    this.setRecommenders();
  }

  setBooks() {
    this.bookTitles = [... new Set(this.allBooks.map(item => item.title))];
  }

  setRecommenders() {
    this.recommenders = [... new Set(this.allBooks.map(item => item.recommender))];
  }

}
