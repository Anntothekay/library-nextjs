import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import db from '../db';

type Book = {
  id: string;
  title: string;
  isbn: string;
};

const List: NextPage<{
  initialBooks: Book[];
}> = ({ initialBooks }) => {
  const [books, setBooks] = useState(initialBooks);

  async function handleDelete(id: string) {
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id != id));
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Titel</th>
          <th>ISBN</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.isbn}</td>
            <td>
              <button onClick={() => handleDelete(book.id)}>löschen</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await db.read();
  const initialBooks = db.data?.books;

  return {
    props: {
      initialBooks,
    },
  };
};

export default List;
