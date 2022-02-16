interface RowProps {
	children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ children }) => <div className="flex">{children}</div>;

interface LetterProps {
	children?: React.ReactNode;
}

const Letter: React.FC<LetterProps> = ({ children }) => (
	<div className="m-0.5 flex h-10 w-10 items-center justify-center border">{children}</div>
);

const Board = () => {
	return (
		<div className="my-6 flex flex-col items-center justify-center">
			<Row>
				<Letter />
				<Letter />
				<Letter />
				<Letter />
				<Letter />
			</Row>
			<Row>
				<Letter />
				<Letter />
				<Letter />
				<Letter />
				<Letter />
			</Row>
			<Row>
				<Letter />
				<Letter />
				<Letter />
				<Letter />
				<Letter />
			</Row>
			<Row>
				<Letter />
				<Letter />
				<Letter />
				<Letter />
				<Letter />
			</Row>
			<Row>
				<Letter />
				<Letter />
				<Letter />
				<Letter />
				<Letter />
			</Row>
		</div>
	);
};

export default Board;
