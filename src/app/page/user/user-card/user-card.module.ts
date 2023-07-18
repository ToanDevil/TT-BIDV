import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCardRoutingModule } from './user-card-routing.module';
import { UserCardComponent } from './user-card.component';


@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [
    CommonModule,
    UserCardRoutingModule
  ]
})
export class UserCardModule { }
