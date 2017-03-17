import { NgModule }      from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';


// components
import { AppComponent }  from './app.component';
import { WeightConfiguratorComponent }  from './components/weight-configurator.component';
import { WeightAdjusterComponent }  from './components/weight-adjuster.component';
import { ProjectionResultsComponent } from './components/projection-results.component';
import { BracketComponent } from './components/bracket.component';
import { FacebookLoginComponent } from './components/facebooklogin.component';
import { UserComponent } from './components/user.component';
import { MatchupComponent } from './components/bracket/matchup.component';
import { FullBracketComponent } from './components/bracket/full-bracket.component';
import { LightboxComponent } from './components/lightbox.component';

// directives
import { MouseWheelDirective } from './directives/mousewheel.directive';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule ],
  declarations: [ AppComponent, LightboxComponent, WeightConfiguratorComponent, WeightAdjusterComponent, BracketComponent, ProjectionResultsComponent, MouseWheelDirective, FacebookLoginComponent, UserComponent, MatchupComponent, FullBracketComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
