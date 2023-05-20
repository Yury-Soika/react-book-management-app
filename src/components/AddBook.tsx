import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import BookForm from "./BookForm";
import BooksContext from "../context/BooksContext";
import { IBook } from "./Book";

const AddBook: React.FC = () => {
  const history = useHistory();
  const { books, setBooks } = useContext(BooksContext);

  const handleOnSubmit = (book: IBook) => {
    setBooks([book, ...books]);
    history.push("/");
  };

  return (
    <>
      <BookForm handleOnSubmit={handleOnSubmit} />
    </>
  );
};

export default AddBook;
