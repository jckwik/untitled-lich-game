var React = require('react');
import Button from './Button';
import Display from './Display';

export default function Game() {
	const [counter, setCounter] = React.useState(0);
	const incrementCounter = (incrementValue) => setCounter(counter + incrementValue);
	return (
		<div>
			<Button onClickFunction={incrementCounter} increment={1} />
			<Button onClickFunction={incrementCounter} increment={5} />
			<Button onClickFunction={incrementCounter} increment={10} />
			<Button onClickFunction={incrementCounter} increment={100} />
			<Display message={counter} />
		</div>
	);
}