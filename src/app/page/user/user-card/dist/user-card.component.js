"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserCardComponent = void 0;
var core_1 = require("@angular/core");
var UserCardComponent = /** @class */ (function () {
    function UserCardComponent(userService, activatedRoute, dataService, router) {
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.dataService = dataService;
        this.router = router;
    }
    UserCardComponent.prototype.redirect = function (check) {
        if (check === 'edit-profile') {
            this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id + check + '/' + this.id]);
        }
        else {
            this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id + check + '/' + this.id]);
        }
    };
    UserCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.userData$.subscribe(function (userData) {
            _this.userData = userData; // Nhận dữ liệu từ DataService
        });
        this.activatedRoute.paramMap.subscribe(function (paramMap) {
            _this.id = paramMap.params['id'];
            console.log(_this.id);
            if (_this.id) {
                _this.userService.getCard(_this.id).subscribe(function (cardData) {
                    _this.cardData = cardData;
                    _this.dataService.setCardData(cardData);
                    console.log(cardData);
                    console.log(_this.userData);
                });
                _this.userService.getImage(_this.id).subscribe(function (imageData) {
                    _this.imageData = imageData;
                });
            }
        });
    };
    UserCardComponent = __decorate([
        core_1.Component({
            selector: 'app-user-card',
            templateUrl: './user-card.component.html',
            styleUrls: ['./user-card.component.css']
        })
    ], UserCardComponent);
    return UserCardComponent;
}());
exports.UserCardComponent = UserCardComponent;
