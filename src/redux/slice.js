import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import {
  addBook,
  deleteBook,
  fetchBooks,
  fetchBooksBySearch,
  updateBook,
  updateBookStatus,
} from './operations.js';

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
    isLoading: false,
    error: null,
    isModalOpen: false,
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
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.fulfilled, (state, { payload }) => {
        state.booksList = payload;
      })
      .addCase(fetchBooksBySearch.fulfilled, (state, { payload }) => {
        state.booksList = payload;
      })
      .addCase(addBook.fulfilled, (state, { payload }) => {
        console.log('add new book');
        state.booksList.push(payload);
      })
      .addCase(updateBook.fulfilled, (state, { payload }) => {
        console.log('update book');
        console.log(payload);
        // state.booksList.push(payload);
      })
      .addCase(updateBookStatus.fulfilled, (state, { payload }) => {
        console.log('update book status');
        console.log(payload);
        // state.booksList.push(payload);
      })
      .addCase(deleteBook.fulfilled, (state, { payload }) => {
        const index = state.booksList.findIndex(
          book => book.isbn === payload.isbn
        );

        state.booksList.splice(index, 1);
      })
      .addMatcher(
        isPending(
          fetchBooks,
          fetchBooksBySearch,
          addBook,
          updateBook,
          updateBookStatus,
          deleteBook
        ),
        handlePending
      )
      .addMatcher(
        isFulfilled(
          fetchBooks,
          fetchBooksBySearch,
          addBook,
          updateBook,
          updateBookStatus,
          deleteBook
        ),
        handleFulfilled
      )
      .addMatcher(
        isRejected(
          fetchBooks,
          fetchBooksBySearch,
          addBook,
          updateBook,
          updateBookStatus,
          deleteBook
        ),
        handleRejected
      );
  },
  selectors: {
    selectBooksList: state => state.booksList,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
    selectIsModalOpen: state => state.isModalOpen,
  },
});

export const booksReducer = booksSlice.reducer;

export const {
  setError,
  clearError,
  startLoader,
  stopLoader,
  openModal,
  closeModal,
} = booksSlice.actions;

export const {
  selectBooksList,
  selectIsLoading,
  selectError,
  selectIsModalOpen,
} = booksSlice.selectors;
