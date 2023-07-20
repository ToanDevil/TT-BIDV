import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "src/app/page/user/user";


@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend server URL

    constructor(private http: HttpClient) { }
  
    getUser(id: string): Observable<User> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<User>(url);
    }
}
