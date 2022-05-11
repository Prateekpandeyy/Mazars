import React, {useState } from 'react'
import axios from 'axios'
import { baseUrl } from "../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';
import ShowError from "../../components/LoadingTime/LoadingTime";

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
               

                if (response.data.code == 1) {
                    setLoading(false)
                    Alerts.SuccessLogin("Login successfully.")
                    localStorage.setItem("userid", JSON.stringify(response.data.user_id));
                    sessionStorage.setItem("userIdsession", JSON.stringify(response.data.user_id));
                    localStorage.setItem("custEmail", JSON.stringify(response.data.name));
                    history.push("customer/dashboard");
                    localStorage.setItem("clientToken", response.data.token)
                 
                } else {
                    Alerts.ErrorNormal("Incorrect OTP") 
                    setLoading(false)
                    reset();
                }
            })
            .catch((error) => {
                ShowError.LoadingError(setLoading)
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
                ShowError.LoadingError(setLoading)
            });
    }

    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                                    <button type="submit" class="customBtn" onClick={resendOtp}>SEND OTP</button>
                                    :
                                    <button type="submit" className="customBtn">
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
