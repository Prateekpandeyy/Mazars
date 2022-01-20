import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useForm } from "react-hook-form";
const InvoiceFilter = (props) => {

   const { handleSubmit, register, errors, reset } = useForm();
   var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 
  const [item] = useState(current_date);
  
  const onSubmit = (data) => {
  
    let formData = new FormData();
    formData.append("qno", data.query_no);
    formData.append("from", data.p_dateFrom);
    formData.append("to", data.p_dateTo);
    formData.append("installment_no", data.installment_no)
    formData.append("status", data.opt)
    if(props.invoice == "generated"){
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?tl_id=${props.userid}&invoice=1`,
        data: formData,
      })
      .then((res) => {
       if(res.data.code === 1){
        props.setData(res.data.payment_detail);
        props.setRec(res.data.payment_detail.length)
       }
      })
    }
    else if (props.invoice == "create"){
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?tl_id=${props.userid}&invoice=0&ststus=${data.opt}`,
        data: formData,
      })
      .then((res) => {
       if(res.data.code === 1){
        props.setData(res.data.payment_detail);
       props.setRec(res.data.payment_detail.length)
       }
      })
    }
    else if (props.invoice == "tpcreate"){
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?tp_id=${props.userid}&invoice=0`,
        data: formData,
      })
      .then((res) => {
       if(res.data.code === 1){
        props.setData(res.data.payment_detail);
       props.setRec(res.data.payment_detail.length)
       }
      })
    }
    else if(props.invoice == "tpgenerated"){
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?tp_id=${props.userid}&invoice=1`,
        data: formData,
      })
      .then((res) => {
       if(res.data.code === 1){
        props.setData(res.data.payment_detail);
        props.setRec(res.data.payment_detail.length)
       }
      })
    }
    else if(props.invoice == "admingenerated"){
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?&invoice=1`,
        data: formData,
      })
      .then((res) => {
       if(res.data.code === 1){
        props.setData(res.data.payment_detail);
        props.setRec(res.data.payment_detail.length)
       }
      })
    }
    else if (props.invoice == "admincreate"){
      axios({
        method: "POST",
        url: `${baseUrl}/admin/getPaymentDetail?&invoice=0`,
        data: formData,
      })
      .then((res) => {
       if(res.data.code === 1){
        props.setData(res.data.payment_detail);
        props.setRec(res.data.payment_detail.length)
       }
      })
    } 
    
  }
  const resetData = () => {
    reset();
    props.getData()
  }
    return(
       <>
      
        <form onSubmit={handleSubmit(onSubmit)}> 
           <div className="row">
               <div className="col-md-3">
               <input   
            type = "text"
            name="query_no"
            ref={register}
            placeholder="Enter Query Number" 
            className="form-control"/>
                   </div>
                   <div className="col-md-2">
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
                  <div className="col-md-7">
                  <div className="form-inline">
             

             <div className="form-group mx-sm-1  mb-2">
               <label className="form-select form-control">From</label>
             </div>

             <div className="form-group mx-sm-1  mb-2">
               <input
                 type="date"
                 name="p_dateFrom"
                 className="form-select form-control"
                 ref={register}
               
               />
             </div>

             <div className="form-group mx-sm-1  mb-2">
               <label className="form-select form-control">To</label>
             </div>

             <div className="form-group mx-sm-1  mb-2">
               <input
                 type="date"
                 name="p_dateTo"
                 className="form-select form-control"
                 ref={register}
                defaultValue={item}
               
               />
             </div>
</div>
                    </div>    
                        
                
                      
           </div>
          <div className="mt-3">
        
           <div className="form-group mx-sm-1  mb-2">
         <div className="row">
      {props.invoice =="tpcreate" || props.invoice == "admincreate" || props.invoice == "create" ? "" :
        <div className="col-md-2">
        <select name="opt" className="form-select form-control" ref={register}  style={{ height: "33px" }}>
        <option value="">Select </option>
           <option value="0">Unpaid</option>
           <option value="1">Paid</option>
           <option value="2">Declined</option>
           </select>
          </div> }
           <div className="col-md-3">
         
          <button className="btn btn-success" type="submit"  style={{ height: "33px" }}>Search</button>
           <button className="btn btn-primary mx-2" onClick={() => resetData()}  style={{ height: "33px" }}>Reset</button>
            </div>
        
                 <div className="col-md-4">
                 <span style={{display : "flex"}}>
                 <label className="form-select form-control"
                  >Total Records : {props.records}</label>
                 </span>
                   </div>
           </div>
                </div>
          </div>
         
        </form>
       </>
    )

}
export default InvoiceFilter;