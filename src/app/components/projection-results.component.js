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
var ProjectionResultsComponent = (function () {
    function ProjectionResultsComponent() {
        this.RowClicked = new core_1.EventEmitter();
        this.mean = 0;
        this.median = 0;
        this.max = 0;
    }
    ProjectionResultsComponent.prototype.getMedian = function (args) {
        if (!args.length) {
            return 0;
        }
        ;
        var numbers = args.slice(0).sort(function (a, b) { return a - b; });
        var middle = Math.floor(numbers.length / 2);
        var isEven = numbers.length % 2 === 0;
        return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle];
    };
    ProjectionResultsComponent.prototype.ngOnChanges = function (changes) {
        if (this.ProjectionResults) {
            if (this.ProjectionResults.Brackets) {
                var newMean = 0;
                var newMedian = 0;
                var newMax = 0;
                var scores = [];
                var divider = 0;
                for (var i = 0; i < this.ProjectionResults.Brackets.length; i++) {
                    var bracket = this.ProjectionResults.Brackets[i];
                    if (bracket.Score > newMax) {
                        newMax = bracket.Score;
                    }
                    if (bracket.Score) {
                        newMean += bracket.Score;
                        divider++;
                        scores.push(bracket.Score);
                    }
                }
                newMedian = this.getMedian(scores);
                newMean = newMean / divider;
                this.mean = Math.round(newMean);
                this.median = newMedian;
                this.max = newMax;
            }
        }
    };
    ProjectionResultsComponent.prototype.getFinalFourAccuracy = function (bracket) {
        var iRight = 0;
        if (bracket["r5p1"] == bracket.AnswerKey["r5p1"]) {
            iRight++;
        }
        if (bracket["r5p2"] == bracket.AnswerKey["r5p2"]) {
            iRight++;
        }
        if (bracket["r5p3"] == bracket.AnswerKey["r5p3"]) {
            iRight++;
        }
        if (bracket["r5p4"] == bracket.AnswerKey["r5p4"]) {
            iRight++;
        }
        return ((iRight / 4) * 100).toString() + "%";
    };
    ProjectionResultsComponent.prototype.rowClicked = function (row) {
        this.RowClicked.emit(row);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProjectionResultsComponent.prototype, "ProjectionResults", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ProjectionResultsComponent.prototype, "RowClicked", void 0);
    ProjectionResultsComponent = __decorate([
        core_1.Component({
            selector: 'projection-results',
            template: "<div id=\"bracket-results\">\n                <div class=\"row\" style=\"margin:0;\">\n                    <div class=\"col-sm-4 summary-item\">\n                        <div class='label'>Mean</div><div class='value' id='mean'>{{mean}}</div>\n                    </div>\n                    <div class=\"col-sm-4 summary-item\">\n                        <div class='label'>Median</div><div class='value' id='median'>{{median}}</div>\n                    </div>\n                    <div class=\"col-sm-4 summary-item\">\n                        <div class='label'>Max</div><div class='value' id='max'>{{max}}</div>\n                    </div>\n                </div>\n                <table class=\"summary-table\">\n                <thead>\n                    <tr>\n                        <th>Year</th>\n                        <th>Points</th>\n                        <th>Projected Winner</th>\n                        <th>Final Four Accuracy</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let bracket of ProjectionResults?.Brackets\" (click)=\"rowClicked(bracket)\">\n                        <td>{{bracket.Year}}</td>\n                        <td>{{bracket.Score}}</td>\n                        <td [ngClass]=\"{'nailed-it': bracket.r7p1==bracket.AnswerKey.r7p1 }\">{{ProjectionResults.TeamLookup[bracket.r7p1].FriendlyName}}</td>\n                        <td>{{getFinalFourAccuracy(bracket)}}</td>\n                    </tr>\n                </tbody></table></div>",
        }), 
        __metadata('design:paramtypes', [])
    ], ProjectionResultsComponent);
    return ProjectionResultsComponent;
}());
exports.ProjectionResultsComponent = ProjectionResultsComponent;
//# sourceMappingURL=projection-results.component.js.map