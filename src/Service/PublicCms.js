import React from "react";
import { Redirect, Route } from "react-router-dom";


const PublicCms = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("token");
                const role = window.localStorage.getItem("role")
                var previousLoginTime = window.localStorage.getItem("adminloginTime")
                var nextLogin = Number(previousLoginTime) + Number(600000)
                var currentTime = Date.now()
                if (token) {
                    return (
                        <>
                            <Redirect to={"/cms/cms"} />
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


export default PublicCms;

