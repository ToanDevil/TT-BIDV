"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var page_component_1 = require("./page/page.component");
var http_1 = require("@angular/common/http");
var user_card_module_1 = require("./page/user/user-card/user-card.module");
var user_info_module_1 = require("./page/user/user-info/user-info.module");
var data_service_1 = require("./core/service/data.service");
var user_card_component_1 = require("./page/user/user-card/user-card.component");
var user_info_component_1 = require("./page/user/user-info/user-info.component");
var user_component_1 = require("./page/user/user.component");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                page_component_1.PageComponent,
                user_card_component_1.UserCardComponent,
                user_info_component_1.UserInfoComponent,
                user_component_1.UserComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                http_1.HttpClientModule,
                user_card_module_1.UserCardModule,
                user_info_module_1.UserInfoModule,
                animations_1.BrowserAnimationsModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                forms_1.ReactiveFormsModule,
            ],
            providers: [
                data_service_1.DataService,
                animations_1.provideAnimations(),
                ngx_toastr_1.provideToastr(),
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
