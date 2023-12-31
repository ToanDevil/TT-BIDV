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
    function UserCardComponent(userService, activatedRoute, dataService, router, toastr, formBuilder) {
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.dataService = dataService;
        this.router = router;
        this.toastr = toastr;
        this.formBuilder = formBuilder;
        this.showForm = true;
        this.editImg = true;
        this.selectedFile = null;
        this.zoomLevel = 100;
        this.zoomStyle = '';
    }
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
        console.log(this.userForm);
    };
    UserCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.paramMap.subscribe(function (paramMap) {
            _this.id = paramMap.params['id'];
            _this.getUser(_this.id);
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
            // console.log(cardData);
            // console.log(this.userData);
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (this.userData && this.userData.code || this.cardData || this.id) {
            var code = (_a = this.userData) === null || _a === void 0 ? void 0 : _a.code;
            // Update user information
            var updatedUser = __assign(__assign({}, this.userData), { name: (_b = this.userForm.get('name')) === null || _b === void 0 ? void 0 : _b.value, email: (_c = this.userForm.get('email')) === null || _c === void 0 ? void 0 : _c.value, address: (_d = this.userForm.get('address')) === null || _d === void 0 ? void 0 : _d.value, phone: (_e = this.userForm.get('phone')) === null || _e === void 0 ? void 0 : _e.value, tel: (_f = this.userForm.get('tel')) === null || _f === void 0 ? void 0 : _f.value });
            this.userService.updateUser(this.id, updatedUser).subscribe(function () {
                _this.getUser(_this.id);
            });
            // Update card information
            var updatedCard = __assign(__assign({}, this.cardData), { position: (_g = this.userForm.get('position')) === null || _g === void 0 ? void 0 : _g.value, forte: (_h = this.userForm.get('forte')) === null || _h === void 0 ? void 0 : _h.value, department: (_j = this.userForm.get('department')) === null || _j === void 0 ? void 0 : _j.value, nickname: (_k = this.userForm.get('nickname')) === null || _k === void 0 ? void 0 : _k.value, unit: (_l = this.userForm.get('unit')) === null || _l === void 0 ? void 0 : _l.value, title: (_m = this.userForm.get('title')) === null || _m === void 0 ? void 0 : _m.value });
            this.userService.updateCard(code, updatedCard).subscribe(function () {
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
    UserCardComponent.prototype.getImage = function (id) {
        var _this = this;
        this.userService.getImage(id).subscribe(function (imageData) {
            _this.imageData = imageData;
        });
    };
    UserCardComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        var file = event.target.files[0]; // Lấy tệp đã chọn từ sự kiện
        if (this.isValidImageFile(file)) {
            this.image = file;
            // Sử dụng FileReader để đọc nội dung tệp
            var reader = new FileReader();
            reader.onload = function (e) {
                // Nội dung của tệp được đọc sẽ nằm trong e.target.result
                _this.url = e.target.result; // Lưu nội dung (data URL) vào biến url
            };
            reader.readAsDataURL(file);
        }
        else {
            // Hiển thị thông báo yêu cầu người dùng chọn file đúng định dạng
            alert('Vui lòng chọn file hình ảnh có định dạng JPG, JPEG, BMP, PNG, SVG.');
        }
    };
    UserCardComponent.prototype.isValidImageFile = function (file) {
        // Mảng chứa các định dạng hợp lệ
        var validFormats = ['image/jpeg', 'image/png', 'image/bmp', 'image/svg+xml', 'image/jpg'];
        return validFormats.includes(file.type);
    };
    UserCardComponent.prototype.zoomIn = function () {
        this.zoomLevel += 10;
        this.updateZoomStyle();
    };
    UserCardComponent.prototype.zoomOut = function () {
        this.zoomLevel -= 10;
        this.updateZoomStyle();
    };
    UserCardComponent.prototype.updateZoomStyle = function () {
        this.zoomStyle = "scale(" + this.zoomLevel / 100 + ")";
    };
    UserCardComponent.prototype.updateZoom = function () {
        this.zoomStyle = "scale(" + this.zoomLevel / 100 + ")";
    };
    UserCardComponent.prototype.saveImage = function () {
        var _this = this;
        if (!this.image) {
            console.error('No image selected');
            return;
        }
        var formData = new FormData();
        formData.append('image', this.image);
        if (this.imageData) {
            formData.append('code', this.imageData.code);
            console.log(formData);
        }
        this.userService.uploadImage(formData).subscribe(function (response) {
            _this.getImage(_this.id);
            console.log('Image updated successfully', response);
            _this.closeEdit();
            _this.toastr.success('Cập nhật thành công!');
            _this.dataService.updateImage();
            // Xử lý khi ảnh đã được cập nhật thành công
        }, function (error) {
            console.error('Error uploading image:', error);
            // Handle the error if needed
        });
    };
    UserCardComponent.prototype.closePopup = function () {
        // Implement code to close the popup here
        this.url = undefined;
        this.editImg = true;
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
