import { useState } from 'react';
import styles from './BookForm.module.css';
// import { bookStatuses } from '../../settings/constants.js';

const initialState = { title: '', author: '', isbn: '', select: false };

const BookForm = ({ title, author, isbn, select, showSelect = true }) => {
  const [fields, setFields] = useState({
    ...initialState,
    title,
    author,
    isbn,
    select,
  });

  const handleChange = e => {
    console.dir(e.target);
  };

  const handleChangeSelect = () => {
    setFields(prev => ({ ...prev, select: !prev.select }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(fields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.label}>
        <input
          type="text"
          name="title"
          value={fields.title}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        <span>Author</span>
        <input
          type="text"
          name="author"
          value={fields.author}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        <span>ISBN</span>
        <input
          type="text"
          name="isbn"
          value={fields.isbn}
          onChange={handleChange}
        />
      </label>
      {showSelect && (
        <label>
          <span>Status</span>
          <select
            name="isBorrowed"
            value={fields.select}
            onChange={handleChangeSelect}
          >
            <option value="">--Please choose an option--</option>
            <option value="false">Available in library</option>
            <option value="true">Borrowed</option>
          </select>
        </label>
      )}
    </form>
  );
};

export default BookForm;
