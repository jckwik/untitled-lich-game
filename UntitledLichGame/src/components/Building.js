export default class Building {
    constructor(quantity, workersAssigned, powerRequired, effect, basePrice, priceMultiplier, currentPower = 0) {
        this.quantity = quantity; //number of this building
        this.workersAssigned = workersAssigned; //number of workers assigned
        this.powerRequired = powerRequired; //progress bar max value
        this.effect = effect; //effect once bar is filled
        this.currentPower = currentPower; //progress bar current value
        this.effectMultiplier = 1;
    }
    Tick(workerPower) {
        this.currentPower += this.workersAssigned * workerPower;
        if (this.currentPower >= this.powerRequired) {
            this.effect();
            this.currentPower = 0;
        }
    }
}