import React from "react";
import Layout from "../../../components/Layout/Layout";
// import './index.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import Swal from 'sweetalert2';
function AddNew() {
 
  const { handleSubmit, register, errors, reset } = useForm();

  const userid = window.localStorage.getItem("tlkey");

  const onSubmit = (value) => {
    

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
           
        if (response.data.code === 1) {
          Swal.fire({
            title : "success",
            html : "TP created  !",
            icon : "success"
          })
        
          
          reset();
        }
      })
      .catch((error) => {
      
      });

  };



  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="text-center">
            <h3>Add New Tax Professionals</h3>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="col-lg-2 col-xl-2 col-md-12"></div>
        <div className="col-lg-8 col-xl-8 col-md-12">
          <div>
          <form onSubmit={handleSubmit(onSubmit)}>   
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="p_name"
                      ref={register}
                    />
                   
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="p_email"
                    ref={register}
                    />
                    
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
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
        <div className="col-lg-2 col-xl-2 col-md-12"></div>
      </div>
    </Layout>
  );
}

export default AddNew;
