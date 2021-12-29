
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
const PayModal = (props) => {
    const userid = window.localStorage.getItem("userid")
    const [payValue, setpayValue] = useState()
    const [tdsRate, setTdsRate] = useState();
    const [tdsAmount, setTdsAmount] = useState()
    
 
    useEffect(() => {
       if(props.modalData !== undefined){
           let per, per2;
           if(props.modalData.tds_rate !== undefined){
            per = props.modalData.tds_rate.split(".")[1]
            per2 = props.modalData.tds_rate.split(".")[0]
           }
          
          
          if(per === "0000"){
            setTdsRate(per2)
          }
          else{
            setTdsRate(props.modalData.tds_rate)
          }
          
           
           setTdsAmount(props.modalData.tds_amount)
           setpayValue(parseInt(props.modalData.invoice_amount) - parseInt(props.modalData.tds_amount))

   
    }
    }, [props.modalData])
   
    const payFun = (e) => {
  
         
        let formData = new FormData();
        formData.append("id", props.modalData.id);
        formData.append("cid", JSON.parse(userid));
        formData.append("tds_rate", tdsRate);
        formData.append("tds_amount", tdsAmount)
       
        axios({
            method :"POST", 
            url : `${baseUrl}/customers/payCall`,
            data : formData
        })
        .then((res) => {
            if(res.data.code === 1){
             
                window.open(res.data.result, "_blank")
            }
        })
       
    window.location.hash="customer/paymentstatus"
    }
    const inVal = (e) => {
       if(e.target.value.length > 7){
           return false
       }
       else{
        if(e.target.value > 100){
            setTdsRate(100)
            let tdAmount = parseInt((parseInt(props.modalData.paid_amount) + parseInt(props.modalData.opt_expenses)))
                  
                  
            let a = parseInt(props.modalData.cgst_amount) + parseInt(props.modalData.sgst_amount) + parseInt(props.modalData.igst_amount)
            setTdsAmount(Number((100 * tdAmount) / 100).toFixed(0))
            let b = Number((100 * tdAmount) / 100).toFixed(0)
            
            setpayValue(parseInt(props.modalData.invoice_amount) - parseInt(b))
                   }
                   else{
                    setTdsRate(e.target.value)
                    let tdAmount = parseInt((parseInt(props.modalData.paid_amount) + parseInt(props.modalData.opt_expenses)))
                  
                  
                    let a = parseInt(props.modalData.cgst_amount) + parseInt(props.modalData.sgst_amount) + parseInt(props.modalData.igst_amount)
            setTdsAmount(Number((e.target.value * tdAmount) / 100).toFixed(0))
            let b = Number((e.target.value * tdAmount) / 100).toFixed(0)
            
            setpayValue(parseInt(props.modalData.invoice_amount) - parseInt(b))
                   }
       }
       
    }
return(
    <Modal isOpen={props.showModal} toggle={props.modalToggle} size="sm" style={{display : "flxe", maxWidth : "600px"}}>
    <ModalHeader toggle={props.modalToggle}> Payment</ModalHeader>
    <ModalBody style={{display :"flex", flexDirection :"column", overflow : "wrap"}}>

{props.modalData === undefined ? "" :
<table className="table">
    
    <tbody className="tbody">

<tr>
    <td>Invoice Amount</td>
    <td></td>
    <td>{parseInt(props.modalData.invoice_amount)}</td>
</tr>
<tr>
    <td>TDS</td>
    <td style={{display :"flex"}}><input type="number"  step="0.00001" style={{display : "flex", width: "50px"}} value={tdsRate} onChange= {(val) => inVal(val)}/> % </td>
    <td>{tdsAmount}</td>
</tr>
<tr>
    <td>Payable Amount</td>
   <td></td>
   <td>{payValue}</td>
</tr>
    </tbody>
    </table> }

<ModalFooter>
    <button onClick={() => payFun()} className="btn btn-success">Pay Now</button>
</ModalFooter>
    </ModalBody>
  </Modal>
)
}
export default PayModal;