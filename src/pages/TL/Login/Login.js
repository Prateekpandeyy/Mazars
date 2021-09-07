import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import classNames from "classnames";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Alerts from "../../../common/Alerts";
import Mandatory from "../../../components/Common/Mandatory";
import VerifyOtpLogin from "./VerifyOtpLogin";
import { Spinner } from "reactstrap";



const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
  password: yup
    .string()
    .required("")
});

function Login(props) {
  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState('')
  const [isPasswordShow, setPasswordShow] = useState(false);

  const togglePasssword = () => {
    setPasswordShow(!isPasswordShow)
  };

  const onSubmit = (value) => {
    console.log("value :", value);
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
        console.log("res-", response);
        if (response.data.code === 1) {
          setShow(true)
          setLoading(false)
          Alerts.SuccessNormal("As per your request, OTP has been sent to your registered email address.")
          setUid(response.data.user_id)
        } else if (response.data.code === 0) {
          setLoading(false)
          Alerts.ErrorNormal("Invalid email or password.")
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const handleChange = (e) => {
    console.log("val-", e.target.value);
    setEmail(e.target.value);
  };
  return (
    <>
      <Header mtl="mtl" />
      <div className="container">

        {
          show ? <div>
            <VerifyOtpLogin email={email} uid={uid} loading={loading}
              setLoading={setLoading} />
          </div>
            :
            <div className="form">
              <div className="heading">
                <h2>MTL Login</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
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
                        name="password"
                        placeholder="Enter Password"
                        autocomplete="off"
                        ref={register}
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
                {
                  loading ?
                    <div class="col-md-12">
                      <Spinner color="primary" />
                    </div>
                    :
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                }


                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <Link
                    to={{
                      pathname: "/teamleader/forget-password",
                      email: `${email}`,
                    }}
                  >
                    Forgot Password
                  </Link>
                </div>

                <Mandatory />
              </form>
            </div>
        }

      </div>
      <Footer />
    </>
  );
}

export default Login;
