import { Injectable, numberAttribute } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { User } from "src/app/page/user/user";
import { Card } from "src/app/page/user/user-card/card";


@Injectable({
    providedIn: 'root'
})

export class UserService {
    // private apiUrl = 'http://localhost:3000/api'; // Replace with your backend server URL

    // constructor(private http: HttpClient) { }
  
    // getUser(id: string): Observable<User> {
    //   const url = `${this.apiUrl}/users/${id}`;
    //   return this.http.get<any[]>(url).pipe( // Modify the return type to any[]
    //     map((userDataArray: any[]) => this.mapToUser(userDataArray))
    //   );
    // }

    // getCard(id: string): Observable<Card>{
    //   const url = `${this.apiUrl}/cards/${id}`;
    //   return this.http.get<any[]>(url).pipe(
    //     map((cardDataArray: any[]) => this.mapToCard(cardDataArray))
    //   )
    // }
  
    // private mapToUser(userDataArray: any[]): User {
    //   return {
    //     code: userDataArray[0],
    //     name: userDataArray[1],
    //     email: userDataArray[2],
    //     address: userDataArray[3],
    //     phone: userDataArray[4],
    //     tel: userDataArray[5],
    //     id: userDataArray[6]
    //   };
    // }
    // private mapToCard(cardDataArray: any[]): Card {
    //   return {
    //     id: cardDataArray[0],
    //     code: cardDataArray[1],
    //     position: cardDataArray[2],
    //     forte: cardDataArray[3],
    //     department: cardDataArray[4],
    //     nickname: cardDataArray[5],
    //     title: cardDataArray[6],
    //     unit: cardDataArray[7]
    //   }
    // }
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
