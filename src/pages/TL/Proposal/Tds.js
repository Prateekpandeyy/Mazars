import React, { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import { serviceData } from "./serviceData";
import className from 'classnames';
import { useReactToPrint } from 'react-to-print';
import moment from "moment";
import { useRef } from "react";
import { useState } from "react";
import ReactToPdf from 'react-to-pdf';
function Tds (props)  {
    const userid = window.localStorage.getItem("tlkey")
    const f2 = useRef(null);
    const [sac33, setSac] = useState([])
    const [basicAmount, setBasicamount] = useState()
    const [cgetTotal, setCgstTotal] = useState()
    const [sgetTotal, setSgstTotal] = useState()
    const [igetTotal, setIgstTotal] = useState()
    const [grandTotal, setgrandTotal] = useState();
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [item] = useState(current_date);
    const [pdf, setPdf] = useState(false);
    const [ii, setIi] = useState(false)
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 
  
    const { handleSubmit, register, errors, getValues } = useForm();
    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [6, 8]
    };  
const cgstFun = (e) => {
   let cget;
   cget = parseInt(props.paidAmount * e.target.value / 100) + parseInt(props.paidAmount)
    setCgstTotal(cget)
   
}

const sgstFun = (e) => {
    let cget;
    cget = parseInt(cgetTotal * e.target.value / 100) + parseInt(cgetTotal)
     setSgstTotal(cget)
    
 }

 const igstFun = (e) => {
    let cget;
    cget = parseInt(sgetTotal * e.target.value / 100) + parseInt(sgetTotal)
     setIgstTotal(cget)
    
 }
 const tdsFun = (e) => {
    let cget;
    cget = parseInt(igetTotal) - parseInt(igetTotal * e.target.value / 100) 
     setgrandTotal(cget)
    
 }

    const onSubmit= (value) => {
    //    setPdf(true)
        let formData = new FormData();
       formData.append("tl_id", userid);
         formData.append("id", props.id)
         formData.append("qno", props.report)
         formData.append("description", value.description);
         formData.append("serviceCode", sac33);
        formData.append("basic_amount", props.paidAmount);
        formData.append("cgst_rate", value.cgst_rate);
        formData.append("cgst_amount", props.paidAmount);
        formData.append("cgst_total", cgetTotal)
        formData.append("sgst_rate", value.sgst_rate);
        formData.append("sgst_amount", cgetTotal);
        formData.append("sgst_total", sgetTotal)
        formData.append("igst_rate", value.igst_rate);
        formData.append("igst_amount", sgetTotal);
        formData.append("igst_total", igetTotal)
        formData.append("total", igetTotal);
        formData.append("tds_rate", value.tds_rate);
        formData.append("tds_amount", igetTotal);
        formData.append("tds_total", grandTotal)
        
        axios({
            method : "POST",
            data : formData,
            url : `${baseUrl}/tl/generateInvoive`
        })
        .then((res) => {
            if(res.data.code === 1){
                console.log(res)
            }
        })
      
    }
  const serviceFun = (e) => {
    
   serviceData.map((k) => {
if(k.id == e) {
 console.log(k.sac)
setSac(k.sac)
}
   })
     
  }
  
    return(
      
        <Modal isOpen={props.tdsForm} toggle={props.addTdsToggle} size="md">
        <ModalHeader toggle={props.addTdsToggle}> Generate Invoice</ModalHeader>
        <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" ref={f2}>
            
           
                <div className="row">
                  <div className="col-md-6">
                      <label>Descirption </label>
                  <select 
                  ref={register}
                style={{height : "33.5px"}}
                  onChange = {(e) => serviceFun(e.target.value)}
                  name="description" className="form-control">
                      <option value="">--select--</option>
                  {serviceData.map((i) => (
                       <option value={i.id} key={i.id} className="form-control"> {i.service}</option>
                  ))}
                    </select>
                      </div>
                      <div className="col-md-6">
                      <label>Basic Amount</label>
                        <input 
                        type="text"

                        name="basic_amount"
                        ref={register({required : true})}
                        className="form-control"
                        placeholder="Amount" 
                        disabled
                      defaultValue={props.paidAmount}
                        onBlur={(e) => setBasicamount(e.target.value)}/>
                        </div>
                </div>
               
                <div className="row">
                  <div className="col-md-12">
                  <h4>CGST</h4>
                      </div>
                    <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        ref={register}
                        className="form-control"
                        placeholder="Rate"
                        name="cgst_rate"
                        onChange= {(e) => cgstFun(e)} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        ref={register}
                        placeholder="Amount"
                        name="cgst_amount"
                        defaultValue={props.paidAmount}
                        disabled />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        ref={register}
                        placeholder="Total" 
                        disabled 
                        name="cgst_total"
                        defaultValue = {cgetTotal}/>
                        </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                  <h4>SGST/UTGST </h4>
                      </div>
                    <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        ref={register}
                        name="sgst_rate"
                        placeholder="Rate" 
                        onChange= {(e) => sgstFun(e)}/>
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        name="sgst_amount"
                        ref={register}
                        placeholder="Amount"
                        disabled
                        defaultValue={cgetTotal} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        ref={register}
                        placeholder="Total"
                        name="sgst_total" 
                        disabled
                        defaultValue={sgetTotal}/>
                        </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                  <h4>IGST </h4>
                      </div>
                    <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Rate"
                        ref={register}
                        name="igst_rate"
                        onChange= {(e) => igstFun(e)} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        ref={register}
                        className="form-control"
                        name="igst_amount"
                        placeholder="Amount"
                        disabled
                        defaultValue={sgetTotal} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Total"
                        name="igst_total"
                        disabled
                        ref={register}
                        defaultValue={igetTotal} />
                        </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                      <h4>Total</h4>
                        </div>
                        <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                           
                        <input 
                        type="text"
                        className="form-control"
                        placeholder="Total"
                        name="total"
                        disabled
                        ref={register}
                        defaultValue={igetTotal} />
                                </div>
                    </div>
                <div className="row">
                  <div className="col-md-12">
                  <h4>TDS </h4>
                      </div>
                    <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Rate"
                        name="tds_rate"
                        ref={register}
                        onChange= {(e) => tdsFun(e)} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        name="tds_amount"
                        placeholder="Amount"
                        disabled
                        ref={register}
                        defaultValue={igetTotal} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        ref={register}
                        className="form-control"
                        placeholder="Total"
                        name="tds_total"
                        disabled
                        defaultValue={grandTotal} />
                        </div>
                </div>
             {
                 pdf === false ?
                 <>
                 <button  type="submit" className="btn btn-success">submit</button>
              
                 <button  type="button" className="btn btn-danger mx-3" onClick={props.addTdsToggle}>Cancle</button> 
                 </> : ""
             }
            </form>
            {pdf === true ? 
            <ReactToPdf targetRef={f2} filename="invoice.pdf" options={options} x={.5} y={.5} scale={0.8}>
            {({toPdf}) => (
                <button className="btn btn-secondary my-2" onClick={toPdf}>Generate pdf</button>
            )}
        </ReactToPdf> : ""}
        </ModalBody>
      </Modal>
    )
}
export default Tds;