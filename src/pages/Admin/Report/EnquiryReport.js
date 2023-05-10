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
import DataTablepopulated from "../../../components/DataTablepopulated/DataTabel";

const Report = () => {
  const [selectedData, setSelectedData] = useState([]);

  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [companyName, setCompanyName] = useState([]);
  const [data, setData] = useState([]);
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
        value: "General enquiries - Mazars Advisory Solutions",
        label: "General enquiries - Mazars Advisory Solutions",
      },
      {
        value: "Business Advisory Services - Mazars Advisory Solutions",
        label: "Business Advisory Services - Mazars Advisory Solutions",
      },
    ];
    setCompanyName(cname);
    setFromDate(dateSpit);
  }, []);
  const myConfig = {
    headers: {
      uit: token,
    },
  };
  const getAllQueryList = () => {
    axios
      .get(`${baseUrl}/admin/getenquirylist`, myConfig)
      .then((res) => {
        if (res.data.code === 1) {
          setData(res.data.result);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getAllQueryList();
  }, []);
  const handleCategory = (value) => {
    setSelectedData(value);
  };

  const resetCategory = () => {
    setSelectedData([]);
  };

  const onSubmit = () => {
    const myConfig2 = {
      headers: {
        uit: token,
      },
      responseType: "blob",
    };
    let cName = selectedData.map((i) => {
      return i.value;
    });
    let formData = new FormData();
    formData.append("message_type", cName);
    formData.append("fromdate", fromDate);
    formData.append("todate", toDate);
    let filename = "enquieryReport.xlsx";
    let api = `${baseUrl}/report/generateenquiry?t=${JSON.stringify(
      Math.floor(Math.random() * 110000)
    )}`;
    axios({
      method: "POST",
      url: `${baseUrl}/report/generateenquiry?t=${JSON.stringify(
        Math.floor(Math.random() * 110000)
      )}`,
      headers: {
        uit: token,
        "Content-Type": "application/json",
      },
      responseType: "blob",
      data: formData,
    }).then((resp) => {
      var a;
      if (resp.data) {
        a = document.createElement("a");
        a.href = window.URL.createObjectURL(resp.data);
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
      }
    });
  };

  const exportData = (filteredRows, activity) => {
    let filename = "EnquieryReport.xlsx";
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
      var a;
      if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
        a = document.createElement("a");
        a.href = window.URL.createObjectURL(xmlHttpRequest.response);
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
      }
    };
    xmlHttpRequest.open("POST", activity);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
    xmlHttpRequest.setRequestHeader("uit", token);
    xmlHttpRequest.responseType = "blob";
    xmlHttpRequest.send(filteredRows);
  };
  const dateFormat = "YYYY-MM-DD";
  const fromDateFun = (e) => {
    setFromDate(e.format("YYYY-MM-DD"));
  };
  const columns = [
    {
      dataField: "message_type",
      text: "Enquiry type",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "email_from",
      text: "Email",
      sort: true,
    },
    {
      dataField: "create_date",
      text: "Date",
      sort: true,
      formatter: function dateFun(cell, row) {
        var date = row.create_date.split(" ")[0].split("-").reverse().join("-");

        return <>{date}</>;
      },
    },
    {
      dataField: "message",
      text: "Message",
      sort: true,
    },
  ];
  const resetData = () => {
    setSelectedData([]);
    setToDate(new Date().toISOString().slice(0, 10));
    setFromDate(dateSpit);
    getAllQueryList();
  };
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return (
    <>
      <Layout adminDashboard="adminDashboard" adminUserId={userid}>
        <Card>
          <CardHeader>
            <div className="TlForm my-2">
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
                  <div className="col-md-3" style={{ zIndex: 99999 }}>
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
                      className="btnSearch h-90"
                      onClick={resetCategory}
                    >
                      X
                    </button>
                  </div>
                  <div className="form-group mx-sm-1  mb-2">
                    <label className="form-select form-control h-100">
                      From
                    </label>
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
                    <label className="form-select form-control h-100">To</label>
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
                  <div>
                    <button type="submit" className="autoWidthBtn mt-1 mx-2">
                      Generate Report
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="autoWidthBtn mt-1 mx-2"
                      onClick={() => resetData()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </CardHeader>
          <CardBody>
            <DataTablepopulated
              bgColor="#42566a"
              keyField="id"
              data={data}
              columns={columns}
            ></DataTablepopulated>
          </CardBody>
        </Card>
      </Layout>
    </>
  );
};
export default Report;
