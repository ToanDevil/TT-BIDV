"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DataService = /** @class */ (function () {
    function DataService() {
        var userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData') || 'null');
        this.userDataSubject = new rxjs_1.BehaviorSubject(userDataFromLocalStorage);
        this.userData$ = this.userDataSubject.asObservable();
        var cardDataFromLocalStorage = JSON.parse(localStorage.getItem('cardData') || 'null');
        this.cardDataSubject = new rxjs_1.BehaviorSubject(cardDataFromLocalStorage);
        this.cardData$ = this.cardDataSubject.asObservable();
        var imageDataFromLocalStorage = JSON.parse(localStorage.getItem('imageData') || 'null');
        this.imageDataSubject = new rxjs_1.BehaviorSubject(imageDataFromLocalStorage);
        this.imageData$ = this.imageDataSubject.asObservable();
    }
    DataService.prototype.setUserData = function (userData) {
        this.userDataSubject.next(userData);
        // lưu dữ liệu vào local storage
        localStorage.setItem('userData', JSON.stringify(userData));
    };
    DataService.prototype.setCardData = function (cardData) {
        this.cardDataSubject.next(cardData);
        // lưu trữ dữ liệu vào local storage
        localStorage.setItem('cardData', JSON.stringify(cardData));
    };
    DataService.prototype.setImgData = function (imageData) {
        this.imageDataSubject.next(imageData);
        localStorage.setItem('imageData', JSON.stringify(imageData));
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
