import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
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
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import Loader from "../../../components/Loader/Loader";



const Schema = yup.object().shape({
  message_type: yup.string().required(""),
  p_message: yup.string().required(""),
  p_to: yup.string().required(""),
});



function Chatting(props) {

  console.log("props", props)

  const alert = useAlert();
  const history = useHistory();
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });

  const userId = window.localStorage.getItem("adminkey");
  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState("");
  const [data, setData] = useState({})
  const { query_id, query_No, routes } = data




  useEffect(() => {
    console.log("useEffect", props)
    const dataItem = props.location.obj

    if (dataItem) {
      localStorage.setItem("myDataAdmin", JSON.stringify(dataItem));
    }
    var myData = localStorage.getItem("myDataAdmin");
    var data2 = JSON.parse(myData)
    setData(data2)
    setItem(data2.message_type)
  }, [item]);



  const onSubmit = (value) => {
    console.log("value :", value);
    setLoading(true)
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("assign_id", query_id);
    formData.append("message_type", value.message_type);
    formData.append("message", value.p_message);
    formData.append("to", value.p_to);

    axios({
      method: "POST",
      url: `${baseUrl}/admin/messageSent`,
      data: formData,
    })
      .then(function (response) {
        console.log("res-", response);
        if (response.data.code === 1) {
          reset();
          setLoading(false)
          var variable = "Message sent successfully. "
          Alerts.SuccessNormal(variable)
          props.history.push(routes);
        } else if (response.data.code === 0) {
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log("erroror - ", error);
      });
  };

  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>
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
              <h4>Message</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {
            loading ?
              <Loader />
              :
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="row" style={{ display: "flex", justifyContent: "center" }}>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Query No.</label>
                        <input
                          type="text"
                          name="p_query"
                          className="form-control"
                          ref={register}
                          value={query_No}
                          disabled
                        />
                      </div>

                      <div class="form-group">
                        <label>Message Type</label>
                        {
                          item &&
                          <select
                            className={classNames("form-control", {
                              "is-invalid": errors.message_type,
                            })}
                            name="message_type"
                            ref={register}
                            style={{ height: "33px" }}
                            defaultValue={item}
                          >
                            <option value="">--select--</option>
                            <option value="4">Query Discussion</option>
                            <option value="2">Proposal Discussion</option>
                            <option value="5">Payment Discussion</option>
                            <option value="3">Assignment Discussion</option>
                            <option value="1">Others</option>
                          </select>
                        }
                        {errors.message_type && (
                          <div className="invalid-feedback">
                            {errors.message_type.message}
                          </div>
                        )}
                      </div>

                      <div class="form-group">
                        <label>To<span className="declined">*</span></label>
                        <select
                          className={classNames("form-control", {
                            "is-invalid": errors.p_to,
                          })}
                          name="p_to"
                          ref={register}
                          style={{ height: "33px" }}
                        >
                          <option value="">--select--</option>
                          <option value="customer">Customer</option>
                          <option value="tl">Team Leader</option>
                          <option value="both">Both</option>
                        </select>
                        {errors.p_to && (
                          <div className="invalid-feedback">
                            {errors.p_to.message}
                          </div>
                        )}
                      </div>

                      <div class="form-group">
                        <label>Message<span className="declined">*</span></label>
                        <textarea
                          className={classNames("form-control", {
                            "is-invalid": errors.p_message,
                          })}
                          placeholder="Message text here"
                          rows="5"
                          ref={register}
                          name="p_message"
                        ></textarea>
                        {errors.p_message && (
                          <div className="invalid-feedback">
                            {errors.p_message.message}
                          </div>
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Send
                      </button>
                    </div>
                  </div>

                </form>
                <Mandatory />
              </>
          }
        </CardBody>

      </Card>
    </Layout >
  );
}

export default Chatting;


{/* <select
                    class="form-control"
                    name="p_sms_type"
                    ref={register}
                    value={query_No}
                  >
                    <option value="">--select--</option>
                    <option value="1">Information</option>
                    <option value="2">Proposal Discussion</option>
                    <option value="3">Assignment Discussion</option>
                  </select> */}

                    // useEffect(() => {
  //   const getQuery = () => {
  //     axios.get(`${baseUrl}/customers/getAssignedAssignments?user=${JSON.parse(userId)}
  //     &type=1`)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data.code === 1) {
  //           // setAssingment(res.data.result);
  //         }
  //       });
  //   };

  //   getQuery();
  // }, []);
    // const dataItem = props.location.obj
  // const { message_type, query_id, query_No, routes } = dataItem