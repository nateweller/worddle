import { createSlice } from '@reduxjs/toolkit';

interface GameState {
	word: string;
	submissions: Array<string>;
	currentSubmission: string;
}

const initialState: GameState = {
	word: '',
	submissions: [],
	currentSubmission: '',
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setWord: (state, action) => {
			state.word = action.payload;
		},
		addLetter: (state, action) => {
			if (state.currentSubmission.length >= state.word.length) return;
			if (action.payload.length !== 1) return;
			if (!action.payload.match(/[a-z]/i)) return;

			state.currentSubmission = `${state.currentSubmission}${action.payload}`;
		},
		submit: (state) => {
			if (state.currentSubmission.length !== 5) return;

			state.submissions = [...state.submissions, state.currentSubmission];
			state.currentSubmission = '';
		},
		backspace: (state) => {
			state.currentSubmission = state.currentSubmission.slice(
				0,
				state.currentSubmission.length - 1
			);
		},
	},
});

export const { setWord, addLetter, backspace, submit } = gameSlice.actions;

export default gameSlice.reducer;
