"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserComponent = void 0;
var core_1 = require("@angular/core");
var UserComponent = /** @class */ (function () {
    function UserComponent(router, activatedRoute) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.activeOption = 'option1';
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Kiểm tra nếu đã lưu giá trị activeOption trong Local Storage
        var storedOption = localStorage.getItem('activeOption');
        if (storedOption) {
            this.activeOption = storedOption;
        }
        this.activatedRoute.paramMap.subscribe(function (param) {
            console.log(param);
            _this.id = param.params['id'];
            // console.log(this.id)
        });
    };
    UserComponent.prototype.setActiveOption = function (option, url) {
        this.activeOption = option;
        // Lưu giá trị activeOption vào Local Storage
        localStorage.setItem('activeOption', option);
        this.router.navigate([url + this.id]);
        //  console.log(this.id)
    };
    UserComponent.prototype.isOptionActive = function (option) {
        return this.activeOption === option;
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'app-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
