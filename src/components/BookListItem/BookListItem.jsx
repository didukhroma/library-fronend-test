import { useState } from 'react';
import BookForm from '../BookForm';
import styles from './BookListItem.module.css';
const BookListItem = ({ book: { title, author, isbn, isBorrowed } }) => {
  const [showEditForm, setShowEditFrom] = useState(false);

  const handleClickChangeStatus = () => {
    console.log('changed status');
  };

  const handleClickDeleteBook = () => {
    console.log('deleteBook');
  };

  const handleClickEditBook = e => {
    e.target.textContent =
      e.target.textContent === 'Edit Book' ? 'Accept changes' : 'Edit Book';
    setShowEditFrom(prev => !prev);
  };

  return (
    <li className={styles.item}>
      <div className={styles.thumb}>
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
            {isBorrowed ? 'Borrowed' : 'Available in library'}
          </p>
          <button type="button" onClick={handleClickChangeStatus}>
            Change Status
          </button>
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <button
          className={styles.btn}
          type="button"
          onClick={handleClickEditBook}
        >
          Edit Book
        </button>
        <button
          className={styles.btn}
          type="button"
          onClick={handleClickDeleteBook}
        >
          Delete Book
        </button>
      </div>
    </li>
  );
};

export default BookListItem;
