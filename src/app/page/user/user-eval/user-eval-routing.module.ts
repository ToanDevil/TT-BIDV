import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEvalComponent } from './user-eval.component';

const routes: Routes = [
  {
    path: '',
    component: UserEvalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserEvalRoutingModule { }
