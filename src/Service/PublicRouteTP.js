import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";


const PublicRoutesTP = ({ component: Component, ...rest }) => {


    
    return (
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("tpkey");

                var previousLoginTime = window.localStorage.getItem("tploginTime")
                var nextLogin = Number(previousLoginTime) + Number(600000)
                var currentTime = Date.now()
                if (token && nextLogin > currentTime) {
                    return (
                        <>
                            <Redirect to={"/taxprofessional/dashboard"} />
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


export default PublicRoutesTP;


