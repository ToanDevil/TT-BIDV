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
    function UserService(http, message) {
        this.http = http;
        this.message = message;
        this.apiUrl = 'http://localhost:3000/api/users'; // Replace with your backend server URL
        this.apiImage = 'http://localhost:3000/api/user/image';
        this.api = 'http://localhost:3000/api';
    }
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
    UserService.prototype.getUser = function (id) {
        var url = this.api + "/user/" + id;
        return this.http.get(url).pipe(rxjs_1.map(function (data) { return data.user; }) // Trả về thông tin người dùng đã được ánh xạ từ app.js
        );
    };
    UserService.prototype.deleteUser = function (code) {
        var url = this.api + "/user/" + code;
        return this.http["delete"](url);
    };
    UserService.prototype.getListUser = function () {
        var url = "" + this.apiUrl;
        return this.http.get(url);
    };
    UserService.prototype.getCard = function (id) {
        var url = this.api + "/card/" + id;
        return this.http.get(url).pipe(rxjs_1.map(function (data) { return data.card; }) // Trả về thông tin thẻ đã được ánh xạ từ app.js
        );
    };
    UserService.prototype.getImage = function (id) {
        var url = this.apiImage + "/" + id;
        return this.http.get(url).pipe(rxjs_1.map(function (data) { return data.image; }) // trả về thông tin ảnh đã được ánh xạ từ app.js
        );
    };
    UserService.prototype.addUser = function (user) {
        var url = "" + this.apiUrl;
        return this.http.post(url, user);
    };
    //Phương thưc để cập nhật thông tin người dùng
    UserService.prototype.updateUser = function (id, userData) {
        var url = this.api + "/user/update/" + id;
        return this.http.put(url, userData);
    };
    // phương thức để cập nhật thông tin card
    UserService.prototype.updateCard = function (code, cardData) {
        var url = this.api + "/card/update/" + code;
        return this.http.put(url, cardData);
    };
    UserService.prototype.updateImage = function (code, formData) {
        var url = "http://localhost:3000/api/image/update/" + code;
        return this.http.put(url, formData);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
