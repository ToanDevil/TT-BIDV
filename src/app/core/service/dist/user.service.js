"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
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
        this.apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend server URL
    }
    UserService.prototype.getUser = function (id) {
        var url = this.apiUrl + "/" + id;
        return this.http.get(url).pipe(rxjs_1.map(function (data) { return data.user; }) // Trả về thông tin người dùng đã được ánh xạ từ app.js
        );
    };
    UserService.prototype.getCard = function (id) {
        var url = this.apiUrl + "/" + id;
        return this.http.get(url).pipe(rxjs_1.map(function (data) { return data.card; }) // Trả về thông tin thẻ đã được ánh xạ từ app.js
        );
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
