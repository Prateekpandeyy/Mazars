import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Alerts from "../../../common/Alerts";
import Mandatory from "../../../components/Common/Mandatory";
import VerifyOtpLogin from "./VerifyOtpLogin";
import { Spinner } from "reactstrap";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import CustomHeading from "../../../components/Common/CustomHeading";
const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
  password: yup
    .string()
    .required("")
});

function Login(props) {
  let history = useHistory()
  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState('')
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [password, setPassword] = useState("")
  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };

  const onSubmit = (value) => {
  
    setLoading(true)

    let formData = new FormData();
    formData.append("id", value.p_email);
    formData.append("password", value.password);
    formData.append("type", "tl");

    axios({
      method: "POST",
      url: `${baseUrl}/tl/login`,
      data: formData,
    })
      .then(function (response) {
       
        if (response.data.code === 1) {
         
          logout();
          setShow(true)
          setLoading(false)
          Cookies.set("tlName", response.data.displayname)
          Alerts.SuccessNormal("As per your request, OTP has been sent to your registered mobile number / email address.")
          setUid(response.data.user_id)
         
        } else if (response.data.code === 0) {
          setLoading(false)
          Alerts.ErrorNormal("Invalid email or password.")
        }
        else if (response.data.code === 2){
          setLoading(false)
          Alerts.ErrorNormal(response.data.result)
        }
      })
      .catch((error) => {
        
      });
  };

  const handleChange = (e) => {
    
    setEmail(e.target.value);
  };
  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem("adminkey");
      localStorage.removeItem("adminEmail");
      history.push("/admin/login");
    }, 36000000)
  }
  if(window.location.origin === "http://masindia.live" && window.location.protocol == 'http:'){
    window.location.href = window.location.href.replace('http:', 'https:')
  }
  return (
    <>
      <Header mtl="mtl" noTlSign = "noSingIn"/>
      <div className="container">

        {
          show ? <div>
            <VerifyOtpLogin email={email} uid={uid} loading={loading}
          password = {password}    setLoading={setLoading} />
          </div>
            :
            <div className="form">
              <CustomHeading>
                Team leader
                </CustomHeading>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">User Id</label>
                      <input
                        type="text"
                        className={classNames("form-control", {
                          "is-invalid": errors.p_email,
                        })}
                        name="p_email"
                        ref={register}
                        placeholder="Enter Email"
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.p_email && (
                        <div className="invalid-feedback">
                          {errors.p_email.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type={isPasswordShow ? "text" : "password"}
                        className={classNames("form-control", {
                          "is-invalid": errors.password,
                        })}
                        onChange = {(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Enter Password"
                        autocomplete="off"
                        ref={register}
                        onCopy={(e) => {
                          e.preventDefault();
                          return false
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false
                        }}
                      />
                      <i
                        className={`fa ${isPasswordShow ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={togglePasssword}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    to={{
                      pathname: "/teamleader/forget-password",
                      email: `${email}`,
                    }}
                  >
                    Forgot Password
                  </Link>
                </div>

                {
                  loading ?
                    <div class="col-md-12">
                      <Spinner color="primary" />
                    </div>
                    :
                    <button type="submit" className="customBtn my-3">
                      Submit
                    </button>
                }


              
              
              </form>
            </div>
        }

      </div>
   
    </>
  );
}

export default Login;
