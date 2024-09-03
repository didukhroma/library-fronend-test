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
    modalCase: 0, // 0 - add new, 1 - update, 2 - delete, 3 updateStatus
    currentBook: null,
    bookData: null,
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
    setCurrentBook(state, action) {
      state.currentBook = action.payload;
    },
    setBookData(state, action) {
      state.bookData = action.payload;
    },
    openModal(state, action) {
      state.isModalOpen = true;
      state.modalCase = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalCase = 0;
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
        state.booksList.push(payload);
        state.isModalOpen = false;
        state.bookData = null;
      })
      .addCase(updateBook.fulfilled, (state, { payload }) => {
        const index = state.booksList.findIndex(
          book => book.isbn === state.currentBook
        );
        state.booksList.splice(index, 1, payload);
        state.isModalOpen = false;
        state.currentBook = null;
        state.bookData = null;
      })
      .addCase(updateBookStatus.fulfilled, (state, { payload }) => {
        const index = state.booksList.findIndex(
          book => book.isbn === state.currentBook
        );
        state.booksList.splice(index, 1, payload);
        state.isModalOpen = false;
        state.currentBook = null;
      })
      .addCase(deleteBook.fulfilled, (state, { payload }) => {
        if (payload !== 200) return state;
        const index = state.booksList.findIndex(
          book => book.isbn === state.currentBook
        );

        state.booksList.splice(index, 1);
        state.isModalOpen = false;
        state.currentBook = null;
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
    selectIsModalCase: state => state.modalCase,
    selectCurrentBook: state => state.currentBook,
    selectBookData: state => state.bookData,
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
  setCurrentBook,
  setBookData,
} = booksSlice.actions;

export const {
  selectBooksList,
  selectIsLoading,
  selectError,
  selectIsModalOpen,
  selectIsModalCase,
  selectCurrentBook,
  selectBookData,
} = booksSlice.selectors;
