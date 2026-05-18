import { createSlice } from "@reduxjs/toolkit";



export const ordersSlice = createSlice({

name: "orders",
initialState:{
    orders: [],
    isFetching: false,
    error: false
},
reducers: {
    getUserOrdersStart(state, action){
        state.isFetching = true;
        state.error = false;
    },
    getUserOrdersSuccess(state, action){
        state.orders= action.payload;
        state.isFetching= false;
        state.error= false;
    },
    getUserOrdersFailure(state, action){
        state.isFetching= false;
        state.error = true;
        
    }
}
});

export const {
    getUserOrdersStart,
    getUserOrdersSuccess,
    getUserOrdersFailure,
} = ordersSlice.actions;
console.log("about to export the reducer");


export default ordersSlice.reducer;