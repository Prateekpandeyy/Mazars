import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import { baseUrl, baseUrl3 } from "../../../config/config";

import { DatePicker, Space } from "antd";
import Layout from "../../../components/Layout/Layout";
import { useHistory } from "react-router";
import { Card, CardHeader, Row, Col, CardBody } from "reactstrap";
import Swal from "sweetalert2";
import Select from "react-select";

const Report = () => {
  const [selectedData, setSelectedData] = useState([]);

  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [companyName, setCompanyName] = useState([]);
  const maxDate = moment(new Date().toISOString().slice(0, 10)).add(1, "days");
  const [fromDate, setFromDate] = useState("");
  const dateValue = useRef();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const userid = window.localStorage.getItem("adminkey");
  const token = window.localStorage.getItem("adminToken");

  const history = useHistory();
  const { handleSubmit, register, errors, getValues, reset } = useForm();
  let date = new Date();
  var dateweek = date.setDate(date.getDate() - 7);
  const dt = new Date(dateweek);
  const yr = dt.getFullYear();
  var monthIn2Digit = ("0" + (dt.getMonth() + 1)).slice(-2);
  var dateIn2Digit = ("0" + date.getDate()).slice(-2);

  var dateSpit = `${yr}` + "-" + `${monthIn2Digit}` + "-" + `${dateIn2Digit}`;

  useEffect(() => {
    let cname = [
      {
        value: "General enquiries - MAZ",
        label: "General enquiries - MAZ",
      },
      {
        value: "Business Advisory Services - MAZ",
        label: "Business Advisory Services - MAZ",
      },
    ];
    setCompanyName(cname);
    setFromDate(dateSpit);
  }, []);

  const handleCategory = (value) => {
    setSelectedData(value);
  };

  const resetCategory = () => {
    setSelectedData([]);
  };

  const onSubmit = () => {
    let cName = selectedData.map((i) => {
      return i.value;
    });

    // (selectedData !== "General enquiries - MAZ" || selectedData !== "Business Advisory Services - MAZ"   )
    if (selectedData.length === 0) {
      Swal.fire({
        title: "error",
        html: "Please fill all input values",
        icon: "error",
      });
    } else {
      let formData = new FormData();
      formData.append("cat", cName);
      formData.append("fromdate", fromDate);
      formData.append("todate", toDate);

      axios({
        method: "POST",
        url: `${baseUrl}/report/generateenquiry?t=${JSON.stringify(
          Math.floor(Math.random() * 110000)
        )}`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          window.URL = window.URL || window.webkitURL;
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;

          a.download = "edqiuireyList";
          a.target = "_blank";
          a.click();
          Swal.fire({
            title: "success",
            html: "Enquiry Report generated successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "error",
            html: "Something went wrong , please try again",
            icon: "error",
          });
        }
      });
    }
  };

  const dateFormat = "YYYY-MM-DD";
  const fromDateFun = (e) => {
    setFromDate(e.format("YYYY-MM-DD"));
  };

  return (
    <>
      <Layout adminDashboard="adminDashboard" adminUserId={userid}>
        <Card style={{ height: "150px", marginTop: "20px" }}>
          <CardHeader>
            <div className="TlForm">
              <Row>
                <Col md="4">
                  <button
                    className="autoWidthBtn"
                    onClick={() => history.goBack()}
                  >
                    Go Back
                  </button>
                </Col>
                <Col md="4">
                  <h4>Enquiry Report</h4>
                </Col>
                <Col md="4"></Col>
              </Row>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-3">
                    <Select
                      style={{ zIndex: 10000 }}
                      isMulti={true}
                      onChange={handleCategory}
                      options={companyName}
                      value={selectedData}
                    />
                  </div>
                  {/* <Select
                      style={{ width: 365 }}
                      placeholder="Select Category"
                      defaultValue={[]}
                      ref={register}
                      onChange={handleCategory}
                      value={selectedData}
                      name="cat"
                    >
                      <Option
                        value="General enquiries - MAZ"
                        label="Compilance"
                      >
                        <div className="demo-option-label-item">
                          General enquiries - Mazars Advisory Solutions
                        </div>
                      </Option>
                      <Option
                        value="Business Advisory Services - MAZ"
                        label="Compilance"
                      >
                        <div className="demo-option-label-item">
                          Business Advisory Services - Mazars Advisory Solutions
                        </div>
                      </Option>
                    </Select> */}

                  <div>
                    <button
                      type="reset"
                      className="btnSearch mb-2 mx-2"
                      onClick={resetCategory}
                    >
                      X
                    </button>
                  </div>
                  <div className="form-group mx-sm-1  mb-2">
                    <label className="form-select form-control">From</label>
                  </div>
                  {fromDate.length > 0 ? (
                    <div className="form-group mx-sm-1  mb-2">
                      <DatePicker
                        onChange={(e) => fromDateFun(e)}
                        disabledDate={(d) => !d || d.isAfter(maxDate)}
                        format={dateFormatList}
                        ref={dateValue}
                        defaultValue={moment(`${fromDate}`, dateFormat)}
                        name="fromdate"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="form-group mx-sm-1  mb-2">
                    <label className="form-select form-control">To</label>
                  </div>
                  <div className="form-group mx-sm-1  mb-2">
                    <DatePicker
                      onChange={(e) => setToDate(e.format("YYYY-MM-DD"))}
                      disabledDate={(d) => !d || d.isAfter(maxDate)}
                      ref={dateValue}
                      defaultValue={moment(new Date(), "DD MM, YYYY")}
                      format={dateFormatList}
                      name="todate"
                    />
                  </div>
                  <button type="submit" className="autoWidthBtn mb-2 mr-2 ml-2">
                    Generate Report
                  </button>
                </div>
              </form>
            </div>
          </CardHeader>
        </Card>
      </Layout>
    </>
  );
};
export default Report;
