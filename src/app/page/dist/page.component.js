"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PageComponent = void 0;
var core_1 = require("@angular/core");
var PageComponent = /** @class */ (function () {
    function PageComponent(route, router) {
        this.route = route;
        this.router = router;
        // click icon
        this.id = '1';
        this.activeIcon = 'Icon1';
    }
    PageComponent.prototype.ngOnInit = function () {
        // Kiểm tra nếu đã lưu giá trị activeIcon trong Local Storage
        var storedIcon = localStorage.getItem('activeIcon');
        if (storedIcon) {
            this.activeIcon = storedIcon;
        }
        // this.route.params.subscribe(params => {
        //   this.id = params['id'];
        //   //console.log(this.id); // Kiểm tra xem id đã nhận được từ URL hay không
        // });
    };
    PageComponent.prototype.setActiveIcon = function (Icon, url, check) {
        this.activeIcon = Icon;
        // Lưu giá trị activeIcon vào Local Storage
        localStorage.setItem('activeIcon', Icon);
        if (check === '1') {
            this.router.navigate(['/page/user/' + this.id + '/' + url + '/' + this.id]);
        }
        else {
            this.router.navigate([url]);
        }
        console.log(this.id);
    };
    PageComponent.prototype.isIconActive = function (Icon) {
        return this.activeIcon === Icon;
    };
    PageComponent = __decorate([
        core_1.Component({
            selector: 'app-page',
            templateUrl: './page.component.html',
            styleUrls: ['./page.component.css']
        })
    ], PageComponent);
    return PageComponent;
}());
exports.PageComponent = PageComponent;
