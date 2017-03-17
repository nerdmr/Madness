import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TeamLookup, AnswerKey } from '../../services/team-lookup.service';

@Component({
  selector: 'matchup',
  template: `
<div class="team-1 r1 override-toggle" (click)="setOverride(Position, Team1Id)" [ngClass]="{'correct-pick': isCorrect(Position, Team1Id), 'incorrect-pick': isIncorrect(Position, Team1Id), 'selected': isOverridden(Position, Team1Id) }">{{team1Name}}<div class="seed"><div class="seed-value">{{team1Seed}}</div></div></div><!--
--><div class="team-2 r1 override-toggle" (click)="setOverride(Position + 1, Team2Id)" [ngClass]="{'correct-pick': isCorrect(Position + 1, Team2Id), 'incorrect-pick': isIncorrect(Position + 1, Team2Id), 'selected': isOverridden(Position + 1, Team2Id)  }">{{team2Name}}<div class="seed"><div class="seed-value">{{team2Seed}}</div></div></div>
  `
})
export class MatchupComponent  {
    @Input() Round: number;    
    @Input() Position: number;    
    @Input() Team1Id: number;
    @Input() Team2Id: number;
    team1Seed:number;
    team2Seed:number;
    @Input() SeedLookup: any;
    @Input() OverrideDictionary: any;

    private team1Name: string;
    private team2Name: string;

    @Output() OverrideChanged = new EventEmitter();

    teamLookup:TeamLookup;
    answerKey:AnswerKey;

    constructor(_teamLookup: TeamLookup, _answerKey: AnswerKey) {
        this.teamLookup = _teamLookup;
        this.answerKey = _answerKey;
    }

    ngOnChanges(changes: any) {
      if (this.Team1Id >= 0 && this.SeedLookup) {
        this.team1Name = this.teamLookup.GetTeamName(this.Team1Id);
        this.team2Name = this.teamLookup.GetTeamName(this.Team2Id);
        this.team1Seed = this.SeedLookup[this.Team1Id];
        this.team2Seed = this.SeedLookup[this.Team2Id];
      }
    }

    private setOverride(position: number, team: number) {
        // if it's already overridden, we should remove the override
        this.OverrideChanged.emit({ round: this.Round + 1, team: team });
    }

    private isCorrect(position: number, team: number) {                
        if (this.answerKey.IsCorrect(this.Round, position, team) == 1) {
            return true;
        }
        return false;
    }
    private isIncorrect(position: number, team: number) {
        if (this.answerKey.IsCorrect(this.Round, position, team) == -1) {
            return true;
        }
        return false;
    }
    private isOverridden(position: number, team: number) {
        if (this.OverrideDictionary) {
            if (this.OverrideDictionary["2017"]) {
                if (this.OverrideDictionary["2017"][team]) {
                    if (this.Round < this.OverrideDictionary["2017"][team]) {
                        return true;
                    }
                }
            }
        }
    }
}