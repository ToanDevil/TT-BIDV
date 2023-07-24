import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children:[
      {
        path: 'user/:id',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
