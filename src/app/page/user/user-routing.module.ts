import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children:[
      {
        path: 'user-info/:id',
        loadChildren: () => import('./user-info/user-info.module').then((m) => m.UserInfoModule)
      },
      {
        path: 'user-card/:id',
        loadChildren: () => import('./user-card/user-card.module').then((m) => m.UserCardModule)
      },
      {
        path:'user-evaluate/:id',
        loadChildren: () => import('./user-eval/user-eval.module').then((m) => m.UserEvalModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
