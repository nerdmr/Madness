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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var MarchMadnessService = (function () {
    function MarchMadnessService(http) {
        this.http = http;
        //private host: string = "http://71.90.79.66:2018";
        //private host: string = "http://localhost:2017";
        //private host: string = "http://localhost:50980";    
        this.host = "http://windows.bruflodt.com.192-185-6-33.secure14.win.hostgator.com";
        //private host: string = "http://localhost:2020";
        this.weightsEndpoint = this.host + "/api/Madness/GetWeights";
        this.bracketsEndpoint = this.host + "/api/Madness/GetProjectedBrackets";
        this.singleBracketEndpoint = this.host + "/api/Madness/GetSingleProjectedBracket";
        this.saveWeightsEndpoint = this.host + "/api/Madness/SaveWeights";
        this.loadWeightsEndpoint = this.host + "/api/Madness/LoadWeightConfiguration";
    }
    MarchMadnessService.prototype.GetWeights = function () {
        return this.http.get(this.weightsEndpoint).map(this.response).catch(this.handleError);
    };
    MarchMadnessService.prototype.GetProjectedBrackets = function (weights) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        return this.http.post(this.bracketsEndpoint, weights, options).map(this.response).catch(this.handleError);
    };
    MarchMadnessService.prototype.GetSingleProjectedBracket = function (weights) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        return this.http.post(this.singleBracketEndpoint, weights, options).map(this.response).catch(this.handleError);
    };
    MarchMadnessService.prototype.SaveWeights = function (weights) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = {
            headers: headers
        };
        return this.http.post(this.saveWeightsEndpoint, weights, options).map(this.response).catch(this.handleError);
    };
    MarchMadnessService.prototype.LoadWeights = function (user, configName) {
        var params = new http_1.URLSearchParams();
        params.set('user', user.toString());
        params.set('configName', configName);
        var requestOptions = new http_1.RequestOptions();
        requestOptions.search = params;
        return this.http.get(this.loadWeightsEndpoint, requestOptions).map(this.response).catch(this.handleError);
    };
    MarchMadnessService.prototype.response = function (res) {
        var body = res.json();
        return body;
    };
    MarchMadnessService.prototype.handleError = function (error) {
        var errorMessage = "uh oh";
        console.log(errorMessage);
        return Observable_1.Observable.throw(errorMessage);
    };
    MarchMadnessService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MarchMadnessService);
    return MarchMadnessService;
}());
exports.MarchMadnessService = MarchMadnessService;
//# sourceMappingURL=march-madness.service.js.map