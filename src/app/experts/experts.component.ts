import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent implements OnInit {
  experts: any[] = [];

  constructor(private helper: HelperService) { }

  ngOnInit(): void {
    this.experts = this.helper.getExperts();
    console.log('experts', this.experts);
  }

  convertName(name: string) {
    return this.helper.convertName(name);
  }
}
