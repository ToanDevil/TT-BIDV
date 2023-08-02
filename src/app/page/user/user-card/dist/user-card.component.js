"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserCardComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UserCardComponent = /** @class */ (function () {
    function UserCardComponent(userService, activatedRoute, dataService, router, toastr, formBuilder, location) {
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.dataService = dataService;
        this.router = router;
        this.toastr = toastr;
        this.formBuilder = formBuilder;
        this.location = location;
        this.showForm = true;
        this.editImg = true;
        this.selectedFile = null;
    }
    // redirect(check: string){
    //   if(check === 'edit-profile'){
    //     this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id + check + '/' + this.id])
    //   }
    //   else{
    //     this.router.navigate(['/page/user/' + this.id + '/user-card/' + this.id + check + '/'+ this.id])
    //   }
    // }
    UserCardComponent.prototype.initForm = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.userForm = this.formBuilder.group({
            name: [((_a = this.userData) === null || _a === void 0 ? void 0 : _a.name) || '', forms_1.Validators.required],
            tel: [((_b = this.userData) === null || _b === void 0 ? void 0 : _b.tel) || '', forms_1.Validators.required],
            phone: [((_c = this.userData) === null || _c === void 0 ? void 0 : _c.phone) || '', forms_1.Validators.required],
            email: [((_d = this.userData) === null || _d === void 0 ? void 0 : _d.email) || '', forms_1.Validators.required],
            address: [((_e = this.userData) === null || _e === void 0 ? void 0 : _e.address) || '', forms_1.Validators.required],
            nickname: [((_f = this.cardData) === null || _f === void 0 ? void 0 : _f.nickname) || '', forms_1.Validators.required],
            forte: [((_g = this.cardData) === null || _g === void 0 ? void 0 : _g.forte) || '', forms_1.Validators.required],
            unit: [((_h = this.cardData) === null || _h === void 0 ? void 0 : _h.unit) || '', forms_1.Validators.required],
            department: [((_j = this.cardData) === null || _j === void 0 ? void 0 : _j.department) || '', forms_1.Validators.required],
            position: [((_k = this.cardData) === null || _k === void 0 ? void 0 : _k.position) || '', forms_1.Validators.required],
            title: [((_l = this.cardData) === null || _l === void 0 ? void 0 : _l.title) || '', forms_1.Validators.required]
        });
    };
    UserCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.paramMap.subscribe(function (paramMap) {
            _this.id = paramMap.params['id'];
            _this.getUser(_this.id);
            _this.initForm();
            console.log(_this.id);
            if (_this.id) {
                _this.getCard(_this.id);
                _this.userService.getImage(_this.id).subscribe(function (imageData) {
                    _this.imageData = imageData;
                    _this.initForm();
                });
            }
        });
    };
    UserCardComponent.prototype.getCard = function (id) {
        var _this = this;
        this.userService.getCard(id).subscribe(function (cardData) {
            _this.cardData = cardData;
            _this.dataService.setCardData(cardData);
            console.log(cardData);
            console.log(_this.userData);
        });
    };
    UserCardComponent.prototype.getUser = function (id) {
        var _this = this;
        this.userService.getUser(id).subscribe(function (userData) {
            _this.userData = userData;
        });
    };
    UserCardComponent.prototype.onImageError = function () {
        // Thay thế ảnh bằng URL của ảnh mặc định khi xảy ra lỗi
        if (this.imageData) {
            this.imageData.url = '/assets/images/avatar.jpg';
        }
    };
    UserCardComponent.prototype.saveData = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (this.userData && this.cardData && this.id && this.userData.code) {
            // Update user information
            var updatedUser = __assign(__assign({}, this.userData), { name: (_a = this.userForm.get('name')) === null || _a === void 0 ? void 0 : _a.value, email: (_b = this.userForm.get('email')) === null || _b === void 0 ? void 0 : _b.value, address: (_c = this.userForm.get('address')) === null || _c === void 0 ? void 0 : _c.value, phone: (_d = this.userForm.get('phone')) === null || _d === void 0 ? void 0 : _d.value, tel: (_e = this.userForm.get('tel')) === null || _e === void 0 ? void 0 : _e.value });
            this.userService.updateUser(this.id, updatedUser).subscribe(function () {
                _this.getUser(_this.id);
            });
            // Update card information
            var updatedCard = __assign(__assign({}, this.cardData), { position: (_f = this.userForm.get('position')) === null || _f === void 0 ? void 0 : _f.value, forte: (_g = this.userForm.get('forte')) === null || _g === void 0 ? void 0 : _g.value, department: (_h = this.userForm.get('department')) === null || _h === void 0 ? void 0 : _h.value, nickname: (_j = this.userForm.get('nickname')) === null || _j === void 0 ? void 0 : _j.value, unit: (_k = this.userForm.get('unit')) === null || _k === void 0 ? void 0 : _k.value, title: (_l = this.userForm.get('title')) === null || _l === void 0 ? void 0 : _l.value });
            this.userService.updateCard(this.userData.code, updatedCard).subscribe(function () {
                _this.getCard(_this.id);
            });
            this.showForm = true;
            this.toastr.success('Cập nhật thành công!');
            // window.location.reload();
        }
    };
    UserCardComponent.prototype.openForm = function () {
        this.showForm = false;
    };
    UserCardComponent.prototype.openEdit = function () {
        this.editImg = false;
    };
    UserCardComponent.prototype.closeForm = function () {
        this.showForm = true;
    };
    UserCardComponent.prototype.closeEdit = function () {
        this.editImg = true;
    };
    UserCardComponent.prototype.cancel = function () {
        this.showForm = false;
    };
    UserCardComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        var file = event.target.files[0]; // Lấy tệp đã chọn từ sự kiện
        this.image = file;
        // Sử dụng FileReader để đọc nội dung tệp
        var reader = new FileReader();
        reader.onload = function (e) {
            // Nội dung của tệp được đọc sẽ nằm trong e.target.result
            _this.url = e.target.result; // Lưu nội dung (data URL) vào biến url
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    UserCardComponent.prototype.saveImage = function () {
        var _a;
        var formData = new FormData();
        formData.append('file', this.image);
        console.log(formData);
        this.url = undefined;
        if (this.imageData) {
            this.userService.updateImage((_a = this.imageData) === null || _a === void 0 ? void 0 : _a.code, formData).subscribe(function (response) {
                console.log('Image updated successfully', response);
                // Xử lý khi ảnh đã được cập nhật thành công
            }, function (error) {
                console.error('Error updating image', error);
                // Xử lý khi gặp lỗi khi cập nhật ảnh
            });
        }
    };
    UserCardComponent.prototype.closePopup = function () {
        // Implement code to close the popup here
        this.url = undefined;
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
