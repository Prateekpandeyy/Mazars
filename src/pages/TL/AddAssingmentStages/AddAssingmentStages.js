import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../config/config";

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
import CustomHeading from "../../../components/Common/CustomHeading";
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
  const token = window.localStorage.getItem("tlToken")
  const myConfig = {
      headers : {
       "uit" : token
      }
    }
  const getAssignmentList = () => {
    axios
      .get(`${baseUrl}/tl/getUploadedProposals?assign_no=${id}&uid=${JSON.parse(userid)}`, myConfig)
      .then((res) => {
       

        if (res.data.code === 1) {
            setAssignmentstages(res.data.result);
          reset(res.data.result[0]);
          setClientDiscussion(res.data.result[0].client_discussion)
        }
      });
  };

  const onSubmit = (value) => {
  
   
    if(assignmentStages[0].paid_status=='0' && value.other_stage=='completed')
    {    
    Swal.fire({
      title: "Are you sure?",
      text: "Query no- "+assignmentStages[0].assign_no+" payment is outstanding , Do you still want to proceed to complete this query?",
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
          headers : {
            uit : token
          },
          data: formData,
        })
          .then(function (response) {
           
            if (response.data.code === 1) {
              setLoading(false)
              Alerts.SuccessNormal("Assignment status updated successfully.")
              getAssignmentList();
              history.push("/teamleader/assignment");
            } else if (response.data.code === 0) {
              setLoading(false)
            }
          })
          .catch((error) => {
            
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
        headers : {
          uit : token
        },
        data: formData,
      })
        .then(function (response) {
        
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
                className="autoWidthBtn ml-3"
                onClick={() => history.goBack()}
              >
           
                Go Back
              </button>
            </Col>
            <Col md="8">
             <CustomHeading>
             Assignment stages
              </CustomHeading>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <div className="row mt-3 mx-2">
            {assignmentStages.map((p, i) => (
              <>
                {p.client_discussion == "completed" &&
                  p.delivery_report == "completed" &&
                  p.draft_report == "completed" &&
                  p.final_discussion == "completed" &&
                  p.other_stage == "completed" ? (
                  <div className="col-md-12">
                    <div className="col-md-8">
                      <br />
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                               
                              >
                                Client discussion
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <select
                                className="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.client_discussion}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Draft report
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <select
                                className="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.draft_report}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Final discussion
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <select
                                className="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.final_discussion}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Delivery of final report
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <select
                                className="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.delivery_report}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Awaiting completion
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <select
                                className="form-control"
                                ref={register}
                                disabled
                              >
                                <option>{p.other_stage}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <br />
                        <div className="form-group">
                          <button
                            type="submit"
                            className="customBtn"
                            disabled
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Client discussion
                            </label>
                          </div>
                        </div>
                       {p.client_discussion === "completed" ? 
                        <div className="col-md-4">
                        <div className="form-group">
                          <select
                            className="form-control"
                            ref={register}
                            name="client_discussion"
                            disabled
                          >
                            <option value="inprogress">Inprogress</option>
                            <option value="completed">Completed</option>
                            
                          </select>
                        </div>
                      </div> : 
                       <div className="col-md-4">
                       <div className="form-group">
                         <select
                           className="form-control"
                           ref={register}
                           name="client_discussion"
                         >
                           <option value="inprogress">Inprogress</option>
                           <option value="completed">Completed</option>
                           
                         </select>
                       </div>
                     </div>}

                       

                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Draft report
                            </label>
                          </div>
                        </div>
                        {
                          p.client_discussion == "completed" && p.draft_report === "inprogress" ?
                          <div className="col-md-4">
                          <div className="form-group">
                            <select
                              className="form-control"
                              ref={register}
                              name="draft_report"
                            >
                              <option value="inprogress">Inprogress</option>
                              <option value="completed">Completed</option>
                              
                            </select>
                          </div>
                        </div> :
                         <div className="col-md-4">
                         <div className="form-group">
                           <select
                             className="form-control"
                             ref={register}
                             disabled
                             defaultValue = "inprogress"
                             name="draft_report"
                           >
                             <option value="inprogress">Inprogress</option>
                             <option value="completed">Completed</option>
                             
                           </select>
                         </div>
                       </div>
                        }
                       
                      
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Final discussion
                            </label>
                          </div>
                        </div>
                      {p.client_discussion == "completed" && p.final_discussion === "inprogress" && p.draft_report === "completed" ? 
                        <div className="col-md-4">
                        <div className="form-group">
                          <select
                            className="form-control"
                            ref={register}
                            name="final_discussion"
                          >
                            <option value="inprogress">Inprogress</option>
                            <option value="completed">Completed</option>
                           
                          </select>
                        </div>
                      </div> : 
                        <div className="col-md-4">
                        <div className="form-group">
                          <select
                            className="form-control"
                            ref={register}
                            name="final_discussion"
                            disabled
                          >
                            <option value="inprogress">Inprogress</option>
                            <option value="completed">Completed</option>
                           
                          </select>
                        </div>
                      </div> }
                        <div className="col-md-4">
                          <div className="form-group">
                            <div></div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Delivery of final report
                            </label>
                          </div>
                        </div>
                        {p.client_discussion == "completed" && p.delivery_report === "inprogress" &&    p.draft_report === "completed" && p.final_discussion === "completed" ?
                        <div className="col-md-4">
                        <div className="form-group">
                          <select
                            className="form-control"
                            ref={register}
                            name="delivery_report"
                          >
                            <option value="inprogress">Inprogress</option>
                            <option value="completed">Completed</option>
                            
                          </select>
                        </div>
                      </div> :
                      <div className="col-md-4">
                      <div className="form-group">
                        <select
                          className="form-control"
                          ref={register}
                          name="delivery_report"
                          disabled
                        >
                          <option value="inprogress">Inprogress</option>
                          <option value="completed">Completed</option>
                          
                        </select>
                      </div>
                    </div>}
                        <div className="col-md-4">
                          <div className="form-group">
                            <div></div>
                          </div>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>
                              Awaiting completion
                            </label>
                          </div>
                        </div>
                        {p.client_discussion == "completed"  && p.draft_report === "completed" && p.final_discussion === "completed" && p.delivery_report === "completed" 
                        ? <div className="col-md-4">
                        <div className="form-group">
                          <select
                            className="form-control"
                            ref={register}
                            name="other_stage"
                          >
                            <option value="inprogress">Inprogress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                      : <div className="col-md-4">
                      <div className="form-group">
                        <select
                          className="form-control"
                          ref={register}
                          name="other_stage"
                          disabled
                        >
                          <option value="inprogress">Inprogress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>}
                        <div className="col-md-4">
                          <div className="form-group">
                            <div></div>
                          </div>
                        </div>
                      </div>

                      <br />
                      <div className="form-group">
                        {
                          loading ?
                            <Spinner color="primary" />
                            :
                            <button type="submit" className="customBtn">
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
