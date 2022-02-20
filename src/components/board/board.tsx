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
			stateClassName += ' bg-green-500 border-green-400 dark:border-green-800';
		} else if (word.indexOf(letter) >= 0) {
			stateClassName += ' bg-yellow-500 border-yellow-400 dark:border-yellow-900';
		} else {
			stateClassName += ' bg-gray-200 border-gray-100';
		}
	}
	return (
		<div
			className={`
			m-1 flex h-14 w-14 items-center justify-center rounded-md border-2 text-xl font-bold uppercase dark:border-gray-500 dark:text-white
			${stateClassName}
		`}
		>
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
		<div className="my-6 mt-16 flex flex-col items-center justify-center">
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
