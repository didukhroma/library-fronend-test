import { useState } from 'react';
import styles from './BookForm.module.css';
import { bookStatuses } from '../../settings/constants.js';
import { useDispatch } from 'react-redux';
import { openModal, setBookData, setCurrentBook } from '../../redux/slice.js';
import { btnEditStatuses } from '../../settings/constants.js';

const initialState = { title: '', author: '', isbn: '', isBorrowed: false };

const BookForm = ({ book, showEdit }) => {
  const backupState = book || initialState;
  const [fields, setFields] = useState(backupState);
  const [showEditForm, setShowEditForm] = useState(showEdit || false);

  const dispatch = useDispatch();

  const { title, author, isbn, isBorrowed } = fields;

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    3;
  };

  const handleChangeSelect = () => {
    setFields(prev => ({ ...prev, isBorrowed: !prev.isBorrowed }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    return;
  };

  const handleChangeStatus = () => {
    dispatch(setCurrentBook(book.isbn));
    dispatch(openModal(3));
  };

  const handleRemoveChanges = e => {
    setShowEditForm(prev => !prev);
    setFields(backupState);
    e.target.closest('div').children[0].textContent = btnEditStatuses.edit;
  };
  const handleClickEditBook = e => {
    if (e.target.textContent === btnEditStatuses.save) {
      dispatch(setCurrentBook(backupState.isbn));
      dispatch(setBookData(fields));
      return dispatch(openModal(1));
    }
    e.target.textContent =
      e.target.textContent === btnEditStatuses.edit
        ? btnEditStatuses.save
        : btnEditStatuses.edit;

    setShowEditForm(prev => !prev);
  };

  const handleAddNewBook = () => {
    dispatch(setBookData(fields));
    dispatch(openModal(0));
    setFields(backupState);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label className={styles.label}>
          {showEditForm && <span>Title: </span>}
          {!showEditForm && <span>{title}</span>}
          {showEditForm && (
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
          {!showEditForm && <span>{author}</span>}
          {showEditForm && (
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
          {!showEditForm && <span>{isbn}</span>}
          {showEditForm && (
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
          {!showEditForm && (
            <span>
              {isBorrowed ? bookStatuses.borrow : bookStatuses.available}
            </span>
          )}

          {showEditForm && (
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
      </div>
      <div className={styles.wrapper}>
        {!showEdit && (
          <button
            id="editBtn"
            className={styles.btnEdit}
            type="button"
            onClick={handleClickEditBook}
          >
            Edit Book
          </button>
        )}
        {showEditForm && !showEdit && (
          <button type="button" onClick={handleRemoveChanges}>
            Remove changes
          </button>
        )}

        {!showEditForm && (
          <button type="button" onClick={handleChangeStatus}>
            Change status
          </button>
        )}
        {showEdit && (
          <button type="submit" onClick={handleAddNewBook}>
            Add new book
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;
