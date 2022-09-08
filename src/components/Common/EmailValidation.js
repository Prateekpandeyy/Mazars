import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";

import classNames from "classnames";
import { Spinner } from "reactstrap"
const EmailValidation = (props) => {
    const { handleSubmit, register, errors, getValues } = useForm();
const [email, setEmail] = useState([])
   
    const emailHandler = (e) => {
      setEmail(e.target.value);
      props.setEmail2(e.target.value)
        if (e.target.value.length < 1) {
          props.setWemail("")
        }
      };

      const emailValidation = (key) => {

        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.length > 0 && email.match(validRegex)) {
          props.setWemail("");
          props.setEmailError(false)
         
    if(props.name === "teamleader" || props.name =="taxprofessional"){
      let formData = new FormData();
    
      formData.append("email", email);
      formData.append("type", 1);
      axios({
        method: "POST",
        url: `${baseUrl}/tl/validateregistration`,
        data: formData,
      })
      .then(function (response) {
             
        if (response.data.code === 1) {
          props.setValiemail(response.data.result)
          props.setInvalid('')
          props.setEmailError(false)
         
        } else if (response.data.code === 0) {
          props.setInvalid(response.data.result)
          props.setValiemail('')
          props.setEmailError(true)
        }
      })
      .catch((error) => {
      
      });
    }
    else if(props.panel === "Clinet" && props.clientId.length > 5){
      let formData = new FormData();
      formData.append("user_id" , props.clientId)
      formData.append("email", email);
      formData.append("type", 1);
      axios({
        method: "POST",
        url: `${baseUrl}/customers/validateregistration`,
        data: formData,
      })
      .then(function (response) {
             
        if (response.data.code === 1) {
          props.setValiemail(response.data.result)
          props.setInvalid('')
          props.setEmailError(false)
         
        } else if (response.data.code === 0) {
          props.setInvalid(response.data.result)
          props.setValiemail('')
          props.setEmailError(true)
        }
      })
      .catch((error) => {
      
      });
    }
        
          
        }
        else {
          props.setEmailError(true)
          props.setWemail("Please enter valid email")
        }
    
      }
    
return(
    
    <>
    <input
                        type="text"
                        name="p_email"
                        maxlength = "100"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email || props.emailError === true || props.wEmail || props.invalid,
                        })}
                        onChange={(e) => emailHandler(e)}
                        onBlur={(e) => emailValidation(e)}
                        placeholder="Enter your email"
                        ref={register({ required: true })}
                      />
                      
    </>
)
}
export default EmailValidation;