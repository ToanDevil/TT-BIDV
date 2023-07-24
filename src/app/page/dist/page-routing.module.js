"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PageRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_component_1 = require("./page.component");
var routes = [
    {
        path: '',
        component: page_component_1.PageComponent,
        children: [
            {
                path: 'user/:id',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./user/user.module'); }).then(function (m) { return m.UserModule; }); }
            }
        ]
    }
];
var PageRoutingModule = /** @class */ (function () {
    function PageRoutingModule() {
    }
    PageRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PageRoutingModule);
    return PageRoutingModule;
}());
exports.PageRoutingModule = PageRoutingModule;
