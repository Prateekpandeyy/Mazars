import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("adminkey");
        var previousLoginTime = window.localStorage.getItem("adminloginTime")
        var nextLogin = Number(previousLoginTime) + Number(600000)
        var currentTime = Date.now()
        if (nextLogin > currentTime) {
          return <Component {...props} />;
        } else {
          return <Redirect to={"/admin/login"} />;
        }
      }}
    />
  );
};

export default PrivateRouteAdmin;