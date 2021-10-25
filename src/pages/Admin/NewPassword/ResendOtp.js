import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Alerts from "../../../common/Alerts";



function ResendOtp({ id, setTime, setDisabled, loading, getTime, setLoading }) {

    const { handleSubmit, errors, reset } = useForm();

    const onSubmit = (value) => {
        setLoading(true)
        let formData = new FormData();
        formData.append("email", id);

        axios({
            method: "POST",
            url: `${baseUrl}/admin/forgototp`,
            data: formData,
        })
            .then(function (response) {
              
                if (response.data.code === 1) {
                    setLoading(false)
                    Alerts.SuccessNormal("As per your request, OTP has been sent to your registered email address.")
                    setDisabled(false)
                    getTime(setTime, setDisabled);
                } else if (response.data.code === 0) {
                    setLoading(false)
                    Alerts.ErrorNormal("Some thing went wrong, please try again")
                }
            })
            .catch((error) => {
             
            });
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
{loading === true ? "" :
                <div style={{ paddingTop: "10px" }}>
                <button type="submit" class="btn btn-success">SEND OTP</button>
            </div>}
            </form>
        </>
    );
}

export default ResendOtp;