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
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
// components
var app_component_1 = require('./app.component');
var weight_configurator_component_1 = require('./components/weight-configurator.component');
var weight_adjuster_component_1 = require('./components/weight-adjuster.component');
var projection_results_component_1 = require('./components/projection-results.component');
var bracket_component_1 = require('./components/bracket.component');
var facebooklogin_component_1 = require('./components/facebooklogin.component');
var user_component_1 = require('./components/user.component');
var matchup_component_1 = require('./components/bracket/matchup.component');
var full_bracket_component_1 = require('./components/bracket/full-bracket.component');
// directives
var mousewheel_directive_1 = require('./directives/mousewheel.directive');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, http_1.JsonpModule],
            declarations: [app_component_1.AppComponent, weight_configurator_component_1.WeightConfiguratorComponent, weight_adjuster_component_1.WeightAdjusterComponent, bracket_component_1.BracketComponent, projection_results_component_1.ProjectionResultsComponent, mousewheel_directive_1.MouseWheelDirective, facebooklogin_component_1.FacebookLoginComponent, user_component_1.UserComponent, matchup_component_1.MatchupComponent, full_bracket_component_1.FullBracketComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map