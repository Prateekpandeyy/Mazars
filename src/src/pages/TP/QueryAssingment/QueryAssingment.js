import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams, useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert";
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
import Alerts from "../../../common/Alerts";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import Loader from "../../../components/Loader/Loader";


const Schema = yup.object().shape({
  p_taxprof: yup.string().required(""),
  p_expdeldate: yup.string().required(""),
});


function QueryAssingment() {
  const alert = useAlert();
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });

  const { id } = useParams();
  const history = useHistory();

  const [taxProfessionDisplay, setTaxProfessionDisplay] = useState([]);
  const [taxID, setTaxID] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);

  const [hideQuery, setHideQuery] = useState({
    name: "",
    timeline: "",
    date_allocation: "",
    expdeliverydate: "",
  });

  const [query, setQuery] = useState(true);
  const userId = window.localStorage.getItem("tpkey");
  const tpkey = window.localStorage.getItem("tpkey");

  const [queryData, setQuerData] = useState({
    queryNo: "",
    timelines: "",
    custId: "",
    expect_dd: "",
  });

  const { queryNo, timelines, custId, expect_dd } = queryData;

  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  console.log("current_date :", current_date);
  const [item] = useState(current_date);


  useEffect(() => {
    getTaxProfession();
    getQueryData();
  }, []);

  const getTaxProfession = () => {
    axios
      .get(`${baseUrl}/tp/getTaxProfessional?tp_id=${JSON.parse(userId)}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setTaxProfessionDisplay(res.data.result);
        }
      });
  };

  const getQueryData = () => {
    axios.get(`${baseUrl}/tp/GetQueryDetails?id=${id}`).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        setQuerData({
          queryNo: res.data.result[0].assign_no,
          timelines: res.data.result[0].Timelines,
          custId: res.data.result[0].customer_id,
          expect_dd: res.data.result[0].Exp_Delivery_Date,
        });
      }
    });
  };

  useEffect(() => {
    getQuery();
  }, [queryNo]);

  const getQuery = () => {
    axios
      .get(`${baseUrl}/tp/TpCheckIfAssigned?assignno=${queryNo}`)
      .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
          setQuery(false);
          // setHideQuery(res.data.meta);
          setHideQuery({
            name: res.data.meta[0].name,
            timeline: res.data.meta[0].timeline,
            date_allocation: res.data.meta[0].date_allocation,
            expdeliverydate: res.data.meta[0].expdeliverydate,
          });
        }
      });
  };

  const handleChange = (e) => {
    console.log("val-", e.target.value);
    setTaxID(e.target.value)
    var value = taxProfessionDisplay.filter(function (item) {
      return item.id == e.target.value
    })
    console.log(value[0]);
    setTeamName(value[0].name)
  }


  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)

    var expdeliverydate = value.p_expdeldate.replace(
      /(\d\d)\/(\d\d)\/(\d{4})/,
      "$3-$1-$2"
    );

    let formData = new FormData();
    formData.append("who", taxID);
    formData.append("id", id);
    formData.append("user", JSON.parse(userId));
    formData.append("type", "tp");
    formData.append("types", "tp");
    formData.append("name", teamName);
    formData.append("timeline", value.p_timelines);
    formData.append("expdeliverydate", expdeliverydate);
    formData.append("assignNo", queryNo);
    formData.append("customer_id", custId);

    axios({
      method: "POST",
      url: `${baseUrl}/tp/AddQueryAssignment`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          setLoading(false)
          var variable = "Query assigned successfully."
          Alerts.SuccessNormal(variable)
          getQuery();
          reset();
        } if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <Link
                to={{
                  pathname: `/taxprofessional/queriestab`,
                  index: 0,
                }}
              >
                <button
                  class="btn btn-success ml-3"
                >
                  <i class="fas fa-arrow-left mr-2"></i>
                  Go Back
                </button>
              </Link>
            </Col>
            <Col md="4">
              <div style={{ textAlign: "center" }}>
                <h2>Query Allocation</h2>
              </div>
            </Col>
          </Row>
        </CardHeader>

        {
          loading ?
            <Loader />
            :
            <>
              <CardHeader>
                <div class="row mt-3">
                  <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="col-md-12">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Query No.</th>
                              <th scope="col">Tax Professional<span className="declined">*</span></th>
                              <th scope="col">Expected Timeline</th>
                              <th scope="col">Exp. Delivery Date<span className="declined">*</span></th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {query ? (
                              <tr>
                                <th scope="row">{queryNo}</th>
                                <td>
                                  <select
                                    className={classNames("form-control", {
                                      "is-invalid": errors.p_taxprof,
                                    })}
                                    name="p_taxprof"
                                    ref={register}
                                    onChange={(e) => handleChange(e)}
                                  >
                                    <option value="">--select--</option>
                                    {taxProfessionDisplay.map((p, index) => (
                                      <option key={index} value={p.id}>
                                        {p.name}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.p_taxprof && (
                                    <div className="invalid-feedback">
                                      {errors.p_taxprof.message}
                                    </div>
                                  )}
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    ref={register}
                                    name="p_timelines"
                                    value={timelines}
                                    class="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    ref={register}
                                    name="p_expdeldate"
                                    className={classNames("form-control", {
                                      "is-invalid": errors.p_expdeldate,
                                    })}
                                    value={expect_dd}
                                    min={item}
                                  />
                                  {errors.p_expdeldate && (
                                    <div className="invalid-feedback">
                                      {errors.p_expdeldate.message}
                                    </div>
                                  )}
                                </td>

                                <td>
                                  <button type="submit" class="btn btn-success">
                                    Assign
                                  </button>
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <th scope="row">{queryNo}</th>
                                <td>
                                  <select class="form-control w-75 p-0" disabled>
                                    <option>{hideQuery.name}</option>
                                  </select>
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    ref={register}
                                    name="p_timelines"
                                    value={hideQuery.timeline}
                                    disabled
                                    class="form-control"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    ref={register}
                                    name="p_expdeldate"
                                    value={hideQuery.expdeliverydate}
                                    disabled
                                    class="form-control"
                                  />
                                </td>

                                <td>
                                  <button class="btn btn-success" disabled>
                                    Assigned
                                  </button>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </form>
                      <Mandatory />
                    </div>
                  </div>
                </div>
              </CardHeader>
            </>
        }
      </Card>
    </Layout>
  );
}

export default QueryAssingment;

// var date = value.p_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
