import { configureStore } from '@reduxjs/toolkit';
import { colorgenSlice } from 'slices/colorsSlice';
import { authSlice } from 'slices/authSlice';

export const store = configureStore({
	reducer: {
		colorGeneration: colorgenSlice.reducer,
		auth: authSlice.reducer,
	},
});