import React, { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useState } from "react";

import { useHistory } from "react-router";

function Tds (props)  {
  const history = useHistory();
    const userid = window.localStorage.getItem("tlkey")
    const f2 = useRef(null);
    const [sac33, setSac] = useState([])
    const [basicAmount, setBasicamount] = useState()
    const [services2, setServices2] = useState();
    const [cgetTotal, setCgstTotal] = useState()
    const [sgetTotal, setSgstTotal] = useState()
    const [igetTotal, setIgstTotal] = useState()
    const [tds2, setTds] = useState()
    const [grandTotal, setgrandTotal] = useState(0);
  const [services, setServices] = useState();
    const [pdf, setPdf] = useState(false);
    const [total, setTotal] = useState()
    const [tt, setTt] = useState(false);
    var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
 
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
    const { handleSubmit, register, errors, getValues, reset } = useForm();
  
const cgstFun = (e) => {
   let cget;
setTds(0)
setTt(false)
   cget = parseInt(props.paidAmount * e.target.value / 100)
    setCgstTotal(cget)
   setTotal(parseInt(cget))
}

const sgstFun = (e) => {
    let cget;
    setTds(0)
    setTt(false)
        cget = parseInt(props.paidAmount * e.target.value / 100)
        setSgstTotal(cget)
        if(cgetTotal == undefined){
            setTotal(parseInt(cget))
        }
        else{
            setTotal(parseInt(total) + parseInt(cget))
        }
 }

 const igstFun = (e) => {
   setTds(0)
   setTt(false)
        let cget;
        cget = parseInt(props.paidAmount * e.target.value / 100) 
         setIgstTotal(cget)
         if(sgetTotal === undefined){
           setTotal(parseInt(cget))
         }
         else{
          setTotal(parseInt(total) + parseInt(cget))  
         }
          
 }
 const tdsFun = (e) => {
   setTt(true)
      setTds(props.paidAmount * e.target.value / 100)
    
 
  
 
    
    
 }

    const onSubmit= (value) => {
      
        let formData = new FormData();
       formData.append("tl_id", JSON.parse(userid));
         formData.append("id", props.id)
         formData.append("qno", props.report)
         formData.append("description", services2);
         formData.append("serviceCode", sac33);
        formData.append("basic_amount", props.paidAmount);
        formData.append("cgst_rate", value.cgst_rate);
        
        formData.append("cgst_total", cgetTotal)
        formData.append("sgst_rate", value.sgst_rate);
       
        formData.append("sgst_total", sgetTotal)
        formData.append("igst_rate", value.igst_rate);
      
        formData.append("igst_total", igetTotal)
        formData.append("total", igetTotal);
        formData.append("tds_rate", value.tds_rate);
      
        formData.append("tds_total", grandTotal)
        
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
        <ModalHeader toggle={props.addTdsToggle}> Generate Invoice</ModalHeader>
        <ModalBody>
    
    <form onSubmit={handleSubmit(onSubmit)} autocomplete="off" ref={f2}>
            
    <div className="container gutter-3">
            <div className="row my-2">
              {services === undefined ? "" : 
              <div className="col-md-6">
              <label>Descirption </label>
          <select 
          ref={register}
        style={{height : "33.5px"}}
        required
          onChange = {(e) => serviceFun(e.target.value)}
          name="description" className="form-control">
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
                    disabled
                  defaultValue={props.paidAmount}
                    onBlur={(e) => setBasicamount(e.target.value)}/>
                    </div> 
            </div>
           
            <div className="row my-2">
              <div className="col-md-4">
              <h4>CGST</h4>
             <div className="row">
             <div className="col-md-6">
              <input 
                    type="text"
                    ref={register}
                    className="form-control"
                    placeholder="Rate"
                    defaultValue={0}
                    name="cgst_rate"
                    onChange= {(e) => cgstFun(e)} />
                
                  </div>
                  <div className="col-md-6">
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
                  </div>
                  <div className="col-md-4">
                  <h4>SGST/UTGST </h4>
              <div className="row">
                  <div className="col-md-6">
                  <input 
                    type="text"
                    className="form-control"
                    ref={register}
                    name="sgst_rate"
                    placeholder="Rate" 
                    defaultValue={0}
                    onChange= {(e) => sgstFun(e)}/>
                      </div>
                      <div className="col-md-6">
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
            
                  </div>
                  <div className="col-md-4">
              <h4>IGST</h4>
              <div className="row">
              <div className="col-md-6">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Rate"
                    ref={register}
                    name="igst_rate"
                    defaultValue={0}
                    onChange= {(e) => igstFun(e)} />
                    </div>
                   
                    <div className="col-md-6">
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
                  </div>
                  </div>
                
          
          
            <div className="row my-2">
                <div className="col-md-4">
                  <h4>Total Gst</h4>
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
                   value={total} />
                            </div>
                </div>
                <div className="row my-2">
                <div className="col-md-4">
                  <h4>Total Amount</h4>
                    </div>
                    <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                       
                    <input 
                    type="text"
                    className="form-control"
                    placeholder="Total"
                    name="totalAmount"
                    disabled
                   
                    ref={register}
                   value={total != undefined ? parseInt(props.paidAmount) + parseInt(total) : props.paidAmount} />
                            </div>
                </div>
           
            <div className="row my-2">
              <div className="col-md-4 my-1">
              <h4>TDS </h4>
                  </div>
                <div className="col-md-4 my-1">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Rate"
                    name="tds_rate"
                    defaultValue={0}
                    ref={register}
                    onChange= {(e) => tdsFun(e)} />
                    </div>
                   
                    <div className="col-md-4 my-1">
                <input 
                    type="text"
                    ref={register}
                    className="form-control"
                    placeholder="Total"
                    name="tds_total"
                    disabled
                    value={tds2 != undefined ? tds2 : 0} />
                    </div>
                   
            </div>
            <div className="row my-2">
              <div className="col-md-6 my-1">
              <h4>Net Paid Amount</h4>
                  </div>
              
                   
                    <div className="col-md-6 my-1">
                <input 
                    type="text"
                    ref={register}
                    className="form-control"
                    placeholder="Total"
                    name="tds_total"
                    disabled
                  value={total != undefined ? parseInt(props.paidAmount) + parseInt(total) : props.paidAmount} />
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