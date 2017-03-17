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
var team_lookup_service_1 = require('../services/team-lookup.service');
var BracketComponent = (function () {
    function BracketComponent(_teamLookup, _answerKey) {
        this.columnIndex = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
        this.OverrideChanged = new core_1.EventEmitter();
        this.HideBracketEvent = new core_1.EventEmitter();
        this.teamLookup = _teamLookup;
        this.answerKey = _answerKey;
    }
    BracketComponent.prototype.handleKeyPress = function (evt) {
        if (evt.code == "Escape" && this.Bracket) {
            this.hide();
        }
    };
    BracketComponent.prototype.ngOnChanges = function (changes) {
        // detect changes to Bracket
        if (this.Bracket) {
            this.seedLookup = {};
            for (var pos = 1; pos <= 64; pos++) {
                var id = "r1p" + pos.toString();
                var teamId = this.Bracket[id];
                if (teamId >= 0) {
                    // get seed from position
                    var moddedPos = ((pos - 1) % 16) + 1;
                    var seed = this.posToSeed(moddedPos);
                    this.seedLookup[teamId] = seed;
                }
            }
        }
    };
    BracketComponent.prototype.posToSeed = function (pos) {
        switch (pos) {
            case 1:
                return 1;
            case 2:
                return 16;
            case 3:
                return 8;
            case 4:
                return 9;
            case 5:
                return 5;
            case 6:
                return 12;
            case 7:
                return 4;
            case 8:
                return 13;
            case 9:
                return 6;
            case 10:
                return 11;
            case 11:
                return 3;
            case 12:
                return 14;
            case 13:
                return 7;
            case 14:
                return 10;
            case 15:
                return 2;
            case 16:
                return 15;
        }
    };
    BracketComponent.prototype.getRound = function (i) {
        return 5 - Math.abs(i) + 1;
    };
    BracketComponent.prototype.createRange = function (colIndex) {
        var items = [];
        for (var i = 1; i <= (Math.pow(2, Math.abs(colIndex)) / 2); i++) {
            if (Math.abs(i)) {
                if (colIndex > 0) {
                    items.push((Math.pow(2, Math.abs(colIndex))) + i * 2 - 1);
                }
                else {
                    items.push(i * 2 - 1);
                }
            }
        }
        return items;
    };
    BracketComponent.prototype.hide = function () {
        this.HideBracketEvent.emit();
    };
    BracketComponent.prototype.overrideChangedHandler = function (overrideDetails) {
        if (this.Bracket.Year == 2017) {
            this.OverrideChanged.emit(overrideDetails);
        }
    };
    // private isOverridden(i:number, j:number) {
    //     var round = 5-Math.abs(i)+1;
    //     if (this.Bracket) {
    //         if (this.Bracket.OverrideDictionary) {
    //             if (this.Bracket.OverrideDictionary["2017"]) {
    //                 //console.log(this.Bracket.OverrideDictionary["2017"]);
    //                 //console.log(this.getTeamId(i, j));
    //                 if (this.Bracket.OverrideDictionary["2017"][this.getTeamId(i, j)]) {
    //                     if (round <= this.Bracket.OverrideDictionary["2017"][this.getTeamId(i, j)]) {
    //                         return true;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return false;
    // }
    // private setOverride(i:number, j:number) {
    //     console.log('override clicked');
    //     var round = 5-Math.abs(i)+1;
    //     var roundId = "r" + round + "p" + j;
    //     this.OverrideChanged.emit({ team: this.Bracket[roundId], round: round + 1 });
    // }
    BracketComponent.prototype.getTeamId = function (i, j) {
        var id = "r" + (5 - Math.abs(i) + 1).toString() + "p" + (j);
        if (this.Bracket && this.TeamLookup) {
            return this.Bracket[id];
        }
        return -1;
    };
    BracketComponent.prototype.getTeamIdByRoundPosition = function (round, position) {
        var id = "r" + (round).toString() + "p" + (position).toString();
        if (this.Bracket && this.TeamLookup) {
            return this.Bracket[id];
        }
        return -1;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BracketComponent.prototype, "Bracket", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BracketComponent.prototype, "TeamLookup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BracketComponent.prototype, "Editable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BracketComponent.prototype, "OverrideChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BracketComponent.prototype, "HideBracketEvent", void 0);
    __decorate([
        core_1.HostListener('document:keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], BracketComponent.prototype, "handleKeyPress", null);
    BracketComponent = __decorate([
        core_1.Component({
            selector: 'bracket',
            template: "\n<div id=\"lightbox\" [ngClass]=\"{'show': Bracket }\">\n    <div id=\"lightbox-inner\">\n<div id=\"bracket-render\">\n    <div class=\"bracket-container\" [ngClass]=\"{'editable': Bracket?.Year == 2017}\" id=\"bracket-container\">            \n        <div class=\"bracket-body\">\n            <div class=\"bracket-row\">\n                <div class=\"bracket-column\" *ngFor=\"let i of columnIndex\">\n                    <div class=\"bracket-column-inner\">\n                        <matchup    [Round]=\"getRound(i)\"\n                                    [Position]=\"j\"\n                                    [Team1Id]=\"getTeamId(i,j)\"\n                                    [Team2Id]=\"getTeamId(i,j + 1)\"\n                                    [SeedLookup]=\"seedLookup\"\n                                    [OverrideDictionary]=\"this.Bracket?.OverrideDictionary\"\n                                    on-OverrideChanged=\"overrideChangedHandler($event)\"\n                                    class=\"matchup\" *ngFor=\"let j of createRange(i)\">\n                        </matchup>\n                    </div>\n                </div>\n            </div>\n            <div class=\"semis-holder\">\n                        <matchup    [Round]=\"6\"\n                                    [Position]=\"1\"\n                                    [Team1Id]=\"getTeamIdByRoundPosition(6,1)\"\n                                    [Team2Id]=\"getTeamIdByRoundPosition(6,2)\"\n                                    [SeedLookup]=\"seedLookup\"\n                                    [OverrideDictionary]=\"this.Bracket?.OverrideDictionary\"\n                                    on-OverrideChanged=\"overrideChangedHandler($event)\"\n                                    class=\"matchup semis\">\n                        </matchup>\n            </div>\n            <div class=\"finals-holder\">\n                        <matchup    [Round]=\"7\"\n                                    [Position]=\"1\"\n                                    [Team1Id]=\"getTeamIdByRoundPosition(6,1)\"\n                                    [Team2Id]=\"\"\n                                    [SeedLookup]=\"seedLookup\"\n                                    [OverrideDictionary]=\"this.Bracket?.OverrideDictionary\"\n                                    on-OverrideChanged=\"overrideChangedHandler($event)\"\n                                    class=\"matchup finals\">\n                        </matchup>                        \n            </div>\n        </div>\n    </div>            \n</div>\n</div>\n    <i class=\"material-icons close-btn\" (click)=\"hide()\">&#xE5CD;</i>\n</div>\n",
        }), 
        __metadata('design:paramtypes', [team_lookup_service_1.TeamLookup, team_lookup_service_1.AnswerKey])
    ], BracketComponent);
    return BracketComponent;
}());
exports.BracketComponent = BracketComponent;
//# sourceMappingURL=bracket.component.js.map