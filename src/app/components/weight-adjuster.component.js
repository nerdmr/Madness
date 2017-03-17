"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var WeightAdjusterComponent = (function () {
    function WeightAdjusterComponent() {
        //@Input() label: string;
        this.weightChanged = new core_1.EventEmitter();
        this.WeightValueObject = {
            Value: 0,
            Label: ""
        };
        this.adjusterClass = "value-0";
        this.lowerLimit = -5;
        this.upperLimit = 5;
    }
    WeightAdjusterComponent.prototype.PlusClicked = function () {
        this.IncreaseValue();
    };
    WeightAdjusterComponent.prototype.MinusClicked = function () {
        this.DecreaseValue();
    };
    WeightAdjusterComponent.prototype.SetValue = function (val) {
        this.WeightValueObject.Value = val;
        this.adjusterClass = "value-" + val.toString();
        this.weightChanged.emit(this);
    };
    WeightAdjusterComponent.prototype.IncreaseValue = function () {
        if (this.WeightValueObject.Value < this.upperLimit) {
            this.SetValue(this.WeightValueObject.Value + 1);
        }
    };
    WeightAdjusterComponent.prototype.DecreaseValue = function () {
        if (this.WeightValueObject.Value > this.lowerLimit) {
            this.SetValue(this.WeightValueObject.Value - 1);
        }
    };
    WeightAdjusterComponent.prototype.GetValue = function () {
        return this.WeightValueObject.Value;
    };
    WeightAdjusterComponent.prototype.ngOnChanges = function (changes) {
        if (this.WeightValueObject) {
            if (!this.WeightValueObject.Value)
                this.WeightValueObject.Value = 0;
            this.adjusterClass = "value-" + this.WeightValueObject.Value.toString();
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], WeightAdjusterComponent.prototype, "weightChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], WeightAdjusterComponent.prototype, "WeightValueObject", void 0);
    WeightAdjusterComponent = __decorate([
        core_1.Component({
            selector: 'weight-adjuster',
            template: "<div class=\"config-slider\" [ngClass]=\"adjusterClass\" mouseWheel (mouseWheelUp)=\"PlusClicked()\" (mouseWheelDown)=\"MinusClicked()\"><div (click)=\"MinusClicked()\" class=\"minus-btn icon-button-holder\"><i class=\"material-icons\">&#xE15B;</i></div><div class=\"config-value weight-value\">{{WeightValueObject.Value}}</div><div (click)=\"PlusClicked()\" [ngClass]=\"{'disabled': WeightValueObject.Value == 2 }\" class=\"plus-btn icon-button-holder\"><i class=\"material-icons\">&#xE145;</i></div><div class=\"config-label\">{{WeightValueObject.Label}}</div></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], WeightAdjusterComponent);
    return WeightAdjusterComponent;
}());
exports.WeightAdjusterComponent = WeightAdjusterComponent;
//# sourceMappingURL=weight-adjuster.component.js.map