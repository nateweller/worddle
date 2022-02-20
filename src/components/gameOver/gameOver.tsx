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
				<div className="absolute w-full text-center">
					<div className="my-4 inline-block rounded-md bg-green-500 px-3 py-1 text-center font-bold text-white">
						You Won!
					</div>
				</div>
			</>
		);
	}

	if (gameLost) {
		return (
			<div className="absolute w-full text-center">
				<div className="my-4 mx-auto inline-block rounded-md bg-red-500 px-3 py-1 font-bold text-white">
					{word}
				</div>
			</div>
		);
	}

	return null;
};

export default GameOver;
