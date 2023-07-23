import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCardRoutingModule } from './user-card-routing.module';
import { UserCardComponent } from './user-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UserCardRoutingModule,
    FormsModule
  ]
})
export class UserCardModule { }
