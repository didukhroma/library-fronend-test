import styles from './BookListItem.module.css';
const BookListItem = ({ book: { title, author, isbn, isBorrowed } }) => {
  const handleClickChangeStatus = () => {
    console.log('changed status');
  };

  const handleClickDeleteBook = () => {
    console.log('deleteBook');
  };

  return (
    <li>
      <h3>{title}</h3>
      <p>
        <span className={styles.accentText}>Author: </span> {author}
      </p>
      <p>
        <span className={styles.accentText}>ISBN: </span> {isbn}
      </p>
      <div className={styles.wrapper}>
        <p>
          <span className={styles.accentText}>Status: </span>
          {isBorrowed ? 'Borrowed' : 'Available in library'}
        </p>
        <button type="button" onClick={handleClickChangeStatus}>
          Change Status
        </button>
      </div>
      <button
        className={styles.btnDelete}
        type="button"
        onClick={handleClickDeleteBook}
      >
        Delete Book
      </button>
    </li>
  );
};

export default BookListItem;
