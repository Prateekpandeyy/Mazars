import React from "react";
import { Redirect, Route } from "react-router-dom";


const PublicRoutesTL = ({ component: Component, ...rest }) => {

  
    
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("tlkey");

                var previousLoginTime = window.localStorage.getItem("tlloginTime")
                var nextLogin = Number(previousLoginTime) + Number(600000)
                var currentTime = Date.now()
                if (token && nextLogin > currentTime) {
                    return (
                        <>
                            <Redirect to={"/teamleader/dashboard"} />
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


export default PublicRoutesTL;


