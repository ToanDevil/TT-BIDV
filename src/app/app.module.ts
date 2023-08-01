import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { HttpClientModule } from '@angular/common/http';
import { UserCardModule } from './page/user/user-card/user-card.module';
import { UserInfoModule } from './page/user/user-info/user-info.module';
import { DataService } from './core/service/data.service';
import { UserCardComponent } from './page/user/user-card/user-card.component';
import { UserInfoComponent } from './page/user/user-info/user-info.component';
import { UserComponent } from './page/user/user.component';

import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    UserCardComponent,
    UserInfoComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    UserCardModule,
    UserInfoModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
  ],
  providers: [
    DataService,
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
