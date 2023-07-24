"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserFormModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var user_form_routing_module_1 = require("./user-form-routing.module");
var forms_1 = require("@angular/forms");
var UserFormModule = /** @class */ (function () {
    function UserFormModule() {
    }
    UserFormModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                common_1.CommonModule,
                user_form_routing_module_1.UserFormRoutingModule,
                forms_1.FormsModule
            ]
        })
    ], UserFormModule);
    return UserFormModule;
}());
exports.UserFormModule = UserFormModule;
