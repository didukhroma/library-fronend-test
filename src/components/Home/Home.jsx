import { useEffect, useState } from 'react';
import { getBooks } from '../../api/api.js';
import Notification from '../Notification';
import Books from '../Books';
import Search from '../Search/Search.jsx';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getBooks(search)
      .then(setBooks)
      .catch(({ message }) => setError(message));
  }, [search]);

  const handleSubmit = searchValue => {
    setSearch(searchValue);
  };

  return (
    <section>
      <div className="container">
        <h1>Library</h1>
        <Search cbOnSubmit={handleSubmit} />
        <h2>Book list</h2>

        <Books books={books} />

        {error && <Notification message={error} />}
      </div>
    </section>
  );
};

export default Home;
