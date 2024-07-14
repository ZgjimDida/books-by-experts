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
  selectedAuthors: any[] = [];
  selectedBooks: any[] = [];

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
    this.sortedBooks = this.sortedBooks.filter((item: any) => item.recommenders.length > 0)
  }

  isSelected(recommender: string) {
    let isSelected = false;
    if (this.selectedAuthors.includes(recommender)) {
      isSelected = true;
    }
    return isSelected;
  }

  select(recommender: string) {
    if (!this.selectedAuthors.includes(recommender)) {
      this.selectedAuthors.push(recommender);
    }
    this.setSelectedBooks();
  }

  setSelectedBooks() {
    let selectedBooks = [];
    for (let i = 0; i < this.allBooks.length; i++) {
      if (this.selectedAuthors.includes(this.allBooks[i].recommender)) {
        selectedBooks.push(this.allBooks[i]);
      }
    }
    this.selectedBooks = selectedBooks;
    this.setSortedBooks(this.selectedBooks);
  }
}
