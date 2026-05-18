import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        users: [],
        isFetching: false,
        error: false,
        message: null,
    }

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers: {
        //GET USERS
        getUsersStart: (state) =>{
            state.isFetching= true;
            state.error = false;
        },
        getUsersSuccess:(state, action) =>{
            state.isFetching = false;
            state.users= action.payload;
            state.error = action.payload
        },
        getUsersFailure:(state, action)=>{
            state.isFetching = false;
            state.error = true;
            state.message = action.payload;
        }
        
    },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure  } = usersSlice.actions;
export default usersSlice.reducer;