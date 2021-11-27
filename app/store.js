import { configureStore } from '@reduxjs/toolkit';
import { colorgenSlice } from 'slices/colorsSlice';

export const store = configureStore({
	reducer: {
		colorGeneration: colorgenSlice.reducer,
	},
});