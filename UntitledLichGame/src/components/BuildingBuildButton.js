var React = require('react');
import Button from 'react-bootstrap/Button';


export default function BuildingBuildButton({ building, buildingName }) {
    if (building.canBuild)
        return <Button onClick={() => building.Build()}>Construct {buildingName}: {building.PriceToString()}</Button>;
    return <Button onClick={() => building.Build()} disabled>Construct {buildingName}: {building.PriceToString()}</Button>;

}