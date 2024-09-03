import { useSelector } from 'react-redux';
import { selectBooksList } from '../../redux/slice.js';
import BookListItem from '../BookListItem/BookListItem.jsx';
import Notification from '../Notification/Notification.jsx';
import { notificationMessages } from '../../settings/constants.js';

import styles from './Books.module.css';
import BookForm from '../BookForm/BookForm.jsx';
import { useState } from 'react';

const Books = () => {
  const books = useSelector(selectBooksList);
  const [openForm, setOpenForm] = useState(false);

  const handleClick = e => {
    if (e.target.textValue === 'Add new book') {
      setOpenForm(prev => !prev);
      e.target.textValue = 'Save';
    }
    setOpenForm(prev => !prev);
  };

  return (
    <>
      <h2 className={styles.title}>Book list</h2>
      {!books.length && <Notification message={notificationMessages.nothing} />}

      {!!books.length && (
        <ul className={styles.list}>
          {books.map(book => (
            <BookListItem key={book.isbn} book={book} />
          ))}
        </ul>
      )}

      {openForm && <h2>New Book</h2>}
      {openForm && <BookForm showEdit={true} />}
      {!openForm && (
        <button type="button" onClick={handleClick}>
          Add new book
        </button>
      )}
    </>
  );
};

export default Books;
