import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        products: [],
        quantity: 0,
        total: 0,
    }

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addProduct:(state, action)=>{
            state.quantity += action.payload.quantity; //cart quantity/unique item quantity
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity; 
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;