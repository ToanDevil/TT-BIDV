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
