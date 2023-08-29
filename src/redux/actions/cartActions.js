import { createAction } from '@reduxjs/toolkit';

export const addItemToCart = createAction('ADD_TO_CART');
export const removeItemFromCart = createAction('REMOVE_ITEM_FROM_CART');
export const incrementQuantity = createAction('INCREMENT_QNTY');
export const decrementQuantity = createAction('DECREMENT_QNTY');
