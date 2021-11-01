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
import "./porposalStyle.css";

function Tds (props)  {
  const history = useHistory();
    const userid = window.localStorage.getItem("tlkey")
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

var tdsRate = 10;
const percent = {
  display : "flex", 
  justifyContent : "space-between",
  flexDirection : "row",
  alignItems : "center"
}
  const getServices = () => {
    axios.get(`${baseUrl}/tl/getServices`)
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
      setCgetRate(18);
      setIgetRate(0);
      setSgetRate(0)
      setGstNum(props.gstNo);
    setBillNo(props.billNo)
    setBasicAmount(props.paidAmount)
    setPocketExp(0)
    setCgstTotal(parseInt(props.paidAmount * 18 / 100))
    setIgstTotal(parseInt(0));
    setSgstTotal(parseInt(0))
    setGst(parseInt(props.paidAmount * 18 / 100))
    setTds(parseInt(props.paidAmount * tdsRate / 100))
    setTotal(parseInt(props.paidAmount) + parseInt(props.paidAmount * cgetRate / 100))
    setgrandTotal(parseInt(parseInt(props.paidAmount) + parseInt(props.paidAmount * 18 / 100)) - parseInt(props.paidAmount * tdsRate / 100))
    }
  }, [props.paidAmount])
    const { handleSubmit, register, errors, getValues, reset } = useForm();

const getDataild = () => {
  axios
  .get(`${baseUrl}/admin/getPaymentDetail?tl_id=${JSON.parse(userid)}&invoice=1&invoice_id=${props.id}`)
.then((res) => {

if(res.data.payment_detail){
  res.data.payment_detail.map((i) => {
  setSac(i.serviceCode)
     setGstNum(i.gstin_no)
 setBillNo(i.billno)
 setDiscription(i.description)
setTdsR(i.tds_rate)
 setBasicAmount(parseInt(i.paid_amount))
 setPocketExp(parseInt(i.opt_expenses));
 setCgstTotal(parseInt(i.cgst_amount));
 setIgstTotal(parseInt(i.igst_amount));
 setSgstTotal(parseInt(i.sgst_amount));
 setCgetRate(parseInt(i.cgst_rate));
 setIgetRate(parseInt(i.igst_rate));
 setSgetRate(parseInt(i.sgst_rate));
setTds(parseInt(i.tds_amount))
 setgrandTotal(parseInt(i.payable_amount))
 setTotal(parseInt(i.invoice_amount))
 setGst(parseInt(i.gst));
 setDisabled(true);
  })
}

})
}
  // Cgst Tax function
const cgstFun = (e) => {
  setCgetRate(e.target.value);
  let a = parseInt(basicAmount) + parseInt(pocketExp);
   let cget = Math.round(a * e.target.value / 100)
   setCgstTotal(parseInt(cget));
   setGst(parseInt(Math.round(cget) + Math.round(igetTotal) + Math.round(sgetTotal)))
   setTotal(parseInt(cget + igetTotal + sgetTotal + a))
   setgrandTotal(parseInt(cget + sgetTotal + igetTotal + a - tds2))

}
// Sgst tax function
const sgstFun = (e) => {
  setSgetRate(e.target.value)
  let a = parseInt(basicAmount) + parseInt(pocketExp);
        let cget = Math.round(a * e.target.value / 100)
        setSgstTotal(parseInt(cget))
        setTotal(parseInt(cget + igetTotal + cgetTotal + a))
        setGst(parseInt(Math.round(cget) + Math.round(igetTotal) + Math.round(cgetTotal)))
        setgrandTotal(parseInt(cget + igetTotal + cgetTotal + a - tds2))
 }
// Igst tax function
 const igstFun = (e) => {
   setIgetRate(e.target.value)
  let a = parseInt(basicAmount) + parseInt(pocketExp);
      let cget = Math.round(a * e.target.value / 100) 
         setIgstTotal(cget) 
         setGst(parseInt(Math.round(cget) + Math.round(sgetTotal) + Math.round(cgetTotal)));
         setTotal(parseInt(cget + sgetTotal + cgetTotal + a))
         setgrandTotal(parseInt(cget + cgetTotal + sgetTotal + a - tds2))
        
 }
 // Tds function
 const tdsFun = (e) => {
   setTdsR(e.target.value)
  let a = parseInt(basicAmount) + parseInt(pocketExp);
   let cget = Math.round((a * e.target.value / 100))
      setTds(cget)
    setgrandTotal(parseInt(total) - parseInt(cget))    
 } 

 const pocketExpFun = (e) => {
  
  setPocketExp(e.target.value)
  if(e.target.value){
    let a = Math.round(e.target.value) + parseInt(basicAmount);
  
 
  let cget1 = parseInt(Math.round(a * cgetRate / 100))
  let sget1 = parseInt(Math.round(a * sgetRate / 100))
  let iget1 = parseInt(Math.round(a * igetRate / 100))
  let tdsamount = parseInt(Math.round(a * tdsRate / 100))
    setCgstTotal(Math.round(a * cgetRate / 100));
   setSgstTotal(Math.round(a * sgetRate / 100));
   setIgstTotal(Math.round(a * igetRate / 100));
   
 setGst((oldData) => {
  return(parseInt(parseInt(cget1) + parseInt(sget1) + parseInt(iget1)))
 })
  setTotal((oldData) => {
    return(parseInt(cget1) + parseInt(iget1) + parseInt(sget1) + parseInt(a))
  })
  setTds((oldData) => {
    return(parseInt(tdsamount))
  })
  setgrandTotal((oldData) => {
    return((parseInt(cget1) + parseInt(iget1) + parseInt(sget1) + parseInt(a)) - parseInt(tdsamount))
  })
 
}
}

const basicFun = (e) => {
  let a = Math.round(parseInt(e.target.value) + parseInt(pocketExp));
  let tdsamount = parseInt(Math.round(a * tdsRate / 100))
  setBasicAmount(e.target.value);
  if(e.target.value > 0){
    setCgstTotal(Math.round(a * cgetRate / 100));
   setSgstTotal(Math.round(a * sgetRate / 100));
   setIgstTotal(Math.round(a * igetRate / 100));
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
      
        let formData = new FormData();
       formData.append("tl_id", JSON.parse(userid));
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
        formData.append("gstin_no", gstNum);
        formData.append("bill_no", billNo)
        axios({
            method : "POST",
            data : formData,
            url : `${baseUrl}/tl/generateInvoive`
        })
        .then((res) => {
            if(res.data.code === 1){
              Swal.fire({
                title : "success", 
                html : "Invoice generated successfully",
                icon : "success"
              })
                history.push("/teamleader/tlinvoice")
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
         ref={register}
         name="gst_in"
         value={gstNum}
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
       //  onChange= {(e) => (setBillNo(e.target.value))}
          />
            </div>
          </div>
            </div>
        </div>
            <div className="row my-2">
              {services === undefined ? "" : 
              <div className="col-md-6">
              <label>Descirption <span className="declined">*</span></label>
          <select 
      
       value={description}
           ref={register({ required: true })}
           name="description"
        style={{height : "33.5px"}}
          onChange = {(e) => serviceFun(e.target.value)}
          className={classNames("form-control", {
            "is-invalid": errors.p_name,
            
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
                    onChange= {(e) => basicFun(e)}
                  value={basicAmount}/>
                    </div> 
            </div>
           <div className="row my-2">
             <div className="col-md-6 headCenter">
               <h5>Out of Pocket Expenses</h5>
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
              <h6>CGST</h6>
             <div className="row">
             <div className="col-md-6" style={percent}>
              <input 
                    type="number"
                    ref={register}
                    className="form-control"
                    
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
                  <h6>SGST/UTGST </h6>
              <div className="row">
                  <div className="col-md-6" style={percent}>
                  <input 
                    type="number"
                    className="form-control"
                    ref={register}
                    
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
              <h6>IGST</h6>
              <div className="row">
              <div className="col-md-6" style={percent}>
                <input 
                    type="number"
                    className="form-control"
                  
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
                  <h5>Total GST</h5>
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
                  <h5>Total Invoice Amount</h5>
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
              <h5>TDS </h5>
                  </div>
                <div className="col-md-4 my-1">
               <div className = "row">
                
                   <div className="col-md-6"  style={percent}>
                   <input 
                    type="number"
                    className="form-control"
                   
                    placeholder="Rate"
                    name="tds_rate"
                    defaultValue={tdsR}
                    ref={register}
                    onChange= {(e) => tdsFun(e)} /> %
                     </div>
                     <div className="col-md-6">
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
              <h5>Net Payable Amount</h5>
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
             <button  type="submit" className="btn btn-success">submit</button>
          
             <button  type="button" className="btn btn-danger mx-3" onClick={props.addTdsToggle}>Cancel</button> 
             </>
        </ModalFooter>
          </div>
        </form>
       
           
      
        </ModalBody>
      </Modal>
    )
}
export default Tds;