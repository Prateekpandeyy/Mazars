import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Alerts from "../../common/Alerts";
import ShowError from "../../components/LoadingTime/LoadingTime";


function ResendOtp({ email, setDisabled, getTime, setLoad, setLoading, loading }) {
    const userId = window.localStorage.getItem("userid");

    const { handleSubmit, errors, reset } = useForm();

    const onSubmit = (value) => {
        setLoading(true)
        let formData = new FormData();
        formData.append("email", email);
        formData.append("uid", JSON.parse(userId));

        axios({
            method: "POST",
            url: `${baseUrl}/customers/regenrateotp`,
            data: formData,
        })
            .then(function (response) {

                if (response.data.code === 1) {
                    setLoading(false)
                    Alerts.SuccessNormal("As per your request, OTP has been sent to your registered email address.")
                    setDisabled(false)
                    getTime();
                    setLoad(true)
                } if (response.data.code === 0) {
                    setLoading(false)
                }
            })
            .catch((error) => {
              ShowError.LoadingError(setLoading)
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div style={{ paddingTop: "10px" }}>
                    <button type="submit" class="customBtn">SEND OTP</button>
                </div>
            </form>
        </>
    );
}

export default ResendOtp;