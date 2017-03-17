import { Injectable } from '@angular/core';

@Injectable()
export class TeamLookup {
    public Lookup:any;

    public GetTeamName(id: number) {
        if ( this.Lookup[id]) {
            return this.Lookup[id].FriendlyName;
        }
        else {
            return "";
        }
    }

    public SetLookup(lookup: any) {
        this.Lookup = lookup;
    }
}

@Injectable()
export class AnswerKey {
    public Key:any;
    
    public IsCorrect(round: number, position: number, team: number) {
        var id = "r" + round + "p" + position;

        if (!this.Key || round == 1) return 0;

        if (this.Key[id] == "" || !this.Key[id] || this.Key[id] == -1) {
            return 0;
        }
        if (this.Key[id] == team) {
            return 1;
        }
        return -1;
    }

    public IsCorrectByPositionId(positionId: string, team: number) {


    }

    public SetKey(key: any) {
        this.Key = key;
    }
}