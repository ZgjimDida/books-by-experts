import { Component } from '@angular/core';
import { allBooks } from './variables';
import { HelperService } from './helper.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  allBooks: any[] = [];
  experts: any[] = [];
  selectedExperts: any[] = [];
  selectedBooks: any[] = [];
  sortedBooks: any[] = [];
  generated = false;

  constructor(private helper: HelperService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.helper.setup();
    this.experts = this.helper.getExperts();
    this.allBooks = this.helper.getAllBooks();
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      if (params['experts']) {
        console.log('eureka');
        this.selectFromQuery(params['experts']);
      }
    });
  }

  convertName(name: string) {
    return this.helper.convertName(name);
  }

  isSelected(expert: string) {
    let isSelected = false;
    if (this.selectedExperts.includes(expert)) {
      isSelected = true;
    }
    return isSelected;
  }

  select(expert: string) {
    if (!this.selectedExperts.includes(expert)) {
      this.selectedExperts.push(expert);
    } else {
      let indexOfItem = this.selectedExperts.indexOf(expert);
      this.selectedExperts.splice(indexOfItem, 1)
    }
  }

  setSelectedBooks() {
    let selectedBooks = [];
    for (let i = 0; i < this.allBooks.length; i++) {
      if (this.selectedExperts.includes(this.allBooks[i].recommender)) {
        selectedBooks.push(this.allBooks[i]);
      }
    }
    this.selectedBooks = selectedBooks;
    this.sortedBooks = this.helper.setupSortedBooks(this.selectedBooks);
    console.log(this.sortedBooks);
    this.generated = true;
    this.generateQueryParam();
  }

  chooseExperts() {
    this.generated = false;
  }

  selectFromQuery(query: string) {
    let experts = query.split("+");
    this.selectedExperts = experts;
    this.setSelectedBooks();
  }

  generateQueryParam() {
    let queryParam = "";
    for (let i = 0; i < this.selectedExperts.length; i++) {
      queryParam = queryParam + this.selectedExperts[i];
      if (i != this.selectedExperts.length - 1) {
        queryParam = queryParam + "+";
      }
    }
    console.log(queryParam);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { experts: queryParam },
    });
  }

}
