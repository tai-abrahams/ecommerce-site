import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        currentUser: null,
        isFetching: false,
        error: false,
    }

const userRedux = createSlice({
    name:"user",
    initialState,
    reducers: {
        loginDefault: (state) =>{
            state.error= false;
            state.isFetching= false;
        },
        loginStart: (state) =>{
            state.isFetching= true
        },
        loginSuccess: (state, action) =>{
            state.isFetching= false;
            state.currentUser= action.payload;

        },
        loginFailure: (state) => {
            state.isFetching= false;
            state.error= true;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, loginDefault  } = userRedux.actions;
export default userRedux.reducer;