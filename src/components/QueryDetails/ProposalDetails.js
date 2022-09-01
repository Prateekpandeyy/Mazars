import React, { useState, useEffect } from "react";
import CommonServices from "../../common/common";
import { baseUrl, baseUrl3 } from "../../config/config";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

import axios from "axios";
import { Markup } from 'interweave';
function ProposalDetails({
  diaplayProposal,
  diaplayHistory,
  paymentDetails,
  p,
  accept,
  tlName2,
  tpStatus,
  tp22, 
  panel,
  overDue,
  admininvoice
}) {

  const {
    amount,
    accepted_amount,
    payment_received,
    cust_accept_date,
    proposal_date,
    description,

    amount_type,
    amount_fixed,
    amount_hourly,

    payment_terms,
    no_of_installment,
    installment_amount,
    due_date,
    proposal_reactive_dates,
    proposal_reactive_notes
    
  } = diaplayProposal;

  const { tlname, date_of_allocation } = diaplayHistory;
  
  var nfObject = new Intl.NumberFormat('hi-IN')
  
  // checkDevice
 const checkDevice = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)

 }
const downloadpdf = () => {
  const token = window.localStorage.getItem("adminToken")
    
  const myConfig = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
 if(panel === "admin"){
  axios.get(`${baseUrl}/admin/dounloadpdf?id=${p.id}` , myConfig)
  .then((res) => {
    console.log("res", res)
    if(res.status === 200){
      window.URL = window.URL || window.webkitURL;
   var url = window.URL.createObjectURL(res.data);
   var a = document.createElement("a");
   document.body.appendChild(a);
   a.style = "display: none";
   a.href = url;
   a.download = `Proposal.pdf`
   a.target = '_blank';
   a.click();
   document.body.removeChild(a);
    }
  })
 }
 else if (panel === "teamleader") {
  const token = window.localStorage.getItem("tlToken")
    
  const myConfig = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
  axios.get(`${baseUrl}/tl/dounloadpdf?id=${p.id}` , myConfig)
  .then((res) => {
    console.log("res", res)
    if(res.status === 200){
      window.URL = window.URL || window.webkitURL;
   var url = window.URL.createObjectURL(res.data);
   var a = document.createElement("a");
   document.body.appendChild(a);
   a.style = "display: none";
   a.href = url;
   a.download = `Proposal.pdf`
   a.target = '_blank';
   a.click();
   document.body.removeChild(a);
    }
  })
 }
 else if (panel === "taxprofessional"){
  const token = window.localStorage.getItem("tptoken")
    
  const myConfig = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
  axios.get(`${baseUrl}/tl/dounloadpdf?id=${p.id}` , myConfig)
  .then((res) => {
    console.log("res", res)
    if(res.status === 200){
      window.URL = window.URL || window.webkitURL;
   var url = window.URL.createObjectURL(res.data);
   var a = document.createElement("a");
   document.body.appendChild(a);
   a.style = "display: none";
   a.href = url;
   a.download = `Proposal.pdf`
   
  //  a.target = '_blank';
   a.click();
   document.body.removeChild(a);
    }
  })
 }
 else if (panel === "client"){
  const token = window.localStorage.getItem("clientToken")
    
  const myConfig = {
      headers : {
       "uit" : token
      },
      responseType: 'blob'
    }
  axios.get(`${baseUrl}/customers/dounloadpdf?id=${p.id}` , myConfig)
  .then((res) => {
    console.log("res", res)
    if(res.status === 200){
      console.log(URL.createObjectURL(res.data))
      window.URL = window.URL || window.webkitURL;
      var url = window.URL.createObjectURL(res.data);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = `proposal.pdf`
      a.target = '_blank';
      a.click();
     }
  })
 }
}
  //installment
  const installAmount = (data) => {
    var item = data.split(',')
   
    const dataItem = item.map((p, i) =>
    (
      <>
        <p>{CommonServices.removeTime(p)}</p>
      </>
    ))
    return dataItem;
  }
  const installAmount2 = (data) => {
    var item = data.split(',')
   
    const dataItem = item.map((p, i) =>
    (
      <>
        <p>{nfObject.format(p)}</p>
      </>
    ))
    return dataItem;
  }
  // curent date
  var date = new Date();
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const [currentDate] = useState(convert(date));
 

  const dataCheck = (dateArr) => {
    let duedd = 0

    for (let i = 0; i < dateArr.length; i++) {
      if (dateArr[i] < currentDate) {

       duedd++;
      }
    }
    return duedd
  }

  const dueDate = (a, b) => {
    var item1 = a.split(',')
    var item2 = b.split(',')

    var due = dataCheck(item2);

   

    //total installment
let nd = 0;
    var total_Installment = 0;
    for (var i = 1; i <= due; i++) {
      let pk  = Number(item1[i])
      // total_Installment = total_Installment + item1[i];
      console.log("item", item1[i])
      console.log(total_Installment + pk)
     
     if(item1[i] !== undefined){
      total_Installment = total_Installment + pk;
     }
      nd = total_Installment + pk;
    }


    //total payment history
    var total_Payment_History = paymentDetails.reduce(function (prev, current) {
      return prev + +current.paid_amount
    }, 0);


    console.log("PaymenHistory", total_Payment_History)

    var amount =  total_Payment_History - total_Installment 


    if (amount > 0) {
      if(payment_received){
        return (accepted_amount - payment_received)
      }
      else{
        return total_Payment_History
      }
    }
  }
  const getInviceValue = (e) => {
    const token = window.localStorage.getItem("adminToken")
    let val = e.target.value
   let formData = new FormData()
   formData.append("admin_iba", val);
   formData.append("assign_no", p.id)
   axios({
    method : "POST",
    url :  `${baseUrl}/admin/setiba`,
    headers : {
      uit : token
  },
    data : formData
   })
   .then((res) => {
    console.log(res)
   })
  }
  console.log("pppp", admininvoice)
  return (
    <>
      <div className="queryBox">
        <p
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "18px",
          }}
        >
          Proposal and Payment Details
        </p>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Titles</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Date of Allocation</th>
              <td>{accept > "1" ? CommonServices.changeFormateDate(date_of_allocation) : ""}</td>
            </tr>
            
            
            <tr>
              <th scope="row">Name of Team Leader</th>
              <td>{accept > "1" ? tlName2 : ""}</td>
            </tr>
            <tr>
              <th scope="row">Name of Tax Professional(s)</th>
              <td>{tpStatus == "2" ? tp22 : ""}</td>
            </tr>
            <tr>
              <th scope="row">Date of Proposal</th>
              <td>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {CommonServices.removeTime(proposal_date)}
                  {proposal_date && (
                  
                    <button className="customBtn" onClick={() => downloadpdf()}>
                      Download
                      </button>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Scope of Work</th>
              <td className="tableStyle"> <Markup content={description} /></td>
            </tr>

          {
            panel === "admin" ?
            <tr>
            <th scope="row">Approval of Admin for such issue of invoice(s)</th>
            <td className="tableStyle"> 
            <div class="form-group">
                <label>Approval of Team Leader for such issue of invoice(s)</label>
               
                  <div className="myInvice">
                   
                  {
                    admininvoice === "1" ?
                    <label> 
                    <input 
              type="radio"
               defaultChecked
               onChange={(e) => getInviceValue(e)}
                
                value="1" 
                name = "yestl" />Yes
               
          </label> :
            <label> 
            <input 
      type="radio"
      
       onChange={(e) => getInviceValue(e)}
        
        value="1" 
        name = "yestl" />Yes
       
  </label>
                  }
        {
          admininvoice === "0" ?
          <label> 
          <input 
              type="radio" 
              onChange={(e) => getInviceValue(e)}
              defaultChecked
            
               value="0" 
               name = "yestl"/>No
             
          </label> :
            <label> 
            <input 
                type="radio" 
                onChange={(e) => getInviceValue(e)}
              
                 value="0" 
                 name = "yestl"/>No
               
            </label>
        }
                </div> 
               
              </div>
              </td>
          </tr> : ""
          }
            <tr>
              <th scope="row">Whether invoice(s) can be issued before acceptance of proposal by client</th>
              <td className="tableStyle"> 
              <div class="form-group">
                
                  <div className="myInvice">
                 {
                  p.tp_iba === "1" ?
                  "Yes" : "No"
                 }
                </div>
                </div></td>
            </tr>
            <tr>
              <th scope="row">Approval of Team Leader for such issue of invoice(s)</th>
              <td className="tableStyle"> 
              <div class="form-group">
                
                  <div className="myInvice">
                 {
                  p.tl_iba === "1" ?
                  "Yes" : "No"
                 }
                </div>
                </div></td>
            </tr>
            <tr>
              <th scope="row">Amount</th>
              <td>
                <tr style={{display : "flex", width : "100%"}}>
                  <th style={{display : "flex", width : "50%"}}>Amount Type</th>
                  <th style={{display : "flex", width : "50%"}}>Price</th>
                </tr>
                <tr style={{display : "flex", width : "100%"}}>
                  <td style={{display : "flex", width : "50%"}}>{CommonServices.capitalizeFirstLetter(amount_type)}</td>
                  <td style={{display : "flex", width : "50%", justifyContent : "flex-start"}}>
                    {
                      amount_type == "fixed" ?
                       nfObject.format(amount_fixed)
                        :
                        amount_type == "hourly" ?
                        nfObject.format(amount_hourly) 
                          :
                          amount_type == "mixed" ?
                            <div>
                              <p>Fixed : {nfObject.format(amount_fixed)}</p>
                              <p>Hourly : {nfObject.format(amount_hourly)}</p>
                            </div>
                            :
                            ""
                    }
                  </td>
                </tr>
              </td>
            </tr>
           
            <tr>
              <th scope="row">Payment Terms</th>
              {
                payment_terms == "lumpsum" ?
                  <td>
                    <tr style={{display : "flex", width : "100%"}}>
                  <th style={{display : "flex", width : "50%"}}>Payment Plan</th>
                  <th style={{display : "flex", width : "50%"}}>Due Dates</th>
                </tr>
                <tr style={{display : "flex", width : "100%"}}>
                  <td style={{display : "flex", width : "50%"}}>{CommonServices.capitalizeFirstLetter(payment_terms)}</td>
                  <td style={{display : "flex", width : "50%", justifyContent : "flex-start"}}>
                  {CommonServices.removeTime(due_date)}
                  </td>
                </tr>
                    {/* <tr>
                      <td>{CommonServices.capitalizeFirstLetter(payment_terms)}</td>
                      <td>
                        {CommonServices.removeTime(due_date)}
                      </td>
                    </tr> */}
                  </td>
                  :
                  payment_terms == "installment" ?
                    <td>
                      <tr style={{display : "flex", width : "100%"}}>
                        <th style={{display : "flex", width : "25%"}}>Payment Plan</th>
                        <th style={{display : "flex", width : "25%"}}>No of Installments</th>
                        <th style={{display : "flex", width : "25%"}}>Installment Amount</th>
                        <th style={{display : "flex", width : "25%"}}>Due Dates</th>
                      
                      </tr>
                      <tr style={{display : "flex", width : "100%"}}>
                       
                        <td style={{display : "flex", width : "25%"}}>{CommonServices.capitalizeFirstLetter(payment_terms)}</td>
                        <td style={{display : "flex", width : "25%", justifyContent : "center"}}>{no_of_installment}</td>
                        <td style={{display : "flex", width : "25%", flexDirection : "column", textAlign : "right"}}>{installAmount2(installment_amount)}</td>
                        <td style={{display : "flex", width : "25%", flexDirection : "column"}}>{installAmount(due_date)}</td>
                        
                      </tr>
                    </td>
                    :
                    ""
              }

            </tr>
            <tr>
              <th scope="row">Proposed Amount</th>
              <td>{nfObject.format(amount)}</td>
            </tr>
            <tr>
              <th scope="row">Proposal Status</th>
              <td>
                {p.query_status == "4" && "Inprogress"}
                {p.query_status == "6" && "Declined"}
                {(p.query_status == "5" || p.query_status > 6) && "Accepted"}
              </td>
            </tr>
            <tr>
              <th scope="row">Amount Accepted</th>
              <td>{nfObject.format(accepted_amount)}</td>
            </tr>
            <tr>
              <th scope="row">Date of Acceptance / Decline</th>
              <td>{CommonServices.removeTime(cust_accept_date)}</td>
            </tr>
            <tr>
              <th scope="row">Payment History</th>
              <td>
                <tr style={{display : "flex", width : "100%"}}>
                  <th style={{display : "flex", width :"20%"}}>Date</th>
                 
                    <th style={{display : "flex", width : "20%"}}>Invoice Amount</th>
                    <th style={{display : "flex", width : "20%"}}>Tds Deducted</th>
                    <th style={{display : "flex", width : "20%"}}>Amount Paid </th>
                    <th style={{display : "flex", width : "20%"}}>Payment Receipt</th>
                </tr>
                {paymentDetails.map((pay, i) => (
                  <tr style={{display : "flex", width : "100%"}}>
                    {pay.is_paid == "1" ?
                  
                    <>
                     <td style={{display : "flex", width : "20%"}}>{CommonServices.removeTime(pay.payment_date)}</td> 
                    <td style={{display : "flex", width : "20%", justifyContent : "flex-end"}}>{pay.invoice_amount}</td>
                    <td style={{display : "flex", width : "20%", justifyContent : "flex-end"}}>{pay.tds_amount}</td>
                    <td style={{display : "flex", width : "20%", justifyContent : "flex-end"}}>{pay.amount}</td>
                    <td style={{display : "flex", width : "20%"}}>

                    <a href={pay.receipt_url} target="_blank">
                    <span title="view receipt" style={{margin: "0 2px"}}>
                    <i 
                   className="fa fa-eye"
                   style={{color : "green", 
                   fontSize : "16px", 
                   pointer : "cursor"}}>
                     </i></span></a>
                    </td>
                    </> :
                      "" 
                    }
                  
                  </tr>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Payment Received</th>
              <td>{nfObject.format(payment_received)}</td>
            </tr>
            <tr>
              <th scope="row">Payment Overdue</th>
              <td>{overDue}</td>
            </tr>
            <tr>
              <th scope="row">Payment Outstanding</th>
              <td>{nfObject.format(accepted_amount - payment_received)}</td>
            </tr>
         
            
            {
              p.paid_status == "2" && 
              <>
              <tr>
              <th scope="row">Payment decline reason</th>
              <td>{p.notes}</td>
            </tr>
            <tr>
                <th scope="row">Payment Decline Date</th>
                <td>{CommonServices.removeTime(p.payment_declined_date)}</td>
              </tr>
              </>
             
            }
             {
             p.decline_notes !== null && p.decline_notes.length > 0 ?
                <tr>
                  <th scope="row">Reasons for proposal Decline</th>
                  <td colspan="1">
                    {
                      p.decline_notes
                    }
                  </td>
                </tr>
                : null
            }
             {
               proposal_reactive_notes.length > 0 ?
                 <tr>
                   <th scope="row"> Date of restoring proposal</th>
                   <td colspan="1">
                     {
                      proposal_reactive_dates
                     }
                   </td>
                 </tr>
                 : null
             }
                          {
               proposal_reactive_notes.length > 0  ?
           
           <tr>
                   <th scope="row"> Reason of restoring proposal </th>
                   <td colspan="1">
                     {
                       proposal_reactive_notes
                     }
                   </td>
                 </tr>
                 : null
             }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProposalDetails;




 
