import React, { useContext } from "react";
import BookForm from "./BookForm";
import { useHistory, useParams } from "react-router-dom";
import BooksContext from "../context/BooksContext";
import { IBook } from "./Book";

const EditBook: React.FC = () => {
  const { books, setBooks } = useContext(BooksContext);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const bookToEdit = books.find((book: IBook) => book.id === id);

  const handleOnSubmit = (book: IBook) => {
    const filteredBooks = books.filter((book: IBook) => book.id !== id);
    setBooks([book, ...filteredBooks]);
    history.push("/");
  };

  return (
    <div>
      <BookForm book={bookToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );
};

export default EditBook;
