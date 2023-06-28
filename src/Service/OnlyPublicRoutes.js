import React from "react";
import { Redirect, Route } from "react-router-dom";


const OnlyPublicRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("token");
                // console.log(token)
                // const role = window.localStorage.getItem("role")
                // var previousLoginTime = window.localStorage.getItem("adminloginTime")
                // var nextLogin = Number(previousLoginTime) + Number(600000)
                // var currentTime = Date.now()
                if (token === null) {
                    return (
                        <>
                            <Component {...props} />   
                        </>
                    )
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


export default OnlyPublicRoutes;


