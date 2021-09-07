import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteTP = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("tpkey");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/taxprofessional/login"} />;
        }
      }}
    />
  );
};

export default PrivateRouteTP;