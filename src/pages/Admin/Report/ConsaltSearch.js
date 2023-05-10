import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { baseUrl, baseUrl3 } from "../../../config/config";
const ConsaltSearch = ({ setData, getData }) => {
  const [data2, setData2] = useState([]);
  const [teamleader44, setTeamleader44] = useState("");

  const today =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);
  const prevDay =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + (new Date().getDate() - 1)).slice(-2);
  const [fDate, setFdate] = useState(prevDay);
  const [tDate, settdate] = useState(today);
  const [clientId, setClientId] = useState();
  const [invoiceNum, setInvoiceNum] = useState();
  const userid = window.localStorage.getItem("adminkey");
  var pp = [];

  const { handleSubmit, register, errors, reset } = useForm();

  const getTeamLeader = () => {
    axios.get(`${baseUrl}/tl/getTeamLeader`).then((res) => {
      var dd = [];
      if (res.data.code === 1) {
        pp.push(res.data.result);
        setData2(res.data.result);
      }
    });
  };
  useEffect(() => {
    getTeamLeader();
  }, []);
  const options3 = data2.map((d) => ({
    value: d.post_name,
    label: d.postname,
  }));
  const teamLeader = (a) => {
    let tk = [];
    a.map((i) => {
      tk.push(i.value);
    });
    setTeamleader44(tk);
  };
  const onSubmit = (value) => {
    let formData = new FormData();
    formData.append("to_date", value.to_date);
    formData.append("form_date", value.form_date);
    formData.append("client_id", value.client_id);
    formData.append("invoice_number", value.invoice_number);
    formData.append("tl_post", teamleader44);
    formData.append("uid", JSON.parse(userid));
    axios({
      method: "POST",
      url: `${baseUrl}/report/paymentReport`,
      data: formData,
    }).then((res) => {
      if (res.data.code === 1) {
        setData(res.data.result);
      }
    });
  };
  const downloadReport = () => {
    let formData = new FormData();
    formData.append("to_date", tDate);
    formData.append("form_date", fDate);
    formData.append("tl_post", teamleader44);
    formData.append("client_id", clientId);
    formData.append("invoice_number", invoiceNum);
    formData.append("uid", JSON.parse(userid));
    axios({
      method: "POST",
      url: `${baseUrl}/report/downloadpaymentReport`,
      data: formData,
    }).then(function (response) {
      if (response.data.code === 1) {
        window.open(`${baseUrl3}/${response.data.result}`);
      }
      // window.location.assign(`${baseUrl}/report/generateReport`)
    });
  };
  const fromDate = (e) => {
    setFdate(e.target.value);
  };
  const toDate = (e) => {
    settdate(e.target.value);
  };
  const refrehData = () => {
    axios.get(`${baseUrl}/tl/mobilpayTodayCall`).then((res) => {
      if (res.data.code === 1) {
        // getData()
      }
    });
  };
  const clientFun = (e) => {
    setClientId(e.target.value);
  };
  const invoiceFun = (e) => {
    setInvoiceNum(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-3">
          <label>From Date </label>
          <input
            type="date"
            ref={register}
            onChange={(e) => fromDate(e)}
            defaultValue={prevDay}
            max={today}
            name="form_date"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <label>To Date </label>
          <input
            type="date"
            ref={register}
            onChange={(e) => toDate(e)}
            defaultValue={today}
            max={today}
            name="to_date"
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <label>Client Id </label>
          <input
            type="text"
            ref={register}
            onChange={(e) => clientFun(e)}
            name="client_id"
            className="form-control"
          />
        </div>{" "}
        <div className="col-md-2">
          <label>Invoice Number </label>
          <input
            type="text"
            onChange={(e) => invoiceFun(e)}
            ref={register}
            name="invoice_number"
            className="form-control"
          />
        </div>
        <div className="col-md-2" style={{ zIndex: "1000" }}>
          <label className="form-label">Team Leader</label>
          <Select
            isMulti={true}
            options={options3}
            onChange={(e) => teamLeader(e)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button className="customBtn">Search</button>
        </div>
        <div
          className="col-md-6 my-2"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <button
            type="button"
            onClick={() => downloadReport()}
            className="autoWidthBtn mx-2"
          >
            Download
          </button>
          <button
            type="button"
            onClick={() => refrehData()}
            className="autoWidthBtn mx-2"
          >
            Pull payment data
          </button>
        </div>
      </div>
    </form>
  );
};
export default ConsaltSearch;
