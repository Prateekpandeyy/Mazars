
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
    const [disable, setDisable] = useState(false)
 
    useEffect(() => {
       if(props.modalData){
           setTdsRate(props.modalData.tds_rate)
           setTdsAmount(props.modalData.tds_amount)
        setpayValue(parseInt(props.modalData.paid_amount) + parseInt(parseInt(props.modalData.cgst_amount) + parseInt(props.modalData.igst_amount) + parseInt(props.modalData.igst_amount) - parseInt(props.modalData.tds_amount)))
    tdsDisable(); 
    }
    }, [props.modalData])
    const tdsDisable = () => {
        if(props.modalData.paymenturl != undefined || props.modalData.paymenturl != null){
            setDisable(true);
        }
    }
    const payFun = (e) => {
       if(props.modalData.paymenturl != null || props.modalData.paymenturl != undefined){
 
        window.location.assign(props.modalData.paymenturl)
       }
       else{
           console.log("undone")
        let formData = new FormData();
        formData.append("id", props.modalData.id);
        formData.append("cid", JSON.parse(userid));
        formData.append("tds_rate", tdsRate);
        formData.append("tds_amount", tdsAmount)
        console.log("Paid")
        axios({
            method :"POST", 
            url : `${baseUrl}/customers/payCall`,
            data : formData
        })
        .then((res) => {
            if(res.data.code === 1){
                console.log(res.data.result)
                window.location.assign(res.data.result)
            }
        })
       }
       
    }
    const inVal = (e) => {
        console.log(e.target.value)
        setTdsRate(e.target.value)
        let a = parseInt(props.modalData.cgst_amount) + parseInt(props.modalData.sgst_amount) + parseInt(props.modalData.igst_amount)
setTdsAmount(Number((e.target.value * props.modalData.paid_amount) / 100).toFixed(0))
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
    
    <tbody className="tbody">
<tr>
    <td>Installment Amount</td>
    <td></td>
    <td>{props.modalData.paid_amount}</td>
    </tr>
{/* <tr>
    <td>CGST</td>
    <td>{props.modalData.cgst_rate}%</td>
    <td>{props.modalData.cgst_amount}</td>
</tr>
<tr>
    <td>SGST</td>
    <td>{props.modalData.sgst_rate}%</td>
    <td>{props.modalData.sgst_amount}</td>
</tr>
<tr>
    <td>IGST</td>
    <td>{props.modalData.igst_rate}%</td>
    <td>{props.modalData.igst_amount}</td>
</tr> */}
<tr>
    <td>Invoice Amount</td>
    <td></td>
    <td>{parseInt(props.modalData.paid_amount) + parseInt(props.modalData.igst_amount) + parseInt(props.modalData.cgst_amount) + parseInt(props.modalData.sgst_amount)}</td>
</tr>
<tr>
    <td>TDS</td>
    <td style={{display :"flex"}}><input type="text" disabled = {disable} style={{display : "flex", width: "50px"}} defaultValue={props.modalData.tds_rate} onChange= {(val) => inVal(val)}/> % </td>
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