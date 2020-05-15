var React = require('react');
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ListGroup from 'react-bootstrap/ListGroup';
import * as Constants from '../constants/Constants';
import { GetPrice, GrantAchievement } from './Game';


function BuyResource(resourceObject, goldObject, goldPrice) {
    if (goldObject.amount >= goldPrice) {
        resourceObject.add = 1;
        goldObject.remove = goldPrice;
        resourceObject.boughtInMarket++;
    }
}

function SellResource(resourceObject, goldObject, goldPrice) {
    if (resourceObject.amount > 0) {
        resourceObject.remove = 1;
        goldObject.add = goldPrice;
        resourceObject.boughtInMarket--;
        if (goldPrice === 0) {
            GrantAchievement("Charity");
        }
    }
}

export default function Market({ resources, buildings, gameState, gameStats }) {
    var buyButtons = [];
    var sellButtons = [];

    for (const [resourceKey, resourceObject] of Object.entries(resources)) {
        if (resourceObject.inMarket) {
            var itemBuyPrice = GetPrice(Constants.MARKET_BASE_PRICE, gameState.marketMultiplier, resourceObject.boughtInMarket);
            var itemSellPrice = GetPrice(Constants.MARKET_BASE_PRICE, gameState.marketMultiplier, resourceObject.boughtInMarket - 2);
            if (resources.Gold.amount >= itemBuyPrice) 
                buyButtons.push(<Button key={resourceKey} onClick={() => { BuyResource(resourceObject, resources.Gold, itemBuyPrice); }}>Buy {resourceObject.name}: {itemBuyPrice} Gold</Button>);
            else 
                buyButtons.push(<Button key={resourceKey} disabled onClick={() => { BuyResource(resourceObject, resources.Gold, itemBuyPrice); }}>Buy {resourceObject.name}: {itemBuyPrice} Gold</Button>);
            if (resourceObject.amount > 0) 
                sellButtons.push(<Button key={resourceKey} onClick={() => { SellResource(resourceObject, resources.Gold, itemSellPrice); }}>Sell {resourceObject.name}: {itemSellPrice} Gold</Button>);
            else 
                sellButtons.push(<Button key={resourceKey} disabled onClick={() => { SellResource(resourceObject, resources.Gold, itemSellPrice); }}>Sell {resourceObject.name}: {itemSellPrice} Gold</Button>);
        }
    }

    //can always work graveyard
    //buttons.push(<Button key="createBone" onClick={() => { actionWorkBuilding(buildings["Graveyard"], Constants.CLICK_GRAVEYARD_BUTTON, gameState); }}>Search Graveyard</Button>);

    //if (gameState.unlockCraftSkeleton) {
    //    buttons.push(skeletonCraftActionButton(resources));
    //}

    //var x = 0;
    //buttons.forEach(button => {
    //	output.push(<Row>)

    //	x++;
    //	</Row>	
    //	});

    return (<Jumbotron><h1>Market</h1>
        <ListGroup>
            <ListGroup.Item>
                {buyButtons}
            </ListGroup.Item>
            <ListGroup.Item>
                {sellButtons}
            </ListGroup.Item>
        </ListGroup>
    </Jumbotron>);
}