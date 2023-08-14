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
    function UserEvalComponent(userService, activatedRoute) {
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.users = [];
        this.currentPage = 1; // Trang hiện tại, mặc định là trang đầu tiên
        this.itemsPerPage = 5; // Số hàng hiển thị trên mỗi trang
        this.sortedUsers = [];
        this.sortAscending = true;
        this.statusFormEval = false;
        // statusUser!: number;
        this.search = '';
    }
    // @Input() searchValue: string = '';
    // searchResult: string = '';
    // ngOnChanges() {
    //   // Thực hiện tìm kiếm với dữ liệu trong this.searchValue
    //   this.searchResult = 'Kết quả tìm kiếm với: ' + this.searchValue;
    // }
    UserEvalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getListUser().subscribe(function (user) {
            _this.users = user;
            _this.totalPage = _this.getTotalPages();
        }, function (error) {
            console.error('Error fetching users:', error);
        });
        this.activatedRoute.paramMap.subscribe(function (paramMap) {
            _this.idUser = paramMap.params['id'];
            console.log(_this.idUser);
        });
    };
    UserEvalComponent.prototype.evaluate = function (user) {
        this.statusFormEval = true;
        // Xử lý đánh giá đồng nghiệp ở đây
        console.log('Đánh giá cho người dùng:', user);
        this.userToEval = user;
    };
    UserEvalComponent.prototype["delete"] = function (user) {
        var _this = this;
        this.userToDelete = user;
        if (this.userToDelete.code) {
            this.userService.deleteUser(this.userToDelete.code).subscribe(function () {
                // Sau khi xóa thành công, cập nhật lại danh sách người dùng
                _this.userService.getListUser().subscribe(function (updatedUsers) {
                    _this.users = updatedUsers;
                    _this.totalPage = _this.getTotalPages();
                    console.log('Xóa người dùng này', user);
                });
            });
        }
    };
    // Cập nhật trạng thái người dùng
    UserEvalComponent.prototype.status = function (user) {
        var _this = this;
        if (user.status === 1) {
            user.status = 2;
        }
        else {
            user.status = 1;
        }
        this.userService.updateUser(user.id, user).subscribe(function () {
            _this.userService.getListUser().subscribe();
        });
    };
    UserEvalComponent.prototype.confirmDelete = function (user) {
        var result = confirm('Bạn có chắc chắn muốn xóa người dùng này không?');
        if (result) {
            this["delete"](user);
        }
    };
    UserEvalComponent.prototype.getTotalPages = function () {
        return Math.ceil(this.users.length / this.itemsPerPage);
    };
    UserEvalComponent.prototype.getCurrentPageData = function () {
        var startIndex = (this.currentPage - 1) * this.itemsPerPage;
        var endIndex = startIndex + this.itemsPerPage;
        return this.users.slice(startIndex, endIndex);
    };
    // Hàm để chuyển đến trang tiếp theo
    UserEvalComponent.prototype.nextPage = function () {
        if (this.users.length % this.itemsPerPage !== 0) {
            this.currentPage++;
        }
    };
    // Hàm để quay lại trang trước
    UserEvalComponent.prototype.prevPage = function () {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    };
    UserEvalComponent.prototype.closeFormEval = function () {
        this.statusFormEval = false;
    };
    UserEvalComponent.prototype.searchUsers = function (keyword) {
        var _this = this;
        this.userService.searchUser(keyword).subscribe(function (data) {
            _this.users = data;
            _this.getCurrentPageData();
        });
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
