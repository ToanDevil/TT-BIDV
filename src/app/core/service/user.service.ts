import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend server URL

    constructor(private http: HttpClient) { }
  
    getUser(id: string): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<any>(url);
    }
}
