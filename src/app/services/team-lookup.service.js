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
var TeamLookup = (function () {
    function TeamLookup() {
    }
    TeamLookup.prototype.GetTeamName = function (id) {
        if (this.Lookup[id]) {
            return this.Lookup[id].FriendlyName;
        }
        else {
            return "";
        }
    };
    TeamLookup.prototype.SetLookup = function (lookup) {
        this.Lookup = lookup;
    };
    TeamLookup = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TeamLookup);
    return TeamLookup;
}());
exports.TeamLookup = TeamLookup;
var AnswerKey = (function () {
    function AnswerKey() {
    }
    AnswerKey.prototype.IsCorrect = function (round, position, team) {
        var id = "r" + round + "p" + position;
        if (!this.Key || round == 1)
            return 0;
        if (this.Key[id] == "" || !this.Key[id] || this.Key[id] == -1) {
            return 0;
        }
        if (this.Key[id] == team) {
            return 1;
        }
        return -1;
    };
    AnswerKey.prototype.IsCorrectByPositionId = function (positionId, team) {
    };
    AnswerKey.prototype.SetKey = function (key) {
        this.Key = key;
    };
    AnswerKey = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AnswerKey);
    return AnswerKey;
}());
exports.AnswerKey = AnswerKey;
//# sourceMappingURL=team-lookup.service.js.map