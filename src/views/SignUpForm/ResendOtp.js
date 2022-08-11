
import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';


function ResendOtp({ invalid, wEmail, disabled, clientId, indNumError, zipError, passError, email,
    phone, setDisabled, getTime, setLoad, loading, countryCode, emailError, phoneError, zipError1, setLoading }) {

    const { handleSubmit, errors, reset } = useForm();

    const onSubmit = (value) => {
        if (emailError === true || phoneError === true || zipError1 === true)  {
           return false
              }
              else {
                setLoading(true)
                let formData = new FormData();
                formData.append("email", email);
                formData.append("phone", phone);
                formData.append("p", "registration");
                formData.append("user_id", clientId)
                formData.append("stdcode", countryCode);
                if (invalid || wEmail || indNumError || zipError || passError) {
                    
                    setLoad(false)
                }
                else {
                    
                    axios({
                        method: "POST",
                        url: `${baseUrl}/customers/forgototp`,
                        data: formData,
                    })
                        .then(function (response) {
                            
                            if (response.data.code === 1) {
                                Alerts.SuccessNormal("As per your request , OTP has been sent to your mobile number / email address.")
                                setDisabled(false)
                                getTime();
                                setLoad(true)
                                setLoading(false)
                            } if (response.data.code === 0) {
                                setLoading(false)
                            }
                        })
                        .catch((error) => {
                           
                        });
                    }
                   }
     
        
    };

    return (
        <>
           

                
                {
                      loading ?
                      <span></span>
                        :
                       
                        <button type="button" onClick = {() => onSubmit()} class="autoWidthBtn mx-4">SEND OTP</button>
                   
                    }
           
        </>
    );
}

export default ResendOtp;


