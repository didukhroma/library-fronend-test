import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  selectBookData,
  selectCurrentBook,
  selectIsModalCase,
  selectIsModalOpen,
} from '../../redux/slice.js';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import styles from './Modal.module.css';
import {
  addBook,
  deleteBook,
  updateBook,
  updateBookStatus,
} from '../../redux/operations.js';

const Modal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const modalCase = useSelector(selectIsModalCase);
  const currentBook = useSelector(selectCurrentBook);
  const bookData = useSelector(selectBookData);

  const handleClick = e => {
    if (e.target !== e.currentTarget) return;
    if (e.target.textContent === 'X' || e.target.textContent === 'No') {
      return dispatch(closeModal());
    }

    switch (modalCase) {
      case 0:
        dispatch(addBook(bookData));
        break;
      case 1:
        dispatch(updateBook({ currentBook, bookData }));
        break;
      case 2:
        dispatch(deleteBook(currentBook));
        break;
      case 3:
        dispatch(updateBookStatus(currentBook));
    }
  };
  const handlePressEscape = e => {
    if (e.key !== 'Escape') return;
    dispatch(closeModal());
  };

  useEffect(() => {
    window.addEventListener('keydown', handlePressEscape);
    return () => {
      window.removeEventListener('keydown', handlePressEscape);
    };
  });

  return (
    <>
      {isModalOpen &&
        createPortal(
          <div className={styles.overlay} onClick={handleClick}>
            <div className={styles.thumb}>
              <h2 className={styles.title}>Are You sure?</h2>
              <button
                className={styles.btnClose}
                type="button"
                onClick={handleClick}
              >
                X
              </button>

              <div className={styles.btnWrapper}>
                <button type="button" onClick={handleClick}>
                  Yes
                </button>
                <button type="button" onClick={handleClick}>
                  No
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
