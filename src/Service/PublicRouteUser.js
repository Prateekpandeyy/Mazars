import React from "react";
import { Redirect, Route } from "react-router-dom";


const PublicRouteUser = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("userid");

                var previousLoginTime = window.localStorage.getItem("loginTime")
                var nextLogin = Number(previousLoginTime) + Number(600000)
                var currentTime = Date.now()
              
                
                        if (token && nextLogin > currentTime) {
                    return (
                        <>
                             <Component {...props} />
                        </>
                    )
                } else {
                    return (
                        <>
                            <Component {...props} />
                        </>
                    )
                }
            }}
        />
    );
};


export default PublicRouteUser;


