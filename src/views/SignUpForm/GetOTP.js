import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import classNames from "classnames";
import Alerts from "../../common/Alerts";



function GetOTP({ email, phone, setShow }) {

    //get OTP
    const getOtp = () => {
        console.log("call otp")


        if (email && phone) {
            let formData = new FormData();
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("p", "registration");

            axios({
                method: "POST",
                url: `${baseUrl}/customers/forgototp`,
                data: formData,
            })
                .then(function (response) {
                    console.log("res-", response);
                    if (response.data.code === 1) {
                        // setLoad(true)
                        setShow(true)
                        Alerts.SuccessNormal("OTP sent to your email address.")
                    } else if (response.data.code === 0) {
                        Alerts.ErrorNormal("Error.")

                    }

                })
                .catch((error) => {
                    console.log("erroror - ", error);
                });
        }
    }


    return (
        <div>
            <button type="button" class="btn btn-success" onClick={() => getOtp()}>Get OTP</button>
        </div>
    );
}

export default GetOTP;