import { useAppSelector } from '../../state/hooks';
import Confetti from '../confetti';

const GameOver: React.FC = () => {
	const submissions: Array<string> = useAppSelector((state) => state.game.submissions);
	const word: string = useAppSelector((state) => state.game.word);

	const gameWon: boolean = submissions.indexOf(word) >= 0;
	const gameLost: boolean = !gameWon && submissions.length >= 6;

	if (gameWon) {
		return (
			<>
				<Confetti />
				<div className="my-4 text-center font-bold">You Won!</div>
			</>
		);
	}

	if (gameLost) {
		return <div className="my-4 text-center font-bold">{word}</div>;
	}

	return null;
};

export default GameOver;
