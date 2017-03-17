import { Component, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'projection-results',
  template: `<div id="bracket-results">
                <div class="row" style="margin:0;">
                    <div class="col-sm-4 summary-item">
                        <div class='label'>Mean</div><div class='value' id='mean'>{{mean}}</div>
                    </div>
                    <div class="col-sm-4 summary-item">
                        <div class='label'>Median</div><div class='value' id='median'>{{median}}</div>
                    </div>
                    <div class="col-sm-4 summary-item">
                        <div class='label'>Max</div><div class='value' id='max'>{{max}}</div>
                    </div>
                </div>
                <table class="summary-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Points</th>
                        <th>Projected Winner</th>
                        <th>Final Four Accuracy</th>
                        <th>First Round Upsets</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let bracket of ProjectionResults?.Brackets" (click)="rowClicked(bracket)">
                        <td>{{bracket.Year}}</td>
                        <td>{{bracket.Score}}</td>
                        <td [ngClass]="{'nailed-it': bracket.r7p1==bracket.AnswerKey.r7p1 }">{{ProjectionResults.TeamLookup[bracket.r7p1].FriendlyName}}</td>
                        <td>{{getFinalFourAccuracy(bracket)}}</td>
                        <td>{{getFirstRoundUpsetString(bracket)}}</td>
                    </tr>
                </tbody></table></div>`,
})
export class ProjectionResultsComponent  {
    @Input() ProjectionResults:any;
    @Output() RowClicked = new EventEmitter();

    mean: number = 0;
    median: number = 0;
    max: number = 0;

    getMedian(args: Array<number>): number {
        if (!args.length) { return 0 };
        var numbers = args.slice(0).sort((a, b) => a - b);
        var middle = Math.floor(numbers.length / 2);
        var isEven = numbers.length % 2 === 0;
        return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle];
    }

    ngOnChanges(changes: any) {
        if (this.ProjectionResults) {
            if (this.ProjectionResults.Brackets) {
                var newMean = 0;
                var newMedian = 0;
                var newMax = 0;
                var scores:any = [];
                var divider = 0;
                for (var i:number = 0; i < this.ProjectionResults.Brackets.length; i++) {
                    var bracket = this.ProjectionResults.Brackets[i];

                    if (bracket.Score > newMax) {
                        newMax = bracket.Score;
                    }
                    if (bracket.Score) {
                        newMean += bracket.Score;
                        divider++;
                        scores.push(bracket.Score);
                    }
                    

                        console.log(bracket.Year+": "+ this.getFirstRoundUpsetString(bracket));



                }

                newMedian = this.getMedian(scores);
                newMean = newMean / divider;

                this.mean = Math.round(newMean);
                this.median = newMedian;
                this.max = newMax;
            }

            // if (changes.ProjectedResults.previousValue && changes.ProjectedResults.currentValue) {
            //     if (changes.ProjectedResults.currentValue.Brackets.length == changes.ProjectedResults.previousValue.Brackets.length) {
                    
            //     }
            // }
        }
    }

private posToSeed(pos: number): number {
        switch(pos) {
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
    }

    private getFirstRoundUpsetString(bracket: any) {
        var iUpsets:number = 0;
        var iUpsetsCorrect:number = 0;

        if (bracket) {
            var seedLookup = {};
            for (var pos = 1; pos <= 64; pos++) {
                var id = "r1p" + pos.toString();
                var teamId = bracket[id];
                if (teamId >= 0) {
                    // get seed from position
                    var moddedPos = ((pos-1) % 16) + 1;
                    var seed = this.posToSeed(moddedPos);
                    seedLookup[teamId] = seed;
                }
            }
            for (var i:number = 1; i <= 32; i++) {
            var id = "r2p" + i;
            var teamId = bracket[id];

            if (seedLookup[teamId] > 8) {
                // upset
                iUpsets++;

                if (bracket[id] == bracket.AnswerKey[id]) {
                    iUpsetsCorrect++;
                }
            }
        }
        }


        
        return iUpsetsCorrect.toString() + "/" + iUpsets.toString();
    }

    private getFinalFourAccuracy(bracket: any) {
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
    }

    private rowClicked(row: any) {
        this.RowClicked.emit(row);
    }
}