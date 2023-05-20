import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import BooksContext from "../context/BooksContext";
import AddBook from "./AddBook";

describe("AddBook component", () => {
  it("should add a book to the context and redirect to the homepage on form submission", () => {
    const mockBook = {
      id: "1",
      bookname: "Book One",
      author: "Author One",
      price: "10",
      quantity: "5",
      date: new Date(),
    };
    const setBooks = jest.fn();
    const history = createMemoryHistory();

    const { getByLabelText, getByText, getByTestId } = render(
      <BooksContext.Provider value={{ books: [], setBooks }}>
        <Router history={history}>
          <AddBook />
        </Router>
      </BooksContext.Provider>
    );

    fireEvent.change(getByLabelText(/book name/i), {
      target: { value: mockBook.bookname },
    });
    fireEvent.change(getByLabelText(/author/i), {
      target: { value: mockBook.author },
    });
    fireEvent.change(getByLabelText(/price/i), {
      target: { value: mockBook.price },
    });
    fireEvent.change(getByLabelText(/quantity/i), {
      target: { value: mockBook.quantity },
    });

    fireEvent.click(getByText("Submit"));

    expect(setBooks).toHaveBeenCalledTimes(1);

    expect(getByTestId("book-page")).toBeInTheDocument();
  });
});
