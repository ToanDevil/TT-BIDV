import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './user-card.component';

const routes: Routes = [
  {
    path: '',
    component: UserCardComponent,
    children:[
      {
        path: 'edit-profile/:id',
        loadChildren: () => import('./user-form/user-form.module').then((m) => m.UserFormModule),
      },
      {
        path:'edit-image/:id',
        loadChildren: () => import('./user-img/user-img.module').then((m) => m.UserImgModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCardRoutingModule { }
