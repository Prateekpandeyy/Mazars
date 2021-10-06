import React, { useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import { serviceData } from "./serviceData";
import className from 'classnames';
import { useReactToPrint } from 'react-to-print';

import ReactToPdf from 'react-to-pdf';
function Tds ({tdsForm, addTdsToggle})  {
    const f2 = React.createRef();
    const [sac33, setSac] = React.useState([])
    const [basicAmount, setBasicamount] = React.useState()
    const [cgetTotal, setCgstTotal] = React.useState()
    const [sgetTotal, setSgstTotal] = React.useState()
    const [igetTotal, setIgstTotal] = React.useState()
    const [pdf, setPdf] = React.useState(false);
    const { handleSubmit, register, errors, getValues } = useForm();
    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [6, 8]
    };  
const cgstFun = (e) => {
   let cget;
   cget = parseInt(basicAmount * e.target.value / 100) + parseInt(basicAmount)
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
    const onSubmit= (value) => {
       setPdf(true)
        let formData = new FormData();
        formData.append("name", value.name);
        formData.append("gstIn", value.gstin);
        formData.append("invoice_no", value.invoice_no);
        formData.append("date", value.date);
         formData.append("description", value.description);
         formData.append("serviceCode", sac33);
        formData.append("basic_amount", value.basic_amount);
        formData.append("cgst_rate", value.cgst_rate);
        formData.append("cgst_amount", value.cgst_amount);
        formData.append("cgst_total", value.cgst_total)
        formData.append("sgst_rate", value.sgst_rate);
        formData.append("sgst_amount", value.sgst_amount);
        formData.append("sgst_total", value.sgst_total)
        formData.append("igst_rate", value.igst_rate);
        formData.append("igst_amount", value.igst_amount);
        formData.append("igst_total", value.igst_total)
      
    }
  const serviceFun = (e) => {
    
   serviceData.map((k) => {
if(k.id == e) {
 console.log(k.sac)
setSac(k.sac)
}
   })
     
  }
  console.log(sac33)
    return(
      
        <Modal isOpen={tdsForm} toggle={addTdsToggle} size="md">
        <ModalHeader toggle={addTdsToggle}>TDS Report</ModalHeader>
        <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" ref={f2}>
            <div className="row">
            <div className="col-md-6 my-1">
                <input 
                type="text"
                className="form-control"
                ref={register({required : true})}
                name="cust_name"
                placeholder="Please enter name" />
            </div>
            <div className="col-md-6 my-1">
                <input 
                type="text"
                className="form-control"
                name="gstin"
                ref={register}
                placeholder="Please enter GSTIN No" />
            </div>
            
            </div>
            <div className="row">
            <div className="col-md-6 my-1">
                <input 
                type="text"
                name="invoice_no"
                ref={register({required : true})}
                className="form-control"
                ref={register}
                placeholder="Please enter Invoice  No" />
            </div>
            <div className="col-md-6 my-1">
                <input 
                type="date"
                ref={register({required : true})}
                name="date"
                className="form-control"
                ref={register}
                placeholder="Please enter Date" />
            </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                      <label>Descirption </label>
                  <select 
                  onChange = {(e) => serviceFun(e.target.value)}
                  name="description" className="form-control">
                      <option value="">--select--</option>
                  {serviceData.map((i) => (
                       <option value={i.id} key={i.id}> {i.service}</option>
                  ))}
                    </select>
                      </div>
                      <div className="col-md-6">
                          <label>Service Code </label>
                  <select className="form-control"
                  disabled> 
                 <option>{sac33}</option>
                       
                    </select>
                      </div>
                </div>
                <div className="row">
                    <div className="col-md-12 my-3">
                        <input 
                        type="text"
                        name="basic_amount"
                        ref={register({required : true})}
                        className="form-control"
                        placeholder="Amount" 
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
                        className="form-control"
                        placeholder="Rate"
                        name="cgst_rate"
                        onChange= {(e) => cgstFun(e)} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Amount"
                        name="cgst_amount"
                        defaultValue={basicAmount}
                        disabled />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
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
                        name="sgst_rate"
                        placeholder="Rate" 
                        onChange= {(e) => sgstFun(e)}/>
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        name="sgst_amount"
                        placeholder="Amount"
                        disabled
                        defaultValue={cgetTotal} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
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
                        name="igst_rate"
                        onChange= {(e) => igstFun(e)} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
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
                        defaultValue={igetTotal} />
                        </div>
                </div>
             {
                 pdf === false ?
                 <>
                 <button  type="submit" className="btn btn-success">submit</button>
              
                 <button  type="button" className="btn btn-danger mx-3" onClick={addTdsToggle}>Cancle</button> 
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