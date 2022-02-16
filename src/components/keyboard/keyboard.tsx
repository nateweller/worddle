const keys: Array<Array<string>> = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const Keyboard = () => {
	return (
		<div className="p-4 pt-2">
			{keys.map((keyRow) =>
				keyRow.map((key) => {
					return <div key={key}>{key}</div>;
				})
			)}
		</div>
	);
};

export default Keyboard;
