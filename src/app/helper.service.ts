import { Injectable } from '@angular/core';
import { allBooks } from './variables';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  allBooks = allBooks;
  books: any[] = [];
  experts: any[] = [];
  sortedBooks: any = [];

  constructor() { }

  test() {
    console.log("test");
  }

  setup() {
    this.setupBooks();
    this.setupExperts();
    this.setupSortedBooks(this.allBooks);
  }

  setupBooks() {
    this.books = [... new Set(this.allBooks.map(item => item.title))];
  }

  setupExperts() {
    this.experts = [... new Set(this.allBooks.map(item => item.recommender))];
    this.experts.sort();
  }

  setupSortedBooks(booksToSort: any[]) {
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

  getBooks() {
    return this.books;
  }

  getExperts() {
    return this.experts;
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
