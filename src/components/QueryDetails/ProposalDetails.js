import React, { useState } from "react";
import CommonServices from "../../common/common";
import { baseUrl } from "../../config/config";


function ProposalDetails({
  diaplayProposal,
  diaplayHistory,
  paymentDetails,
  p,
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
  } = diaplayProposal;

  const { tlname, date_of_allocation } = diaplayHistory;

  console.log("installment_amount", installment_amount.split(','));


  //installment
  const installAmount = (data) => {
    var item = data.split(',')
    console.log("item", item);

    const dataItem = item.map((p, i) =>
    (
      <>
        <p>{CommonServices.removeTime(p)}</p>
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
  console.log("currentDate", currentDate)



  const dataCheck = (dateArr) => {

    for (let i = 0; i < dateArr.length; i++) {
      if (dateArr[i] === currentDate) {
        console.log("true hai---", currentDate)
        console.log("i", i)
        return i
      }
    }
  }

  const dueDate = (a, b) => {
    var item1 = a.split(',')
    var item2 = b.split(',')

    console.log("item1-", item1);
    console.log("item2", item2);

    var due = dataCheck(item2);

    console.log("due_date_length", due)

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


    console.log("total_Installment---",);
    console.log('total_Payment_History', total_Payment_History)

    var amount = total_Installment - total_Payment_History
    console.log('amount', amount)

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

        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{ width: "400px" }}>Titles</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Date of Allocation</th>
              <td>{CommonServices.changeFormateDate(date_of_allocation)}</td>
            </tr>
            <tr>
              <th scope="row">Name of Team Leader</th>
              <td>{tlname}</td>
            </tr>
            <tr>
              <th scope="row">Name of Tax Professional(s)</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Date of Proposal</th>
              <td>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {CommonServices.removeTime(proposal_date)}
                  {proposal_date && (
                    <a
                      class="btn btn-primary btn-sm"
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
                        amount_fixed
                        :
                        amount_type == "hourly" ?
                          amount_hourly
                          :
                          amount_type == "mixed" ?
                            <div>
                              <p>Fixed : {amount_fixed}</p>
                              <p>Hourly : {amount_hourly}</p>
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
                        <td>{no_of_installment}</td>
                        <td>{installAmount(installment_amount)}</td>
                        <td>{installAmount(due_date)}</td>
                      </tr>
                    </td>
                    :
                    ""
              }

            </tr>
            <tr>
              <th scope="row">Proposed Amount</th>
              <td>{amount}</td>
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
              <td>{accepted_amount}</td>
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
                  <th>Amount</th>
                </tr>
                {paymentDetails.map((pay, i) => (
                  <tr>
                    <td>{CommonServices.removeTime(pay.payment_date)}</td>
                    <td>{pay.paid_amount}</td>
                  </tr>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Payment Received</th>
              <td>{payment_received}</td>
            </tr>
            <tr>
              <th scope="row">Payment Due</th>
              <td>{dueDate(installment_amount, due_date)}</td>
            </tr>
            <tr>
              <th scope="row">Payment Outstanding</th>
              <td>{accepted_amount - payment_received}</td>
            </tr>
            <tr>
              <th scope="row">Payment declined reason</th>
              <td>{p.notes}</td>
            </tr>
            {
              p.paid_status == "2" &&
              <tr>
                <th scope="row">Payment Decline Date</th>
                <td>{CommonServices.removeTime(p.declined_date)}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProposalDetails;



      // for (const date of dateArr) {
      // var dateInArr = new Date(date)
      // var currentDate = new Date()
      // var same = dateInArr.getDate() <= currentDate.getDate();
      // if (same) {
      //   console.log("true hai", date)
      // } else {
      //   console.log(`A JavaScript type is: `, date)
      // }
      // }

   // var total_Installment = item1.reduce(myFunction)
    // function myFunction(total, value, index) {
    //   if (index <= due) {
    //     return Number(total) + Number(value);
    //   }
    // }
