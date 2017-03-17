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
var march_madness_service_1 = require('./services/march-madness.service');
var user_component_1 = require('./components/user.component');
var team_lookup_service_1 = require('./services/team-lookup.service');
var AppComponent = (function () {
    //private http: Http;
    function AppComponent(marchMadnessService, _teamLookup, _answerKey) {
        var _this = this;
        this.marchMadnessService = marchMadnessService;
        this._teamLookup = _teamLookup;
        this._answerKey = _answerKey;
        this.marchMadnessService.GetWeights().subscribe(function (result) { return _this.WeightConfig = result; });
    }
    AppComponent.prototype.overrideChangedHandler = function (overrideDetails) {
        var _this = this;
        var team = overrideDetails.team;
        var toRound = overrideDetails.round;
        if (!this.WeightConfig.OverrideDictionary)
            this.WeightConfig.OverrideDictionary = {};
        if (!this.WeightConfig.OverrideDictionary["2017"])
            this.WeightConfig.OverrideDictionary["2017"] = {};
        if (this.WeightConfig.OverrideDictionary["2017"][team] == toRound) {
            // this team has some overrides already. should we be removing?
            // Yes, yes we should
            delete this.WeightConfig.OverrideDictionary["2017"][team];
        }
        else {
            this.WeightConfig.OverrideDictionary["2017"][team] = toRound;
        }
        this.marchMadnessService.GetSingleProjectedBracket(this.WeightConfig).subscribe(function (result) { return _this.singleBracketHandler(result); });
    };
    AppComponent.prototype.singleBracketHandler = function (result) {
        this.SelectedBracket = result.Brackets[0];
    };
    AppComponent.prototype.weightConfigurationChangedHandler = function () {
        var _this = this;
        this.marchMadnessService.GetProjectedBrackets(this.WeightConfig).subscribe(function (result) { return _this.ProjectionResults = _this.handleProjectionReturn(result); });
    };
    AppComponent.prototype.handleProjectionReturn = function (result) {
        this._teamLookup.SetLookup(result.TeamLookup);
        return result;
    };
    // loads weight configuration for user
    AppComponent.prototype.userLoggedInOnLoad = function () {
        var _this = this;
        this.marchMadnessService.LoadWeights(this.User.UserId, "My Saved Weights").subscribe(function (result) { return _this.weightConfigReturned(result); });
    };
    AppComponent.prototype.weightConfigReturned = function (result) {
        var _this = this;
        this.WeightConfig = result;
        this.marchMadnessService.GetProjectedBrackets(this.WeightConfig).subscribe(function (result) { return _this.ProjectionResults = _this.handleProjectionReturn(result); });
    };
    AppComponent.prototype.dbg = function () {
        //console.log(this.SelectedBracket);
        //console.log(this.ProjectionResults);
        //console.log(this.WeightConfig);
    };
    AppComponent.prototype.saveClicked = function () {
        // does the user have a weight configuration?
        // to do
        // check if is logged in.
        if (this.User.IsConnected) {
            this.saveCurrentWeightConfig();
        }
        else {
            this.showLogin = true;
        }
    };
    AppComponent.prototype.saveCurrentWeightConfig = function () {
        var _this = this;
        // call save code
        this.WeightConfig.UserId = this.User.UserId;
        this.WeightConfig.Name = "My Saved Weights";
        this.isSaving = true;
        this.marchMadnessService.SaveWeights(this.WeightConfig).subscribe(function (result) { return _this.handleSaveComplete(result); });
    };
    AppComponent.prototype.handleSaveComplete = function (result) {
        var _this = this;
        // iff successful, show success
        this.saveSuccessful = true;
        this.isSaving = false;
        setTimeout(function () {
            _this.saveSuccessful = false;
        }, 2000);
    };
    AppComponent.prototype.helpClicked = function () {
        // show help overlay
    };
    AppComponent.prototype.hideBracket = function () {
        this.SelectedBracket = null;
    };
    AppComponent.prototype.bracketSelectedHandler = function (bracket) {
        this._answerKey.SetKey(bracket.AnswerKey);
        this.SelectedBracket = bracket;
    };
    __decorate([
        core_1.ViewChild('User'), 
        __metadata('design:type', user_component_1.UserComponent)
    ], AppComponent.prototype, "User", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n  <div class=\"nav-header\">\n    <div class=\"container\">\n      <div class=\"row nav-row\">\n        <div class=\"col-sm-12\">\n            <div class=\"site-title\"><h1>Bracket Generator</h1></div>\n            <div class=\"user-options\">\n              <div class=\"nav-btn save-btn\" (click)=\"saveClicked()\" [ngClass]=\"{'saving': isSaving, 'success': saveSuccessful }\"><div class=\"icon-holder\"><i class=\"material-icons save\">&#xE161;</i><i class=\"material-icons loading\" [ngClass]=\"{'spin':isSaving}\">&#xE86A;</i><i class=\"material-icons success\">&#xE5CA;</i></div><div class=\"caption\">Save</div></div>\n              <div class=\"nav-btn help-btn\" (click)=\"helpClicked()\"><i class=\"material-icons\">&#xE887;</i><div class=\"caption\">Help</div></div>\n            </div>\n        </div>\n      </div>  \n    </div>\n  </div>\n<div class=\"container body-content\" (click)=\"dbg()\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <weight-configurator [Config]=\"WeightConfig\" on-weightConfigurationChanged=\"weightConfigurationChangedHandler($event)\"></weight-configurator>\n            </div>\n            <div class=\"col-sm-12\">\n                <projection-results [ProjectionResults]=\"ProjectionResults\" on-RowClicked=\"bracketSelectedHandler($event)\"></projection-results>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-sm-12\">\n        <bracket [TeamLookup]=\"ProjectionResults?.TeamLookup\" [Bracket]=\"SelectedBracket\" on-HideBracketEvent=\"hideBracket()\" on-OverrideChanged=\"overrideChangedHandler($event)\"></bracket>\n    </div>\n  </div>\n</div><user #User [ShowLogin]=\"showLogin\" on-UserOnLoad=\"userLoggedInOnLoad()\"></user>",
            providers: [march_madness_service_1.MarchMadnessService, team_lookup_service_1.TeamLookup, team_lookup_service_1.AnswerKey]
        }), 
        __metadata('design:paramtypes', [march_madness_service_1.MarchMadnessService, team_lookup_service_1.TeamLookup, team_lookup_service_1.AnswerKey])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map