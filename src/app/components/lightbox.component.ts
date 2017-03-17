import { Component, Input, Output, EventEmitter } from '@angular/core';
 
@Component({
  selector: 'lightbox',
  template: `
  <div class='card card-2 lightbox-component' [ngClass]="{'show':Show}" [style.width]="Width + 'px'">
    <div class="title">{{Heading}}</div>
    <ng-content></ng-content>
    <i class="material-icons close-btn small light" (click)="hide()">&#xE5CD;</i>
  </div>
  ` 
}) 
 
export class LightboxComponent {  
    @Input() Content: string;
    @Input() Show: boolean;
    @Input() Heading: string;
    @Input() Width: number = 400;
    @Output() CloseClicked = new EventEmitter();

    private hide() {
        this.Show = false;
        this.CloseClicked.emit();        
    }
}