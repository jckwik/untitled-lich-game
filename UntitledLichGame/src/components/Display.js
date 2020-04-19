var React = require('react');

export default function Display(props) {
    return (
        <div>{props.resource}: {props.quantity}</div>
    );
}