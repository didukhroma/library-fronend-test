import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../Notification';
import Books from '../Books';
import Search from '../Search';
import Container from '../Container';
import { clearError, selectError, selectIsLoading } from '../../redux/slice.js';
import { fetchBooks } from '../../redux/operations.js';

import styles from './Home.module.css';
import { notificationMessages } from '../../settings/constants.js';
import Modal from '../Modal/Modal.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectError);

  useEffect(() => {
    dispatch(clearError());
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <Container>
        <h1 className={styles.mainTitle}>Library</h1>
        {!errorMessage && <Search />}
        {isLoading && <Notification message={notificationMessages.loading} />}
        {!isLoading && !errorMessage && <Books />}
        {errorMessage && <Notification message={errorMessage} />}
      </Container>
      <Modal />
    </section>
  );
};

export default Home;
