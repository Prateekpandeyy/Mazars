 import React, { useEffect } from "react";
 import axios from "axios";
 import { baseUrl } from "../../../config/config";
 import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
 import { useForm } from "react-hook-form";
 import { useRef } from "react";
 import { useState } from "react";
 import classNames from "classnames";
 import { useHistory } from "react-router";
 import { parseInt } from "lodash";
 import Swal from "sweetalert2";
 import {Spinner} from "reactstrap";
 import './porposalStyle.css';

function Tds (props)  {
  const history = useHistory();
    const userid = window.localStorage.getItem("tpkey")
    const f2 = useRef(null);
    const [sac33, setSac] = useState([])
    const [services2, setServices2] = useState();
    const [services, setServices] = useState();
    const [cgetTotal, setCgstTotal] = useState()
    const [sgetTotal, setSgstTotal] = useState()
    const [igetTotal, setIgstTotal] = useState()
    const [gst, setGst] = useState()
    const [tds2, setTds] = useState()
    const [grandTotal, setgrandTotal] = useState();
   const [total, setTotal] = useState()
   const [pocketExp, setPocketExp] = useState()
   const [cgetRate, setCgetRate] = useState()
   const [igetRate, setIgetRate] = useState();
   const [sgetRate, setSgetRate] = useState();
   const [basicAmount, setBasicAmount] = useState()
   const [billNo, setBillNo] = useState();
   const [gstNum , setGstNum] = useState();
   const [tdsR, setTdsR] = useState();
   const [disabled, setDisabled] = useState(false)
  const [description, setDiscription] = useState()
const [loading, setLoading] = useState(false);
var tdsRate = 10;
const percent = {
  display : "flex", 
  justifyContent : "space-between",
  flexDirection : "row",
  alignItems : "center"
}
const token = window.localStorage.getItem("tptoken")
const myConfig = {
    headers : {
     "uit" : token
    }
  }

const getServices = () => {
      axios.get(`${baseUrl}/tl/getServices`, myConfig)
      .then((res) => {
  
        if(res.data.code === 1){
          setServices(res.data.result);
        }
      })
    }
  useEffect(() => {
    getServices();
  }, [])
  useEffect(() => {
    if(props.generated == "edited"){
    getDataild();
    }
    else {
     
      setTdsR(10)
      setCgetRate(0);
      setIgetRate(0);
      setSgetRate(0)
      setGstNum(props.gstNo);
    setBillNo(props.billNo)
    setBasicAmount(props.paidAmount)
    setPocketExp(0)
    setCgstTotal(parseInt(props.paidAmount * 0 / 100).toFixed(2))
    setIgstTotal(parseInt(0));
    setSgstTotal(parseInt(0))
    setGst(parseInt(props.paidAmount * 0 / 100))
    setTds(parseInt(props.paidAmount * tdsRate / 100))
    let tot = Number(props.paidAmount) + Number(props.paidAmount * cgetRate / 100)
    console.log("totl", isNaN(parseInt(props.paidAmount)), parseInt(props.paidAmount * cgetRate / 100))
    setTotal(parseInt(props.paidAmount))
    // setTotal(Number(parseInt(props.paidAmount) + parseInt(props.paidAmount * cgetRate / 100)))
    setgrandTotal(parseInt(parseInt(props.paidAmount) + parseInt(props.paidAmount * 0 / 100)) - parseInt(props.paidAmount * tdsRate / 100))
    }
  }, [props.paidAmount])
    const { handleSubmit, register, errors, getValues, reset } = useForm();
console.log("propAmount", total)
const getDataild = () => {
  axios
  .get(`${baseUrl}/tl/getPaymentDetail?tp_id=${JSON.parse(userid)}&invoice=1&invoice_id=${props.id}`, myConfig)
.then((res) => {

if(res.data.payment_detail){
  res.data.payment_detail.map((i) => {
    setSac(i.serviceCode)
     setGstNum(i.gstin_no)
 setBillNo(i.billno)
 setDiscription(i.description)
setTdsR(i.tds_rate)
 setBasicAmount(parseInt(i.paid_amount))
 setPocketExp(parseFloat(i.opt_expenses));
 setCgstTotal(parseFloat(i.cgst_amount));
 setIgstTotal(parseFloat(i.igst_amount));
 setSgstTotal(parseFloat(i.sgst_amount));
 setCgetRate(parseFloat(i.cgst_rate));
 setIgetRate(parseFloat(i.igst_rate));
 setSgetRate(parseFloat(i.sgst_rate));
setTds(parseFloat(i.tds_amount))
 setgrandTotal(parseFloat(i.payable_amount))
 setTotal(parseFloat(i.invoice_amount))
 setGst(parseFloat(i.gst));
 setDisabled(true);
  })
}

})
}
  // Cgst Tax function
const cgstFun = (e) => {
 
 
  let kkk = e.target.value.split(".")[1]
   if(kkk)
    if(kkk.length < 3){
      let a = 0;
    
     setCgetRate(e.target.value);
     if(pocketExp.length === 0){
       a = parseInt(basicAmount) + parseInt(0);
     }
     else{
       a = parseInt(basicAmount) + parseInt(pocketExp);
     }
      let cget = parseFloat(a * e.target.value / 100)
      let total = Number(cget) + Number(igetTotal) + Number(sgetTotal)
      setCgstTotal(parseFloat(cget).toFixed(2));
      setGst(Math.round(total))
     
   
      setTotal(parseInt(a) + Math.round(total))
      setgrandTotal(parseInt(a) + Math.round(total) - parseInt(tds2))
    
    }
    else{
      return false;
    }
  else{
   setCgetRate(e.target.value);
   
   let a = 0
   if(pocketExp.length === 0){
     a = parseInt(basicAmount) + parseInt(0);
   }
   else{
     a = parseInt(basicAmount) + parseInt(pocketExp);
   }
   
    let cget = parseFloat(a * e.target.value / 100)
    let total = Number(cget) + Number(igetTotal) + Number(sgetTotal)
    setCgstTotal(parseFloat(cget).toFixed(2));
   
    setGst(parseInt(Math.round(total)))
   
    setTotal(parseInt(a) + Math.round(total))
   //  setTotal(parseInt(cget) + parseInt(igetTotal) + parseInt(sgetTotal + parseInt(a)))
   setgrandTotal(parseInt(a) + Math.round(total) - parseInt(tds2))
   
  }
 }
 // Sgst tax function
 const sgstFun = (e) => {
   let kkk = e.target.value.split(".")[1]
   if(kkk){
     if(kkk.length < 3){
       let a = 0
   if(pocketExp.length === 0){
     a = parseInt(basicAmount) + parseInt(0);
   }
   else{
     a = parseInt(basicAmount) + parseInt(pocketExp);
   }
       setSgetRate(e.target.value)
      
             let cget = parseFloat(a * e.target.value / 100)
             let total = Number(cget) + Number(igetTotal) + Number(cgetTotal)
             setSgstTotal(parseFloat(cget).toFixed(2))
             setGst(Math.round(total))
          
             setTotal(parseInt(a) + Math.round(total))
             setgrandTotal(parseInt(a) + Math.round(total) - parseInt(tds2))
     }
     else{
       return false;
     }
   }
 else{
   setSgetRate(e.target.value)
   let a = 0
   if(pocketExp.length === 0){
     a = parseInt(basicAmount) + parseInt(0);
   }
   else{
     a = parseInt(basicAmount) + parseInt(pocketExp);
   }
         let cget = parseFloat(a * e.target.value / 100)
         let total = Number(cget) + Number(igetTotal) + Number(cgetTotal)
         setGst(Math.round(total))
         setSgstTotal(parseFloat(cget).toFixed(2))
        
         setTotal(parseInt(a) + Math.round(total))
         setgrandTotal(parseInt(a) + Math.round(total) - parseInt(tds2))
 }
    
    }
   
  
 // Igst tax function
  const igstFun = (e) => {
  
   let kkk = e.target.value.split(".")[1]
   if(kkk){
 if(kkk.length < 3){
   setIgetRate(e.target.value)
   let a = 0
   if(pocketExp.length === 0){
     a = parseInt(basicAmount) + parseInt(0);
   }
   else{
     a = parseInt(basicAmount) + parseInt(pocketExp);
   }
       let cget = parseFloat(a * e.target.value / 100) 
          setIgstTotal(parseFloat(cget).toFixed(2)) 
          let total = Number(cget) + Number(cgetTotal) + Number(sgetTotal)
          setGst(Math.round(total));
     
          setTotal(parseInt(a) + Math.round(total))
          setgrandTotal(parseInt(a) + Math.round(total) - parseInt(tds2))
 }
 else{
   return false;
 }
   }
    else{
     setIgetRate(e.target.value)
     let a = 0
   if(pocketExp.length === 0){
     a = parseInt(basicAmount) + parseInt(0);
   }
   else{
     a = parseInt(basicAmount) + parseInt(pocketExp);
   }
         let cget = parseFloat(a * e.target.value / 100) 
            setIgstTotal(parseFloat(cget).toFixed(2)) 
            let total = Number(cget) + Number(cgetTotal) + Number(sgetTotal)
            setGst(parseInt(Math.round(total)));
           
            setTotal(parseInt(a) + Math.round(total))
            setgrandTotal(parseInt(a) + Math.round(total) - parseInt(tds2))
    }
       
  }
  
 // Tds function
 const tdsFun = (e) => {
  let kkk = e.target.value.split(".")[1]
 if(kkk){
   if(kkk.length < 3){
    if(e.target.value > 100){
      setTdsR(100);
     let a = 0
  if(pocketExp.length === 0){
    a = parseInt(basicAmount) + parseInt(0);
  }
  else{
    a = parseInt(basicAmount) + parseInt(pocketExp);
  }
      let cget = Math.round((a * 100 / 100))
         setTds(cget)
       setgrandTotal(parseInt(total) - parseInt(cget))
     
    }  
    else{
     setTdsR(e.target.value)
    let a = 0
  if(pocketExp.length === 0){
    a = parseInt(basicAmount) + parseInt(0);
  }
  else{
    a = parseInt(basicAmount) + parseInt(pocketExp);
  }
      let cget = Math.round((a * e.target.value / 100))
         setTds(cget)
       setgrandTotal(parseInt(total) - parseInt(cget))  
    }
   }
   else{
     return false
   }
 }
 else{
  if(e.target.value > 100){
    setTdsR(100);
   let a = 0
  if(pocketExp.length === 0){
    a = parseInt(basicAmount) + parseInt(0);
  }
  else{
    a = parseInt(basicAmount) + parseInt(pocketExp);
  }
    let cget = Math.round((a * 100 / 100))
       setTds(cget)
     setgrandTotal(parseInt(total) - parseInt(cget))
   
  }  
  else{
   setTdsR(e.target.value)
  let a = 0
  if(pocketExp.length === 0){
    a = parseInt(basicAmount) + parseInt(0);
  }
  else{
    a = parseInt(basicAmount) + parseInt(pocketExp);
  }
    let cget = Math.round((a * e.target.value / 100))
       setTds(cget)
     setgrandTotal(parseInt(total) - parseInt(cget))  
  }
 }
 }
 
 const pocketExpFun = (e) => {
 if(e.target.value === ""){
   setPocketExp('')
 }
 else{
   setPocketExp(parseInt(e.target.value).toString())
 }
//setPocketExp(e.target.value)
  let a;
  if(e.target.value){
    if(basicAmount.length == "0"){
       a = Math.round(e.target.value) + parseInt(0);
    }
    else{
      a = Math.round(e.target.value) + parseInt(basicAmount);
    }
   
  
 
  let cget1 = parseFloat((a * cgetRate / 100))
  let sget1 = parseFloat((a * sgetRate / 100))
  let iget1 = parseFloat((a * igetRate / 100))
  let tdsamount = parseInt(Math.round(a * tdsR / 100))
    setCgstTotal(parseFloat(a * cgetRate / 100).toFixed(2));
   setSgstTotal(parseFloat(a * sgetRate / 100).toFixed(2));
   setIgstTotal(parseFloat(a * igetRate / 100).toFixed(2));
   

 let total = Number(cget1) + Number(iget1) + Number(sget1)
 setTotal(parseInt(a) + Math.round(total))
setGst(total)

  setTds((oldData) => {
    return(parseInt(tdsamount))
  })
  setgrandTotal((oldData) => {
    return((parseInt(cget1) + parseInt(iget1) + parseInt(sget1) + parseInt(a)) - parseInt(tdsamount))
  })
 
}
}

const basicFun = (e) => {
 
  let a = parseFloat((e.target.value) + (pocketExp));
  let tdsamount = parseInt(Math.round(a * tdsR / 100))
  setBasicAmount(e.target.value);
  if(e.target.value > 0){
    setCgstTotal(parseFloat(a * cgetRate / 100).toFixed(2));
   setSgstTotal(parseFloat(a * sgetRate / 100).toFixed(2));
   setIgstTotal(parseFloat(a * igetRate / 100).toFixed(2));
   setGst((oldData) => {
    return(parseInt(Math.round(a * cgetRate / 100)) + parseInt(Math.round(a * igetRate / 100)) + parseInt(Math.round(a * sgetRate / 100)))
   })
  setTotal((oldData) => {
    return(parseInt(Math.round(a * cgetRate / 100)) + parseInt(Math.round(a * igetRate / 100)) + parseInt(Math.round(a * sgetRate / 100)) + parseInt(a))
  })
  setTds((oldData) => {
    return(parseInt(tdsamount))
  })
  setgrandTotal((oldData) => {
    return((parseInt(Math.round(a * cgetRate / 100)) + parseInt(Math.round(a * igetRate / 100)) + parseInt(Math.round(a * sgetRate / 100)) + parseInt(a)) - parseInt(tdsamount))
  })
 
}
}
const onSubmit= (value) => {
       setLoading(true);
       let formData = new FormData();
      formData.append("tp_id", JSON.parse(userid));
        formData.append("id", props.id)
        formData.append("qno", props.report)
        formData.append("description", description);
        formData.append("serviceCode", sac33);
       formData.append("basic_amount", basicAmount);
       formData.append("cgst_rate", cgetRate);
       formData.append("opt_expenses", pocketExp);
       formData.append("cgst_total", cgetTotal)
       formData.append("sgst_rate", sgetRate);
         
       formData.append("sgst_total", sgetTotal)
       formData.append("igst_rate", igetRate);
        
       formData.append("igst_total", igetTotal)
       formData.append("total", total);
       formData.append("tds_rate", tdsR);
       formData.append("gst", gst);
       formData.append("tds_total", tds2)
       formData.append("netpaid_amount", grandTotal)
      //  formData.append("gstin_no", gstNum);
       formData.append("bill_no", billNo)
       formData.append("invoice_by", JSON.parse(userid))
       {props.generated == "edited" ? formData.append("generate_status", 1) :
       formData.append("generate_status" , 0)}
       axios({
           method : "POST",
           data : formData,
           headers : {
             uit : token
           },
           url : `${baseUrl}/tl/generateInvoive`
       })
       .then((res) => {
           setLoading(false);
           props.addTdsToggle()
           if(res.data.code === 1){
             Swal.fire({
               title : "success", 
               html : "Invoice generated successfully",
               icon : "success"
             })
               props.getProposalList()

           }
          else{
            props.addTdsToggle()
                Swal.fire({
               title : "error", 
               html : `${res.data.result}`,
               icon : "error"
             })
             props.getProposalList()
             }
       })
        
   }
  const serviceFun = (e) => {
    setDiscription(e)
   services.map((k) => {
    
if(k.service == e) {
setSac(k.sac)
setServices2(k.service)
}
   })
     
  }

  
    return(
      
        <Modal isOpen={props.tdsForm} toggle={props.addTdsToggle} size="sm" style={{display : "flxe", maxWidth : "600px"}}>
        <ModalHeader toggle={props.addTdsToggle}> Generate Invoice - 
        
        </ModalHeader>
        <ModalBody>
    
    <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" ref={f2}>
    <div className="container gutter-3">
      <div className="row">
        <div className="col-md-6">
        <div className="row">
          <div className="col-md-12">
          <label>GSTIN</label>
            </div>
            <div className="col-md-12">
         <input 
         type="text"
         maxLength="24"
         ref={register}
         name="gst_in"
         value={gstNum}
         disabled = {true}
         onChange= {(e) => setGstNum(e.target.value)}
         className="form-control"
          />
            </div>
          </div>
          </div>
          <div className="col-md-6">
          <div className="row">
          <div className="col-md-12">
          <label>Invoice No</label>
            </div>
            <div className="col-md-12">
         <input 
         type="text"
         ref={register}
         name="bill_no"
         value={billNo}
         disabled 
         className="form-control"
    
          />
            </div>
          </div>
            </div>
        </div>
            <div className="row my-2">
              {services === undefined ? "" : 
              <div className="col-md-6">
              <label>Description <span className="declined">*</span></label>
          <select 
      
       value={description}
           ref={register({ required: true })}

           name="description"
        style={{height : "33.5px"}}
          onChange = {(e) => serviceFun(e.target.value)}
          className={classNames("form-control", {
            "is-invalid": errors.description,
          })}>
              <option value="">please select value</option>
          {services.map((i) => (
               <option value={i.services} key={i.id} className="form-control"> {i.service}</option>
          ))}
            </select>
              </div>}
                  <div className="col-md-6">
                  <label>Basic Amount</label>
                    <input 
                    type="number"

                    name="basic_amount"
                    ref={register({required : true})}
                    className="form-control"
                    placeholder="Amount" 
                    disabled
                    onChange= {(e) => basicFun(e)}
                  value={basicAmount}/>
                    </div> 
            </div>
           <div className="row my-2">
             <div className="col-md-6 headCenter">
               <label>Out of Pocket Expenses</label>
               </div>
               <div className="col-md-6">
               <input 
                    type="number"
                    name="pocket_amount"
                  
                    ref={register}
                    className="form-control"
                    onChange={(e) => pocketExpFun(e)}
                    value={pocketExp}
                    placeholder="Pocket Amount"  />
               </div>
             </div>
            <div className="row my-2">
              <div className="col-md-4">
              <label>CGST</label>
             <div className="row">
             <div className="col-md-6" style={percent}>
              <input 
                    type="number"
                    ref={register}
                    className="form-control"
                    step="0.00001"
                    placeholder="Rate"
                    value={cgetRate}
                    name="cgst_rate"
                    onChange= {(e) => cgstFun(e)} /> %
                
                  </div>
                  <div className="col-md-6">
                  <input 
                    type="text"
                    className="form-control"
                    ref={register}
                    placeholder="0" 
                    disabled 
                    name="cgst_total"
                    value = {cgetTotal}/>
                  </div>
                 </div>
                  </div>
                  <div className="col-md-4">
                  <label>SGST/UTGST </label>
              <div className="row">
                  <div className="col-md-6" style={percent}>
                  <input 
                    type="number"
                    className="form-control"
                    ref={register}
                    step="0.00001"
                    name="sgst_rate"
                    placeholder="Rate" 
                   value = {sgetRate}
                    onChange= {(e) => sgstFun(e)}/> %
                      </div>
                      <div className="col-md-6">
                      <input 
                    type="text"
                    className="form-control"
                    ref={register}
                    
                    name="sgst_total" 
                    disabled
                    value={sgetTotal}/>
                          </div>
                  </div>
            
                  </div>
                  <div className="col-md-4">
              <label>IGST</label>
              <div className="row">
              <div className="col-md-6" style={percent}>
                <input 
                    type="number"
                    className="form-control"
                    step="0.00001"
                    placeholder="Rate"
                    ref={register}
                    name="igst_rate"
                   value={igetRate}
                    onChange= {(e) => igstFun(e)} /> %
                    </div>
                   
                    <div className="col-md-6">
                <input 
                    type="text"
                    className="form-control"
                  
                    name="igst_total"
                    disabled
                    ref={register}
                    value={igetTotal} />
                    </div>
                  </div>
                  </div>
                  </div>
                
          <hr/>
          
            <div className="row my-2">
                <div className="col-md-4 headCenter">
                  <label>Total GST</label>
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
                   value={Math.round(gst)} />
                            </div>
                </div>
                <hr/>
                <div className="row my-2">
                <div className="col-md-8 headCenter">
                  <label>Total Invoice Amount</label>
                    </div>
                   
                        <div className="col-md-4">
                       
                    <input 
                    type="text"
                    className="form-control"
                    placeholder="Total"
                    name="totalAmount"
                    disabled
                   
                    ref={register}
                   value={Math.round(total)} />
                            </div>
                </div>
           
            <div className="row my-2">
              <div className="col-md-4 my-1 headCenter">
              <label>TDS </label>
                  </div>
                <div className="col-md-4 my-1">
               <div className = "row">
                
                   <div className="col-md-8"  style={percent}>
                   <input 
                    type="number"
                    className="form-control"
                    step="0.00001"
                    placeholder="Rate"
                    name="tds_rate"
                    value={tdsR}
                    ref={register}
                    onChange= {(e) => tdsFun(e)} /> %
                     </div>
                     <div className="col-md-4">
                   </div>
                 </div>
                    </div>
                   
                    <div className="col-md-4 my-1">
                <input 
                    type="text"
                    ref={register}
                    className="form-control"
                    placeholder="Total"
                    name="tds_total"
                    disabled
                    value={Math.round(tds2)} />
                    </div>
                   
            </div>
            <div className="row my-2">
              <div className="col-md-6 my-1 headCenter">
              <label>Net Payable Amount</label>
                  </div>
                  <div className="col-md-2 my-1"></div>
                   
                    <div className="col-md-4 my-1">
                <input 
                    type="text"
                    ref={register}
                    className="form-control"
                    placeholder="Total"
                    name="tds_total"
                    disabled
                  value={Math.round(grandTotal)} />
                    </div>
                   
            </div>
        <ModalFooter>
       
             <>
             {
                loading ?
                  <Spinner color="primary" />
                  :
                 <>
                  <button  type="submit" className="customBtn">submit</button>
          
             <button  type="button" className="customBtn mx-3" onClick={props.addTdsToggle}>Cancel</button>
                 </>
              }
             
             </>
        </ModalFooter>
          </div>
        </form>
       
           
      
        </ModalBody>
      </Modal>
    )
}
export default Tds;