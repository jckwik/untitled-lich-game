var React = require('react');
import Button from 'react-bootstrap/Button';


export default function BuildingBuildButton({ building, buildingName, numberToBuild }) {
    if (building.canBuild)
        return <Button onClick={() => building.BuildMultiple(numberToBuild)}>Construct {numberToBuild} {buildingName}: {building.PriceToStringMultiple(numberToBuild)}</Button>;
    return <Button onClick={() => building.BuildMultiple(numberToBuild)} disabled>Construct {numberToBuild} {buildingName}: {building.PriceToStringMultiple(numberToBuild)}</Button>;

}