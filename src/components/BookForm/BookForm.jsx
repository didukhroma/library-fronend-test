import { useState } from 'react';
import styles from './BookForm.module.css';
import { bookStatuses } from '../../settings/constants.js';

const initialState = { title: '', author: '', isbn: '', isBorrowed: false };

const BookForm = ({ book, showEdit }) => {
  const [fields, setFields] = useState(book || initialState);

  const { title, author, isbn, isBorrowed } = fields;

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

  const handleChangeStatus = () => {
    console.log('changeStatus');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={styles.label}>
        {showEdit && <span>Title: </span>}
        {!showEdit && <span>{title}</span>}
        {showEdit && (
          <input
            type="text"
            name="title"
            value={fields.title}
            onChange={handleChange}
          />
        )}
      </label>
      <label className={styles.label}>
        <span>Author: </span>
        {!showEdit && <span>{author}</span>}
        {showEdit && (
          <input
            type="text"
            name="author"
            value={fields.author}
            onChange={handleChange}
          />
        )}
      </label>
      <label className={styles.label}>
        <span>ISBN: </span>
        {!showEdit && <span>{isbn}</span>}
        {showEdit && (
          <input
            type="text"
            name="isbn"
            value={fields.isbn}
            onChange={handleChange}
          />
        )}
      </label>

      <label>
        <span>Status: </span>
        {!showEdit && (
          <span>
            {isBorrowed ? bookStatuses.borrow : bookStatuses.available}
          </span>
        )}

        {showEdit && (
          <select
            name="isBorrowed"
            value={isBorrowed}
            onChange={handleChangeSelect}
          >
            <option value="">--Please choose an option--</option>
            <option value="false">{bookStatuses.available}</option>
            <option value="true">{bookStatuses.borrow}</option>
          </select>
        )}
      </label>
      {!showEdit && (
        <button type="button" onClick={handleChangeStatus}>
          Change status
        </button>
      )}
    </form>
  );
};

export default BookForm;
