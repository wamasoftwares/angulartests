import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'form/builder',
    loadChildren: () => import('../app/form-builder/form-builder.module')
      .then(m => m.FormBuilderModule),
  },
  {
    path: 'form/answer',
    loadChildren: () => import('../app/review-answer/review-answer.module')
    .then(m => m.ReviewAnswerModule),
  },
  {
    path: 'pagenotfound',
    component: PagenotfoundComponent
  },
  {
    path: '',
    redirectTo: 'form/builder',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pagenotfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
