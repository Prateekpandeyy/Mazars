import React from "react";
import { Redirect, Route } from "react-router-dom";


const PublicRouteUser = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("userid");

                if (token) {
                    return (
                        <>
                            <Redirect to={"/customer/dashboard"} />
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


