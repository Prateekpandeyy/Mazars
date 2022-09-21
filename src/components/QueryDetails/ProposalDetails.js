import React, { useState, useEffect } from "react";
import CommonServices from "../../common/common";
import { baseUrl, baseUrl3 } from "../../config/config";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Swal from "sweetalert2";
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
    tp_iba,
    tl_iba,
    admin_iba,
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
   Swal.fire({
    title: "Are you sure?",
    text: "Do you want to allow",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.value === true) { 
      axios({
        method : "POST",
        url :  `${baseUrl}/admin/setiba`,
        headers : {
          uit : token
      },
        data : formData
       })
       .then((res) => {
        if(res.data.code === 1){
          Swal.fire({
            title : "success",
            html : res.data.message,
            icon : "success"
          })
          
        }
        else if (res.data.code === 0){
          Swal.fire({
            title : "error",
            html : res.data.message,
            icon : "error"
          })
        }
      
       })
    }})
  
  }
 console.log("admininvoice", admininvoice)
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
          Proposal and payment details
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
              <th scope="row">Date of allocation</th>
              <td>{accept > "1" ? CommonServices.changeFormateDate(date_of_allocation) : ""}</td>
            </tr>
            
            
            <tr>
              <th scope="row">Name of team leader</th>
              <td>{accept > "1" ? tlName2 : ""}</td>
            </tr>
            <tr>
              <th scope="row">Name of tax professional(s)</th>
              <td>{tpStatus == "2" ? tp22 : ""}</td>
            </tr>
            <tr>
              <th scope="row">Date of proposal</th>
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
              <th scope="row">Scope of work</th>
              <td className="tableStyle"> <Markup content={description} /></td>
            </tr>
          {
            tl_iba === null && tp_iba === null ? "" :
            <tr>
            <th scope="row"></th>
            <tr>
            <td className="tableStyle"> 
          
               {
                tp_iba === "1" ?
                <>
                  <span className="d-block mr-2">
                  Whether invoice(s) can be issued before acceptance of proposal by client
               
                  </span>
                <label className="mr-2">
                <input 
            type="radio" 
            className="spaceRadio"
            defaultChecked
          disabled
             value="0" 
             name = "yestp"/>Yes
           
        </label>
        <label className="mr-2">
                <input 
            type="radio" 
           disabled 
           
           className="spaceRadio"
             value="0" 
             name = "yestp"/>No
           
        </label>
        </> : ""
               }
                {
                tp_iba == "0" ?
                <>
              <span className="d-block mr-2">
                Whether invoice(s) can be issued before acceptance of proposal by client
               
                </span>
                <label className="mr-2">
                <input 
            type="radio" 
            className="spaceRadio"
           disabled
          
             value="0" 
             name = "yestp"/>Yes
           
        </label>
        <label className="mr-2">
                <input 
            type="radio" 
            className="spaceRadio"
            defaultChecked
          disabled
             value="0" 
             name = "yestp"/>No
           
        </label></> : ""
               }
            
             
              </td>
              <td className="tableStyle"> 
         
              
            
               
                {
                tl_iba === "1" ?
               <div>
                <span className="mr-2">
                Approval of team leader for such issue of invoice(s)
                </span>
                <label className="mr-2">
                <input 
            type="radio" 
            className="spaceRadio"
            defaultChecked
          disabled
             value="0" 
             name = "yestl"/>Yes
           
        </label>
        <label className="mr-2">
                <input 
            type="radio" 
           disabled 
           
           className="spaceRadio"
             value="0" 
             name = "yestl"/>No
           
        </label>
        </div> : ""
               }
                {
                tl_iba == "0" ?
               <div>
                <span className="mr-2">
                Approval of team leader for such issue of invoice(s)
                </span>
                <label className="mr-2">
                <input 
            type="radio" 
            className="spaceRadio"
           disabled
          
             value="0" 
             name = "yestl"/>Yes
           
        </label>
        <label className="mr-2">
                <input 
            type="radio" 
            className="spaceRadio"
            defaultChecked
          disabled
             value="0" 
             name = "yestl"/>No
           
        </label></div> : ""
               }
             </td>
              {
          panel === "admin" ?
          
         
          <td className="tableStyle"> 
        
              <label className="mr-2">Approval of admin for such issue of invoice(s)</label>
             
                <div className="myInvice">
                 
            {
              tl_iba === "1" && tp_iba === "1" && admin_iba === null ?
              <>
                  {
                  admininvoice === "1" ?
                  <label className="mr-2">  
                  <input 
            type="radio"
             defaultChecked
             onChange={(e) => getInviceValue(e)}
             className="spaceRadio"
              value="1" 
              name = "yestl" />Yes
             
        </label> :
        <label className="mr-2">
          <input 
    type="radio"
    className="spaceRadio"
     onChange={(e) => getInviceValue(e)}
      
      value="1" 
      name = "yestl" />Yes
     
</label>
                }
      {
        admininvoice === "0" ?
        <label className="mr-2"> 
        <input 
            type="radio" 
            onChange={(e) => getInviceValue(e)}
            defaultChecked
            className="spaceRadio"
             value="0" 
             name = "yestl"/>No
           
        </label> :
          <label className="mr-2">
          <input 
              type="radio" 
              onChange={(e) => getInviceValue(e)}
              className="spaceRadio"
               value="0" 
               name = "yestl"/>No
             
          </label>
      }
              </> : 
              <>
           {
            admin_iba === "1" ?
            <>
                <label className="mr-2">  
                  <input 
            type="radio"
            disabled
           defaultChecked
             className="spaceRadio"
              value="1" 
              name = "yestl" />Yes
             
        </label>
        <label className="mr-2">  
                  <input 
            type="radio"
            disabled
             className="spaceRadio"
              value="1" 
              name = "yestl" />No
             
        </label>
            </> :
            <>
              {
                admin_iba === "0" ?
                <>
                  <label className="mr-2">  
                  <input 
            type="radio"
            disabled
          
             className="spaceRadio"
              value="1" 
              name = "yesAdmin" />Yes
             
        </label>
        <label className="mr-2">  
                  <input 
            type="radio"
            defaultChecked
            disabled
             className="spaceRadio"
              value="1" 
              name = "yesAdmin" />No
             
        </label>
                </> : 
                <>
                  <label className="mr-2">  
                  <input 
            type="radio"
            disabled
           
             className="spaceRadio"
              value="1" 
              name = "yesAdmin" />Yes
             
        </label>
        <label className="mr-2">  
                  <input 
            type="radio"
            disabled
             className="spaceRadio"
              value="1" 
              name = "yesAdmin" />No
             
        </label>
                </>
              }
            </>
           }
           </>
            }
              </div> 
             
           
            </td>
        : ""
        }
     
       
            </tr>
           
          </tr>
         
          }
         
            <tr>
              <th scope="row">Amount</th>
              <td>
                <tr style={{display : "flex", width : "100%"}}>
                  <td style={{display : "flex", width : "50%"}}>Amount type</td>
                  <td style={{display : "flex", width : "50%"}}>Price</td>
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
              <th scope="row">Payment terms</th>
              {
                payment_terms == "lumpsum" ?
                  <td>
                    <tr style={{display : "flex", width : "100%"}}>
                  <td style={{display : "flex", width : "50%"}}>Payment plan</td>
                  <td style={{display : "flex", width : "50%"}}>Due dates</td>
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
                        <td  style={{display : "flex", width : "25%"}}>Payment plan</td>
                        <td  style={{display : "flex", width : "25%"}}>No of installments</td>
                        <td  style={{display : "flex", width : "25%"}}>Installment amount</td>
                        <td  style={{display : "flex", width : "25%"}}>Due dates</td>
                      
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
              <th scope="row">Proposed amount</th>
              <td>{nfObject.format(amount)}</td>
            </tr>
            <tr>
              <th scope="row">Proposal status</th>
              <td>
                {p.query_status == "4" && "Inprogress"}
                {p.query_status == "6" && "Declined"}
                {(p.query_status == "5" || p.query_status > 6) && "Accepted"}
              </td>
            </tr>
            <tr>
              <th scope="row">Amount accepted</th>
              <td>{nfObject.format(accepted_amount)}</td>
            </tr>
            <tr>
              <th scope="row">Date of acceptance / decline</th>
              <td>{CommonServices.removeTime(cust_accept_date)}</td>
            </tr>
            <tr>
              <th scope="row">Payment history</th>
              <td>
                <tr style={{display : "flex", width : "100%"}}>
                  <td style={{display : "flex", width :"20%"}}>Date</td>
                 
                   <td style={{display : "flex", width : "20%"}}>Invoice amount</td>
                   <td style={{display : "flex", width : "20%"}}>TDS deducted</td>
                   <td style={{display : "flex", width : "20%"}}>Amount paid </td>
                   <td style={{display : "flex", width : "20%"}}>Payment receipt</td>
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
              <th scope="row">Payment received</th>
              <td>{nfObject.format(payment_received)}</td>
            </tr>
            <tr>
              <th scope="row">Payment overdue</th>
              <td>{overDue}</td>
            </tr>
            <tr>
              <th scope="row">Payment outstanding</th>
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
                <th scope="row">Payment decline date</th>
                <td>{CommonServices.removeTime(p.payment_declined_date)}</td>
              </tr>
              </>
             
            }
             {
             p.decline_notes !== null && p.decline_notes.length > 0 ?
                <tr>
                  <th scope="row">Reasons for proposal decline</th>
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