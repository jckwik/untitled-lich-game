var React = require('react');
import Display from "./Display";

export default function ResourceDisplayGroup(props) {
    var output = [];
    for (const [resourceKey, resource] of Object.entries(props.resources)) {
        //console.log(resourceKey, resourceQuantity);
        output.push(<Display key={resourceKey} resource={resourceKey} quantity={resource.quantity} />);
    }
    return (<ul>
        {output}
    </ul>);
}