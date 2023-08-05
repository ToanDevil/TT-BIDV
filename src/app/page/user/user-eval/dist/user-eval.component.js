"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEvalComponent = void 0;
var core_1 = require("@angular/core");
var UserEvalComponent = /** @class */ (function () {
    function UserEvalComponent(userService) {
        this.userService = userService;
        this.users = [];
    }
    UserEvalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getListUser().subscribe(function (user) {
            _this.users = user;
        }, function (error) {
            console.error('Error fetching users:', error);
        });
    };
    UserEvalComponent.prototype.evaluate = function (user) {
        // Xử lý đánh giá đồng nghiệp ở đây
        console.log('Đánh giá cho người dùng:', user);
    };
    UserEvalComponent.prototype["delete"] = function (user) {
        var _this = this;
        this.userToDelete = user;
        if (this.userToDelete.code) {
            this.userService.deleteUser(this.userToDelete.code).subscribe(function () {
                _this.userService.getListUser().subscribe();
                console.log('Xóa người dùng này', user);
            });
        }
    };
    UserEvalComponent = __decorate([
        core_1.Component({
            selector: 'app-user-eval',
            templateUrl: './user-eval.component.html',
            styleUrls: ['./user-eval.component.css']
        })
    ], UserEvalComponent);
    return UserEvalComponent;
}());
exports.UserEvalComponent = UserEvalComponent;
