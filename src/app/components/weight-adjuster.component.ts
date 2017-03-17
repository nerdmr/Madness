import { Component, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'weight-adjuster',
  template: `<div class="config-slider" [ngClass]="adjusterClass" mouseWheel (mouseWheelUp)="PlusClicked()" (mouseWheelDown)="MinusClicked()"><div (click)="MinusClicked()" class="minus-btn icon-button-holder"><i class="material-icons">&#xE15B;</i></div><div class="config-value weight-value">{{WeightValueObject.Value}}</div><div (click)="PlusClicked()" [ngClass]="{'disabled': WeightValueObject.Value == 2 }" class="plus-btn icon-button-holder"><i class="material-icons">&#xE145;</i></div><div class="config-label">{{WeightValueObject.FriendlyName}}</div></div>`
})
export class WeightAdjusterComponent  {
  //@Input() label: string;
  @Output() weightChanged = new EventEmitter();

  @Input() WeightValueObject: any = {
      Value: 0,
      Label: ""
  }

  //value: number = 0;
  key: string;
  adjusterClass: string = "value-0";

  lowerLimit: number = -5;
  upperLimit: number = 5;

  public PlusClicked() {
    this.IncreaseValue();
  }
  public MinusClicked() {
    this.DecreaseValue();
  }

  public SetValue(val: number) {
    this.WeightValueObject.Value = val;
    this.adjusterClass = "value-" + val.toString();
    this.weightChanged.emit(this);
  }

  public IncreaseValue() {
      if (this.WeightValueObject.Value < this.upperLimit) {
          this.SetValue(this.WeightValueObject.Value + 1);
      }
  }
    DecreaseValue() {
        if (this.WeightValueObject.Value > this.lowerLimit) {
            this.SetValue(this.WeightValueObject.Value - 1);
        }
    }

    GetValue() {
        return this.WeightValueObject.Value;
    }  

    ngOnChanges(changes: SimpleChanges) {
        if (this.WeightValueObject) {
            if (!this.WeightValueObject.Value) this.WeightValueObject.Value = 0;
            
            this.adjusterClass = "value-" + this.WeightValueObject.Value.toString();
            
        }
    }
}