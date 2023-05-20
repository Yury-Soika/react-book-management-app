import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MemoryRouter, Route, Router } from "react-router-dom";
import BooksContext from "../context/BooksContext";
import EditBook from "./EditBook";

describe("EditBook component", () => {
  const mockOldBook = {
    id: "1",
    bookname: "Old book",
    author: "Old author",
    quantity: "1",
    price: "1",
  };
  const mockNewBook = {
    id: "1",
    bookname: "New book",
    author: "New author",
    price: "10",
    quantity: "5",
  };

  const setBooks = jest.fn();
  const history = createMemoryHistory();

  const component = (
    <MemoryRouter initialEntries={[`/edit/1`]}>
      <Route path="/edit/:id">
        <BooksContext.Provider value={{ books: [mockOldBook], setBooks }}>
          <Router history={history}>
            <EditBook />
          </Router>
        </BooksContext.Provider>
      </Route>
    </MemoryRouter>
  );

  test("renders without errors", () => {
    const { getByTestId } = render(component);

    expect(getByTestId("book-page")).toBeInTheDocument();
  });

  test("updates book and navigates to home page on form submission", () => {
    const { getByTestId, getByLabelText, getByText } = render(component);

    fireEvent.change(getByLabelText(/book name/i), {
      target: { value: mockNewBook.bookname },
    });
    fireEvent.change(getByLabelText(/author/i), {
      target: { value: mockNewBook.author },
    });
    fireEvent.change(getByLabelText(/price/i), {
      target: { value: mockNewBook.price },
    });
    fireEvent.change(getByLabelText(/quantity/i), {
      target: { value: mockNewBook.quantity },
    });

    fireEvent.click(getByText("Submit"));

    expect(setBooks).toHaveBeenCalledTimes(1);

    expect(getByTestId("book-page")).toBeInTheDocument();
  });
});
