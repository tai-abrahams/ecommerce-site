import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        currentUser: null,
        isFetching: false,
        error: false,
        message: null,
    }

const userSlice = createSlice({
    name:"loggedUser",
    initialState,
    reducers: {
        loginStart: (state) =>{
            state.isFetching= true
        },
        loginSuccess: (state, action) =>{
            state.isFetching= false;
            state.currentUser= action.payload;

        },
        loginFailure: (state, action) => {
            state.isFetching= false;
            state.error= true; 
            state.message= action.payload;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure  } = userSlice.actions;
export default userSlice.reducer;