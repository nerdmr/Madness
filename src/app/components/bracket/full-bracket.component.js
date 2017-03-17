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
var FullBracketComponent = (function () {
    function FullBracketComponent(_teamLookup, _answerKey) {
        this.columnIndex = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
        this.OverrideChanged = new core_1.EventEmitter();
        this.canvasWidth = 1200;
        this.canvasHeight = 800;
        this.matchupPad = 3;
        this.canvasPad = 3;
        this.width = (this.canvasWidth - this.canvasPad * 2) / 10;
        this.height = (this.canvasHeight - this.canvasPad * 2) / 16;
        this.teamWidth = this.width;
        this.teamHeight = this.height / 2;
        this.teamLookup = _teamLookup;
        this.answerKey = _answerKey;
    }
    FullBracketComponent.prototype.handleKeyPress = function (evt) {
        if (evt.code == "Escape" && this.Bracket) {
            this.hide();
        }
    };
    FullBracketComponent.prototype.drawMatchup = function (round, matchup) {
        var top = this.getTop(round, matchup * 2 - 1);
        var left = this.getLeft(round, matchup * 2 - 1);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(left, top, this.width - (this.matchupPad * 2), this.height - (this.matchupPad * 2));
        this.ctx.moveTo(left, 0);
        this.ctx.stroke();
    };
    FullBracketComponent.prototype.writeTeam = function (round, position, label) {
        var top = this.getTop(round, position) + 4;
        var left = this.getLeft(round, position);
        this.ctx.font = (.6 * this.teamHeight).toString() + "px Overpass";
        this.ctx.fillStyle = "#444";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(label, left, top);
    };
    FullBracketComponent.prototype.getLeft = function (round, position) {
        if (position % 2 == 0) {
            return this.getLeft(round, position - 1);
        }
        var matchup = Math.floor(position / 2);
        var modOperator = Math.pow(2, 5 - round);
        var left = this.canvasPad;
        if (matchup >= modOperator) {
            // right side
            left += ((10 - round) * this.width + this.matchupPad);
        }
        else {
            left += ((round - 1) * this.width + this.matchupPad);
        }
        return left;
    };
    FullBracketComponent.prototype.getTop = function (round, position) {
        if (position % 2 == 0) {
            return this.getTop(round, position - 1) + this.teamHeight - this.matchupPad / 2;
        }
        // top needs offsets
        var offsetY = .5 * (Math.pow(2, round - 1) - 1) * this.height;
        // gap is space between
        var matchup = Math.floor(position / 2);
        var modOperator = Math.pow(2, 5 - round);
        var positionStart = (matchup) % modOperator;
        var gap = (Math.pow(2, round - 1) - 1) * this.height * (positionStart);
        var top = this.canvasPad + ((matchup) % modOperator) * this.height + this.matchupPad + offsetY + gap;
        if (position % 2 == 0) {
            top -= (this.height / 2) + this.matchupPad / 2;
        }
        return top;
    };
    FullBracketComponent.prototype.RenderBracket = function () {
        this.c = document.getElementById("canvas-element");
        if (!this.c)
            return;
        this.ctx = this.c.getContext("2d");
        if (!this.ctx)
            return;
        this.c.width = this.canvasWidth;
        this.c.height = this.canvasHeight;
        // fill canvas bg
        this.ctx.fillStyle = "#efefef";
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (var round = 1; round <= 5; round++) {
            for (var position = 1; position <= (Math.pow(2, 6 - round)); position++) {
                this.drawMatchup(round, position);
                var teamPosition = (position * 2) - 1;
                var team1Id = this.Bracket["r" + round.toString() + "p" + teamPosition.toString()];
                if (team1Id) {
                    var teamName = this.teamLookup.GetTeamName(team1Id);
                    this.writeTeam(round, teamPosition, teamName);
                }
                var team2Id = this.Bracket["r" + round.toString() + "p" + (teamPosition + 1).toString()];
                if (team2Id) {
                    var teamName = this.teamLookup.GetTeamName(team2Id);
                    this.writeTeam(round, teamPosition + 1, teamName);
                }
            }
        }
        //this.writeTeam(1, 1, "Gophers1")
        //this.writeTeam(1, 2, "Gophers2")
        //this.writeTeam(1, 3, "Gophers3")
    };
    FullBracketComponent.prototype.getRound = function (i) {
        return 5 - Math.abs(i) + 1;
    };
    FullBracketComponent.prototype.ngOnChanges = function (changes) {
        // detect changes to Bracket
        if (this.Bracket) {
            this.RenderBracket();
        }
    };
    FullBracketComponent.prototype.createRange = function (colIndex) {
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
    FullBracketComponent.prototype.hide = function () {
        this.Bracket = null;
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    FullBracketComponent.prototype.overrideChangedHandler = function (overrideDetails) {
        this.OverrideChanged.emit(overrideDetails);
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
    FullBracketComponent.prototype.setOverride = function (i, j) {
        var round = 5 - Math.abs(i) + 1;
        var roundId = "r" + round + "p" + j;
        this.OverrideChanged.emit({ team: this.Bracket[roundId], round: round + 1 });
    };
    FullBracketComponent.prototype.getTeamId = function (i, j) {
        var id = "r" + (5 - Math.abs(i) + 1).toString() + "p" + (j);
        if (this.Bracket && this.TeamLookup) {
            return this.Bracket[id];
        }
        return -1;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FullBracketComponent.prototype, "Bracket", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FullBracketComponent.prototype, "TeamLookup", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], FullBracketComponent.prototype, "Editable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FullBracketComponent.prototype, "OverrideChanged", void 0);
    __decorate([
        core_1.HostListener('document:keyup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], FullBracketComponent.prototype, "handleKeyPress", null);
    FullBracketComponent = __decorate([
        core_1.Component({
            selector: 'full-bracket',
            template: "\n<div id=\"lightbox\" [ngClass]=\"{'show': Bracket }\">\n    <div id=\"lightbox-inner\">\n        <canvas width=\"792\" height=\"612\" id=\"canvas-element\">\n        </canvas>\n    </div>\n    <i class=\"material-icons close-btn\" (click)=\"hide()\">&#xE5CD;</i>\n</div>\n",
        }), 
        __metadata('design:paramtypes', [team_lookup_service_1.TeamLookup, team_lookup_service_1.AnswerKey])
    ], FullBracketComponent);
    return FullBracketComponent;
}());
exports.FullBracketComponent = FullBracketComponent;
//# sourceMappingURL=full-bracket.component.js.map