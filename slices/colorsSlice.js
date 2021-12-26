import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// utility
import { findColors, findRandomColors } from 'utility/ColorGenerator';

const BASE = 'https://colorchef-4szplmrbda-el.a.run.app/v1/';

const initialState = {
	colors: [],
	totalColors: 0,
	status: 'idle',
	inputColor: '',
	quote: '',
	isCopied: false,
	palette: []
};

export const extractPalette = createAsyncThunk(
	'colors/extractPalette',
	async (image) => {
		const url = BASE + 'palette/3';
		let imageFile = new FormData();
		imageFile.append('image', image);
		const response = await axios.post(url, imageFile, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response.data;
	}
)

export const randomColors = createAsyncThunk(
	'colors/randomColors',
	() => {
		const response = findRandomColors();
		return response;
	}
);

export const inputColor = createAsyncThunk(
	'colors/inputColor',
	(args) => {
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
			})
			.addCase(extractPalette.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(extractPalette.fulfilled, (state, action) => {
				state.status = 'idle';
				state.palette = action.payload.palette;
			});
	},
});

export const { copyColor } = colorgenSlice.actions;