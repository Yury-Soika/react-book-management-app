import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("AppRouter right cases", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("should render App Router by default'", () => {
    expect(screen.getByTestId("books-page")).toBeInTheDocument();
  });

  it("should move to '/add'", () => {
    const bookLink = screen.getByTestId("book-link");

    userEvent.click(bookLink);
    expect(screen.getByTestId("book-page")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/add");
  });

  it("should move to '/'", () => {
    const booksLink = screen.getByTestId("books-link");

    userEvent.click(booksLink);
    expect(screen.getByTestId("books-page")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });
});

describe("AppRouter wrong cases", () => {
  it("should redirecit to '/'", async () => {
    render(
      <MemoryRouter initialEntries={["/notExistedPage"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("books-page")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });
});
