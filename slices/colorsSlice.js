import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// utility
import { findColors, findRandomColors } from 'utility/ColorGenerator';

const initialState = {
	colors: [],
	totalColors: 0,
	status: 'idle',
	inputColor: '',
	quote: '',
	isCopied: false,
};

// export const randomQuote = createAsyncThunk('colors/randomQuote', async () => {
// 	const response = await zenquotes.get('/random/');
// 	return response.data;
// });

export const randomColors = createAsyncThunk(
	'colors/randomColors',
	async () => {
		const response = findRandomColors();
		return response;
	}
);

export const inputColor = createAsyncThunk(
	'colors/inputColor',
	async (args) => {
		const response = findColors(args.hex, [], args.scale);
		return response;
	}
);

export const colorgenSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {
		copyColor: (state, action) => {
			state.isCopied = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(randomColors.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(randomColors.fulfilled, (state, action) => {
				state.status = 'idle';
				state.colors = action.payload.colors;
				state.totalColors = action.payload.totalColors;
				state.inputColor = action.payload.inputColor;
			})
			.addCase(inputColor.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(inputColor.fulfilled, (state, action) => {
				state.status = 'idle';
				state.colors = action.payload.colors;
				state.totalColors = action.payload.totalColors;
				state.inputColor = action.payload.inputColor;
			});
	},
});

export const { copyColor } = colorgenSlice.actions;
