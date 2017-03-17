import { Component, Input, EventEmitter, Output } from '@angular/core';
import { WeightAdjusterComponent } from './weight-adjuster.component';

@Component({
  selector: 'weight-configurator',
  template: `<div id="weight-configurator"><weight-adjuster class="weight-adjuster" *ngFor="let column of Config?.AvailableColumns" [WeightValueObject]="Config[column]" on-weightChanged="weightChangedHandler($event)"></weight-adjuster></div>`,
})
export class WeightConfiguratorComponent  {
    /* To do, strongly type WeightConfiguration */
    @Input() Config:WeightConfig;
    @Output() weightConfigurationChanged = new EventEmitter();

    public weightChangedHandler(weight: WeightAdjusterComponent) {
        this.Config[weight.WeightValueObject.Label].Value = weight.WeightValueObject.Value;
        this.weightConfigurationChanged.emit();
    }
}

export class WeightConfig {
  AvailableColumns: string[];
  OverrideDictionary: any;
  UserId: number;
  Name: string;
}