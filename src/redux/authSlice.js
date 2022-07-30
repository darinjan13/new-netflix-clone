import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'yawa',
    initialState: { email: '' },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;