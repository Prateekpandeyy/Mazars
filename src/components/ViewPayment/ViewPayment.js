import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { baseUrl } from "../../config/config";
import axios from "axios";

function ViewPayment({showPayment, paymentFun, data, panel}) {
  const [url, setUrl] = useState("")
 
// useEffect(() => {
//   if(proposalId && panel === "admin"){
   
//     const token = window.localStorage.getItem("adminToken")
//     const myConfig = {
//       headers : {
//        "uit" : token
//       },
//       responseType: 'blob'
//     }
//     axios.get(`${baseUrl}/admin/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
//   .then((res) => {
   
//     if(res.status === 200){
   
//       window.URL = window.URL || window.webkitURL;
//      var url = window.URL.createObjectURL(res.data);
//      var a = document.createElement("a");
//      document.body.appendChild(a);
//      a.style = "display: none";
//      a.href = url;
//      a.download = `Proposal.pdf`
//      a.target = '_blank';
//      a.click();
//      document.body.removeChild(a);
//     }
//   })
//   }
//   else if(proposalId && panel === "teamleader"){
//     const token = window.localStorage.getItem("tlToken")
//     const myConfig = {
//       headers : {
//        "uit" : token
//       },
//       responseType: 'blob'
//     }
//     axios.get(`${baseUrl}/tl/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
//   .then((res) => {
   
//     if(res.status === 200){
     
//       window.URL = window.URL || window.webkitURL;
//      var url = window.URL.createObjectURL(res.data);
//      var a = document.createElement("a");
//      document.body.appendChild(a);
//      a.style = "display: none";
//      a.href = url;
//      a.download = `Proposal.pdf`
//      a.target = '_blank';
//      a.click();
//      document.body.removeChild(a);
//     }
//   })
//   }
//   else if (proposalId && panel === "taxprofessional") {
   
//       const token = window.localStorage.getItem("tptoken")
//       const myConfig = {
//         headers : {
//          "uit" : token
//         },
//         responseType: 'blob'
//       }
//       axios.get(`${baseUrl}/tl/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
//     .then((res) => {
     
//       if(res.status === 200){
       
//         window.URL = window.URL || window.webkitURL;
//         var url = window.URL.createObjectURL(res.data);
//         var a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         a.href = url;
//         a.download = `Proposal.pdf`
//         a.target = '_blank';
//         a.click();
//         document.body.removeChild(a);
//       }
//     })
    
//   }
//   else{
//     const token = window.localStorage.getItem("clientToken")
//     const myConfig = {
//       headers : {
//        "uit" : token
//       },
//       responseType: 'blob'
//     }
  
//     axios.get(`${baseUrl}/customers/dounloadpdf?id=${proposalId}&viewpdf=1` , myConfig)
//   .then((res) => {
   
//     if(res.status === 200){
     
//       console.log(URL.createObjectURL(res.data))
//       window.URL = window.URL || window.webkitURL;
//       var url = window.URL.createObjectURL(res.data);
//       var a = document.createElement("a");
//       document.body.appendChild(a);
//       a.style = "display: none";
//       a.href = url;
//       a.download = `invoice_1.pdf`
//       a.target = '_blank';
//       a.click();
//     }
//   })
//   }
  
// }, [proposalId])

  return (
    
     <>
   {
    data && (  
         <Modal isOpen={showPayment} toggle={paymentFun} size="lg" scrollable>
    <ModalHeader toggle={paymentFun}> 
    Manual credit of payment 
    </ModalHeader>
    <ModalBody>
 
    <div className="row" id = "payDetails" style={{border : "1px solid #ccc", padding : "10px 0px", borderRadius : "6px", margin : "10px 5px"}}>
        <div className="col-md-6">
            <table>
                <tr>
                    <td>Client name</td>
                    <td>{data.name}</td>
                </tr>
                <td>Query no</td>
                    <td>{data.assign_no}</td>
                    <tr>
                    <td>Invoice amount</td>
                    <td>{data.payable_amount}</td>
                </tr>
                <tr>
                    <td>Paid in bank account number</td>
                    <td>{data.bank_name}</td>
                </tr>
                <tr>
                    <td>Payment receipt date</td>
                    <td>{data.payment_recived_date && data.payment_recived_date.split("-").reverse().join("-")}</td>
                </tr>
                {/* <tr>
                    <td>Received mode</td>
                    <td>{data.payment_received_by}</td>
                </tr> */}
                {/* <tr>
                    <td>User ID</td>
                    <td>{data.user_id}</td>
                </tr> */}
                <tr>
                    <td>Payment information</td>
                    <td>{data.payment_information}</td>
                </tr>
              
            </table>
            </div>
            <div className="col-md-6">
            <table>
                
        
                <tr colSpan = {2}>
                    <td>Invoice no</td>
                    <td>{data.billno}</td>
                    </tr>
                    <tr>
                        <td> &nbsp;</td>
                        <td> &nbsp; </td>

                    </tr>
                   
                    <tr>
                    <td>Amount credited</td>
                    <td>{data.receive_amount}</td>
                </tr>
                <tr>
                    <td>Payment type</td>
                    <td>{data.bpayment_by}</td>
                </tr>
                <tr>
                <td>Credited date</td>
                    <td>{data.created_date && data.created_date.split(" ")[0].split("-").reverse().join("-")}</td>
                </tr>
                   {
                    panel === "client" ?
                    "" :
                    <tr>
                    <td>Other information</td>
                    <td>{data.note}</td>
                    </tr>
                   }
                   
                    
            </table>
            </div>
    </div>
    <button className="customBtn d-flex  my-4" onClick={(e) => paymentFun()}>Close</button>
    </ModalBody>
    </Modal>)
   }
     </>
   
  );
}

export default ViewPayment;
