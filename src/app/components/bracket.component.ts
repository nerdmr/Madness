import { Component, Input, HostListener, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { TeamLookup, AnswerKey } from '../services/team-lookup.service';
import { MatchupComponent } from './bracket/matchup.component';

@Component({
  selector: 'bracket',
  template: `
<div id="lightbox" [ngClass]="{'show': Bracket }">
    <div id="lightbox-inner">
<div id="bracket-render">
    <div class="bracket-container" [ngClass]="{'editable': Bracket?.Year == 2017}" id="bracket-container">            
        <div class="bracket-body">
            <div class="bracket-row">
                <div class="bracket-column" *ngFor="let i of columnIndex">
                    <div class="bracket-column-inner">
                        <matchup    [Round]="getRound(i)"
                                    [Position]="j"
                                    [Team1Id]="getTeamId(i,j)"
                                    [Team2Id]="getTeamId(i,j + 1)"
                                    [SeedLookup]="seedLookup"
                                    [OverrideDictionary]="this.Bracket?.OverrideDictionary"
                                    on-OverrideChanged="overrideChangedHandler($event)"
                                    class="matchup" *ngFor="let j of createRange(i)">
                        </matchup>
                    </div>
                </div>
            </div>
            <div class="semis-holder">
                        <matchup    [Round]="6"
                                    [Position]="1"
                                    [Team1Id]="getTeamIdByRoundPosition(6,1)"
                                    [Team2Id]="getTeamIdByRoundPosition(6,2)"
                                    [SeedLookup]="seedLookup"
                                    [OverrideDictionary]="this.Bracket?.OverrideDictionary"
                                    on-OverrideChanged="overrideChangedHandler($event)"
                                    class="matchup semis">
                        </matchup>
            </div>
            <div class="finals-holder">
                        <matchup    [Round]="7"
                                    [Position]="1"
                                    [Team1Id]="getTeamIdByRoundPosition(6,1)"
                                    [Team2Id]=""
                                    [SeedLookup]="seedLookup"
                                    [OverrideDictionary]="this.Bracket?.OverrideDictionary"
                                    on-OverrideChanged="overrideChangedHandler($event)"
                                    class="matchup finals">
                        </matchup>                        
            </div>
        </div>
    </div>            
</div>
</div>
    <i class="material-icons close-btn" (click)="hide()">&#xE5CD;</i>
</div>
`,
})

/*
Previously:

<div class="matchup" *ngFor="let j of createRange(i)">
    <div class="team-1 r1 override-toggle" (click)="setOverride(i,j)" [ngClass]="{'correct-pick': isCorrect(i,j), 'incorrect-pick': isIncorrect(i,j), 'selected': isOverridden(i,j) }">{{getId(i,j)}}</div>
    <div class="team-2 r1 override-toggle" (click)="setOverride(i,j+1)" [ngClass]="{'correct-pick': isCorrect(i,j+1), 'incorrect-pick': isIncorrect(i,j+1), 'selected': isOverridden(i,j+1)  }">{{getId(i,j + 1)}}</div>
</div>
                    */
export class BracketComponent  {
    private columnIndex: Array<number> = [-5,-4,-3,-2,-1,1,2,3,4,5];

    @Input() Bracket: any;
    @Input() TeamLookup: any;
    @Input() Editable: boolean;

    @Output() OverrideChanged = new EventEmitter();
    @Output() HideBracketEvent = new EventEmitter();

    @HostListener('document:keyup', ['$event'])
    private handleKeyPress(evt: KeyboardEvent) {
        if (evt.code == "Escape" && this.Bracket) {
            this.hide();
        }
    }

    teamLookup:TeamLookup;
    answerKey:AnswerKey;
    seedLookup:any;

    constructor(_teamLookup: TeamLookup, _answerKey: AnswerKey) {
        this.teamLookup = _teamLookup;
        this.answerKey = _answerKey;
    }

    ngOnChanges(changes: SimpleChanges) {
        // detect changes to Bracket
        if (this.Bracket) {
            this.seedLookup = {};
            for (var pos = 1; pos <= 64; pos++) {
                var id = "r1p" + pos.toString();
                var teamId = this.Bracket[id];
                if (teamId >= 0) {
                    // get seed from position
                    var moddedPos = ((pos-1) % 16) + 1;
                    var seed = this.posToSeed(moddedPos);
                    this.seedLookup[teamId] = seed;
                }
            }
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

    private getRound(i: number) {
        return 5-Math.abs(i)+1;
    }

    private createRange(colIndex:number) {
        var items: number[] = [];
        for(var i = 1; i <= (Math.pow(2, Math.abs(colIndex)) / 2); i++){
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
    }

    private hide() {
        this.HideBracketEvent.emit();
    }

    private overrideChangedHandler(overrideDetails: any) {
        if (this.Bracket.Year == 2017) {
            this.OverrideChanged.emit(overrideDetails);        
        }
    }

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

    private getTeamId(i:number, j:number) {
        var id = "r" + (5-Math.abs(i)+1).toString() + "p" + (j);
        
        if (this.Bracket && this.TeamLookup) {
            return this.Bracket[id];
        }
        return -1;
    }

    private getTeamIdByRoundPosition(round:number, position:number) {
        var id = "r" + (round).toString() + "p" + (position).toString();
        
        if (this.Bracket && this.TeamLookup) {
            return this.Bracket[id];
        }
        return -1;
    }

    // private isCorrect(i:number, j:number) {
    //     var round = 5-Math.abs(i)+1;
    //     if (round == 1) return false;
    //     var id = "r" + (round).toString() + "p" + (j);
    //     if (this.Bracket && this.TeamLookup) {
    //         if (this.Bracket[id]==this.Bracket.AnswerKey[id] && this.Bracket.AnswerKey[id] != null) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // private isIncorrect(i:number, j:number) {
    //     var round = 5-Math.abs(i)+1;
    //     if (round == 1) return false;
    //     var id = "r" + (round).toString() + "p" + (j);
    //     if (this.Bracket && this.TeamLookup) {
    //         if (this.Bracket[id] != this.Bracket.AnswerKey[id] && this.Bracket.AnswerKey[id] != null && this.Bracket.AnswerKey[id] != 0) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // private getId(i:number, j:number) {
    //     var id = "r" + (5-Math.abs(i)+1).toString() + "p" + (j);

    //     if (this.Bracket && this.TeamLookup) {
    //         return this.teamLookup.GetTeamName(this.Bracket[id]);
    //         //return this.TeamLookup[].FriendlyName;
    //     }
    //     return id;
    // }

    // private getTeamId(i:number, j:number) {
    //     var id = "r" + (5-Math.abs(i)+1).toString() + "p" + (j);
        
    //     if (this.Bracket && this.TeamLookup) {
    //         return this.Bracket[id];
    //     }
    //     return -1;
    // }
 }
