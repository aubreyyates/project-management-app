import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import "./custom.css";
import { Home } from "components/Home";
import MantisApp from "components/MantisApp";
import DashboardDefault from "pages/dashboard/index";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="dashboard"
          element={<AuthorizeRoute element={<MantisApp />} />}
        >
          <Route index={true} path="default" element={<DashboardDefault />} />
        </Route>
        {AppRoutes.map((route, index) => {
          const { element, requireAuth, ...rest } = route;
          return (
            <Route
              key={index}
              {...rest}
              element={
                requireAuth ? (
                  <AuthorizeRoute {...rest} element={element} />
                ) : (
                  element
                )
              }
            />
          );
        })}
      </Routes>
    );
  }
}
