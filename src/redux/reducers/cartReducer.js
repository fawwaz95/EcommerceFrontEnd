import { createReducer } from '@reduxjs/toolkit';
import { addItemToCart, incrementQuantity, decrementQuantity, removeItemFromCart } from '../actions/cartActions';

const initialState = {
  cart: [],
};

const cartReducer = createReducer(initialState, {
  [addItemToCart.type]: (state, action) => {
    const itemInCart = state.cart.find((item) => {
      return (
        item._id === action.payload._id
      )
    })

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1});
      }
  },

  [removeItemFromCart.type]: (state, action) => {
    const removeItem = state.cart.filter((item) => item._id !== action.payload);
    state.cart = removeItem;
  },

  [incrementQuantity.type]: (state, action) => {
    const item = state.cart.find((item) => item._id === action.payload);
    item.quantity++;
  },

  [decrementQuantity.type]: (state, action) => {
    const item = state.cart.find((item) => item._id === action.payload);
    if (item.quantity === 1) {
      item.quantity = 1
    } else {
      item.quantity--;
    }
  },
});

export default cartReducer;
