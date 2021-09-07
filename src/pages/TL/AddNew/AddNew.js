import React from "react";
import Layout from "../../../components/Layout/Layout";
// import './index.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";


// const Schema = yup.object().shape({
//   p_name: yup.string().required("required name"),
//   p_email: yup.string().email("invalid email").required("required email"),
//   p_phone: yup
//   .string()
//   .required("required phone no")
//   .matches(/^[0-9]+$/, "Must be only digits")
//   .min(10, "Must be exactly 10 digits")
//   .max(20, "max 20 digits"),
// });



function AddNew() {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();

  const userid = window.localStorage.getItem("tlkey");

  const onSubmit = (value) => {
    console.log("value :", value);

    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("name", value.p_name);
    formData.append("phone", value.p_phone);
    formData.append("type", "tp");

    axios({
      method: "POST",
      url: `${baseUrl}/tp/AddTaxProfessional`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);     
        if (response.data.code === 1) {
          alert.success("TP created  !");
          reset();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });

  };



  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="text-center">
            <h3>Add New Tax Professionals</h3>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div class="col-lg-2 col-xl-2 col-md-12"></div>
        <div class="col-lg-8 col-xl-8 col-md-12">
          <div>
          <form onSubmit={handleSubmit(onSubmit)}>   
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="p_name"
                      ref={register}
                    />
                   
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      class="form-control"
                      name="p_email"
                    ref={register}
                    />
                    
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      name="p_phone"
                      ref={register}
                    />
                    
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
              Submit
            </button>
            </form>
          </div>
        </div>
        <div class="col-lg-2 col-xl-2 col-md-12"></div>
      </div>
    </Layout>
  );
}

export default AddNew;
