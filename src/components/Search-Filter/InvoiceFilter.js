import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
const InvoiceFilter = (props) => {
  const { handleSubmit, register, errors, reset } = useForm();
  const { index } = props

  var current_date =
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2);

  const [item] = useState(current_date);

  // function getFilterValues(){
  //   const storedFilterValue=localStorage.getItem('invoicetlFilterData');
  //   if(!storedFilterValue) return {
  //    query_no : " ", p_dateFrom : " " , p_dateTo : " ", installment_no : " ", opt : " "  }
  //    else
  //    return JSON.parse(storedFilterValue)
  //  }

  const [invoicetlFilterData, setFilterData] = useState({
    query_no: "", p_dateFrom: "", p_dateTo: "", installment_no: "", opt: "",route:"",index:""
  });
  const { query_no, p_dateFrom, p_dateTo, installment_no, opt } = invoicetlFilterData
  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    console.log("input entered here")
    setFilterData(prev => ({ ...prev, [name]: value }));
    // console.log("called to submit 1")
  };

  useEffect(() => {
    if ((props.invoice === "generated") || (props.invoice === "tlcreate")) {
    let id = JSON.parse(localStorage.getItem(`searchDataI${index}`));
    if(id){
      setFilterData((prev) => ({ ...prev, ...id }));
      onSubmit(id)
    }
    else{
      console.log("none");
    }
  } else if((props.invoice === "tpgenerated") || (props.invoice === "tpcreate")){
    let id = JSON.parse(localStorage.getItem(`searchTpDataI${index}`));
    if(id){
      setFilterData((prev) => ({ ...prev, ...id }));
      onSubmit(id)
    }
    else{
      console.log("none");
    }
  }

  }, []);
  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("qno", data.query_no);
    formData.append("from", data.p_dateFrom);
    formData.append("to", data.p_dateTo);
    formData.append("installment_no", data.installment_no);
    formData.append("status", data.opt);
    if ((props.invoice === "generated") || (props.invoice === "tlcreate")) {
      if(data.routes)
      {
      let objI = {
        query_no: data.query_no,
        p_dateFrom: data.p_dateFrom,
        p_dateTo: data.p_dateTo,
        installment_no: data.installment_no,
        opt: data.opt,
        route: window.location.pathname,
        index: index,
      }
    }
      else {
        let objI = {
          query_no: data.query_no,
          p_dateFrom: data.p_dateFrom,
          p_dateTo: data.p_dateTo,
          installment_no: data.installment_no,
          opt: data.opt,
          route: window.location.pathname,
          index: index,
        }
        localStorage.setItem(`searchDataI${index}`, JSON.stringify(objI));
      }
    } 
    if ((props.invoice === "tpgenerated") || (props.invoice === "tpcreate")){
      if(data.routes)
      {
      let objI = {
        query_no: data.query_no,
        p_dateFrom: data.p_dateFrom,
        p_dateTo: data.p_dateTo,
        installment_no: data.installment_no,
        opt: data.opt,
        route: window.location.pathname,
        index: index,
      }
    }
      else {
        let objI = {
          query_no: data.query_no,
          p_dateFrom: data.p_dateFrom,
          p_dateTo: data.p_dateTo,
          installment_no: data.installment_no,
          opt: data.opt,
          route: window.location.pathname,
          index: index,
        }
        localStorage.setItem(`searchTpDataI${index}`, JSON.stringify(objI));
      }
    }

    
    if (props.invoice === "generated") {
      const token = window.localStorage.getItem("tlToken");
      const tlGinvoice = window.localStorage.getItem(`searchDataI1`);
      if(tlGinvoice){
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
            // console.log(res.data)
          }
        });
      }else{
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
          // console.log(res.data)
        }
      });
    }
    } else if (props.invoice === "tlcreate") {
      const token = window.localStorage.getItem("tlToken");
      const tlCinvoice = window.localStorage.getItem(`searchDataI2`);
      if(tlCinvoice){
        axios({
          method: "POST",
          url: `${baseUrl}/tl/getPaymentDetail?tl_id=${props.userid}&invoice=0&ststus=${tlCinvoice.opt}`,
          headers: {
            uit: token,
          },
          data: formData,
        }).then((res) => {
          if (res.data.code === 1) {
            props.setData(res.data.payment_detail);
            props.setRec(res.data.payment_detail.length);
            console.log(res.data)
          }
        });
      }else{
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
          console.log(res.data)
        }
      });
    }
    } else if (props.invoice === "tpcreate") {
      const token = window.localStorage.getItem("tptoken");
      const tpGinvoice = window.localStorage.getItem(`searchTpDataI2`);
      if(tpGinvoice){
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
            console.log(res.data)
          }
        });
      }else{
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
            console.log(res.data)
          }
        });
      }
      
    } else if (props.invoice === "tpgenerated") {
      const token = window.localStorage.getItem("tptoken");
      const tpGinvoice = window.localStorage.getItem(`searchTpDataI1`);
      if(tpGinvoice){
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
            console.log(res.data)
          }
        });
      }else{
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
            console.log(res.data)
          }
        });
      }
    } else if (props.invoice === "admingenerated") {
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
          console.log(res.data)
        }
      });
    } else if (props.invoice === "admincreate") {
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
          console.log(res.data)
        }
      });
    }
  };
  const resetData = () => {
    reset();
    setFilterData({
      query_no: "", p_dateFrom: "", p_dateTo: current_date, installment_no: "", opt: "" ,route:"",index:""
    })
    if ((props.invoice === "generated") || (props.invoice === "tlcreate")) {
    localStorage.removeItem(`searchDataI${index}`);
    }
    else if((props.invoice === "tpgenerated") || (props.invoice === "tpcreate")){
    localStorage.removeItem(`searchTpDataI${index}`);
    }
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
              value={query_no}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <select
              ref={register}
              className="form-select form-control"
              style={{ height: "33px" }}
              name="installment_no"
              value={installment_no}
              onChange={handleChange}
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
              value={p_dateFrom}
              onChange={handleChange}
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
              value={p_dateTo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            {props.invoice === "tpcreate" ||
              props.invoice === "admincreate" ||
              props.invoice === "create" ? (
              ""
            ) : (
              <select
                name="opt"
                className="form-select form-control"
                ref={register}
                style={{ height: "33px" }}
                value={opt}
                onChange={handleChange}
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