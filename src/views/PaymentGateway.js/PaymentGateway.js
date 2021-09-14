import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames";
import { baseUrl } from "../../config/config";
function PaymentGateway(){
    const { handleSubmit, register, errors, getValues } = useForm();
    const onSubmit = (value) => {



 console.log("onSubmit");
    
      };
    <div className="container">

    <div className="form">
      <div className="heading">
        <h2>Customer Register</h2>
      </div>
      <>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
            <div className="row">
              <div className="col-md-6">

                <div className="mb-3">
                  <label className="form-label">Name<span className="declined">*</span></label>
                  <input
                    type="text"
                    name="p_name"
                    ref={register({ required: true })}
                    placeholder="Enter Name"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_name,
                    })}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email<span className="declined">*</span></label>
                  <input
                    type="text"
                    name="p_email"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_email,
                    })}
                    
                    placeholder="Enter Your Password"
                    ref={register({ required: true })}
                  />
                  
                </div>
              </div>

              




              


              

             
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Zipcode<span className="declined">*</span></label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_zipCode ,
                    })}
                    name="p_zipCode"
                    ref={register({ required: true })}
                    placeholder="Enter Zipcode"
                   
                  />
                </div>
               
              </div>

              <div class="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Password<span className="declined">*</span></label>
                  <input
                    type="password"
                    onCopy={(e) => {
                      e.preventDefault();
                      return false
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false
                    }}
                    className={classNames("form-control", {
                      "is-invalid": errors.p_password ,
                    })}
                    name="p_password"
                    placeholder="Enter Your Password"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                        message:
                          "Password should be of minimum 8 Characters, including at least 1 upper case, lower case, special character and number.",
                      },
                    })}

                    autocomplete="off"
                  />
                 
                 
                </div>
              </div>

              <div class="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Confirm Password<span className="declined">*</span></label>
                  <input
                    type="password"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_confirm_password,
                    })}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false
                    }}
                    placeholder="Confirm Password"
                    name="p_confirm_password"
                    ref={register({
                      required: true,
                      validate: (value) =>
                        value === getValues("p_password") ||
                        "password doesn 't match",
                    })}
                    autocomplete="off"
                  />
                
                  
                </div>
              </div>

                  <div class="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">OTP<span className="declined">*</span></label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_otp,
                        })}
                        name="p_otp"
                        ref={register({ required: true })}
                       
                        placeholder="Enter your OTP"
                        autocomplete="off"
                      />
                     
                    </div>
                  </div>
                
              
              
            </div>
          </form>

          </div>
      </>

    </div>

  </div>
}
export default PaymentGateway;