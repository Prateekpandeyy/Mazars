import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Alerts from "../../../common/Alerts";
import { Link } from "react-router-dom";
import Mandatory from "../../../components/Common/Mandatory";
import { Spinner } from "reactstrap";
import Swal from "sweetalert2";

const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
});

function ForgetPassword(props) {
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (value) => {
    setLoading(true);

    let formData = new FormData();
    formData.append("email", value.p_email);

    axios({
      method: "POST",
      url: `${baseUrl}/tl/forgototp`,
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          setLoading(false);
          Swal.fire({
            title: "success",
            html: "As per your request , OTP has been sent to your mobile number / email address.",
            icon: "success",
          });

          props.history.push(`/teamleader_new-password/${value.p_email}`);
        } else if (response.data.code === 0) {
          Swal.fire({
            title: "error",
            html: "Please enter correct email address.",
            icon: "error",
          });

          setLoading(false);
        }
      })
      .catch((error) => {});
  };

  const valueHandler = () => {
    var item = props.location.email;
    if (item == "null") {
    } else {
      return item;
    }
  };

  return (
    <>
      <Header mtl="mtl" />
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>Forgot Password</h2>
          </div>
          {loading ? (
            <div class="col-md-12">
              <Spinner color="primary" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                  defaultValue={valueHandler()}
                />
                {errors.p_email && (
                  <div className="invalid-feedback">
                    {errors.p_email.message}
                  </div>
                )}
              </div>

              <button type="submit" className="autoWidthBtn">
                Get OTP
              </button>
              <Link to="/teamleader/login" style={{ margin: "10px" }}>
                <button type="submit" className="customBtn">
                  Cancel
                </button>
              </Link>

              <Mandatory />
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
