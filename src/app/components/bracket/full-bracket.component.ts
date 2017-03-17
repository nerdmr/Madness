import { Component, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { TeamLookup, AnswerKey } from '../../services/team-lookup.service';
import { MatchupComponent } from './matchup.component';

@Component({
  selector: 'full-bracket',
  template: `
<div id="lightbox" [ngClass]="{'show': Bracket }">
    <div id="lightbox-inner">
        <canvas width="792" height="612" id="canvas-element">
        </canvas>
    </div>
    <i class="material-icons close-btn" (click)="hide()">&#xE5CD;</i>
</div>
`,
})


// <div id="bracket-render">
//     <div class="bracket-container" [ngClass]="{'editable': Bracket?.Year == 2017}" id="bracket-container">            
//         <div class="bracket-body">
//             <div class="bracket-row">
//                 <div class="bracket-column" *ngFor="let i of columnIndex">
//                     <div class="bracket-column-inner">
//                         <matchup    [Round]="getRound(i)"
//                                     [Position]="j"
//                                     [Team1Id]="getTeamId(i,j)"
//                                     [Team2Id]="getTeamId(i,j + 1)"
//                                     on-OverrideChanged="overrideChangedHandler($event)"
//                                     class="matchup" *ngFor="let j of createRange(i)">
//                         </matchup>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>            
// </div>

export class FullBracketComponent  {
    private columnIndex: Array<number> = [-5,-4,-3,-2,-1,1,2,3,4,5];

    @Input() Bracket: any;
    @Input() TeamLookup: any;
    @Input() Editable: boolean;

    @Output() OverrideChanged = new EventEmitter();

    @HostListener('document:keyup', ['$event'])
    private handleKeyPress(evt: KeyboardEvent) {
        if (evt.code == "Escape" && this.Bracket) {
            this.hide();
        }
    }

    teamLookup:TeamLookup;
    answerKey:AnswerKey;
    c:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D;

    canvasWidth:number = 1200;
    canvasHeight:number = 800;
    matchupPad:number = 3;
    canvasPad:number = 3;

    width:number = (this.canvasWidth - this.canvasPad * 2) / 10;
    height:number = (this.canvasHeight - this.canvasPad * 2) / 16;

    teamWidth:number = this.width;
    teamHeight:number = this.height / 2;

    constructor(_teamLookup: TeamLookup, _answerKey: AnswerKey) {
        this.teamLookup = _teamLookup;
        this.answerKey = _answerKey;
    }

    private drawMatchup(round: number, matchup: number) {
        var top = this.getTop(round, matchup * 2 - 1);
        var left = this.getLeft(round, matchup * 2 - 1);
    
        this.ctx.fillStyle="#ffffff";
        this.ctx.fillRect(left, top, this.width - (this.matchupPad * 2), this.height - (this.matchupPad * 2));
        this.ctx.moveTo( left , 0);
    
        this.ctx.stroke();
    }

    private writeTeam(round:number, position:number, label:string) {  
        var top = this.getTop(round, position) + 4;
        var left = this.getLeft(round, position);
    
        this.ctx.font = (.6 * this.teamHeight).toString() + "px Overpass";
        this.ctx.fillStyle = "#444";
        this.ctx.textBaseline = "top"; 
        this.ctx.fillText(label, left, top);
    }

    private getLeft(round:number, position:number): number {
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
    }

    private getTop(round:number, position:number): number {    
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
    }

    public RenderBracket() {
        this.c = <HTMLCanvasElement> document.getElementById("canvas-element");
        if (!this.c) return;

        this.ctx = this.c.getContext("2d");
        if (!this.ctx) return;

        this.c.width  = this.canvasWidth;
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

                var team2Id = this.Bracket["r" + round.toString() + "p" + (teamPosition+1).toString()];
                if (team2Id) {
                    var teamName = this.teamLookup.GetTeamName(team2Id);
                    this.writeTeam(round, teamPosition + 1, teamName);
                }
            }
        }
        


        //this.writeTeam(1, 1, "Gophers1")
        //this.writeTeam(1, 2, "Gophers2")
        //this.writeTeam(1, 3, "Gophers3")
    }

    private getRound(i: number) {
        return 5-Math.abs(i)+1;
    }

    ngOnChanges(changes: any) {
        // detect changes to Bracket
        if (this.Bracket) {
            this.RenderBracket();
        }
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
        this.Bracket = null;
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    private overrideChangedHandler(overrideDetails: any) {
        this.OverrideChanged.emit(overrideDetails);        
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

    private setOverride(i:number, j:number) {
        var round = 5-Math.abs(i)+1;
        var roundId = "r" + round + "p" + j;

        this.OverrideChanged.emit({ team: this.Bracket[roundId], round: round + 1 });
    }

    private getTeamId(i:number, j:number) {
        var id = "r" + (5-Math.abs(i)+1).toString() + "p" + (j);
        
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
