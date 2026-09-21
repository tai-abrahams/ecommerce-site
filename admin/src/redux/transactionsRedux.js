import { createSlice } from "@reduxjs/toolkit";



export const transactionsSlice = createSlice({

name: "transactions",
initialState:{
    transactions: null,
    isFetching: false,
    error: false
},
reducers: {
    getUserTransactionsStart(state){
        state.isFetching = true;
        state.error = false;
    },
    getUserTransactionsSuccess(state, action){
        state.transactions = action.payload;
        state.isFetching = false;
        state.error = false;
    },
    getUserTransactionsFailure(state, action){
        state.isFetching= false;
        state.error = true;
        //state.message = action.payload; //i want to fetch the error message or error code that comes from the api call
    }
}
});

export const {
    getUserTransactionsStart,
    getUserTransactionsSuccess,
    getUserTransactionsFailure,
} = transactionsSlice.actions;
//console.log("about to export the reducer");


export default transactionsSlice.reducer;