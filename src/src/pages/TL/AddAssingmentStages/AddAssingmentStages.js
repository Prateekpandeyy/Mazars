import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Alerts from "../../../common/Alerts";
import { Spinner } from 'reactstrap';
import { result } from "lodash";

function AddAssingmentStages() {

  const { register, handleSubmit, errors, reset } = useForm();
  const [assignmentStages, setAssignmentstages] = useState([]);
  const [clientDiscussion, setClientDiscussion] = useState(null);
  const [loading, setLoading] = useState(false);

  const userid = window.localStorage.getItem("tlkey");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getAssignmentList();
  }, []);

  const getAssignmentList = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals?assign_no=${id}&uid=${JSON.parse(userid)}`)
      .then((res) => {
        console.log(res);
        console.log("dt -", res.data.result[0].client_discussion);

        if (res.data.code === 1) {
          console.log("ress2", res.data.result)
          setAssignmentstages(res.data.result);
          reset(res.data.result[0]);
          setClientDiscussion(res.data.result[0].client_discussion)
        }
      });
  };

  const onSubmit = (value) => {
    console.log(value);
   
    if(assignmentStages[0].paid_status=='0' && value.other_stage=='completed')
    {    
    Swal.fire({
      title: "Are you sure?",
      text: "Query no- "+assignmentStages[0].assign_no+" payment is due,Do you still want to process to complete this query !",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value === true) {
        setLoading(true)
        let formData = new FormData();
    
        formData.append("q_id", id);
        formData.append("user_id", JSON.parse(userid));
        formData.append("stage_1_status", value.client_discussion);
        formData.append("stage_2_status", value.draft_report);
        formData.append("stage_3_status", value.final_discussion);
        formData.append("stage_4_status", value.delivery_report);
        formData.append("stage_5_status", value.other_stage);
    
        axios({
          method: "POST",
          url: `${baseUrl}/tl/postAssignmentStages`,
          data: formData,
        })
          .then(function (response) {
            console.log("res-", response);
            if (response.data.code === 1) {
              setLoading(false)
              Alerts.SuccessNormal("Assignment Stage updated successfully.")
              getAssignmentList();
              history.push("/teamleader/assignment");
            } else if (response.data.code === 0) {
              setLoading(false)
            }
          })
          .catch((error) => {
            console.log("erroror - ", error);
          });
      }
      else{

        history.push("/teamleader/assignment");
       return false;
      }
    });
	return false;
    }
    else{
      setLoading(true)
      let formData = new FormData();
  
      formData.append("q_id", id);
      formData.append("user_id", JSON.parse(userid));
      formData.append("stage_1_status", value.client_discussion);
      formData.append("stage_2_status", value.draft_report);
      formData.append("stage_3_status", value.final_discussion);
      formData.append("stage_4_status", value.delivery_report);
      formData.append("stage_5_status", value.other_stage);
  
      axios({
        method: "POST",
        url: `${baseUrl}/tl/postAssignmentStages`,
        data: formData,
      })
        .then(function (response) {
          console.log("res-", response);
          if (response.data.code === 1) {
            setLoading(false)
            Alerts.SuccessNormal("Assignment Stage updated successfully.")
            getAssignmentList();
            history.push("/teamleader/assignment");
          } else if (response.data.code === 0) {
            setLoading(false)
          }
        })
        .catch((error) => {
          console.log("erroror - ", error);
        });
    }
  
  };


  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              <button
                class="btn btn-success ml-3"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Go Back
              </button>
            </Col>
            <Col md="8">
              <h4>Assignment Stages</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <div class="row mt-3">
            {assignmentStages.map((p, i) => (
              <>
                {p.client_discussion == "completed" &&
                  p.delivery_report == "completed" &&
                  p.draft_report == "completed" &&
                  p.final_discussion == "completed" &&
                  p.other_stage == "completed" ? (
                  <div class="col-md-12">
                    <div class="col-md-8">
                      <br />
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "500",
                                  paddingTop: "30px",
                                }}
                              >
                                Client Discussion
                              </label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <select
                                class="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.client_discussion}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "500",
                                  paddingTop: "30px",
                                }}
                              >
                                Draft Report
                              </label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <select
                                class="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.draft_report}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "500",
                                  paddingTop: "30px",
                                }}
                              >
                                Final Discussion
                              </label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <select
                                class="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.final_discussion}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "500",
                                  paddingTop: "30px",
                                }}
                              >
                                Delivery of report
                              </label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <select
                                class="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.delivery_report}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "500",
                                  paddingTop: "30px",
                                }}
                              >
                                Awaiting Completion
                              </label>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <select
                                class="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.other_stage}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <br />
                        <div class="form-group">
                          <button
                            type="submit"
                            class="btn btn-primary"
                            disabled
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div class="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              style={{
                                fontSize: "20px",
                                fontWeight: "500",
                                paddingTop: "30px",
                              }}
                            >
                              Client Discussion
                            </label>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <select
                              class="form-control"
                              ref={register}
                              name="client_discussion"
                            >
                              <option value="inprogress">Inprogress</option>
                              <option value="completed">Completed</option>
                              
                            </select>
                          </div>
                        </div>

                        {/* <div class="col-md-4">
                          <div class="form-group">
                            <div>
                              <Link
                                to={{
                                  pathname: `/teamleader/assignment-form/${p.assign_id}`,
                                  clients:`${clientDiscussion}`,
                                }}
                              >
                                View Details
                              </Link>
                            
                            </div>
                          </div>
                        </div> */}

                      </div>

                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              style={{
                                fontSize: "20px",
                                fontWeight: "500",
                                paddingTop: "30px",
                              }}
                            >
                              Draft Report
                            </label>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <select
                              class="form-control"
                              ref={register}
                              name="draft_report"
                            >
                              <option value="inprogress">Inprogress</option>
                              <option value="completed">Completed</option>
                              
                            </select>
                          </div>
                        </div>
                        {/* <div class="col-md-4">
                          <div class="form-group">
                            <div>
                              <Link
                                to={`/teamleader/view-report/${p.assign_no}`}
                              >
                                View Report
                              </Link>
                            </div>
                          </div>
                        </div> */}
                      </div>

                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              style={{
                                fontSize: "20px",
                                fontWeight: "500",
                                paddingTop: "30px",
                              }}
                            >
                              Final Discussion
                            </label>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <select
                              class="form-control"
                              ref={register}
                              name="final_discussion"
                            >
                              <option value="inprogress">Inprogress</option>
                              <option value="completed">Completed</option>
                             
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <div></div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              style={{
                                fontSize: "20px",
                                fontWeight: "500",
                                paddingTop: "30px",
                              }}
                            >
                              Delivery of report
                            </label>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <select
                              class="form-control"
                              ref={register}
                              name="delivery_report"
                            >
                              <option value="inprogress">Inprogress</option>
                              <option value="completed">Completed</option>
                              
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <div></div>
                          </div>
                        </div>
                      </div>


                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label
                              style={{
                                fontSize: "20px",
                                fontWeight: "500",
                                paddingTop: "30px",
                              }}
                            >
                              Awaiting Completion
                            </label>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <select
                              class="form-control"
                              ref={register}
                              name="other_stage"
                            >
                              <option value="inprogress">Inprogress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <div></div>
                          </div>
                        </div>
                      </div>

                      <br />
                      <div class="form-group">
                        {
                          loading ?
                            <Spinner color="primary" />
                            :
                            <button type="submit" class="btn btn-primary">
                              Submit
                            </button>
                        }
                      </div>
                    </form>
                  </div>
                )}
              </>
            ))}
          </div>
        </CardHeader>
      </Card>
    </Layout>
  );
}

export default AddAssingmentStages;
