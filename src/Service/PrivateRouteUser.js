import React from "react";
import { Redirect, Route } from "react-router-dom";



const PrivateRouteUser = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("userid");
var previousLoginTime = window.localStorage.getItem("loginTime")
var nextLogin = Number(previousLoginTime) + Number(600000)
var currentTime = Date.now()
console.log("previousIme",  nextLogin > currentTime)

        if (token) {
  
          return <Component {...props} />;
        } else {
          return (
            <>
              <Redirect to={"/"} />
            </>
          )
        }
      }}
    />
  );
};


export default PrivateRouteUser;


