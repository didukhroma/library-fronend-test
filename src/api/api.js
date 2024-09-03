import axios from 'axios';
import { BASE_URL } from '../settings/settings.js';

axios.defaults.baseURL = BASE_URL;

export const getBooksService = async () => {
  const res = await axios.get();
  return res.data.books;
};

export const getBooksBySearchService = async query => {
  const requestStr = `/search?query=${query}`;
  const res = await axios.get(requestStr);
  return res.data.books;
};

export const addBookService = async data => {
  const res = await axios.post('/', data);
  return res.data.book;
};

export const updateBookService = async ({ currentBook, bookData }) => {
  const res = await axios.put(`/${currentBook}`, bookData);
  return res.data.updatedBook;
};

export const updateStatusService = async isbn => {
  const res = await axios.patch(`/${isbn}/borrow`);
  return res.data.updatedBook;
};

export const deleteBookService = async isbn => {
  const res = await axios.delete(`/${isbn}`);
  return res.status;
};
