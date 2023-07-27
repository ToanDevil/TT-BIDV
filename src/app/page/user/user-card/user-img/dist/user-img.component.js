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
        this.selectedFile = event.target.files[0];
    };
    UserImgComponent.prototype.uploadImage = function () {
        // Implement code to handle file upload here
        if (this.selectedFile) {
            console.log('File selected:', this.selectedFile);
            // You can send the selectedFile to the server for uploading or processing.
        }
    };
    UserImgComponent.prototype.saveImage = function () {
        // Implement code to save the uploaded image here
        if (this.selectedFile) {
            console.log('Image saved:', this.selectedFile);
            // You can perform any required operations with the uploaded image here.
        }
    };
    UserImgComponent.prototype.closePopup = function () {
        // Implement code to close the popup here
        console.log('Popup closed');
        // You can hide the popup or perform any additional actions when closing the popup.
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
