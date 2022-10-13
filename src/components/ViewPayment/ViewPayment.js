import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { baseUrl } from "../../config/config";
import axios from "axios";

function ViewPayment({showPayment, paymentFun, data}) {
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
console.log("eeeeData", data)
  return (
    
     <>
      <Modal isOpen={showPayment} toggle={paymentFun} size="lg">
        <ModalHeader toggle={paymentFun}> 
        Details of client
        </ModalHeader>
        <ModalBody>
     
        <div className="row">
            <div className="col-md-6">
                <table>
                    <tr>
                        <td>Name</td>
                        <td>Prateek</td>
                    </tr>
                   
                   
                    <tr>
                        <td>Client ID</td>
                        <td>Prateek</td>
                    </tr>
                    <tr>
                        <td>User ID</td>
                        <td>TEST1234</td>
                    </tr>
                    <tr>
                        <td>Payment information</td>
                        <td>{data.payment_information}</td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>{data.receive_amount}</td>
                    </tr>
                    <tr>
                        <td>Received mode</td>
                        <td>{data.payment_received_by}</td>
                    </tr>
                </table>
                </div>
                <div className="col-md-6">
                <table>
                    <tr>
                        <td>Query no</td>
                        <td>{data.assign_no}</td>
                    </tr>
                    <tr>
                        <td>Invoice no</td>
                        <td>{data.billno}</td>
                        </tr>
                        <tr>
                        <td>Note</td>
                        <td>{data.note}</td>
                        </tr>
                        <tr>
                            <td>Bank name</td>
                            <td>{data.bank_name}</td>
                        </tr>
                        <tr>
                            <td>Date of invoice</td>
                            <td>{data.created_date}</td>
                        </tr>
                        <td>Received date</td>
                        <td>{data.payment_recived_date}</td>
                </table>
                </div>
        </div>
        <button className="customBtn d-flex mx-auto my-4">Close</button>
        </ModalBody>
        </Modal>
     </>
   
  );
}

export default ViewPayment;
