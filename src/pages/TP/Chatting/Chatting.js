import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";

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
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import Mandatory from "../../../components/Common/Mandatory";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const Schema = yup.object().shape({
  msg_type: yup.string().required(""),
  p_message: yup.string().required(""),
});

function Chatting(props) {
  const history = useHistory();
  const { handleSubmit, register, errors, reset } = useForm({
    resolver: yupResolver(Schema),
  });

  const userId = window.localStorage.getItem("tpkey");

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  const [data, setData] = useState({});
  const { message_type, query_id, query_No, routes } = data;
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    const dataItem = props.location.obj;

    if (dataItem) {
      localStorage.setItem("myDataTL", JSON.stringify(dataItem));
    }
    var myData = localStorage.getItem("myDataTL");

    var data2 = JSON.parse(myData);
    setData(data2);
    setItem(data2.message_type);
  }, []);

  const onSubmit = (value) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("uid", JSON.parse(userId));
    formData.append("assign_id", query_id);
    formData.append("message_type", value.msg_type);
    formData.append("message", value.p_message);

    formData.append("sst", "tp");
    axios({
      method: "POST",
      url: `${baseUrl}/tp/messageSent`,
      headers: {
        uit: token,
      },
      data: formData,
    })
      .then(function (response) {
        if (response.data.code === 1) {
          reset();
          setLoading(false);

          Swal.fire({
            title: "success",
            html: "Message sent successfully.",
            icon: "success",
          });
          props.history.push(routes);
        }
      })
      .catch((error) => {});
  };

  return (
    <Layout TPDashboard="TPDashboard" TPuserId={userId}>
      <Card>
        <CardHeader>
          <Row>
            <Col md="4">
              {props.location.index ? (
                <Link
                  to={{
                    pathname: `/taxprofessional/${props.location.routes}`,
                    index: props.location.index,
                  }}
                >
                  <button class="customBtn">Go Back</button>
                </Link>
              ) : (
                <button class="customBtn" onClick={() => history.goBack()}>
                  Go Back
                </button>
              )}
            </Col>
            <Col md="8">
              <h4>Message</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          {loading ? (
            <Loader />
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div
                  class="row"
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
                      {item && (
                        <select
                          className={classNames("form-control", {
                            "is-invalid": errors.msg_type,
                          })}
                          name="msg_type"
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
                      )}
                      {errors.msg_type && (
                        <div className="invalid-feedback">
                          {errors.msg_type.message}
                        </div>
                      )}
                    </div>

                    <div class="form-group">
                      <label>
                        Message<span className="declined">*</span>
                      </label>
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
          )}
        </CardBody>
      </Card>
    </Layout>
  );
}

export default Chatting;
