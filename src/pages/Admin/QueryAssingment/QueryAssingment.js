import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import {
  Card,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useParams, Link} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "../../../components/Loader/Loader";
import CustomHeading from "../../../components/Common/CustomHeading";
import classNames from "classnames";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Mandatory from "../../../components/Common/Mandatory";
const Schema = yup.object().shape({
  p_taxprof: yup.string().required(""),
  p_expdeldate: yup.string().required(""),
});

const QueryAssingment = (props) => {
  const [loading, setLoading] = useState(false);
  const [taxLeaderDisplay, setTaxLeaderDisplay] = useState([]);
  const [teamID, setTeamID] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [query, setQuery] = useState(true);
  const [expectedDate, setExpectedDate] = useState("");
  const [hideQuery, setHideQuery] = useState({
    name: "",
    timeline: "",
    date_allocation: "",
    expdeliverydate: "",
  });
  const [queryData, setQuerData] = useState({
    queryNo: "",
    timelines: "",
    custId: "",
  });
  const { queryNo, timelines, custId } = queryData;
  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  const [item] = useState(current_date);
  const userId = window.localStorage.getItem("adminkey");
  const token = window.localStorage.getItem("adminToken")
  let history = useHistory()
  const myConfig = {
      headers : {
       "uit" : token
      }
    }

  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });
  const { id } = useParams();
  useEffect(() => {
    getTaxLeader();
    getQueryData();
    getQuery();
  }, []);


// functions 

const getQuery = () => {
  if(queryNo.length > 0){
   axios
   .get(`${baseUrl}/admin/CheckIfAssigned?assignno=${queryNo}`, myConfig)
   .then((res) => {
     
     if (res.data.code === 1) {
       setQuery(false);
       setHideQuery({
         name: res.data.meta[0].name,
         timeline: res.data.meta[0].timeline,
         date_allocation: res.data.meta[0].date_allocation,
         expdeliverydate: res.data.meta[0].expdeliverydate,
       });
     }
   });
  }
 };

  const getTaxLeader = () => {
    axios.get(`${baseUrl}/admin/getTeamLeader`, myConfig).then((res) => {
      
      if (res.data.code === 1) {
        setTaxLeaderDisplay(res.data.result);
      }
    });
  };

  const getQueryData = () => {
    axios.get(`${baseUrl}/admin/GetQueryDetails?id=${id}`, myConfig).then((res) => {
      
      if (res.data.code === 1) {
        setQuerData({
          queryNo: res.data.result[0].assign_no,
          timelines: res.data.result[0].Timelines,
          custId: res.data.result[0].customer_id,
        });
        // expectedDeliveryDate(res.data.result[0].Timelines);
      }
    });
  };


const handleChange = (e) => {
   
  setTeamID(e.target.value);
  var value = taxLeaderDisplay.filter(function (item) {
    return item.id ===  e.target.value;
  });
  
  setTeamName(value[0].name);
};
  const onSubmit = (value) => {
    setLoading(true)
  
    var expdeliverydate = value.p_expdeldate.replace(
      /(\d\d)\/(\d\d)\/(\d{4})/,
      "$3-$1-$2"
    );

    let formData = new FormData();
    formData.append("who", teamID);
    formData.append("id", id);
    formData.append("user", JSON.parse(userId));
    formData.append("type", "admin");
    formData.append("types", "tl");
    formData.append("name", teamName);
    formData.append("timeline", value.p_timelines);
    formData.append("expdeliverydate", value.p_expdeldate);
    formData.append("assignNo", queryNo);
    formData.append("customer_id", custId);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/AddQueryAssignment`,
      headers: {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
     
        if (response.data.code === 1) {
          setLoading(false)
         
         Swal.fire({
          title : "success",
          html : "Query assigned successfully.",
          icon : "success"
         })
           props.history.push({
             pathname: `/admin/queriestab`,
             index: 1,
           });
        
        } if (response.data.code === 0) {
          setLoading(false)
          Swal.fire({
            title : "error",
            html : "Something went wrong, please try again",
            icon : "error"
           })
        }
      })
      .catch((error) => {
        
      });
  };
  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
    <Card>
      <CardHeader>
        <Row>
          <Col md="4">
            <Link
              to={{
                pathname: `/admin/queriestab`,
                index: 1,
              }}
            >
              <button className="autoWidthBtn ml-3">
               
                Go back
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
      <CardHeader>

        {
          loading ?
            <Loader />
            :
            <>
              <div className="row mt-3">
                <div className="col-md-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Query no.</th>
                          <th scope="col">Team leaders<span className="declined">*</span></th>
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
                                <option value="">-select-</option>
                                {taxLeaderDisplay.map((p, index) => (
                                  <option key={index} value={p.id}>
                                    {p.postname}
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
                                autoComplete="off"
                                className="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                ref={register}
                                name="p_expdeldate"
                                className={classNames("form-control", {
                                  "is-invalid": errors.p_expdeldate,
                                })}
                                min={item}
                              />
                              {errors.p_expdeldate && (
                                <div className="invalid-feedback">
                                  {errors.p_expdeldate.message}
                                </div>
                              )}
                            </td>

                            <td>
                              <button type="submit" className="customBtn">
                                Assign
                              </button>
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <th scope="row">{queryNo}</th>
                            <td>
                              <select className="form-control w-75 p-0" disabled>
                                <option>{hideQuery.name}</option>
                              </select>
                            </td>

                            <td>
                              <input
                                type="text"
                                ref={register}
                                name="p_timelines"
                                className="form-control"
                                value={hideQuery.timeline}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                ref={register}
                                name="p_expdeldate"
                                className="form-control"
                                value={hideQuery.expdeliverydate}
                                disabled
                              />
                            </td>
                            <td>
                              <button className="autoWidthBtn" disabled>
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
            </>
        }

      </CardHeader>
    </Card>
  </Layout>
  );
}

export default QueryAssingment;
