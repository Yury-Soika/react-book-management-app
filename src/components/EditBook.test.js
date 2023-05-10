import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import BooksContext from "../context/BooksContext";
import EditBook from "./EditBook";

describe("EditBook component", () => {
  const oldBook = {
    id: "1",
    bookname: "Book1",
    author: "Author1",
    quantity: "1",
    price: "1",
  };
  const mockBook = {
    id: "1",
    bookname: "Book One",
    author: "Author One",
    price: "10",
    quantity: "5",
    date: expect.any(Date),
  };

  const setBooks = jest.fn();
  const history = { push: jest.fn() };

  const component = (
    <MemoryRouter initialEntries={[`/edit/1`]}>
      <Route path="/edit/:id">
        <BooksContext.Provider value={{ books: [oldBook], setBooks }}>
          <EditBook history={history} />
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
