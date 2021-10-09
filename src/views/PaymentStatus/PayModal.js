
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../config/config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
const PayModal = (props) => {
    const userid = window.localStorage.getItem("userid")
    const [payValue, setpayValue] = useState()
    const [tdsAmount, setTdsAmount] = useState()
    useEffect(() => {
       if(props.modalData){
           setTdsAmount(props.modalData.tds_amount)
        setpayValue(parseInt(props.modalData.paid_amount) + parseInt(parseInt(props.modalData.cgst_amount) + parseInt(props.modalData.igst_amount) + parseInt(props.modalData.igst_amount) - parseInt(props.modalData.tds_amount)))
       }
    }, [props.modalData])
    const payFun = (e) => {
        let formData = new FormData();
        formData.append("id", props.modalData.id);
        formData.append("cid", userid);
        formData.append("tds_rate", props.modalData.tds_rate);
        formData.append("tds_amount", props.modalData.tds_amount)
        console.log("Paid")
        axios({
            method :"POST", 
            url : `${baseUrl}/customer/payCall`,
            data : formData
        })
        .then((res) => {
            console.log(res)
        })
       
    }
    const inVal = (e) => {
        let a = parseInt(props.modalData.cgst_amount) + parseInt(props.modalData.sgst_amount) + parseInt(props.modalData.igst_amount)
setTdsAmount((e.target.value * props.modalData.paid_amount) / 100)
let b = parseInt((e.target.value * props.modalData.paid_amount) / 100)
let c = parseInt(a) - parseInt(b)
setpayValue(parseInt(props.modalData.paid_amount) + parseInt(c))
    }
return(
    <Modal isOpen={props.showModal} toggle={props.modalToggle} size="sm" style={{display : "flxe", maxWidth : "600px"}}>
    <ModalHeader toggle={props.modalToggle}> Payment</ModalHeader>
    <ModalBody style={{display :"flex", flexDirection :"column", overflow : "wrap"}}>

{props.modalData === undefined ? "" :
<table className="table">
    <thead className="thead">
    <th>
    <td>Gst Type</td>
    <td>Rate</td>
    <td>Amount</td>
</th>
    </thead>
    <tbody className="tbody">

<tr>
    <td>Cgst</td>
    <td>{props.modalData.cgst_rate}</td>
    <td>{props.modalData.cgst_amount}</td>
</tr>
<tr>
    <td>Sgst</td>
    <td>{props.modalData.sgst_rate}</td>
    <td>{props.modalData.sgst_amount}</td>
</tr>
<tr>
    <td>Igst</td>
    <td>{props.modalData.igst_rate}</td>
    <td>{props.modalData.igst_amount}</td>
</tr>
<tr>
    <td>Tds</td>
    <td><input type="text" defaultValue={props.modalData.tds_rate} onChange= {(val) => inVal(val)} /></td>
    <td>{tdsAmount}</td>
</tr>
<tr>
    <td>Paid Amount</td>
   
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