import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { addLetter, backspace, submit } from '../../state/game/reducers';
import { dictionary } from '../../data/words';

const keys: Array<Array<string>> = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
];

const Keyboard = () => {
	const dispatch = useAppDispatch();

	const word = useAppSelector((state) => state.game.word);
	const submissions = useAppSelector((state) => state.game.submissions);
	const currentSubmission = useAppSelector((state) => state.game.currentSubmission);

	const getKeyStateClassNames = (key: string, index: number): string => {
		const submittedLetters = submissions.reduce((carry: Array<string>, submission: string) => {
			submission.split('').forEach((submissionLetter) => {
				if (carry.indexOf(submissionLetter) === -1) {
					carry.push(submissionLetter);
				}
			});
			return carry;
		}, []);

		const closeLetters = submissions.reduce((carry: Array<string>, submission: string) => {
			submission.split('').forEach((submissionLetter) => {
				if (word.indexOf(submissionLetter) >= 0) carry.push(submissionLetter);
			});
			return carry;
		}, []);

		const correctLetters = submissions.reduce((carry: Array<string>, submission: string) => {
			const correctSubmissionLetters = submission
				.split('')
				.filter((submissionLetter, loopIndex) => word[loopIndex] === submissionLetter);
			return [...carry, ...correctSubmissionLetters];
		}, []);

		const isGrey = submittedLetters.some((letter) => letter === key);
		const isYellow = closeLetters.some((letter) => letter === key);
		const isGreen = correctLetters.some((letter) => letter === key);

		return isGreen
			? 'bg-green-500 dark:bg-green-500'
			: isYellow
			? 'bg-yellow-500 dark:bg-yellow-500'
			: isGrey
			? 'bg-gray-200 dark:bg-gray-900 dark:text-gray-600'
			: 'bg-white dark:bg-gray-800';
	};

	const handleKeyboardInput = useCallback(
		(value: string) => {
			if (submissions.length === 6) return; // game over
			if (submissions.indexOf(word) >= 0) return; // game won

			switch (value) {
				case 'Enter':
					if (dictionary.indexOf(currentSubmission.toLowerCase()) === -1) {
						alert('Word not in dictionary :(');
						return;
					}
					dispatch(submit());
					return;
				case 'Backspace':
					dispatch(backspace());
					return;
				default:
					if (value.length !== 1 || !value.match(/[a-z]/i)) return;
					dispatch(addLetter(value));
			}
		},
		[currentSubmission, dispatch, submissions, word]
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => handleKeyboardInput(event.key);

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyboardInput]);

	return (
		<div className="flex flex-col items-center">
			{keys.map((keyRow, loopIndex) => (
				<div className="flex" key={loopIndex}>
					{keyRow.map((key, loopIndex) => {
						return (
							<button
								key={key}
								onClick={() => handleKeyboardInput(key)}
								className={`
									m-1 flex items-center justify-center rounded-md border
									py-3 px-4 font-bold uppercase leading-none hover:scale-105 hover:shadow-sm
									dark:border-black  dark:text-white
									${getKeyStateClassNames(key, loopIndex)}`}
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
