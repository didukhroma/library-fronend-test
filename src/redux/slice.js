import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { fetchBooks } from './operations.js';

const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilled = state => {
  state.isLoading = false;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    booksList: [],
    searchQuery: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    startLoader(state) {
      state.isLoading = true;
    },
    stopLoader(state) {
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.fulfilled, (state, { payload }) => {
        state.booksList = payload;
      })
      .addMatcher(isPending(fetchBooks), handlePending)
      .addMatcher(isFulfilled(fetchBooks), handleFulfilled)
      .addMatcher(isRejected(fetchBooks), handleRejected);
  },
  selectors: {
    selectBooksList: state => state.booksList,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
    selectQuery: state => state.searchQuery,
  },
});

export const booksReducer = booksSlice.reducer;

export const { setError, clearError, startLoader, stopLoader } =
  booksSlice.actions;

export const { selectBooksList, selectIsLoading, selectError, selectQuery } =
  booksSlice.selectors;
