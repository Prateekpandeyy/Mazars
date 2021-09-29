import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";

import classNames from "classnames";
import { Spinner } from "reactstrap"
const PhoneValidation = (setWemail, wEmail, invalid, setEmailError, setValiemail,emailError, setInvalid) => {
    const { handleSubmit, register, errors, getValues } = useForm();
const [email, setEmail] = useState([])
    console.log(setEmail)
    const emailHandler = (e) => {
        setEmail(e.target.value);
        console.log(e.target.value.length)
        if (e.target.value.length < 1) {
          setWemail("")
        }
      };

      const emailValidation = (key) => {

        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(validRegex)) {
          setWemail("");
          setEmailError(false)
          let formData = new FormData();
          formData.append("email", email);
          formData.append("type", 1);
    
          axios({
            method: "POST",
            url: `${baseUrl}/customers/validateregistration`,
            data: formData,
          })
            .then(function (response) {
              console.log("resEmail-", response);
              if (response.data.code === 1) {
                setValiemail(response.data.result)
                setInvalid('')
                setEmailError(false)
              } else if (response.data.code === 0) {
                setInvalid(response.data.result)
                setValiemail('')
                setEmailError(true)
              }
            })
            .catch((error) => {
              console.log("erroror - ", error);
            });
        }
        else {
          setEmailError(true)
          setWemail("invalid email")
        }
    
      }
    
return(
    
    <>
    <input
                        type="text"
                        name="p_email"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email || emailError === true || wEmail || invalid,
                        })}
                        onChange={(e) => emailHandler(e)}
                        onBlur={emailValidation}
                        placeholder="Enter Your Password"
                        ref={register({ required: true })}
                      />
                      
    </>
)
}
export default PhoneValidation;