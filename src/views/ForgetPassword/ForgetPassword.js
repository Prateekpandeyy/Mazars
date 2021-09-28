import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import "../../assets/css/style.css";
import "../../assets/css/media.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Alerts from "../../common/Alerts";
import Mandatory from "../../components/Common/Mandatory";


const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required(""),
});


function ForgetPassword(props) {
  console.log("props : ", props.location.email);

  const alert = useAlert();
  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });
  const [loading, setLoading] = useState(false);


  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)

    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("p", "forgot");

    axios({
      method: "POST",
      url: `${baseUrl}/customers/forgototp`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setLoading(false)
          Alerts.SuccessNormal("As per your request, OTP has been sent to your regsitered email address.")
          props.history.push(`/customer/new-password/${value.p_email}`)
        } else if (response.data.code === 0) {
          setLoading(false)
          console.log(response.data.result);
          Alerts.ErrorNormal("Invalid email.")
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const valueHandler = () => {
    var item = props.location.email
    if (item == "undefined") {
      console.log("item : ", item)
    } else {
      return item
    }
  }

  return (
    <>
      <Header cust_sign="cust_sign" />
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>Forgot Password</h2>
          </div>

          {
            loading ?
              <div class="col-md-12">
                <Spinner color="primary" />
              </div>
              :
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Email<span className="declined">*</span></label>
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
                    <div className="invalid-feedback">{errors.p_email.message}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Get OTP
                </button>
                <Link to="/" style={{ "margin": "10px" }}>
                  <button type="submit" className="btn btn-secondary">
                    Cancel
                  </button>
                </Link>
              </form>
          }
          <Mandatory />
        </div>

      </div>

      <Footer />
    </>
  );
}

export default ForgetPassword;





{
  /* <Link
            to={{
              pathname: `/customer/new-password`,
              email:`${value.p_email}`
            }}
          ></Link>; */
}

  // const sendEmail = (email) => {
  //   return (
  //     <Link
  //       to={{
  //         pathname: `/customer/new-password`,
  //         email: `${email}`,
  //       }}
  //     ></Link>
  //   );
  // };
