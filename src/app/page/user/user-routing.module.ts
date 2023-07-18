import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children:[
      {
        path: 'user-info',
        loadChildren: () => import('./user-info/user-info.module').then((m) => m.UserInfoModule)
      },
      {
        path: 'user-card',
        loadChildren: () => import('./user-card/user-card.module').then((m) => m.UserCardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
