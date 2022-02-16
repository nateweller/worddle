import { createSlice } from '@reduxjs/toolkit';

interface GameState {
	word: string;
	submissions: Array<string>;
	currentSubmission: string;
}

const initialState: GameState = {
	word: 'abcde',
	submissions: [],
	currentSubmission: '',
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		addLetter: (state, action) => {
			switch (action.payload) {
				case 'enter':
					if (state.currentSubmission.length !== state.word.length) return;
					state.submissions = [...state.submissions, state.currentSubmission];
					state.currentSubmission = '';
					break;
				case 'back':
					state.currentSubmission = state.currentSubmission.slice(
						0,
						state.currentSubmission.length - 1
					);
					break;
				default:
					if (state.currentSubmission.length >= state.word.length) return;
					state.currentSubmission = `${state.currentSubmission}${action.payload}`;
					break;
			}
		},
		submit: (state) => {
			state.submissions = [...state.submissions, state.currentSubmission];
			state.currentSubmission = '';
		},
	},
});

export const { addLetter, submit } = gameSlice.actions;

export default gameSlice.reducer;
