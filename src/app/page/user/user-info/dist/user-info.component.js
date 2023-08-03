"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserInfoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent(route, userService, activatedRoute, dataService, formBuilder) {
        this.route = route;
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.id = null;
        this.showForm = true;
        this.profileForm = this.formBuilder.group({
            code: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.email],
            address: [''],
            phone: [''],
            tel: ['']
        });
    }
    UserInfoComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id).subscribe(function (userData) {
            _this.userData = userData;
        });
    };
    UserInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.paramMap.subscribe(function (paramMap) {
            var id = paramMap.get('id');
            if (id) {
                console.log(id);
                _this.getUser(id);
            }
        });
    };
    UserInfoComponent.prototype.openForm = function () {
        this.showForm = false;
    };
    UserInfoComponent.prototype.closeForm = function () {
        this.showForm = true;
    };
    UserInfoComponent.prototype.saveData = function () {
        if (this.profileForm.invalid) {
            // Handle form validation errors
            return;
        }
        var userData = this.profileForm.value;
        this.userService.addUser(userData).subscribe(function (response) {
            console.log('User added successfully', response);
            // Xử lý khi người dùng được thêm thành công
        }, function (error) {
            console.error('Error adding user', error);
            // Xử lý khi gặp lỗi khi thêm người dùng
        });
    };
    UserInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-user-info',
            templateUrl: './user-info.component.html',
            styleUrls: ['./user-info.component.css']
        })
    ], UserInfoComponent);
    return UserInfoComponent;
}());
exports.UserInfoComponent = UserInfoComponent;
