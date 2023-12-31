"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_component_1 = require("./user.component");
var routes = [
    {
        path: '',
        component: user_component_1.UserComponent,
        children: [
            {
                path: 'user-info/:id',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./user-info/user-info.module'); }).then(function (m) { return m.UserInfoModule; }); }
            },
            {
                path: 'user-card/:id',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./user-card/user-card.module'); }).then(function (m) { return m.UserCardModule; }); }
            },
            {
                path: 'user-evaluate/:id',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./user-eval/user-eval.module'); }).then(function (m) { return m.UserEvalModule; }); }
            }
        ]
    }
];
var UserRoutingModule = /** @class */ (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());
exports.UserRoutingModule = UserRoutingModule;
