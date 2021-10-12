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
   const [igetRate, setIgetRate] = useState(0);
   const [sgetRate, setSgetRate] = useState(0);
   const [basicAmount, setBasicAmount] = useState()
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 var cgstRate = 18;
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
      console.log(res)
      if(res.data.code === 1){
        setServices(res.data.result);
      }
    })
  }
  useEffect(() => {
    getServices();
  }, [])
  useEffect(() => {
    setBasicAmount(props.paidAmount)
    setPocketExp(0)
    setCgstTotal(parseInt(props.paidAmount * cgstRate / 100))
    setIgstTotal(parseInt(0));
    setSgstTotal(parseInt(0))
    setGst(parseInt(props.paidAmount * cgstRate / 100))
    setTds(parseInt(props.paidAmount * tdsRate / 100))
    setTotal(parseInt(props.paidAmount) + parseInt(props.paidAmount * cgstRate / 100))
    setgrandTotal(parseInt(parseInt(props.paidAmount) + parseInt(props.paidAmount * cgstRate / 100)) - parseInt(props.paidAmount * tdsRate / 100))
  }, [props.paidAmount])
    const { handleSubmit, register, errors, getValues, reset } = useForm();


  // Cgst Tax function
const cgstFun = (e) => {
  let a = parseInt(props.paidAmount) + parseInt(pocketExp);
   let cget = parseInt(a * e.target.value / 100)
    setCgstTotal(parseInt(a * e.target.value / 100))
   setTotal(parseInt(cget))
   if(igetTotal === undefined && sgetTotal === undefined){
    setGst(cget)
    setTotal(parseInt(cget) + parseInt(a))
    setgrandTotal(parseInt((parseInt(cget) + parseInt(a)) - parseInt(tds2)))
   }
  else if(igetTotal === undefined){
    setGst((oldData) => {
      return(parseInt(cget) + parseInt(sgetTotal))
    })
   setTotal(parseInt(cget) + parseInt(sgetTotal) + parseInt(a))
   setgrandTotal(parseInt((parseInt(cget) + parseInt(sgetTotal) + parseInt(a))) - parseInt(tds2))
  }
 else if(sgetTotal === undefined){
   setGst((oldData) => {
     return(parseInt(cget) + parseInt(igetTotal))
   })
   setTotal(parseInt(cget) + parseInt(igetTotal) + parseInt(a))
   setgrandTotal(parseInt((parseInt(cget) + parseInt(igetTotal) + parseInt(a))) - parseInt(tds2))
 }
 else {
   setGst((oldData) => {
     return(parseInt(cget) + parseInt(sgetTotal) + parseInt(igetTotal))
   })
   setTotal(parseInt(cget) + parseInt(igetTotal) + parseInt(sgetTotal) + parseInt(props.paidAmount))
   setgrandTotal(parseInt((parseInt(cget) + parseInt(igetTotal) + parseInt(sgetTotal) + parseInt(a))) - parseInt(tds2))
 }
}
// Sgst tax function
const sgstFun = (e) => {
  setSgetRate(e.target.value)
  let a = parseInt(props.paidAmount) + parseInt(pocketExp);
    let cget;
        cget = parseInt(a * e.target.value / 100)
        setSgstTotal(cget)
        if(igetTotal === undefined && cgetTotal === undefined){
          setGst(cget)
          setTotal(parseInt(cget) + parseInt(a))
          setgrandTotal(parseInt(setTotal(parseInt(cget) + parseInt(a))) - parseInt(tds2))
        }
       else if(igetTotal === undefined){
         setGst((oldData) => {
           return(parseInt(cgetTotal) + parseInt(cget))
         })
         setTotal(parseInt(cget) + parseInt(cgetTotal) + parseInt(a))
         setgrandTotal(parseInt((parseInt(cget) + parseInt(cgetTotal) + parseInt(a))) - parseInt(tds2))
       }
      else if(cgetTotal === undefined){
        setGst((oldData) => {
          return(parseInt(igetTotal) + parseInt(cget))
        })
        setTotal(parseInt(cget) + parseInt(igetTotal) + parseInt(a))
        setgrandTotal(parseInt((parseInt(cget) + parseInt(igetTotal) + parseInt(a))) - parseInt(tds2))
      }
      else {
        setGst((oldData) => {
          return(parseInt(cget) + parseInt(cgetTotal) + parseInt(igetTotal))
        })
        setTotal(parseInt(cget) + parseInt(igetTotal) + parseInt(cgetTotal) + parseInt(a))
      setgrandTotal(parseInt((parseInt(cget) + parseInt(igetTotal) + parseInt(cgetTotal) + parseInt(a))) - parseInt(tds2))
      }
   
 }
// Igst tax function
 const igstFun = (e) => {
   setIgetRate(e.target.value)
  let a = parseInt(props.paidAmount) + parseInt(pocketExp);
        let cget;
        cget = parseInt(a * e.target.value / 100) 
         setIgstTotal(cget) 
         if(cgetTotal === undefined && sgetTotal === undefined){
          setGst(cget)
          setTotal(parseInt(cget) + parseInt(a))
          setgrandTotal(parseInt((parseInt(cget) + parseInt(a))) - parseInt(tds2))
        }
       else if(cgetTotal === undefined){
         setGst((oldData) => {
           return(parseInt(sgetTotal) + parseInt(cget))
         })
         setTotal(parseInt(cget) + parseInt(sgetTotal) + parseInt(a))
       setgrandTotal(parseInt((parseInt(cget) + parseInt(sgetTotal) + parseInt(a))) - parseInt(tds2))
        }
      else if(sgetTotal === undefined){
        setGst((oldData) => {
          return(parseInt(cgetTotal) + parseInt(cget))
        })
        setTotal(parseInt(cget) + parseInt(cgetTotal) + parseInt(a))
        setgrandTotal(parseInt((parseInt(cget) + parseInt(cgetTotal) + parseInt(a))) - parseInt(tds2))
      }
      else {
        setGst((oldData) => {
          return(parseInt(cget) + parseInt(sgetTotal) + parseInt(cgetTotal))
        })
        setTotal(parseInt(cget) + parseInt(sgetTotal) + parseInt(cgetTotal) + parseInt(a))
     setgrandTotal(parseInt((parseInt(cget) + parseInt(sgetTotal) + parseInt(cgetTotal) + parseInt(a))) - parseInt(tds2))
      } 
      
 }
 // Tds function
 const tdsFun = (e) => {
  let a = parseInt(props.paidAmount) + parseInt(pocketExp);
   let cget = (a * e.target.value / 100)
      setTds(cget)
    setgrandTotal(parseInt(total) - parseInt(cget))    
 }
 const pocketExpFun = (e) => {
  
  setPocketExp(e.target.value)
  let a = parseInt(e.target.value) + parseInt(basicAmount);
  if(e.target.value > 0){
    setCgstTotal(a * cgstRate / 100);
   setSgstTotal(a * sgetRate / 100);
   setIgstTotal(a * igetRate / 100);
   setGst((oldData) => {
    return(parseInt(a * cgstRate / 100) + parseInt(a * igetRate / 100) + parseInt(a * sgetRate / 100))
  })
  setTotal((oldData) => {
    return(parseInt(a * cgstRate / 100) + parseInt(a * igetRate / 100) + parseInt(a * sgetRate / 100) + parseInt(a))
  })
  }
  setgrandTotal((oldData) => {
    return((parseInt(a * cgstRate / 100) + parseInt(a * igetRate / 100) + parseInt(a * sgetRate / 100) + parseInt(a)) - parseInt(tds2))
  })
}

const basicFun = (e) => {
  let a = parseInt(e.target.value) + parseInt(pocketExp);
  setBasicAmount(e.target.value);
  if(e.target.value > 0){
    setCgstTotal(a * cgstRate / 100);
   setSgstTotal(a * sgetRate / 100);
   setIgstTotal(a * igetRate / 100);
   setGst((oldData) => {
    return(parseInt(a * cgstRate / 100) + parseInt(a * igetRate / 100) + parseInt(a * sgetRate / 100))
  })
  setTotal((oldData) => {
    return(parseInt(a * cgstRate / 100) + parseInt(a * igetRate / 100) + parseInt(a * sgetRate / 100) + parseInt(a))
  })
  }
  setgrandTotal((oldData) => {
    return((parseInt(a * cgstRate / 100) + parseInt(a * igetRate / 100) + parseInt(a * sgetRate / 100) + parseInt(a)) - parseInt(tds2))
  })
}
    const onSubmit= (value) => {
      
        let formData = new FormData();
       formData.append("tl_id", JSON.parse(userid));
         formData.append("id", props.id)
         formData.append("qno", props.report)
         formData.append("description", services2);
         formData.append("serviceCode", sac33);
        formData.append("basic_amount", basicAmount);
        formData.append("cgst_rate", value.cgst_rate);
        formData.append("oop_expensive", value.pocket_amount);
        formData.append("cgst_total", cgetTotal)
        formData.append("sgst_rate", value.sgst_rate);
       
        formData.append("sgst_total", sgetTotal)
        formData.append("igst_rate", value.igst_rate);
      
        formData.append("igst_total", igetTotal)
        formData.append("total", total);
        formData.append("tds_rate", value.tds_rate);
      
        formData.append("tds_total", tds2)
        formData.append("netpaid_amount", grandTotal)
        formData.append("gst_in", value.gst_in);
        formData.append("bill_no", value.bill_no)
        axios({
            method : "POST",
            data : formData,
            url : `${baseUrl}/tl/generateInvoive`
        })
        .then((res) => {
            if(res.data.code === 1){
                history.push("/teamleader/tlinvoice")
            }
          
        })
      
    }
  const serviceFun = (e) => {
    
   services.map((k) => {
    
if(k.id == e) {
 console.log(k.sac)
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
         className="form-control"
          />
            </div>
          </div>
          </div>
          <div className="col-md-6">
          <div className="row">
          <div className="col-md-12">
          <label>Bill No</label>
            </div>
            <div className="col-md-12">
         <input 
         type="text"
         ref={register}
         name="bill_no"
         className="form-control"
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
           ref={register({ required: true })}
           name="description"
        style={{height : "33.5px"}}
          onChange = {(e) => serviceFun(e.target.value)}
          className={classNames("form-control", {
            "is-invalid": errors.p_name,
          })}>
              <option value="">--select--</option>
          {services.map((i) => (
               <option value={i.id} key={i.id} className="form-control"> {i.service}</option>
          ))}
            </select>
              </div>}
                  <div className="col-md-6">
                  <label>Basic Amount</label>
                    <input 
                    type="text"

                    name="basic_amount"
                    ref={register({required : true})}
                    className="form-control"
                    placeholder="Amount" 
                    onChange= {(e) => basicFun(e)}
                  value={basicAmount}/>
                    </div> 
            </div>
           <div className="row my-2">
             <div className="col-md-6">
               <h5>Out of Pocket Expenses</h5>
               </div>
               <div className="col-md-6">
               <input 
                    type="text"
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
              <h4>CGST</h4>
             <div className="row">
             <div className="col-md-6" style={percent}>
              <input 
                    type="text"
                    ref={register}
                    className="form-control"
                    
                    placeholder="Rate"
                    defaultValue={cgstRate}
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
                    value = {Number(cgetTotal).toFixed(0)}/>
                  </div>
                 </div>
                  </div>
                  <div className="col-md-4">
                  <h4>SGST/UTGST </h4>
              <div className="row">
                  <div className="col-md-6" style={percent}>
                  <input 
                    type="text"
                    className="form-control"
                    ref={register}
                    
                    name="sgst_rate"
                    placeholder="Rate" 
                    defaultValue={0}
                    onChange= {(e) => sgstFun(e)}/> %
                      </div>
                      <div className="col-md-6">
                      <input 
                    type="text"
                    className="form-control"
                    ref={register}
                    
                    name="sgst_total" 
                    disabled
                    value={Number(sgetTotal).toFixed(0)}/>
                          </div>
                  </div>
            
                  </div>
                  <div className="col-md-4">
              <h4>IGST</h4>
              <div className="row">
              <div className="col-md-6" style={percent}>
                <input 
                    type="text"
                    className="form-control"
                  
                    placeholder="Rate"
                    ref={register}
                    name="igst_rate"
                    defaultValue={0}
                    onChange= {(e) => igstFun(e)} /> %
                    </div>
                   
                    <div className="col-md-6">
                <input 
                    type="text"
                    className="form-control"
                  
                    name="igst_total"
                    disabled
                    ref={register}
                    value={Number(igetTotal).toFixed(0)} />
                    </div>
                  </div>
                  </div>
                  </div>
                
          <hr/>
          
            <div className="row my-2">
                <div className="col-md-4">
                  <h4>Total GST</h4>
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
                    defaultValue={0}
                    ref={register}
                   value={Number(gst).toFixed(0)} />
                            </div>
                </div>
                <hr/>
                <div className="row my-2">
                <div className="col-md-8">
                  <h4>Total Invoice Amount</h4>
                    </div>
                   
                        <div className="col-md-4">
                       
                    <input 
                    type="text"
                    className="form-control"
                    placeholder="Total"
                    name="totalAmount"
                    disabled
                   
                    ref={register}
                   value={Number(total).toFixed(0)} />
                            </div>
                </div>
           
            <div className="row my-2">
              <div className="col-md-4 my-1">
              <h4>TDS </h4>
                  </div>
                <div className="col-md-4 my-1">
               <div className = "row">
                
                   <div className="col-md-6"  style={percent}>
                   <input 
                    type="text"
                    className="form-control"
                   
                    placeholder="Rate"
                    name="tds_rate"
                    defaultValue={tdsRate}
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
                    value={Number(tds2).toFixed(0)} />
                    </div>
                   
            </div>
            <div className="row my-2">
              <div className="col-md-6 my-1">
              <h4>Net Payable Amount</h4>
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
                  value={Number(grandTotal).toFixed(0)} />
                    </div>
                   
            </div>
        <ModalFooter>
       
             <>
             <button  type="submit" className="btn btn-success">submit</button>
          
             <button  type="button" className="btn btn-danger mx-3" onClick={props.addTdsToggle}>Cancle</button> 
             </>
        </ModalFooter>
          </div>
        </form>
       
           
      
        </ModalBody>
      </Modal>
    )
}
export default Tds;