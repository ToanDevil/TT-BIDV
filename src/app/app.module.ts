import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { HttpClientModule } from '@angular/common/http';
import { UserCardModule } from './page/user/user-card/user-card.module';
import { UserInfoModule } from './page/user/user-info/user-info.module';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    UserCardModule,
    UserInfoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
