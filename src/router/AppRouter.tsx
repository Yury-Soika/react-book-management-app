import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AddBook from "../components/AddBook";
import BooksList from "../components/BooksList";
import EditBook from "../components/EditBook";

const AppRouter: React.FC = () => (
  <Switch>
    <Route component={BooksList} path="/" exact />
    <Route component={AddBook} path="/add" />
    <Route component={EditBook} path="/edit/:id" />
    <Route render={() => <Redirect to="/" />} />
  </Switch>
);

export default AppRouter;
