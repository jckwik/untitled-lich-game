import { GetPrice } from './Game';
const clone = require('rfdc')();

export default class Building {
    constructor(quantity, workersAssigned, powerRequired, effect, basePrice, currentPower = 0) {
        this.quantity = quantity; //number of this building
        this.initialQuantity = quantity;
        this.workersAssigned = workersAssigned; //number of workers assigned
        this.powerRequired = powerRequired; //progress bar max value
        this.effect = effect; //effect once bar is filled
        this.currentPower = currentPower; //progress bar current value
        this.effectMultiplier = 1; //used by upgrades to make a building more useful
        this.basePrice = basePrice;
        this.currentPrice = clone(basePrice);
        this.UpdatePrice();
        this.canBuild = false;
    }
    Tick(workerPower) {
        this.currentPower += this.workersAssigned * workerPower;
        if (this.currentPower >= this.powerRequired) {
            this.effect();
            this.currentPower = 0;
        }
        this.UpdatePrice();
    }
    UpdatePrice() {
        this.canBuild = true;
        for (var currentResource = 0; currentResource < this.basePrice.length; currentResource++) {
            this.currentPrice[currentResource][0] = this.basePrice[currentResource][0];
            this.currentPrice[currentResource][1] = GetPrice(this.basePrice[currentResource][1], this.basePrice[currentResource][2], this.quantity - this.initialQuantity);
            if (this.currentPrice[currentResource][0].amount < this.currentPrice[currentResource][1])
                this.canBuild = false;
        }
    }
    Build() {
        this.UpdatePrice();
        if (this.canBuild) {
            for (var currentResource = 0; currentResource < this.currentPrice.length; currentResource++) {
                this.currentPrice[currentResource][0].remove = this.currentPrice[currentResource][1];
            }
            this.quantity += 1;
        }
    }
    PriceToString() {
        var output = "";
        for (var currentResource = 0; currentResource < this.currentPrice.length; currentResource++) {
            output += this.currentPrice[currentResource][0].name + ": " + this.currentPrice[currentResource][1];
        }
        return output;
    }
}