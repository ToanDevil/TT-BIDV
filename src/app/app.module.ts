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
import { DataService } from './core/service/data.service';
import { UserCardComponent } from './page/user/user-card/user-card.component';
import { UserInfoComponent } from './page/user/user-info/user-info.component';
import { UserComponent } from './page/user/user.component';
import { UserFormComponent } from './page/user/user-card/user-form/user-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    UserCardComponent,
    UserInfoComponent,
    UserComponent,
    UserFormComponent,
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
