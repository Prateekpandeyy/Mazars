import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  Row,
  Col,
  
} from "reactstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import CommonServices from "../../../common/common";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from "axios";
import { baseUrl } from "../../../config/config";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import CustomHeading from "../../../components/Common/CustomHeading";
const Schema = yup.object().shape({
  p_taxprof: yup.string().required(""),
  p_expdeldate: yup.string().required(""),
});
const QueryAssingment = (props) => {
  const [loading, setLoading] = useState(false);
  const [taxID, setTaxID] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [queryData, setQuerData] = useState({
    queryNo: "",
    timelines: "",
    custId: "",
    expect_dd: "",
  });
  const [hideQuery, setHideQuery] = useState({
    name: "",
    timeline: "",
    date_allocation: "",
    expdeliverydate: "",
  });

  const [query, setQuery] = useState(true);
  const [taxProfessionDisplay, setTaxProfessionDisplay] = useState([]);
  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 
  const [item] = useState(current_date);
  const userId = window.localStorage.getItem("tlkey");
  const token = window.localStorage.getItem("tlToken")
  const { id } = useParams();
  const { queryNo, timelines, custId, expect_dd } = queryData;
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });
  const myConfig = {
    headers : {
     "uit" : token
    }
  }
  useEffect(() => {
    getTaxProfession();
    getQueryData();
    getQuery();
  }, []);
  const handleChange = (e) => {
   
    setTaxID(e.target.value)
    var value = taxProfessionDisplay.filter(function (item) {
      return item.id == e.target.value
    })
  
    setTeamName(value[0].name)
  }
  const getQuery = () => {
    axios
      .get(`${baseUrl}/tl/TlCheckIfAssigned?assignno=${queryNo}`, myConfig)
      .then((res) => {
        
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

  const getTaxProfession = () => {
    axios
      .get(`${baseUrl}/tp/getTaxProfessional?tl_id=${JSON.parse(userId)}&&q_id=${id}`, myConfig)
      .then((res) => {
        
        if (res.data.code === 1) {
          setTaxProfessionDisplay(res.data.result);
        }
      });
  };

  const getQueryData = () => {
    axios.get(`${baseUrl}/tl/GetQueryDetails?id=${id}`, myConfig).then((res) => {
      
      if (res.data.code === 1) {
        setQuerData({
          queryNo: res.data.result[0].assign_no,
          timelines: res.data.result[0].Timelines,
          custId: res.data.result[0].customer_id,
          expect_dd: CommonServices.changeFormateDate(res.data.result[0].Exp_Delivery_Date),
        });
      }
    });
  };


  const onSubmit = (value) => {
 
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
      url: `${baseUrl}/tl/AddQueryAssignment`,
      headers : {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
      
        if (response.data.code === 1) {
          setLoading(false)
         
          Swal.fire({
            title : 'success',
            html : "Query assigned successfully.",
            icon : "success"
          })
          props.history.push({
            pathname: `/teamleader/queriestab`,
            index: 3,
          });
          getQuery();
          reset();
         
        } if (response.data.code === 0) {
          setLoading(false)
          Swal.fire({
            title : 'error',
            html : "Something went wrong, please try again",
            icon : "error"
          })
        }
      })
      .catch((error) => {
     
      });
  };
  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <Link
                to={{
                  pathname: `/teamleader/queriestab`,
                  index: 3,
                }}
              >
                <button
                  class="autoWidthBtn ml-3"
                >
                
                  Go Back
                </button>
              </Link>
            </Col>
            <Col md="4" align="center">
             <CustomHeading>
             Query allocation
             </CustomHeading>
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
                              <th scope="col">Query no.</th>
                              <th scope="col">Tax professional<span className="declined">*</span></th>
                              <th scope="col">Expected timeline</th>
                              <th scope="col">Exp. delivery date<span className="declined">*</span></th>
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
                                        { p.post_name + "-"   + p.name}
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
                                    autoComplete="off"
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
                                  <button type="submit" class="customBtn">
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
                                  <button disabled  className="customBtnDisabled">
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
