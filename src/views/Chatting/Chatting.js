import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useHistory } from "react-router-dom";
import ShowError from "../../components/LoadingTime/LoadingTime";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Spinner
} from "reactstrap";
import Alerts from "../../common/Alerts";
import classNames from "classnames";
import Mandatory from "../../components/Common/Mandatory";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

const Schema = yup.object().shape({
  message_type: yup.string().required(""),
  p_message: yup.string().required(""),
});


function Chatting(props) {


  const history = useHistory();
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });

  const userId = window.localStorage.getItem("userid");
  const [item, setItem] = useState("");
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false);
  const { message_type, query_id, query_No, routes } = data
  const token = window.localStorage.getItem("clientToken")
  useEffect(() => {
    
    const dataItem = props.location.obj
 
    if (dataItem) {
      localStorage.setItem("myDataCust", JSON.stringify(dataItem));
    }
    var myData = localStorage.getItem("myDataCust");
    var data2 = JSON.parse(myData)
   
    setData(data2)
    setItem(data2.message_type)
  }, [item]);

console.log("data", data)

  const onSubmit = (value) => {
   
    setLoading(true)
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("assign_id", query_id);
    formData.append("message_type", value.message_type);
    formData.append("message", value.p_message);

    axios({
      method: "POST",
      url: `${baseUrl}/customers/messageSent`,
      headers: {
        uit : token
      },
      data: formData,
    })
      .then(function (response) {
     
        if (response.data.code === 1) {
          setLoading(false)
          reset();
          var variable = "Message sent successfully. "
          Alerts.SuccessNormal(variable)

          props.history.push(routes);
        }
      })
      .catch((error) => {
       ShowError.LoadingError(setLoading)
      });
  };

  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <Card>
        <CardHeader>
          <Row>
          <Col md="4">
            <Link
                  to={{
                    pathname: `/customer/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="customBtn">Go Back</button>
                </Link>
              
            </Col>
            <Col md="8">
              <h4>Message</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
         
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

                      
                  {
                      loading ?
                        <Spinner color="primary" />
                        :
                        <button className="customBtn" type="submit">
                         Send
                        </button>
                    }
                    </div>
                  </div>
                </form>
                <Mandatory />
              </>
         
        </CardBody>
      </Card>
    </Layout >
  );
}

export default Chatting;
