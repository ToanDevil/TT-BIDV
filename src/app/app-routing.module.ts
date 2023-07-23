import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [                 
  {
    path: '',
    redirectTo: 'page',
    pathMatch: 'full',
  },
  {
    path: 'page',
    loadChildren: () => import('./page/page.module').then((m) => m.PageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
