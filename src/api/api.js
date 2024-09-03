import axios from 'axios';
import { BASE_URL } from '../settings/settings.js';

axios.defaults.baseURL = BASE_URL;

export const getBooks = async () => {
  const res = await axios.get();
  return res.data.books;
};

export const getBooksBySearch = async query => {
  const requestStr = `/search?query=${query}`;
  const res = await axios.get(requestStr);
  return res.data.books;
};

export const addBook = async data => {
  const res = await axios.post('/books', data);
  console.log(res);
};

export const updateBook = async (isbn, data) => {
  const res = await axios.put(`/${isbn}`, data);
  console.log(res);
};

export const updateStatus = async isbn => {
  const res = await axios.patch(`/${isbn}/borrow`);
  console.log(res);
};

export const deleteBook = async isbn => {
  const res = await axios.delete(`/${isbn}`);
  console.log(res);
};
