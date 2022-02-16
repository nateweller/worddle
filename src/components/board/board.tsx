import { useAppSelector } from '../../hooks';

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
	const currentSubmission = useAppSelector((state) => state.game.currentSubmission);
	const submissions = useAppSelector((state) => state.game.submissions);

	const emptyRowCount = 5 - submissions.length;

	const EmptyRow = () => (
		<Row>
			<Letter />
			<Letter />
			<Letter />
			<Letter />
			<Letter />
		</Row>
	);

	return (
		<div className="my-6 flex flex-col items-center justify-center">
			<Row>
				<Letter>{currentSubmission[0]}</Letter>
				<Letter>{currentSubmission[1]}</Letter>
				<Letter>{currentSubmission[2]}</Letter>
				<Letter>{currentSubmission[3]}</Letter>
				<Letter>{currentSubmission[4]}</Letter>
			</Row>
			{Array.from(Array(emptyRowCount).keys()).map((index) => (
				<EmptyRow key={index} />
			))}
		</div>
	);
};

export default Board;
