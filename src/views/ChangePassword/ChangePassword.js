import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { baseUrl } from "../../config/config";
import Layout from "../../components/Layout/Layout";
import classNames from "classnames";
import Alerts from "../../common/Alerts";
import Mandatory from "../../components/Common/Mandatory";
import ResendOtp from "./ResendOtp";
import { Spinner } from "reactstrap";



function ChangePassword(props) {
  const userId = window.localStorage.getItem("userid");
  const { register, handleSubmit, errors, getValues, reset } = useForm();

  const [loading, setLoading] = useState(false);
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isPasswordShow2, setPasswordShow2] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [time, setTime] = useState('')
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState('');


  useEffect(() => {
    getTime()
  }, [load]);

  const getTime = () => {
    // console.log("get time")

    if (load) {
      var timerOn = true;
      function timer(remaining) {
        var s = remaining % 60;
        s = s < 10 ? '0' + s : s;
        setTime(s)
        remaining -= 1;
        if (remaining >= 0 && timerOn) {
          setTimeout(function () {
            timer(remaining);
          }, 1000);
          return;
        }
        setDisabled(true)
      }
      timer(60);
    }
  }

  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };

  const togglePasssword2 = () => {
    setPasswordShow2(!isPasswordShow2)
  };

  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)

    setEmail(value.p_email)

    let formData = new FormData();
    formData.append("id", JSON.parse(userId));
    formData.append("user_id", value.p_email);
    formData.append("password", value.p_password);
    formData.append("rpassword", value.p_confirm_password);
    formData.append("otp", value.p_otp);


    if (display) {
      let formData = new FormData();
      formData.append("email", value.p_email);
      formData.append("uid", JSON.parse(userId));

      axios({
        method: "POST",
        url: `${baseUrl}/customers/regenrateotp`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            setLoading(false)
            setLoad(true)
            setShow(true)
            Alerts.SuccessNormal("As per your request, OTP has been sent to your registered email address.")
          } else if (response.data.code === 0) {
            setLoading(false)
            Alerts.ErrorNormal("Please enter correct details")
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
      return false
    }
    axios({
      method: "POST",
      url: `${baseUrl}/customers/passChange`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setLoading(false)
          var variable = "Password changed successfully."
          Alerts.SuccessNormal(variable)
          props.history.push("/customer/dashboard");
        } else if (response.data.code === 0) {
          setLoading(false)
          console.log(response.data.result);
          Alerts.ErrorNormal("Incorrect OTP, please try again.")
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };



  //setotp
  const setOtp = () => {
    setDisplay(false)
  }

  //get OTP
  const getOtp = () => {
    setDisplay(true)
  }

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>Change Password</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Email<span className="declined">*</span></label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_email,
                    })}
                    name="p_email"
                    placeholder="Enter email id"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter valid email address",
                      },
                    })}
                  />
                  {errors.p_email && (
                    <div className="invalid-feedback">
                      {errors.p_email.message}{" "}
                    </div>
                  )}
                </div>
              </div>


              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">New Password<span className="declined">*</span></label>
                  <input
                    type={isPasswordShow ? "text" : "password"}
                    id="password"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_password,
                    })}
                    onPaste={((e) => {
                      e.preventDefault();
                      return false;
                    })}
                    placeholder="Enter Your Password"
                    name="p_password"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                        message:
                          "UPassword should be of minimum 8 Characters, including at least 1 upper case, lower case, special character and number.",
                      },
                    })}
                    autocomplete="off"
                  />

                  <i
                    className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon`}
                    onClick={togglePasssword}
                  />
                  {errors.p_password && (
                    <div className="invalid-feedback">
                      {errors.p_password.message}
                    </div>
                  )}
                </div>
              </div>


              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Confirm Password<span className="declined">*</span></label>
                  <input
                    onPaste={((e) => {
                      e.preventDefault();
                      return false;
                    })}
                    type={isPasswordShow2 ? "text" : "password"}
                    id="password"
                    className={classNames("form-control", {
                      "is-invalid": errors.p_confirm_password,
                    })}
                    placeholder="Confirm Password"
                    name="p_confirm_password"
                    ref={register({
                      required: true,
                      validate: (value) =>
                        value === getValues("p_password") ||
                        "Password doesn't match.",
                    })}
                    autocomplete="off"
                  />
                  <i
                    className={`fa ${isPasswordShow2 ? "fa-eye-slash" : "fa-eye"} password-icon`}
                    onClick={togglePasssword2}
                  />
                  {errors.p_confirm_password && (
                    <div className="invalid-feedback">
                      {errors.p_confirm_password.message}
                    </div>
                  )}
                </div>
              </div>


              {
                show ?
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
                      {
                        disabled ? null
                          :
                          <small class="text-center">
                            Note: OTP is valid for {time} seconds.
                          </small>
                      }
                    </div>
                  </div>
                  : null
              }

              {
                loading ?
                  <div class="col-md-12">
                    <Spinner color="primary" />
                  </div>
                  :
                  <div class="col-md-6">
                    {
                      show ?
                        <div>
                          {
                            disabled ? null
                              :
                              <>
                                <button type="submit" className="btn btn-primary" onClick={() => setOtp()}>Submit</button>
                                <Cancel />
                              </>
                          }
                        </div>
                        :
                        <>
                          <button type="submit" class="btn btn-success" onClick={() => getOtp("otp")}>Get OTP</button>
                          <Cancel />
                        </>
                    }
                  </div>
              }
            </div>

          </form>

          {
            disabled ?
              <ResendOtp setDisabled={setDisabled} getTime={getTime}
                email={email} setLoad={setLoad} setLoading={setLoading} loading={loading} />
              :
              null
          }

          <Mandatory />
        </div>
      </div>
    </Layout>
  );
}

export default ChangePassword;






const Cancel = () => {
  return (
    <>
      <Link to="/customer/dashboard" style={{ "margin": "10px" }}>
        <Button variant="contained" color="secondary">
          Cancel
        </Button>
      </Link>
    </>
  );
}

