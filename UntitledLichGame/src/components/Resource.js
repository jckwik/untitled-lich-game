export default class Resource {
    constructor(quantity, name = "", shouldDisplay = true, pathToImage = "") {
        this.quantity = quantity;
        this.name = name;
        this.shouldDisplay = shouldDisplay;
        this.totalCreated = quantity;
        this.imageFile = pathToImage;
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
        this.quantity -= amountToRemove;
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