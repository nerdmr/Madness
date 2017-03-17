import { Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";

declare const FB:any;

@Component({
    selector: 'facebook-login',
    template: `<div>    
        <div id="fb-root"></div>
	<div class="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>
</div>`
})

export class FacebookLoginComponent {


    
}