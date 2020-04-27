export default class Resource {
	constructor(quantity, name="", shouldDisplay=true) {
		this.quantity = quantity;
        this.name = name;
        this.shouldDisplay = shouldDisplay;
	}
}