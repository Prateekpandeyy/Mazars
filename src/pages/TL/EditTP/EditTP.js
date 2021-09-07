import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";


function EditTP() {
  const { id } = useParams();
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();
  const userid = window.localStorage.getItem("adminkey");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { name, email, phone } = user;

  useEffect(() => {
    const getTeamLeader = () => {
      console.log("bb2", baseUrl)
      axios.get(`${baseUrl}/tp/getTaxProfessional?id=${id}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setUser({
            name: res.data.result[0].name,
            email: res.data.result[0].email,
            phone: res.data.result[0].phone,
          });
        }
      });
    };
    getTeamLeader();
  }, [id]);


  const onSubmit = (value) => {
    console.log("value :", value);
    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("name", value.p_name);
    formData.append("phone", value.p_phone);
    formData.append("id", JSON.parse(userid));

    axios({
      method: "POST",
      url: `${baseUrl}/tp/updateTP`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("TL updated  !");
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
            <h3>Edit Tax Professional</h3>
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
                      defaultValue={name}
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
                      defaultValue={email}
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
                      defaultValue={phone}
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

export default EditTP;
