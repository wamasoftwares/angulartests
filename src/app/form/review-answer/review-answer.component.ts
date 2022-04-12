import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-review-answer',
  templateUrl: './review-answer.component.html',
  styleUrls: ['./review-answer.component.scss']
})
export class ReviewAnswerComponent implements OnInit {

  allQuestions;

  constructor(public service: SharedServiceService, public router: Router) { }

  ngOnInit(): void {
    this.allQuestions = this.service.questionArray;
  }

}
