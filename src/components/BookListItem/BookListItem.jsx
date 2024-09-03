import { useDispatch } from 'react-redux';
import BookForm from '../BookForm';

import { openModal, setCurrentBook } from '../../redux/slice.js';
import styles from './BookListItem.module.css';

const BookListItem = ({ book }) => {
  const dispatch = useDispatch();

  const handleClickDeleteBook = () => {
    dispatch(setCurrentBook(book.isbn));
    dispatch(openModal(2));
  };

  return (
    <li className={styles.item}>
      <BookForm book={book} />

      <div className={styles.btnWrapper}>
        <button type="button" onClick={handleClickDeleteBook}>
          Delete Book
        </button>
      </div>
    </li>
  );
};

export default BookListItem;
