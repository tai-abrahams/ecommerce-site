import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        selectUser: [],
        isFetching: false,
        error: false,
        message: null,
    }

const selectUserSlice = createSlice({
    name:"selectUser",
    initialState,
    reducers: {
        //GET USER
        getSelectUserStart: (state) =>{
            state.isFetching= true;
            state.error = false;
        },
        getSelectUserSuccess:(state, action) =>{
            state.isFetching = false;
            state.selectUser= action.payload;
            state.error = false
        },
        getSelectUserFailure:(state, action)=>{
            state.isFetching = false;
            state.error = true;
            state.message = action.payload;
        },
        //update user
        updateSelectUserStart: (state)=>{
            state.isFetching= true;
            state.error= false;
        },
        updateSelectUserSuccess: (state, action) =>{
            state.isFetching= false;
            state.selectUser= action.payload;
            state.error= false;
        },
        updateSelectUserFailure: (state, action) =>{
            state.isFetching= false;
            state.error = true;
            state.message = action.payload;
        },
        
    },
});

export const { getSelectUserStart, getSelectUserSuccess, getSelectUserFailure, updateSelectUserStart, updateSelectUserSuccess, updateSelectUserFailure  } = selectUserSlice.actions;
export default selectUserSlice.reducer;