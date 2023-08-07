import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserEvalRoutingModule } from './user-eval-routing.module';
import { UserEvalComponent } from './user-eval.component';


@NgModule({
  declarations: [
    UserEvalComponent, 
  ],
  imports: [
    CommonModule,
    UserEvalRoutingModule,
  ]
})
export class UserEvalModule { }
