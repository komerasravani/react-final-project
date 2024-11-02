import { configureStore, createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        veg: [
            { name: 'tomato', price: 200.5 },
            { name: 'potato', price: 500.5 },
        ],
        nonveg: [
            { name: 'chicken', price: 300.0 },
            { name: 'fish', price: 400.0 },
        ],
    },
    reducers: {}
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        increment: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            }
        },
        decrement: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item&&item.quantity>1) {
                    item.quantity -= 1; 
                   // Decrease quantity if more than 1
                } else {
                    return state.filter(item => item.name !== action.payload.name); // Remove if quantity is 1
                }
            },
    
       
        removeItem: (state, action) => {
            const index = state.findIndex(item => item.name === action.payload.name);
            if (index !== -1) {
                state.splice(index, 1); // Remove item directly
            }
        },
        clearCart: (state) => {
            state.length = 0; 
        }
    }
});

// Export all actions created by cartSlice
export const { addToCart, increment, decrement, removeItem, clearCart } = cartSlice.actions;

// Configure the store with both slices
const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer
    }
});

export default store;
