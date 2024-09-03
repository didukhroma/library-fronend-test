import { useEffect } from 'react';
import Notification from '../Notification';
import Books from '../Books';
import Search from '../Search';
import Container from '../Container';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  selectBooksList,
  selectError,
  selectIsLoading,
} from '../../redux/slice.js';
import { fetchBooks } from '../../redux/operations.js';

import styles from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectError);
  const booksList = useSelector(selectBooksList);

  useEffect(() => {
    dispatch(clearError());
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <Container>
        <h1 className={styles.mainTitle}>Library</h1>
        <Search />
        <h2>Book list</h2>
        {isLoading && <Notification message={'Loading data...'} />}

        <Books books={booksList} />

        {errorMessage && <Notification message={errorMessage} />}
      </Container>
    </section>
  );
};

export default Home;
