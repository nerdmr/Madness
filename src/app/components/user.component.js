"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var UserComponent = (function () {
    function UserComponent() {
        this.UserOnLoad = new core_1.EventEmitter();
        FB.init({
            appId: '1645224029105883',
            cookie: false,
            // the session
            xfbml: true,
            version: 'v2.5' // use graph api version 2.5
        });
    }
    // private toggleMenu() {
    //     this.isExpanded = !this.isExpanded;
    // }
    UserComponent.prototype.onFacebookLoginClick = function () {
        var _this = this;
        FB.login(function (response) {
            _this.statusChangeCallback(response, false);
        });
    };
    UserComponent.prototype.statusChangeCallback = function (resp, onInit) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            this.UserId = resp.authResponse.userID;
            this.IsConnected = true;
            if (onInit) {
                // let's emit event that says the user existed on load
                this.UserOnLoad.emit();
            }
        }
        else if (resp.status === 'not_authorized') {
            console.log('not auth');
            console.log(resp);
        }
        else {
            console.log('else');
            console.log(resp);
        }
    };
    ;
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        FB.getLoginStatus(function (response) {
            _this.statusChangeCallback(response, true);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UserComponent.prototype, "ShowLogin", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UserComponent.prototype, "UserOnLoad", void 0);
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user',
            template: "\n  <div id='user-menu' [ngClass]=\"{'show':ShowLogin}\" class=\"card card-2\">\n    <div id='user-menu-body'>\n        <!--<div id=\"fb-root\"></div>        \n\t    <div class=\"fb-login-button\" data-max-rows=\"1\" data-size=\"medium\" data-show-faces=\"false\" data-auto-logout-link=\"true\"></div>-->\n        <div class=\"madness-btn btn fb-btn\" (click)=\"onFacebookLoginClick()\">Log in to Facebook</div>\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map