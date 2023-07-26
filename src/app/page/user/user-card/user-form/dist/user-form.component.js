"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserFormComponent = void 0;
var core_1 = require("@angular/core");
var UserFormComponent = /** @class */ (function () {
    function UserFormComponent(activatedRoute, dataService, userService, router) {
        this.activatedRoute = activatedRoute;
        this.dataService = dataService;
        this.userService = userService;
        this.router = router;
    }
    UserFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.dataService.userData$.subscribe(cardData => {
        //   this.cardData = cardData; // Nhận dữ liệu từ DataService
        // })
        this.activatedRoute.paramMap.subscribe(function (param) {
            _this.id = param.params['id'];
        });
        this.dataService.userData$.subscribe(function (userData) {
            _this.userData = userData; // Nhận dữ liệu từ DataService
            console.log(userData);
        });
        this.dataService.cardData$.subscribe(function (cardData) {
            _this.cardData = cardData; // Nhận dữ liệu từ DataService
            console.log(cardData);
        });
    };
    //phương thức để cập nhật thông tin người dùng
    UserFormComponent.prototype.updateUser = function () {
        if (this.userData && this.id) {
            this.userService.updateUser(this.id, this.userData).subscribe(function (res) {
                //Xử lý kết quả cập nhật thành công
            });
        }
    };
    // phương thức để cập nhật dữ liệu thông tin card
    UserFormComponent.prototype.updateCard = function () {
        var _a;
        if (this.cardData && ((_a = this.userData) === null || _a === void 0 ? void 0 : _a.code)) {
            this.userService.updateCard(this.userData.code, this.cardData).subscribe(function (res) {
                // Xử lý kêts quả cập nhật thành công
            });
        }
    };
    UserFormComponent.prototype.saveData = function () {
        if (this.userData && this.cardData && this.id) {
            // cập nhật thông tin người dùng và thẻ thông qua userService
            this.userService.updateUser(this.id, this.userData).subscribe(function (res) {
                console.log('Thông tin người dùng đã được cập nhật: ', res);
            });
            this.userService.updateCard(this.userData.code, this.cardData).subscribe(function (res) {
                console.log('Thông tin thẻ đã được cập nhật: ', res);
            });
            // this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id])
        }
    };
    UserFormComponent.prototype.redirect = function () {
        this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id]);
    };
    UserFormComponent = __decorate([
        core_1.Component({
            selector: 'app-user-form',
            templateUrl: './user-form.component.html',
            styleUrls: ['./user-form.component.css']
        })
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
