import { useDispatch } from 'react-redux';
import { addLetter } from '../../state/game';

const keys: Array<Array<string>> = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back'],
];

const Keyboard = () => {
	const dispatch = useDispatch();

	return (
		<div className="flex flex-col items-center">
			{keys.map((keyRow, loopIndex) => (
				<div className="flex" key={loopIndex}>
					{keyRow.map((key) => {
						return (
							<button
								key={key}
								onClick={() => dispatch(addLetter(key))}
								className="m-1 flex items-center justify-center border py-3 px-4 leading-none"
							>
								{key}
							</button>
						);
					})}
				</div>
			))}
		</div>
	);
};

export default Keyboard;
