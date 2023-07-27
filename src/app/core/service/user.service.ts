import { Injectable, numberAttribute } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, of } from "rxjs";
import { User } from "src/app/page/user/user";
import { Card } from "src/app/page/user/user-card/card";
import { Image } from "src/app/page/image";
import { MessageService } from "./message.service";


@Injectable({
    providedIn: 'root'
})

export class UserService {
  
    private apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend server URL
    private apiEdit = 'http://localhost:3000/api';
    private apiImage = 'http://localhost:3000/api/user/image';
    constructor(private http: HttpClient,
                private message: MessageService,
    ) { }
    // private log(message: string) {
    //   this.message.add(`HeroService: ${message}`);
    // }

    // private handleError<T>(operation = 'operation', result?: T) {
    //   return (error: any): Observable<T> => {
    
    //     // TODO: send the error to remote logging infrastructure
    //     console.error(error); // log to console instead
    
    //     // TODO: better job of transforming error for user consumption
    //     this.log(`${operation} failed: ${error.message}`);
    
    //     // Let the app keep running by returning an empty result.
    //     return of(result as T);
    //   };
    // }
  
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

    getImage(id: string): Observable<Image> {
      const url = `${this.apiImage}/${id}`;
      return this.http.get<any>(url).pipe(
        map((data: any) => data.image) // trả về thông tin ảnh đã được ánh xạ từ app.js
      )
    }

    //Phương thưc để cập nhật thông tin người dùng
    updateUser(id: string, userData: User) : Observable<any> {
      const url = `${this.apiEdit}/user/update/${id}`;
      return this.http.put(url, userData);
    }

    // phương thức để cập nhật thông tin card
    updateCard (code: string, cardData: Card): Observable<any> {
      const url = `${this.apiEdit}/card/update/${code}`;
      return this.http.put(url, cardData);
    }
  }
