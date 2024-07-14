import { Component } from '@angular/core';
import { allBooks } from './variables';
import { HelperService } from './helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedAuthors: any[] = [];
  selectedBooks: any[] = [];

  constructor(private helper: HelperService){

  }

  ngOnInit() {
    this.helper.setup();
  }

  // isSelected(recommender: string) {
  //   let isSelected = false;
  //   if (this.selectedAuthors.includes(recommender)) {
  //     isSelected = true;
  //   }
  //   return isSelected;
  // }

  // select(recommender: string) {
  //   if (!this.selectedAuthors.includes(recommender)) {
  //     this.selectedAuthors.push(recommender);
  //   }
  //   this.setSelectedBooks();
  // }

  // setSelectedBooks() {
  //   let selectedBooks = [];
  //   for (let i = 0; i < this.allBooks.length; i++) {
  //     if (this.selectedAuthors.includes(this.allBooks[i].recommender)) {
  //       selectedBooks.push(this.allBooks[i]);
  //     }
  //   }
  //   this.selectedBooks = selectedBooks;
  //   this.setSortedBooks(this.selectedBooks);
  // }

}
