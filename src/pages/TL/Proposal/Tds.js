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
import ReactToPdf from 'react-to-pdf';
function Tds (props)  {
    const f2 = React.createRef();
    const [sac33, setSac] = React.useState([])
    const [basicAmount, setBasicamount] = React.useState()
    const [cgetTotal, setCgstTotal] = React.useState()
    const [sgetTotal, setSgstTotal] = React.useState()
    const [igetTotal, setIgstTotal] = React.useState()
    const [grandTotal, setgrandTotal] = React.useState();
    const [paymentDetails2, setPaymentDetails2] = React.useState([]);
    const [item] = React.useState(current_date);
    const [pdf, setPdf] = React.useState(false);
    const [tt, tt2] = React.useState();
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 var details;
  const getDetails = () => {
  if(paymentDetails2 != undefined){
    axios
    .get(`${baseUrl}/admin/getPaymentDetail?id=${props.report}`)
    .then((res) => {
        console.log(res);
        if (res.data.code === 1) {
            console.log(res.data.payment_detail)
            setPaymentDetails2(res.data.payment_detail);
            tt2(res.data.payment_detail[0].paid_amount)
           
        }
    });
  }
};
useEffect(() => {
    getDetails();
}, [props.report])
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
 const tdsFun = (e) => {
    let cget;
    cget = parseInt(igetTotal) - parseInt(igetTotal * e.target.value / 100) 
     setgrandTotal(cget)
    
 }
console.log("assignNo", props.report)
    const onSubmit= (value) => {
       setPdf(true)
        let formData = new FormData();
       
       
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
        formData.append("description", value.total);
        
        axios({
            method : "POST",
            data : formData,
            url : `${baseUrl}/`
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
                          defaultValue={paymentDetails2 == undefined ? "" : tt}
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
                <div className="row">
                    <div className="col-md-12">
                        <label>Total</label>
                        <input 
                        type="text"
                        className="form-control"
                        placeholder="Total"
                        name="total"
                        disabled
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
                        onChange= {(e) => tdsFun(e)} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
                        className="form-control"
                        name="tds_amount"
                        placeholder="Amount"
                        disabled
                        defaultValue={igetTotal} />
                        </div>
                        <div className="col-md-4 my-1">
                    <input 
                        type="text"
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