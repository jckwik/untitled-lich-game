export default class Building {
    constructor(quantity, workersAssigned, powerRequired, effect, currentPower = 0) {
        this.quantity = quantity; //number of this building
        this.workersAssigned = workersAssigned; //number of workers assigned
        this.powerRequired = powerRequired; //progress bar max value
        this.effect = effect; //effect once bar is filled
        this.currentPower = currentPower; //progress bar current value
    }
}