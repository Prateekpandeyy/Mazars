import React, { useState } from "react";
import CommonServices from "../../common/common";
import { baseUrl, baseUrl3 } from "../../config/config";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

function ProposalDetails({
  diaplayProposal,
  diaplayHistory,
  paymentDetails,
  p,
  accept,
  tlName2,
  tpStatus,
  tp22
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

    for (let i = 0; i < dateArr.length; i++) {
      if (dateArr[i] === currentDate) {

        return i
      }
    }
  }

  const dueDate = (a, b) => {
    var item1 = a.split(',')
    var item2 = b.split(',')

    var due = dataCheck(item2);

   

    //total installment

    var total_Installment = 0;
    for (var i = 0; i <= due; i++) {
      // total_Installment = total_Installment + item1[i];
      total_Installment += +item1[i];
    }


    //total payment history
    var total_Payment_History = paymentDetails.reduce(function (prev, current) {
      return prev + +current.paid_amount
    }, 0);


    

    var amount = total_Installment - total_Payment_History


    if (amount > 0) {
      return amount
    }
  }
  return (
    <>
      <div>
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
              <th scope="col" style={{ width: "300px", overflow: "wrap" }}>Titles</th>
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
                    <a
                      className="btn btn-primary btn-sm"
                      href={`${baseUrl}/customers/dounloadpdf?id=${p.id}`}
                      role="button"
                    >
                      Download
                    </a>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Scope of Work</th>
              <td>{description}</td>
            </tr>

            <tr>
              <th scope="row">Amount</th>
              <td>
                <tr>
                  <th>Amount Type</th>
                  <th>Price</th>
                </tr>
                <tr>
                  <td>{CommonServices.capitalizeFirstLetter(amount_type)}</td>
                  <td>
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
                    <tr>
                      <th>Payment Type</th>
                      <th>Due Dates</th>
                    </tr>
                    <tr>
                      <td>{CommonServices.capitalizeFirstLetter(payment_terms)}</td>
                      <td>
                        {CommonServices.removeTime(due_date)}
                      </td>
                    </tr>
                  </td>
                  :
                  payment_terms == "installment" ?
                    <td>
                      <tr>
                        <th>Payment Type</th>
                        <th>No of Installments</th>
                        <th>Installment Amount</th>
                        <th>Due Dates</th>
                      
                      </tr>
                      <tr>
                       
                        <td>{payment_terms}</td>
                        <td style={{display : "flex", justifyContent : "center", border : "0px"}}>{no_of_installment}</td>
                        <td >{installAmount2(installment_amount)}</td>
                        <td>{installAmount(due_date)}</td>
                        
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
                <tr>
                  <th>Date</th>
                 
                    <th>Invoice Amount</th>
                    <th>Tds Deducted</th>
                    <th>Amount Paid </th>
                    <th>Payment Receipt</th>
                </tr>
                {paymentDetails.map((pay, i) => (
                  <tr>
                    {pay.is_paid == "1" ?
                  
                    <>
                     <td>{CommonServices.removeTime(pay.payment_date)}</td> 
                    <td>{pay.invoice_amount}</td>
                    <td>{pay.tds_amount}</td>
                    <td>{pay.amount}</td>
                    <td>

                    <a href={pay.paymenturl} target="_blank">
                    <span title="view receipt" style={{margin: "0 2px"}}>
                    <i 
                   className="fa fa-eye"
                   style={{color : "green", 
                   fontSize : "16px", 
                   pointer : "cursor"}}>
                     </i></span></a>
                    </td>
                    </> :
                      <td></td> 
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
              <th scope="row">Payment Due</th>
              <td>{dueDate(installment_amount, due_date)}</td>
            </tr>
            <tr>
              <th scope="row">Payment Outstanding</th>
              <td>{nfObject.format(accepted_amount - payment_received)}</td>
            </tr>
         
            
            {
              p.paid_status == "2" && 
              <>
              <tr>
              <th scope="row">Payment declined reason</th>
              <td>{p.notes}</td>
            </tr>
            <tr>
                <th scope="row">Payment Decline Date</th>
                <td>{CommonServices.removeTime(p.declined_date)}</td>
              </tr>
              </>
             
            }
             {
              p.query_status == "6" ?
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
                   <th scope="row"> date of restoring proposal</th>
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
                   <th scope="row"> reason of restoring proposal </th>
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




 
