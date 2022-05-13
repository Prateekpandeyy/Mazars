import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRouteTL = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("tlkey");
        var previousLoginTime = window.localStorage.getItem("tlloginTime")
        var nextLogin = Number(previousLoginTime) + Number(600000)
        var currentTime = Date.now()
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