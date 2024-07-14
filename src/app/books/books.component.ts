import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: any[] = []

  constructor(private helper: HelperService) { }

  ngOnInit(): void {
    this.books = this.helper.getBooks();
  }

}
