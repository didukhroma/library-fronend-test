import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks, getBooksBySearch } from '../api/api.js';
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
      const response = await getBooks();
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
      const response = await getBooksBySearch(query);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  addBookOperationType,
  async (isbn, data, thunkAPI) => {
    try {
      const response = await addBook(isbn, data);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  updateBookOperationType,
  async (isbn, data, thunkAPI) => {
    try {
      const response = await updateBook(isbn, data);
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
      const response = await updateBookStatus(isbn);
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
      const response = await deleteBook(isbn);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
