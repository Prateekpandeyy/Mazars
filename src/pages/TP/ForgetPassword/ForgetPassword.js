import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import NewPassword from "../NewPassword/NewPassword";
import classNames from "classnames";
import Swal from "sweetalert2";

const Schema = yup.object().shape({
  p_email: yup.string().email("invalid email").required("required email"),
});



function ForgetPassword(props) {
  const alert = useAlert();

  const { handleSubmit, register, reset, errors } = useForm({
    resolver: yupResolver(Schema),
  });


  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("type", "tp");

    axios({
      method: "POST",
      url: `${baseUrl}/tp/forgototp`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          Swal.fire({
            "title" : "success", 
            "html" : "otp send your email !",
            "icon" : "success"
          })
        
          props.history.push(`/taxprofessional/new-password/${value.p_email}`)
        } else if (response.data.code === 0) {
          console.log(response.data.result);
          Swal.fire("Oops...", "Errorr : " + response.data.result, "error");
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  const valueHandler = () => {
    var item = props.location.email
    if (item == "null") {
      console.log("item : ", item)
      // return '';
    } else {
      return item
    }
  }

  return (
    <>
      <Header mtp="mtp" />
      <div className="container">
        <div className="form">
          <div className="heading">
            <h2>Forgot Password</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>


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
                <div className="invalid-feedback">{errors.p_email.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ForgetPassword;
