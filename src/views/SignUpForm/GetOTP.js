import React from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Alerts from "../../common/Alerts";



function GetOTP({ email, phone, setShow }) {

    //get OTP
    const getOtp = () => {



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
                  
                    if (response.data.code === 1) {
                        // setLoad(true)
                        setShow(true)
                        Alerts.SuccessNormal("OTP sent to your email address.")
                    } else if (response.data.code === 0) {
                        Alerts.ErrorNormal("Error.")

                    }

                })
                .catch((error) => {
                   
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