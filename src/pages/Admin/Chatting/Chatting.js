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
import { Link } from "react-router-dom";
import CustomHeading from "../../../components/Common/CustomHeading";



const Schema = yup.object().shape({
  message_type: yup.string().required(""),
  p_message: yup.string().required(""),
  p_to: yup.string().required(""),
});



function Chatting(props) {

 

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
  const token = window.localStorage.getItem("adminToken")
    const myConfig = {
        headers : {
         "uit" : token
        }
      }



  useEffect(() => {

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
      headers : {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
      
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
                    pathname: `/admin/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button className = "autoWidthBtn ml-2">Go Back</button>
                </Link>
              
            </Col>
            <Col md="8">
            <CustomHeading>
                Message
            </CustomHeading>
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
                  <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                    <div className="col-md-6">
                      <div className="form-group">
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

                      <div className="form-group">
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
                            <option value="4">Query discussion</option>
                            <option value="2">Proposal discussion</option>
                            <option value="5">Payment discussion</option>
                            <option value="3">Assignment discussion</option>
                            <option value="1">Others</option>
                          </select>
                        }
                        {errors.message_type && (
                          <div className="invalid-feedback">
                            {errors.message_type.message}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
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
                          <option value="customer">Client</option>
                          <option value="tl">Team leader</option>
                          <option value="both">Both</option>
                        </select>
                        {errors.p_to && (
                          <div className="invalid-feedback">
                            {errors.p_to.message}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
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
                      <button type="submit" className="customBtn">
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
