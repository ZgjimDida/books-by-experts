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
  sortedBooks: any = [];

  ngOnInit() {
    this.setBooks();
    this.setRecommenders();
    this.setSortedBooks(this.allBooks);
  }

  setBooks() {
    this.bookTitles = [... new Set(this.allBooks.map(item => item.title))];
  }

  setRecommenders() {
    this.recommenders = [... new Set(this.allBooks.map(item => item.recommender))];
  }

  setSortedBooks(booksToSort: any[]) {
    this.sortedBooks = [];
    let recommenders = [];
    for (let i = 0; i < this.bookTitles.length; i++) {
      booksToSort.filter(item => item.title === this.bookTitles[i]);
      recommenders = booksToSort.filter(item => item.title === this.bookTitles[i]).map(item => item.recommender);
      this.sortedBooks.push({ title: this.bookTitles[i], recommenders: recommenders })
    }
    this.sortedBooks.sort((a: any, b: any) => { return b.recommenders.length - a.recommenders.length })
  }

}
