// import { useState } from 'react';
import styles from './Search.module.css';
const Search = ({ cbOnSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    cbOnSubmit(e.target.search.value);
    e.target.search.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>General Search</h3>
      <label>
        <input
          className={styles.input}
          type="text"
          name="search"
          placeholder="Search for title,author,ISBN"
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
