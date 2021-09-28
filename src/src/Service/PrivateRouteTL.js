import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteTL = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("tlkey");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/teamleader/login"} />;
        }
      }}
    />
  );
};

export default PrivateRouteTL;