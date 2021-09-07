import React from "react";
import { Redirect, Route } from "react-router-dom";


const PublicRoutesAdmin = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("adminkey");

                if (token) {
                    return (
                        <>
                            <Redirect to={"/admin/dashboard"} />
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


export default PublicRoutesAdmin;


