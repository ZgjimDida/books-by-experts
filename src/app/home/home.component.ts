import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  experts: any[] = [];
  books: any[] = [];

  constructor(private helper: HelperService) { }

  ngOnInit(): void {
    this.experts = this.helper.getExperts();
    this.books = this.helper.getBooks();
  }

  convertName(name: string) {
    return this.helper.convertName(name);
  }
}
