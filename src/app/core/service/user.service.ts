import { Injectable, numberAttribute } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { User } from "src/app/page/user/user";
import { Card } from "src/app/page/user/user-card/card";


@Injectable({
    providedIn: 'root'
})

export class UserService {
  
    private apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend server URL

    constructor(private http: HttpClient) { }
  
    getUser(id: string): Observable<User> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<any>(url).pipe(
        map((data: any) => data.user) // Trả về thông tin người dùng đã được ánh xạ từ app.js
      );
    }
  
    getCard(id: string): Observable<Card> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<any>(url).pipe(
        map((data: any) => data.card) // Trả về thông tin thẻ đã được ánh xạ từ app.js
      );
    }
  }
