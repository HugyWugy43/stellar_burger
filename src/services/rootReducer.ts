import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  constructorbg: constructorReducer
});
