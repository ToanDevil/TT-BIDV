import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { User } from "src/app/page/user/user";


@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend server URL

    constructor(private http: HttpClient) { }
  
    getUser(id: string): Observable<User> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<any[]>(url).pipe( // Modify the return type to any[]
        map((userDataArray: any[]) => this.mapToUser(userDataArray))
      );
    }
  
    private mapToUser(userDataArray: any[]): User {
      return {
        code: userDataArray[0],
        name: userDataArray[1],
        email: userDataArray[2],
        address: userDataArray[3],
        phone: userDataArray[4],
        tel: userDataArray[5],
        id: userDataArray[6]
      };
    }
  }
