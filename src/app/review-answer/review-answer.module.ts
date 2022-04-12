import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReviewAnswerComponent } from './review-answer.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewAnswerComponent,
  }
]


@NgModule({
  declarations: [ReviewAnswerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReviewAnswerModule { }
