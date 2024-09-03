import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../redux/operations.js';

import styles from './Search.module.css';
const Search = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.target.search.value.toLowerCase().trim();
    dispatch(fetchBooks(searchValue));
    e.target.search.value = '';
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>General Search</h2>
      <div className={styles.thumb}>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            name="search"
            placeholder="Search for title,author,ISBN"
          />
        </label>
        <button className={styles.button} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
