var React = require('react');

export default function Display(props) {
    return (
        <div key="{props.resource}">{props.resource}: {props.quantity}</div>
    );
}