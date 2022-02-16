import { createSlice } from '@reduxjs/toolkit';

interface GameState {
	submissions: Array<string>;
	currentSubmission: string;
}

const initialState: GameState = {
	submissions: [],
	currentSubmission: '',
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		addLetter: (state, action) => {
			state.currentSubmission = `${state.currentSubmission}${action.payload}`;
		},
		submit: (state) => {
			state.submissions = [...state.submissions, state.currentSubmission];
			state.currentSubmission = '';
		},
	},
});

export const { addLetter, submit } = gameSlice.actions;

export default gameSlice.reducer;
