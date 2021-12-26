import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from 'lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

const initialState = {
	user: {},
    status: 'idle'
};

export const createUser = createAsyncThunk(
    'auth/createUser', 
    async (userRef) => {
        const user = {
			name: userRef.displayName,
			createdAt: Timestamp.now(),
			email: userRef.email,
		};
        await setDoc(doc(db, 'users', userRef.uid), user);
        return { name: user.name, email: user.email, id: userRef.uid };
    }
);

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.status = 'idle';
				state.user = action.payload;
			});
	},
});