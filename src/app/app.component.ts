import { Component } from '@angular/core';
import { allBooks } from './variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  allBooks = allBooks;
  books: any = [];
  experts: any = [];
  sortedBooks: any = [];
  selectedAuthors: any[] = [];
  selectedBooks: any[] = [];

  ngOnInit() {
    this.setBooks();
    this.setexperts();
    this.setSortedBooks(this.allBooks);
    this.removeDuplicates();
  }

  setBooks() {
    this.books = [... new Set(this.allBooks.map(item => item.title))];
  }

  setexperts() {
    this.experts = [... new Set(this.allBooks.map(item => item.recommender))];
    this.experts.sort();
  }

  setSortedBooks(booksToSort: any[]) {
    this.sortedBooks = [];
    let experts = [];
    for (let i = 0; i < this.books.length; i++) {
      booksToSort.filter(item => item.title === this.books[i]);
      experts = booksToSort.filter(item => item.title === this.books[i]).map(item => item.recommender);
      this.sortedBooks.push({ title: this.books[i], experts: experts })
    }
    this.sortedBooks.sort((a: any, b: any) => { return b.experts.length - a.experts.length })
    this.sortedBooks = this.sortedBooks.filter((item: any) => item.experts.length > 0)
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

  convertName(name: string) {

    return name.replaceAll('-', ' ');
  }

  removeDuplicates() {
    console.log(this.allBooks);
    let newArray = [];
    for (let i = 0; i < this.allBooks.length; i++) {
      newArray.push(this.allBooks[i].recommender + "THESPLIT" + this.allBooks[i].title);
    }
    newArray = [... new Set(newArray)];
    let newArray2 = [];
    for (let i = 0; i < newArray.length; i++) {
      newArray2.push({ "title": newArray[i].split("THESPLIT")[1], "recommender": newArray[i].split("THESPLIT")[0] });
    }
    console.log(newArray2);
  }
}
