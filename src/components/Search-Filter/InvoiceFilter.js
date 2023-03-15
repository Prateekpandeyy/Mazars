import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
const InvoiceFilter = (props) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const [queryNo, setQueryNo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [installmentno, setInstallmentNo] = useState("");

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(`${props.invoice}`));
    if (data) {
      setQueryNo(data.query_no);
      setInstallmentNo(data.installment_no);
      setFromDate(data.p_dateFrom);
      setToDate(data.p_dateTo);
      setStatus(data.opt);
      onSubmit(data);
    }
  }, []);
  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("qno", data.query_no);
    formData.append("from", data.p_dateFrom);
    formData.append("to", data.p_dateTo);
    formData.append("installment_no", data.installment_no);
    formData.append("status", data.opt);
    localStorage.setItem(`${props.invoice}`, JSON.stringify(data));
    if (props.invoice == "generated") {
      const token = window.localStorage.getItem("tlToken");
      axios({
        method: "POST",
        url: `${baseUrl}/tl/getPaymentDetail?tl_id=${props.userid}&invoice=1`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          props.setData(res.data.payment_detail);
          props.setRec(res.data.payment_detail.length);
        }
      });
    } else if (props.invoice == "tlcreate") {
      const token = window.localStorage.getItem("tlToken");
      axios({
        method: "POST",
        url: `${baseUrl}/tl/getPaymentDetail?tl_id=${props.userid}&invoice=0&ststus=${data.opt}`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          props.setData(res.data.payment_detail);
          props.setRec(res.data.payment_detail.length);
        }
      });
    } else if (props.invoice == "tpcreate") {
      const token = window.localStorage.getItem("tptoken");
      axios({
        method: "POST",
        url: `${baseUrl}/tl/getPaymentDetail?tp_id=${props.userid}&invoice=0`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          props.setData(res.data.payment_detail);
          props.setRec(res.data.payment_detail.length);
        }
      });
    } else if (props.invoice == "tpgenerated") {
      const token = window.localStorage.getItem("tptoken");

      axios({
        method: "POST",
        url: `${baseUrl}/tl/getPaymentDetail?tp_id=${props.userid}&invoice=1`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          props.setData(res.data.payment_detail);
          props.setRec(res.data.payment_detail.length);
        }
      });
    } else if (props.invoice == "admingenerated") {
      const token = window.localStorage.getItem("adminToken");
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?&invoice=1`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          props.setData(res.data.payment_detail);
          props.setRec(res.data.payment_detail.length);
        }
      });
    } else if (props.invoice == "admincreate") {
      const token = window.localStorage.getItem("adminToken");
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?&invoice=0`,
        headers: {
          uit: token,
        },
        data: formData,
      }).then((res) => {
        if (res.data.code === 1) {
          props.setData(res.data.payment_detail);
          props.setRec(res.data.payment_detail.length);
        }
      });
    }
  };
  const resetData = () => {
    reset();
    setQueryNo("");
    setInstallmentNo("");
    setFromDate("");
    setToDate("");
    setStatus("");

    localStorage.removeItem(props.invoice);
    props.getData();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="query_no"
              ref={register}
              placeholder="Enter Query Number"
              className="form-control"
              defaultValue={queryNo}
              onChange={(e) => setQueryNo(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              ref={register}
              value={installmentno}
              onChange={(e) => setInstallmentNo(e.target.value)}
              className="form-select form-control"
              style={{ height: "33px" }}
              name="installment_no"
            >
              <option value="">Please select installment</option>
              <option value="0">Lumpsum</option>
              <option value="1">1st installment</option>
              <option value="2">2nd installment</option>
              <option value="3">3rd installment</option>
              <option value="4">4th installment</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-select form-control">From</label>
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="p_dateFrom"
              className="form-select form-control"
              ref={register}
              defaultValue={fromDate}
              onChange={(e) => setFromDate(e.target.defaultValue)}
            />
          </div>
          <div className="col-md-1">
            <label className="form-select form-control">To</label>
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="p_dateTo"
              className="form-select form-control"
              ref={register}
              defaultValue={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            {props.invoice == "tpcreate" ||
            props.invoice == "admincreate" ||
            props.invoice == "create" ? (
              ""
            ) : (
              <select
                name="opt"
                className="form-select form-control"
                ref={register}
                style={{ height: "33px" }}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="">Select </option>
                <option value="0">Unpaid</option>
                <option value="1">Paid</option>
                <option value="2">Declined</option>
              </select>
            )}
          </div>
          <div className="col-md-6">
            <button
              className="customBtn"
              type="submit"
              style={{ height: "33px" }}
            >
              Search
            </button>
            <button
              className="customBtn mx-2"
              onClick={() => resetData()}
              style={{ height: "33px" }}
            >
              Reset
            </button>
          </div>
          <div className="col-md-3">
            <label className="form-select form-control">
              Total records : {props.records}
            </label>
          </div>
        </div>
      </form>
      {/* <form onSubmit={handleSubmit(onSubmit)}> 
           <div className="row">
             <div className="col-sm-6 col-md-4 col-lg-4 my-sm-2">
             <input   
            type = "text"
            name="query_no"
            ref={register}
            placeholder="Enter Query Number" 
            className="form-control"/>
               </div>
               <div className="col-sm-6 col-md-4 col-lg-4 my-sm-2">
               <select
                   ref={register}
                    className="form-select form-control"
                    style={{ height: "33px" }}
                    name="installment_no">
                      <option value="">Please select installment</option>
                      <option value="0">Lumpsum</option>
                     <option value="1">1st installment</option>
                     <option value="2">2nd installment</option>
                     <option value="3">3rd installment</option>
                     <option value="4">4th installment</option>
                    
                  </select>
               </div>
               <div className="col-sm-12col-md-4 col-lg-4">
                 <div className="row">
                 <div className="col-lg-6 col-md-6 col-sm-6">
               <label className="form-select form-control">From</label>
             </div>

             <div className="col-lg-6 col-md-6 col-sm-6">
               <input
                 type="date"
                 name="p_dateFrom"
                 className="form-select form-control"
                 ref={register}
               
               />
             </div>
                   </div>
              
               </div>
              
           </div>
         
           <div className="row">
           <div className="col-lg-1 col-md-6 col-sm-12 my-sm-2">
               <label className="form-select form-control">To</label>
             </div>

             <div className="col-lg-2 col-md-6 col-sm-12 my-sm-2">
               <input
                 type="date"
                 name="p_dateTo"
                 className="form-select form-control"
                 ref={register}
               
               />
             </div>
           <div className="col-lg-3 col-md-6 col-sm-12 my-sm-2">
           {props.invoice =="tpcreate" || props.invoice == "admincreate" || props.invoice == "create" ? "" :
       
        <select name="opt" className="form-select form-control" ref={register}  style={{ height: "33px" }}>
        <option value="">Select </option>
           <option value="0">Unpaid</option>
           <option value="1">Paid</option>
           <option value="2">Declined</option>
           </select>
           }
             </div>
             <div className="col-lg-3 col-md-6 col-sm-12 my-sm-2">
             <button className="customBtn" type="submit"  style={{ height: "33px" }}>Search</button>
           <button className="customBtn mx-2" onClick={() => resetData()}  style={{ height: "33px" }}>Reset</button>
               </div>
               <div className="col-lg-3 col-md-6 col-sm-12 my-sm-2">
               <span style={{display : "flex"}}>
                 <label className="form-select form-control"
                  >Total records : {props.records}</label>
                 </span>
                 </div>
         </div>
         </form> */}
    </>
  );
};
export default InvoiceFilter;
