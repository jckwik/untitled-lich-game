import { GetPrice, GetPriceForMultiple } from './Game';
const clone = require('rfdc')();

export default class Building {
    constructor(name, quantity, workersAssigned, powerRequired, resourcesGranted, basePrice, effect = () => { }, currentPower = 0) {
        this.name = name;
        this.quantity = quantity; //number of this building
        this.initialQuantity = quantity;
        this.workersAssigned = workersAssigned; //number of workers assigned
        this.powerRequired = powerRequired; //progress bar max value
        this.resourcesGranted = resourcesGranted; //resources given once bar is filled
        this.effect = effect; //effect once bar is filled
        this.currentPower = currentPower; //progress bar current value
        this.effectMultiplier = 1; //used by upgrades to make a building more useful
        this.basePrice = basePrice;
        this.currentPrice = clone(basePrice);
        this.UpdatePrice();
        this.canBuild = false;
        this.forceVisible = false;
    }
    Tick(workerPower) {
        this.currentPower += this.workersAssigned * workerPower;
        if (this.currentPower >= this.powerRequired) {
            this.AddResources();
            this.effect();
            this.currentPower = 0;
        }
        this.UpdatePrice();
    }
    AddResources() {
        for (var currentResource = 0; currentResource < this.resourcesGranted.length; currentResource++) {
            this.resourcesGranted[currentResource][0].add = this.resourcesGranted[currentResource][1] * this.quantity * this.effectMultiplier;
        }
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
        if (this.canBuild) {
            for (var currentResource = 0; currentResource < this.currentPrice.length; currentResource++) {
                this.currentPrice[currentResource][0].remove = this.currentPrice[currentResource][1];
            }
            this.quantity += 1;
        }
        this.UpdatePrice();
    }
    BuildMultiple(numberToBuild) {
        for (var iteration = 0; iteration < numberToBuild; iteration++) {
            if (this.canBuild)
                this.Build();
            else
                break;
        }
    }
    PriceToString(priceArray = this.currentPrice) {
        var output = "";
        for (var currentResource = 0; currentResource < priceArray.length; currentResource++) {
            output += priceArray[currentResource][0].name + ": " + priceArray[currentResource][1];
        }
        return output;
    }
    PriceToStringMultiple(numberToBuy) {
        var tempPrice = clone(this.currentPrice);
        //console.log(tempPrice);
        for (var currentResource = 0; currentResource < this.basePrice.length; currentResource++) {
            tempPrice[currentResource][0] = this.basePrice[currentResource][0];
            tempPrice[currentResource][1] = GetPriceForMultiple(this.basePrice[currentResource][1], this.basePrice[currentResource][2], this.quantity - this.initialQuantity, numberToBuy);
        }
        //console.log(tempPrice);
        return this.PriceToString(tempPrice);
    }
    ResourceOutputToString() {
        var output = "";
        for (var currentResource = 0; currentResource < this.currentPrice.length; currentResource++) {
            if (currentResource > 0) output += ", ";
            output += this.resourcesGranted[currentResource][0].name + ": " + (this.resourcesGranted[currentResource][1] * this.quantity * this.effectMultiplier);
            output += " (" + this.resourcesGranted[currentResource][1] + " per " + this.name + ")";
        }
        return output;
    }
}