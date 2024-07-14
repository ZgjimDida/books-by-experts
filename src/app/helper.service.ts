import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  books: any[] = [];
  experts: any[] = [];

  constructor() { }

  test() {
    console.log("test");
  }

  getBooks() {
    return this.books;
  }

  getExperts() {
    return this.experts;
  }

  setBooks(books: any[]){
    this.books = books;
  }

  setExperts(experts: any[]) {
    this.experts = experts;
  }

  convertName(name: string) {
    return name.replaceAll('-', ' ');
  }
}
