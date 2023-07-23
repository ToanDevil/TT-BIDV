"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserCardModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var user_card_routing_module_1 = require("./user-card-routing.module");
var user_card_component_1 = require("./user-card.component");
var forms_1 = require("@angular/forms");
var UserCardModule = /** @class */ (function () {
    function UserCardModule() {
    }
    UserCardModule = __decorate([
        core_1.NgModule({
            declarations: [
                user_card_component_1.UserCardComponent
            ],
            imports: [
                common_1.CommonModule,
                user_card_routing_module_1.UserCardRoutingModule,
                forms_1.FormsModule
            ]
        })
    ], UserCardModule);
    return UserCardModule;
}());
exports.UserCardModule = UserCardModule;
