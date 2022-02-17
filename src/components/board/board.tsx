import { useAppSelector } from '../../state/hooks';

interface RowProps {
	children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ children }) => <div className="flex">{children}</div>;

interface LetterProps {
	letter?: string;
	index?: number;
}

const Letter: React.FC<LetterProps> = ({ letter = '', index }) => {
	const word = useAppSelector((state) => state.game.word);
	let stateClassName = '';
	if (letter && index !== undefined) {
		if (word[index] === letter) {
			stateClassName += ' bg-green-500';
		} else if (word.indexOf(letter) >= 0) {
			stateClassName += ' bg-yellow-500';
		}
	}
	return (
		<div className={`m-0.5 flex h-10 w-10 items-center justify-center border ${stateClassName}`}>
			{letter}
		</div>
	);
};

const Board = () => {
	const currentSubmission = useAppSelector((state) => state.game.currentSubmission);
	const submissions = useAppSelector((state) => state.game.submissions);

	const rowCount = 6;
	const emptyRowCount = rowCount - submissions.length - 1;

	const EmptyRow = () => (
		<Row>
			<Letter />
			<Letter />
			<Letter />
			<Letter />
			<Letter />
		</Row>
	);

	const renderCurrentSubmissionRow = () => {
		if (rowCount === submissions.length) return;

		return (
			<Row>
				<Letter letter={currentSubmission[0]} />
				<Letter letter={currentSubmission[1]} />
				<Letter letter={currentSubmission[2]} />
				<Letter letter={currentSubmission[3]} />
				<Letter letter={currentSubmission[4]} />
			</Row>
		);
	};

	return (
		<div className="my-6 flex flex-col items-center justify-center">
			{submissions.map((submission, loopIndex) => (
				<Row key={loopIndex}>
					{submission.split('').map((letter, loopIndex) => (
						<Letter key={loopIndex} letter={letter} index={loopIndex} />
					))}
				</Row>
			))}

			{renderCurrentSubmissionRow()}

			{emptyRowCount > 0 &&
				Array.from(Array(emptyRowCount).keys()).map((index) => <EmptyRow key={index} />)}
		</div>
	);
};

export default Board;
