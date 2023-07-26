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
        this.apiEdit = 'http://localhost:3000/api';
    }
    UserService.prototype.log = function (message) {
        this.message.add("HeroService: " + message);
    };
    UserService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return rxjs_1.of(result);
        };
    };
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
    //Phương thưc để cập nhật thông tin người dùng
    UserService.prototype.updateUser = function (id, userData) {
        var url = this.apiEdit + "/user/update/" + id;
        return this.http.put(url, userData);
    };
    // phương thức để cập nhật thông tin card
    UserService.prototype.updateCard = function (code, cardData) {
        var url = this.apiEdit + "/card/update/" + code;
        return this.http.put(url, cardData);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
