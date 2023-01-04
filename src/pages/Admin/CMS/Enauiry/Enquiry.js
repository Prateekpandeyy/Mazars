import React, { useState } from "react";
import Layout from "../../../../components/Layout/Layout";
import { Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import CustomHeading from "../../../../components/Common/CustomHeading";
import AddEditor from "../AddEditor";
import { DatePicker, Space } from "antd";
import axios from "axios";
import { baseUrl } from "../../../../config/config";
import Select from "react-select";
import moment from "moment";
import Swal from "sweetalert2";
const { RangePicker } = DatePicker;
const Schema = yup.object().shape({
  message_type: yup.string().required(""),
  p_message: yup.string().required(""),
  p_to: yup.string().required(""),
});

const Enquiry = (props) => {
  let history = useHistory();
  var minimum = moment.now();
  const [options, setOptions] = useState([]);
  const [type, setType] = useState("");
  const [email, setEmail] = useState([]);
  const [subject, setSubject] = useState("");
  const [schDate, setSchData] = useState("");
  const { handleSubmit, register, errors, reset } = useForm({});
  const token = localStorage.getItem("token");

  const getEmail = (e) => {
    setType(e);
    let formData = new FormData();
    formData.append("type", e);
    axios({
      method: "POST",
      url: `${baseUrl}/cms/emaillist`,
      headers: {
        uit: token,
      },
      data: formData,
    }).then((res) => {
      console.log("response", res);
      let val = [];
      if (res.data.code === 1) {
        res.data.result.map((i) => {
          let kk = {
            label: i.email,
            value: i.email,
          };
          val.push(kk);
        });
        setOptions(val);
      }
    });
  };
  const onSubmit = (value) => {
    let formData = new FormData();
    var myEditor = document.querySelector("#snow-container");
    var html = myEditor.children[0].innerHTML;

    if (myEditor.children[0].innerHTML.trim() === "<p><br></p>") {
      return false;
    } else {
      formData.append("subject", subject);
      formData.append("type", type);
      formData.append("email_list", email);
      formData.append("message", html);
      formData.append("schedule_date", schDate);
      axios({
        method: "POST",
        url: `${baseUrl}/cms/addemailer`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          Swal.fire({
            title: "success",
            html: "Message schedule successfully",
            icon: "success",
          });
        }
      });
    }
  };
  const getSelectEmail = (e) => {
    let email = [];
    e.map((i) => {
      email.push(i.label);
    });
    setEmail(email);
  };
  return (
    <Layout cmsDashboard="cmsDashboard">
      <Container maxWidth="xl">
        <Card>
          <CardHeader>
            <Row>
              <Col md="4">
                <button
                  className="autoWidthBtn ml-2"
                  onClick={() => history.goBack()}
                >
                  Go Back
                </button>
              </Col>
              <Col md="4" align="center">
                <CustomHeading>Schedule email</CustomHeading>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      User type<span className="declined">*</span>
                    </label>
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.p_type,
                      })}
                      name="type"
                      value={type}
                      onChange={(e) => getEmail(e.target.value)}
                      ref={register}
                      style={{ height: "33px" }}
                    >
                      <option value="">--select--</option>
                      <option value="0">Email list</option>
                      <option value="1">All clients</option>
                      <option value="2">All TL, Client, TP</option>
                      <option value="3">TL only</option>
                      <option value="4">TP only</option>
                    </select>
                    {errors.p_to && (
                      <div className="invalid-feedback">
                        {errors.p_to.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Email</label>
                  <Select
                    onChange={(e) => getSelectEmail(e)}
                    isMulti
                    options={options}
                  />
                </div>
                <div className="col-md-10">
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      onChange={(e) => setSubject(e.target.value)}
                      ref={register}
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="form-group">
                    <label>
                      Message<span className="declined">*</span>
                    </label>
                    <AddEditor />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="d-block">
                    Schedule date<span className="declined">*</span>
                  </label>
                  <Space direction="vertical" size={12}>
                    <DatePicker
                      disabledDate={(d) => !d || d.isAfter(minimum)}
                      renderExtraFooter={() => "extra footer"}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                      }}
                      onChange={(e) =>
                        setSchData(moment(e).format("DD-MM-YYYY HH"))
                      }
                    />
                  </Space>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 my-2">
                  <button type="submit" className="customBtn">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
};
export default Enquiry;
