import { useSelector } from 'react-redux';
import { selectBooksList } from '../../redux/slice.js';
import BookListItem from '../BookListItem/BookListItem.jsx';
import Notification from '../Notification/Notification.jsx';
import { notificationMessages } from '../../settings/constants.js';

import styles from './Books.module.css';

const Books = () => {
  const books = useSelector(selectBooksList);

  return (
    <>
      <h2 className={styles.title}>Book list</h2>
      {!books.length && <Notification message={notificationMessages.nothing} />}
      {books.length && (
        <ul className={styles.list}>
          {books.map(book => (
            <BookListItem key={book.isbn} book={book} />
          ))}
        </ul>
      )}

      <button type="button">Add new book</button>
    </>
  );
};

export default Books;
