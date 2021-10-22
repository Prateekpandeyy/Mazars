import React from "react";
import { Redirect, Route } from "react-router-dom";



const PrivateRouteUser = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem("userid");


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


