import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add more reducers here
});

export default rootReducer;