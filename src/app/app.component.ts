import { Component, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MarchMadnessService } from './services/march-madness.service';
import { WeightConfiguratorComponent, WeightConfig } from './components/weight-configurator.component';
import { ProjectionResultsComponent } from './components/projection-results.component';
import { FullBracketComponent } from './components/bracket/full-bracket.component';
import { UserComponent } from './components/user.component';
import { TeamLookup, AnswerKey } from './services/team-lookup.service';


@Component({
  selector: 'my-app',
  template: `
  <div class="nav-header">
    <div class="container">
      <div class="row nav-row">
        <div class="col-sm-12">
            <div class="site-title"><h1>Bracket Generator <span style="font-size:.5em;color:#1E76C1;font-weight:bold;">/BETA/</span></h1></div>
            <div class="user-options">
              <div class="nav-btn save-btn" (click)="saveClicked()" [ngClass]="{'saving': isSaving, 'success': saveSuccessful }"><div class="icon-holder"><i class="material-icons save">&#xE161;</i><i class="material-icons loading" [ngClass]="{'spin':isSaving}">&#xE86A;</i><i class="material-icons success">&#xE5CA;</i></div><div class="caption">Save</div></div>
              <div class="nav-btn help-btn" (click)="helpClicked()"><i class="material-icons">&#xE887;</i><div class="caption">Help</div></div>
            </div>
        </div>
      </div>  
    </div>
  </div>
<div class="container body-content" (click)="dbg()">
  <div class="row">
    <div class="col-sm-12">
        <div class="row">
            <div class="col-sm-12">
                <weight-configurator [Config]="WeightConfig" on-weightConfigurationChanged="weightConfigurationChangedHandler($event)"></weight-configurator>
            </div>
            <div class="col-sm-12">
                <div id="app-loader" [ngClass]="{'loading':appIsLoading}"></div>
                <projection-results [ProjectionResults]="ProjectionResults" on-RowClicked="bracketSelectedHandler($event)"></projection-results>
            </div>
        </div>
    </div>
    <div class="col-sm-12">
        <bracket [TeamLookup]="ProjectionResults?.TeamLookup" [Bracket]="SelectedBracket" on-HideBracketEvent="hideBracket()" on-OverrideChanged="overrideChangedHandler($event)"></bracket>
    </div>
  </div>
</div><user #User [ShowLogin]="showLogin" on-UserOnLoad="userLoggedInOnLoad($event)"></user>
<lightbox [Show]="showHelp" on-CloseClicked="helpCloseClicked()" [Heading]="Help" [Width]="600">
  <h2>What is this?</h2>
  <p>This is a bracket generator for March Madness. It uses team stastics to determine the outcome of every matchup based on the weight configuration you provide. The weights are configured at the top of the page by clicking +/- or using the mouse wheel. Weighting statistics means that those stats will become more or less significant where zero means no significance.</p>
  <h2>Useful Tips</h2>
  <p>You can save your weight configuration by clicking save. You will authorize via Facebook and after that it will load automatically when you come to this page.</p>
  <p>For the projected bracket for this year you can set overrides for individual matchups. If you happen to be a fan-boy for a particular team, you could pick them to go all the way by selecting them in their individual matchups.</p>
</lightbox>`,
  providers: [ MarchMadnessService, TeamLookup, AnswerKey ]
})

export class AppComponent  { 
  @ViewChild('User') User:UserComponent;

  WeightConfig:WeightConfig;
  ProjectionResults:any;
  SelectedBracket: any;
  
  showLogin: boolean;
  showHelp:boolean;
  saveSuccessful: boolean;
  isSaving: boolean;
  appIsLoading: boolean;

  //private http: Http;
  constructor(private marchMadnessService: MarchMadnessService, private _teamLookup: TeamLookup, private _answerKey: AnswerKey) {
    this.appIsLoading = true;
    this.marchMadnessService.GetWeights().subscribe(result => this.weightConfigReturned(result));
  }

  private overrideChangedHandler(overrideDetails: any) {
    var team = overrideDetails.team;
    var toRound = overrideDetails.round;

    if (!this.WeightConfig.OverrideDictionary) this.WeightConfig.OverrideDictionary = {}
    if (!this.WeightConfig.OverrideDictionary["2017"]) this.WeightConfig.OverrideDictionary["2017"] = {};

    if (this.WeightConfig.OverrideDictionary["2017"][team] == toRound) {
        // this team has some overrides already. should we be removing?
        // Yes, yes we should
        
        delete this.WeightConfig.OverrideDictionary["2017"][team];
    }
    else {
      this.WeightConfig.OverrideDictionary["2017"][team] = toRound;
    }
    this.appIsLoading = true;
    this.marchMadnessService.GetSingleProjectedBracket(this.WeightConfig).subscribe(result => this.singleBracketHandler(result));
  }
private helpCloseClicked() {
  this.showHelp = false;
}
  public singleBracketHandler(result: any) {
      this.appIsLoading = false;
      this.SelectedBracket = result.Brackets[0];
      this.ProjectionResults.Brackets[0] = result.Brackets[0];
  }
  
    public weightConfigurationChangedHandler() {      
        this.appIsLoading = true;
        this.marchMadnessService.GetProjectedBrackets(this.WeightConfig).subscribe(result => this.ProjectionResults = this.handleProjectionReturn(result));
    }

    handleProjectionReturn(result: any) {
      this.appIsLoading = false;
      this._teamLookup.SetLookup(result.TeamLookup);
      return result;
    }

    // loads weight configuration for user
    private userLoggedInOnLoad(onInit:boolean) {
      if (onInit) {
        this.appIsLoading = true;
        this.marchMadnessService.LoadWeights(this.User.UserId, "My Saved Weights").subscribe(result => this.weightConfigReturned(result));
      }
      else {
        this.saveCurrentWeightConfig();
      }
    }

    private weightConfigReturned(result: any) {
      this.WeightConfig = result;
      this.appIsLoading = true;
      this.marchMadnessService.GetProjectedBrackets(this.WeightConfig).subscribe(result => this.ProjectionResults = this.handleProjectionReturn(result));
    } 

    private dbg() {
      //console.log(this.SelectedBracket);
      //console.log(this.ProjectionResults);
      //console.log(this.WeightConfig);
    }

    private saveClicked() {
        // does the user have a weight configuration?
        // to do

        // check if is logged in.
        if (this.User.IsConnected) {
          this.saveCurrentWeightConfig();
        }
        else {
          this.showLogin = true;
        }
    }
    private saveCurrentWeightConfig() {
        // call save code
        this.WeightConfig.UserId = this.User.UserId;
        this.WeightConfig.Name = "My Saved Weights";
        this.isSaving = true;
        this.marchMadnessService.SaveWeights(this.WeightConfig).subscribe(result => this.handleSaveComplete(result));
    }
    private handleSaveComplete(result:any) {
        // iff successful, show success
        this.saveSuccessful = true;
        this.isSaving = false;
        setTimeout(() => {
          this.saveSuccessful = false;
        }, 2000);
    }
    private helpClicked() {
        // show help overlay
        this.showHelp = true;
    }

    private hideBracket() {
      this.SelectedBracket = null;
    }

    private bracketSelectedHandler(bracket: any) {
      this._answerKey.SetKey(bracket.AnswerKey);
      this.SelectedBracket = bracket;
    }
}


