import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LightboxComponent } from './lightbox.component';

declare const FB:any;

@Component({
  selector: 'user',
  template: `
  <lightbox [Show]="ShowLogin" on-CloseClicked="closeClicked()" [Heading]="lbHeading">
        <div class="madness-btn btn fb-btn" (click)="onFacebookLoginClick()">Log in to Facebook</div>
  </lightbox>
  `
})

// <div id='menu-toggle' (click)='toggleMenu()'>

//     </div>
export class UserComponent implements OnInit  {
    public IsConnected:boolean;
    public UserId: number;
    private lbHeading: string = "User Menu";
    @Input() ShowLogin:boolean;
    @Output() UserOnLoad = new EventEmitter();

    constructor() {        
        FB.init({
            appId      : '1645224029105883',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
    }

    // private toggleMenu() {
    //     this.isExpanded = !this.isExpanded;
    // }

    private closeClicked() {
        this.ShowLogin = false;
    }

    onFacebookLoginClick() {
         FB.login((response:any) => {
            this.statusChangeCallback(response, false);
        });
    }

    statusChangeCallback(resp: any, onInit:boolean) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            this.UserId = resp.authResponse.userID;
            this.IsConnected = true;
            
            if (onInit) {
                // let's emit event that says the user existed on load
                this.UserOnLoad.emit(onInit);
            }
            else {
                this.ShowLogin = false;
                this.UserOnLoad.emit(onInit);
            }

        }else if (resp.status === 'not_authorized') {
            this.ShowLogin = false;
        }else {
            this.ShowLogin = false;
        }
    };
    ngOnInit() {
        FB.getLoginStatus((response:any) => {
            this.statusChangeCallback(response, true);
        });
    }
}
