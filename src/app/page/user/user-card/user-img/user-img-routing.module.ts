import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserImgComponent } from './user-img.component';

const routes: Routes = [
  {
    path: '',
    component: UserImgComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserImgRoutingModule { }
