import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";


const PublicRoutesTL = ({ component: Component, ...rest }) => {

    const location = useLocation();
    
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("tlkey");

                if (token) {
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


