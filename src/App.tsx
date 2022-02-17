import { useEffect } from 'react';
import { useAppDispatch } from './state/hooks';
import { setWord } from './state/game/reducers';
import { wordles } from './data/words';

import Board from './components/board';
import Keyboard from './components/keyboard';

import './App.css';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const startDate = new Date('02/16/2022');
		const today = new Date();
		const day = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

		dispatch(setWord(wordles[day]));
	}, []);

	return (
		<>
			<Board />
			<Keyboard />
		</>
	);
}

export default App;
