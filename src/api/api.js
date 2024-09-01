import axios from 'axios';
import { BASE_URL } from '../settings/settings.js';

axios.defaults.baseURL = BASE_URL;

export const getBooks = async query => {
  const requestStr = query ? `?query=${query}` : '';

  const res = await axios.get(requestStr);
  return res.data.books;
};
