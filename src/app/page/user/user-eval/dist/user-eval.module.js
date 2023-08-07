"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEvalModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var user_eval_routing_module_1 = require("./user-eval-routing.module");
var user_eval_component_1 = require("./user-eval.component");
var UserEvalModule = /** @class */ (function () {
    function UserEvalModule() {
    }
    UserEvalModule = __decorate([
        core_1.NgModule({
            declarations: [
                user_eval_component_1.UserEvalComponent,
            ],
            imports: [
                common_1.CommonModule,
                user_eval_routing_module_1.UserEvalRoutingModule,
            ]
        })
    ], UserEvalModule);
    return UserEvalModule;
}());
exports.UserEvalModule = UserEvalModule;
