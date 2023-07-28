"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserImgComponent = void 0;
var core_1 = require("@angular/core");
var UserImgComponent = /** @class */ (function () {
    function UserImgComponent(activatedRoute, router) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.selectedFile = null;
    }
    UserImgComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.paramMap.subscribe(function (param) {
            _this.id = param.params['id'];
        });
    };
    UserImgComponent.prototype.redirect = function () {
        this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id]);
    };
    UserImgComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        var file = event.target.files[0]; // Lấy tệp đã chọn từ sự kiện
        // Sử dụng FileReader để đọc nội dung tệp
        var reader = new FileReader();
        reader.onload = function (e) {
            // Nội dung của tệp được đọc sẽ nằm trong e.target.result
            _this.url = e.target.result; // Lưu nội dung (data URL) vào biến url
            console.log(_this.url);
        };
        reader.readAsDataURL(file);
    };
    UserImgComponent.prototype.saveImage = function () {
        // Implement code to save the uploaded image here
        this.url = undefined;
    };
    UserImgComponent.prototype.closePopup = function () {
        // Implement code to close the popup here
        this.url = undefined;
    };
    UserImgComponent = __decorate([
        core_1.Component({
            selector: 'app-user-img',
            templateUrl: './user-img.component.html',
            styleUrls: ['./user-img.component.css']
        })
    ], UserImgComponent);
    return UserImgComponent;
}());
exports.UserImgComponent = UserImgComponent;
