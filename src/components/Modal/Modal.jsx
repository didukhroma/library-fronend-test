import { useDispatch, useSelector } from 'react-redux';
import { closeModal, selectIsModalOpen } from '../../redux/slice.js';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleClick = e => {
    if (e.target !== e.currentTarget) return;
    if (e.target.textContent === 'X' || e.target.textContent === 'No') {
      return dispatch(closeModal());
    }
    //  dispatch(updateBook());
    dispatch(closeModal());
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
