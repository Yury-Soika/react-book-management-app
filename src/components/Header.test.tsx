import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("renders the title of the app", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const title = screen.getByText("Book Management App");
    expect(title).toBeInTheDocument();
  });

  it("renders the link to the books list page", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const booksLink = screen.getByTestId("books-link");
    expect(booksLink).toHaveAttribute("href", "/");
    expect(booksLink).toHaveClass("link");
  });

  it("renders the link to the add book page", () => {
    render(<Header />, { wrapper: MemoryRouter });
    const addBookLink = screen.getByTestId("book-link");
    expect(addBookLink).toHaveAttribute("href", "/add");
    expect(addBookLink).toHaveClass("link");
  });

  it("activates the link to the books list page when it is active", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );
    const booksLink = screen.getByTestId("books-link");
    expect(booksLink).toHaveClass("active");
  });

  it("activates the link to the add book page when it is active", () => {
    render(
      <MemoryRouter initialEntries={["/add"]}>
        <Header />
      </MemoryRouter>
    );
    const addBookLink = screen.getByTestId("book-link");
    expect(addBookLink).toHaveClass("active");
  });
});
