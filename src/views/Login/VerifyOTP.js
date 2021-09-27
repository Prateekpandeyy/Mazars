import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from "../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';


const Schema = yup.object().shape({
    p_otp: yup.string().required("mandatory"),
});


function VerifyOTP({ email, uid, time, setLoad,
    setDisabled, disabled, loading, setLoading }) {
    const { handleSubmit, register, errors, reset } = useForm({
        resolver: yupResolver(Schema),
    });

    const history = useHistory();
    const [setText, noSetText] = useState()


    const validOtp = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = ""
            noSetText("Please enter number only.")
        }
    }

    const onSubmit = (value) => {

        setLoading(true)
        let formData = new FormData();
        formData.append("email", email);
        formData.append("otp", value.p_otp);

        axios({
            method: "POST",
            url: `${baseUrl}/customers/verifyloginotp`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                console.log("res-", response.data["otp "]);

                if (response.data.code == 1) {
                    setLoading(false)
                    Alerts.SuccessLogin("Logged in successfully.")
                    localStorage.setItem("userid", JSON.stringify(response.data.user_id));
                    localStorage.setItem("custEmail", JSON.stringify(response.data.name));
                    history.push("customer/dashboard");
                } else {
                    Alerts.ErrorNormal("Incorrect OTP") 
                    setLoading(false)
                    reset();
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    }


    const resendOtp = () => {
        setLoading(true)
        noSetText(" ")
        let formData = new FormData();
        formData.append("email", email);
        formData.append("uid", uid);

        axios({
            method: "POST",
            url: `${baseUrl}/customers/regenrateotp`,
            data: formData,
        })
            .then(function (response) {
                console.log("res-", response);
                if (response.data.code === 1) {
                    setLoading(false)
                    Alerts.SuccessNormal("An OTP has been sent to your registered email address.")
                    setLoad(true)
                    setDisabled(false)
                }
                else if (response.data.code === 0) {
                    setLoading(false)
                    Alerts.ErrorNormal("Some thing went wrong, please try again")
                }
            })
            .catch((error) => {
                console.log("erroror - ", error);
            });
    }

    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    disabled ?
                        null
                        :
                        <div className="form-group">
                            <label className="form-label">Enter Your OTP <span className="declined">*</span></label>
                            <input
                                type="text"
                                className={classNames("form-control", {
                                    "is-invalid": errors.p_otp,
                                })}
                                name="p_otp"
                                ref={register({ required: true })}
                                placeholder="Enter your OTP"
                                onChange={(e) => validOtp(e)}
                            />
                            <p className="declinedmsg">{setText ? setText : ""}</p>
                            <small class="text-center">
                                Note: OTP is valid for {time} seconds.
                            </small>

                        </div>
                }

                {
                    loading ?
                        <Spinner color="primary" />
                        :
                        <div className="form-group">
                            {
                                disabled ?
                                    <button type="submit" class="btn btn-success" onClick={resendOtp}>SEND OTP</button>
                                    :
                                    <button type="submit" className="btn btn-success">
                                        Login
                                    </button>
                            }
                        </div>
                }
            </form>
        </div>
    );
}


export default VerifyOTP;
