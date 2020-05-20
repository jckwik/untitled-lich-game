import { GetGameObject, ResetGameState, AddLogMessage } from './Game';

export function Save() {
    var saveState = GetGameObject();
    localStorage.setItem("untitledLichSave", JSON.stringify(saveState));
    AddLogMessage("Game Saved!");
}

export function Load() {
    var saveState = JSON.parse(localStorage.getItem("untitledLichSave"));

    ResetGameState();

    var gameObject = GetGameObject();

    for (const [resourceKey, resourceObject] of Object.entries(saveState.resources)) {
        console.log(resourceObject);
        gameObject.resources[resourceObject.name].quantity = resourceObject.quantity;
    }

    for (const [buildingKey, BuildingObject] of Object.entries(saveState.buildings)) {
        gameObject.buildings[BuildingObject.name].quantity = BuildingObject.quantity;
        gameObject.buildings[BuildingObject.name].workersAssigned = BuildingObject.workersAssigned;
        gameObject.buildings[BuildingObject.name].currentPower = BuildingObject.currentPower;
        gameObject.buildings[BuildingObject.name].effectMultiplier = BuildingObject.effectMultiplier;
        gameObject.buildings[BuildingObject.name].UpdatePrice();
    }

    for (const [gameStateKey, gameStateObject] of Object.entries(saveState.gameState)) {
        gameObject.gameState[gameStateKey] = gameStateObject;
    }

    for (const [gameStatsKey, gameStatsObject] of Object.entries(saveState.gameStats)) {
        gameObject.gameStats[gameStatsKey] = gameStatsObject;
    }

    for (const [achievementsKey, achievementsObject] of Object.entries(saveState.achievements)) {
        gameObject.achievements[achievementsKey] = achievementsObject;
    }
    gameObject.messageLog = saveState.messageLog;
    AddLogMessage("Game Loaded");
}

export function Export() {
    Save();

    const a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + localStorage.getItem('untitledLichSave'));
    a.setAttribute('download', 'UntitledLichGameSave.txt');
    a.setAttribute('id', 'downloadSave');
    a.click();
}

export function ResetGameCompletely() {
    localStorage.removeItem("untitledLichSave");
    ResetGameState();
}

//function Import() {

//    document.getElementById('importfile').addEventListener('change', readFileAsString);
//    function readFileAsString() {
//        var files = this.files;
//        if (files.length === 0) {
//            console.log('No file is selected');
//            return;
//        }
//        var reader = new FileReader();
//        reader.onload = function (event) {
//            importSynergism(event.target.result)
//        };
//        reader.readAsText(files[0])
//    }
//}