var React = require('react');
import Display from "./Display";

export default function BuildingDisplayGroup(props) {
    var output = [];
    for (const [buildingKey, buildingObject] of Object.entries(props.buildings)) {
        //console.log(buildingKey, buildingObject.quantity);
        output.push(<Display key={buildingKey} resource={buildingKey} quantity={buildingObject.quantity} />);
    }
    return (<ul>
        {output}
    </ul>);
}