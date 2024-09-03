// import { useDispatch } from 'react-redux';
import BookForm from '../BookForm';
import { btnEditStatuses } from '../../settings/constants.js';

import styles from './BookListItem.module.css';
import { useState } from 'react';
import { openModal } from '../../redux/slice.js';
import { useDispatch } from 'react-redux';
const BookListItem = ({ book }) => {
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();

  const handleClickDeleteBook = () => {
    // dispatch(deleteBook)
  };

  const handleClickEditBook = e => {
    console.log(e.target.textContent);
    if (e.target.textContent === btnEditStatuses.save) {
      return dispatch(openModal());
    }
    e.target.textContent =
      e.target.textContent === btnEditStatuses.edit
        ? btnEditStatuses.save
        : btnEditStatuses.edit;

    setShowEdit(prev => !prev);
  };

  return (
    <li className={styles.item}>
      <BookForm book={book} showEdit={showEdit} />
      {/* <div className={styles.thumb}>
        <h3 className={styles.title}>{title}</h3>

        <p>
          <span className={styles.accentText}>Author: </span> {author}
        </p>
        <p>
          <span className={styles.accentText}>ISBN: </span> {isbn}
        </p>
        {showEditForm && <BookForm />}
        <div className={styles.wrapper}>
          <p>
            <span className={styles.accentText}>Status: </span>
            {isBorrowed ? bookStatus.borrow : bookStatus.available}
          </p>
          <button type="button" onClick={handleClickChangeStatus}>
            Change Status
          </button>
        </div>
      </div> */}
      {/* -------------------------- */}
      <div className={styles.btnWrapper}>
        <button
          className={styles.btnEdit}
          type="button"
          onClick={handleClickEditBook}
        >
          Edit Book
        </button>
        <button type="button" onClick={handleClickDeleteBook}>
          Delete Book
        </button>
      </div>
    </li>
  );
};

export default BookListItem;
