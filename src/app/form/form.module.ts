import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ReviewAnswerComponent } from './review-answer/review-answer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route: Routes = [
  { path: '', redirectTo: 'builder', pathMatch: 'full' },
  { path: '',
    children:[
      { path: 'builder', component: FormBuilderComponent, pathMatch: 'full' },
      { path: 'answer', component: ReviewAnswerComponent, pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'builder', pathMatch: 'full' },
]

@NgModule({
  declarations: [FormBuilderComponent, ReviewAnswerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
  ],
  exports: [
    RouterModule
  ]
})
export class FormModule { }
