import BookListItem from '../BookListItem/BookListItem.jsx';

const Books = ({ books }) => {
  return (
    <ul>
      {books.map(book => (
        <BookListItem key={book.isbn} book={book} />
      ))}
    </ul>
  );
};

export default Books;
