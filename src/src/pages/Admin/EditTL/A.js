import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Tooltip,
} from "reactstrap";
import TaxProffesionalService from "../../../config/services/TaxProffesional";

function EditTP() {
  const { id } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm();
  const userid = window.localStorage.getItem("adminkey");
  const [teamleader, setTeamLeader] = useState([]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { name, email, phone } = user;

  const [tax, setTax] = useState([]);
  const [tax2, setTax2] = useState([]);

  const [store, setStore] = useState("");
  const [store2, setStore2] = useState(null);


  useEffect(() => {
    getTutorial(id);
  }, [id]);
  
  const getTutorial = (id) => {
    TaxProffesionalService.get(id)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 1) {
          setUser({
            name: res.data.result[0].name,
            email: res.data.result[0].email,
            phone: res.data.result[0].phone,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };



  useEffect(() => {
    const getTeamLeader = () => {
      axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTeamLeader(res.data.result);
        }
      });
    };
    getTeamLeader();
  }, []);

  useEffect(() => {
    const getCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax(res.data.result);
        }
      });
    };

    getCategory();
  }, []);

  useEffect(() => {
    const getSubCategory = () => {
      axios.get(`${baseUrl}/customers/getCategory?pid=${store}`).then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTax2(res.data.result);
        }
      });
    };
    getSubCategory();
  }, [store]);

  
  const onSubmit = (value) => {
    console.log("value :", value);
    let formData = new FormData();
    formData.append("email", value.p_email);
    formData.append("name", value.p_name);
    formData.append("phone", value.p_phone);
    formData.append("pcat_id", value.p_tax);
    formData.append("cat_id", value.p_tax2);
    formData.append("id", id);
    formData.append("tp_id", value.p_teamleader);

    axios({
      method: "POST",
      url: `${baseUrl}/tp/updateTP`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          alert.success("TP updated  !");
          history.goBack();
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Card>
        <CardHeader>
          <div class="col-md-12 d-flex">
            <div>
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </div>
            <div class="text-center ml-5">
              <h4>Edit Tax Professional</h4>
            </div>
          </div>
        </CardHeader>

        <CardHeader>
          <div class="row mt-3">
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
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Select teamleader</label>
                        <select
                          name="p_teamleader"
                          class="form-control"
                          ref={register}
                        >
                          <option value="">--select--</option>
                          {teamleader.map((p) => (
                            <option key={p.Id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Category</label>
                        <select
                          className="form-control"
                          name="p_tax"
                          ref={register}
                          onChange={(e) => setStore(e.target.value)}
                        >
                          <option value="">--Select Category--</option>
                          {tax.map((p, index) => (
                            <option key={index} value={p.id}>
                              {p.details}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Sub Category</label>
                        <select
                          className="form-select form-control"
                          name="p_tax2"
                          ref={register}
                          onChange={(e) => setStore2(e.target.value)}
                        >
                          <option value="">--Select Sub-Category--</option>
                          {tax2.map((p, index) => (
                            <option key={index} value={p.id}>
                              {p.details}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default EditTP;
