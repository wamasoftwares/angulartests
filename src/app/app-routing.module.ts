import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('../app/form/form.module')
      .then(m => m.FormModule),
  },
  {
    path: 'pagenotfound',
    component: PagenotfoundComponent
  },
  {
    path: '',
    redirectTo: 'form',
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
