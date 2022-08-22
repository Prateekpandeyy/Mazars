import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const role = window.localStorage.getItem("role")
        const token = window.localStorage.getItem("token");
        var previousLoginTime = window.localStorage.getItem("adminloginTime")
        var nextLogin = Number(previousLoginTime) + Number(600000)
        var currentTime = Date.now()
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/cms/login"} />;
        }
      }}
    />
  );
};

export default PrivateRouteAdmin;