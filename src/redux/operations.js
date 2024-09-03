import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks } from '../api/api.js';
import { fetchBooksOperationType } from './constants.js';

export const fetchBooks = createAsyncThunk(
  fetchBooksOperationType,
  async (query, thunkAPI) => {
    try {
      const response = await getBooks(query);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
