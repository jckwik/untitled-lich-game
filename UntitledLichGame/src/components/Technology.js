export default class Technology {
    constructor(name = "", effect = {}, price, description = "", pathToImage = "") {
        this.name = name;
        this.effect = effect;
        this.price = price;
        this.description = description;
        this.imageFile = pathToImage;
        this.shouldDisplay = false;
        this.researched = false;
        this.canResearch = false;
    }

    ResearchTechnology() {
        if (!this.researched) {
            if (this.CheckIfCanResearch()) {
                for (var currentResource = 0; currentResource < this.price.length; currentResource++) {
                    this.price[currentResource][0].remove = this.price[currentResource][1];
                }
                this.effect();
                this.researched = true;
                this.shouldDisplay = false;
                this.canResearch = false;
                return true;
            }
        }
        return false;
    }
    CheckIfCanResearch() {
        this.canResearch = true;
        if (this.researched) {
            this.canResearch = false;
            return;
        }
        for (var currentResource = 0; currentResource < this.price.length; currentResource++) {
            if (this.price[currentResource][0].amount < this.price[currentResource][1])
                this.canResearch = false;
        }
        return this.canResearch;
    }
}