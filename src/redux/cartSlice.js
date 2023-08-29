import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
        console.log("Checkinnngg");

        console.log(state);
        console.log(action);
      const itemInCart = state.cart.find((item) => item.prodId === action.payload.prodId);
      if (itemInCart) {
        console.log("Add to cart");
        itemInCart.quantity++;
      } else {
        console.log("Nothing in to cart");

        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.prodId === action.payload);
      console.log("INCREMENT");

      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.prodId === action.payload);
      console.log("DECREMENT");

      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.prodId !== action.payload);
      console.log("REMOVE");

      state.cart = removeItem;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;