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
var team_lookup_service_1 = require('../../services/team-lookup.service');
var MatchupComponent = (function () {
    function MatchupComponent(_teamLookup, _answerKey) {
        this.OverrideChanged = new core_1.EventEmitter();
        this.teamLookup = _teamLookup;
        this.answerKey = _answerKey;
    }
    MatchupComponent.prototype.ngOnChanges = function (changes) {
        if (this.Team1Id >= 0 && this.SeedLookup) {
            this.team1Name = this.teamLookup.GetTeamName(this.Team1Id);
            this.team2Name = this.teamLookup.GetTeamName(this.Team2Id);
            this.team1Seed = this.SeedLookup[this.Team1Id];
            this.team2Seed = this.SeedLookup[this.Team2Id];
        }
    };
    MatchupComponent.prototype.setOverride = function (position, team) {
        // if it's already overridden, we should remove the override
        this.OverrideChanged.emit({ round: this.Round + 1, team: team });
    };
    MatchupComponent.prototype.isCorrect = function (position, team) {
        if (this.answerKey.IsCorrect(this.Round, position, team) == 1) {
            return true;
        }
        return false;
    };
    MatchupComponent.prototype.isIncorrect = function (position, team) {
        if (this.answerKey.IsCorrect(this.Round, position, team) == -1) {
            return true;
        }
        return false;
    };
    MatchupComponent.prototype.isOverridden = function (position, team) {
        if (this.OverrideDictionary) {
            if (this.OverrideDictionary["2017"]) {
                if (this.OverrideDictionary["2017"][team]) {
                    if (this.Round < this.OverrideDictionary["2017"][team]) {
                        return true;
                    }
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MatchupComponent.prototype, "Round", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MatchupComponent.prototype, "Position", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MatchupComponent.prototype, "Team1Id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], MatchupComponent.prototype, "Team2Id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MatchupComponent.prototype, "SeedLookup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MatchupComponent.prototype, "OverrideDictionary", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MatchupComponent.prototype, "OverrideChanged", void 0);
    MatchupComponent = __decorate([
        core_1.Component({
            selector: 'matchup',
            template: "\n<div class=\"team-1 r1 override-toggle\" (click)=\"setOverride(Position, Team1Id)\" [ngClass]=\"{'correct-pick': isCorrect(Position, Team1Id), 'incorrect-pick': isIncorrect(Position, Team1Id), 'selected': isOverridden(Position, Team1Id) }\">{{team1Name}}<div class=\"seed\"><div class=\"seed-value\">{{team1Seed}}</div></div></div><!--\n--><div class=\"team-2 r1 override-toggle\" (click)=\"setOverride(Position + 1, Team2Id)\" [ngClass]=\"{'correct-pick': isCorrect(Position + 1, Team2Id), 'incorrect-pick': isIncorrect(Position + 1, Team2Id), 'selected': isOverridden(Position + 1, Team2Id)  }\">{{team2Name}}<div class=\"seed\"><div class=\"seed-value\">{{team2Seed}}</div></div></div>\n  "
        }), 
        __metadata('design:paramtypes', [team_lookup_service_1.TeamLookup, team_lookup_service_1.AnswerKey])
    ], MatchupComponent);
    return MatchupComponent;
}());
exports.MatchupComponent = MatchupComponent;
//# sourceMappingURL=matchup.component.js.map