import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("adminkey");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/admin/login"} />;
        }
      }}
    />
  );
};

export default PrivateRouteAdmin;