import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBooksService,
  getBooksBySearchService,
  addBookService,
  updateBookService,
  updateStatusService,
  deleteBookService,
} from '../api/api.js';
import {
  addBookOperationType,
  deleteBookOperationType,
  fetchBooksBySearchOperationType,
  fetchBooksOperationType,
  updateBookOperationType,
  updateBookStatusOperationType,
} from './constants.js';

export const fetchBooks = createAsyncThunk(
  fetchBooksOperationType,
  async thunkAPI => {
    try {
      const response = await getBooksService();
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBooksBySearch = createAsyncThunk(
  fetchBooksBySearchOperationType,
  async (query, thunkAPI) => {
    try {
      const response = await getBooksBySearchService(query);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  addBookOperationType,
  async (data, thunkAPI) => {
    try {
      const response = await addBookService(data);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  updateBookOperationType,
  async (data, thunkAPI) => {
    try {
      const response = await updateBookService(data);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateBookStatus = createAsyncThunk(
  updateBookStatusOperationType,
  async (isbn, thunkAPI) => {
    try {
      const response = await updateStatusService(isbn);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  deleteBookOperationType,
  async (isbn, thunkAPI) => {
    try {
      const response = await deleteBookService(isbn);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
