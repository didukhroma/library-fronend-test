import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './slice.js';

export const store = configureStore({
  reducer: { books: booksReducer },
});
