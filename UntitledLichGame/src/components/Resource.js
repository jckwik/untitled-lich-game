export default class Resource {
    constructor(quantity, name = "", isMarketable = false, shouldDisplay = true, pathToImage = "") {
        this.quantity = quantity;
        this.name = name;
        this.shouldDisplay = shouldDisplay;
        this.totalCreated = quantity;
        this.imageFile = pathToImage;
        this.inMarket = isMarketable;
        this.boughtInMarket = 0;
    }
    UpdateTotalCreated(newTotal) {
        this.totalCreated = newTotal;
    }
    //resource.add = amountToCreate
    set add(amountToCreate) {
        this.quantity += amountToCreate;
        this.totalCreated += amountToCreate;
    }
    //resource.remove = amountToRemove
    set remove(amountToRemove) {
        if (amountToRemove > this.quantity) return false;
        this.quantity -= amountToRemove;
        return true;
    }
    SetIntialQuantity(quantityToSet) {
        if (this.quantity === 0) {
            this.quantity = quantityToSet;
        }
    }
    get amount() {
        return this.quantity;
    }
}