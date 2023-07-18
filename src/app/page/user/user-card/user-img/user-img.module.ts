import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserImgRoutingModule } from './user-img-routing.module';
import { UserImgComponent } from './user-img.component';


@NgModule({
  declarations: [
    UserImgComponent
  ],
  imports: [
    CommonModule,
    UserImgRoutingModule
  ]
})
export class UserImgModule { }
