import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Link } from "react-router-dom";

function Dashboard() {
  const userid = window.localStorage.getItem("tlkey");

  const [allQueries, setAllQueries] = useState({
    total: '',
    inprogress_queries: '',
    inprogress_allocation: '',
    inprogress_proposal: '',
    inprogress_assignment: '',
    complete_query: '',
    declined_queries: '',
    admin_declined_query: '',
    customer_declined_Query: '',
    customer_declined_proposal: '',
    Customer_declined_payment: '',

    allproposal: '',
    accepted_proposals: '',
    InProgress: '',
    inprogress_preparation: '',
    inprogress_acceptance: '',
    declined: '',
  });


  const [assignment, setAssignment] = useState({
    inprogress: '',
    complete: '',
    client_discussion: '',
    draft_report: '',
    final_discussion: '',
    final_report: '',
    complete_inprocess: '',
    customer_declined_payment: ''
  });

  const [payment, setPayment] = useState({
    paid: '',
    unpaid: '',
    totalpayment: '',
  });

  const { total, inprogress_queries,
    inprogress_allocation, inprogress_proposal,
    inprogress_assignment, complete_query,
    declined_queries, admin_declined_query,
    customer_declined_Query, customer_declined_proposal,
    Customer_declined_payment,
    allproposal,
    inprogress_preparation,
    declined, inprogress_acceptance,
    accepted_proposals, InProgress } = allQueries;


  const {
    inprogress,
    complete, client_discussion, draft_report, final_discussion,
    final_report, complete_inprocess,
    customer_declined_payment } = assignment;

  const {
    paid,
    unpaid,
    totalpayment } = payment;


  useEffect(() => {

    const getAllQueries = () => {
      axios
        .get(`${baseUrl}/admin/totalComplete?tl_id=${JSON.parse(userid)}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAllQueries({
              total: response.data.result.total,
              inprogress_queries: response.data.result.inprogress_queries,
              inprogress_allocation: response.data.result.inprogress_allocation,
              inprogress_proposal: response.data.result.inprogress_proposal,
              inprogress_assignment: response.data.result.inprogress_assignment,
              complete_query: response.data.result.complete_query,
              declined_queries: response.data.result.declined_queries,
              admin_declined_query: response.data.result.admin_declined_query,
              customer_declined_Query: response.data.result.customer_declined_Query,
              customer_declined_proposal: response.data.result.customer_declined_proposal,
              Customer_declined_payment: response.data.result.Customer_declined_payment,

              allproposal: response.data.result.proposal.allproposal,
              InProgress: response.data.result.proposal.InProgress,
              inprogress_preparation: response.data.result.proposal.inprogress_preparation,
              inprogress_acceptance: response.data.result.proposal.inprogress_acceptance,
              accepted_proposals: response.data.result.proposal.accepted_proposals,
              declined: response.data.result.proposal["customer_declined_proposals "],
            })
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getAssignment = () => {
      axios
        .get(`${baseUrl}/admin/getAssignmentsCount?tl_id=${JSON.parse(userid)}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setAssignment({
              inprogress: response.data.result.inprogress,
              complete: response.data.result.complete,
              client_discussion: response.data.result.client_discussion,
              draft_report: response.data.result.draft_report,
              final_discussion: response.data.result.final_discussion,
              final_report: response.data.result.final_report,
              complete_inprocess: response.data.result.complete_inprocess,
              customer_declined_payment: response.data.result.customer_declined_payment,
            })
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const getPayment = () => {
      axios
        .get(`${baseUrl}/admin/getAssignmentsPaymentCount?tl_id=${JSON.parse(userid)}`)
        .then((response) => {
          console.log("code---", response);
          if (response.data.code === 1) {
            setPayment({
              paid: response.data.result.paid,
              unpaid: response.data.result.unpaid,
              totalpayment: response.data.result.totalpayment,
            })
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    getAllQueries();
    getPayment();
    getAssignment();
  }, []);



  var todaysDate = new Date();
  console.log(todaysDate);

  return (
    <Layout TLDashboard="TLDashboard" TLuserId={userid}>

      <div className="row">


        <div className="col-md-3 content_header">
          <table className="table table-striped first main_table">
            <thead className="query_thead">
              <tr>
                <th className="left_side">All Queries</th>
                <th>{total}</th>
              </tr>
            </thead>
          </table>
          <table className="table table-striped second main_table">
            <thead className="query_thead">
              <tr>
                <th className="left_side">Inprogress; Queries</th>
                <th>{inprogress_queries}</th>
              </tr>
            </thead>

            <tbody className="table_body">
              <tr>
                <td className="left_side">Inprogress; Allocation</td>
                <td>{inprogress_allocation}</td>
              </tr>
              <tr>
                <td className="left_side">Inprogress; Proposals</td>
                <td>{inprogress_proposal}</td>
              </tr>
              <tr>
                <td className="left_side">Inprogress; Assignments</td>
                <td>{inprogress_assignment}</td>
              </tr>
            </tbody>
          </table>


          <table className="table table-striped third main_table">
            <thead className="query_thead">
              <tr>
                <th className="left_side">Completed; Queries</th>
                <th>{complete_query}</th>
              </tr>
            </thead>
            <tbody className="table_body">
              <tr>
                <td className="left_side">Completed; Assignments</td>
                <td>{complete_query}</td>
              </tr>
            </tbody>
          </table>


          <table className="table table-striped forth main_table">
            <thead className="query_thead">
              <tr>
                <th className="left_side">Declined; Queries</th>
                <th>{declined_queries}</th>
              </tr>
            </thead>

            <tbody className="table_body">
              {/* <tr>
                <td className="left_side">Admin Declined; Queries</td>
                <td>{admin_declined_query}</td>
              </tr>
              <tr>
                <td className="left_side"> Customer Declined; Queries</td>
                <td>{customer_declined_Query}</td>
              </tr> */}
              <tr>
                <td className="left_side">Customer Declined; Proposals</td>
                <td>{customer_declined_proposal}</td>
              </tr>
              <tr>
                <td className="left_side">Customer Declined; Payment</td>
                <td>{Customer_declined_payment}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-md-3 content_header">

          <table className="table table-striped fifth main_table">
            <thead className="proposal_thead">
              <tr>
                <th className="left_side">All Proposals</th>
                <th>{allproposal}</th>

              </tr>
            </thead>
          </table>

          <table className="table table-striped sixth main_table">
            <thead className="proposal_thead">
              <tr>
                <th className="left_side">Inprogress; Proposals</th>
                <th>{InProgress}</th>
              </tr>
            </thead>
            <tbody classNameName="table_body">
              <tr>
                <td className="left_side">Inprogress; Preparation</td>
                <td>{inprogress_preparation}</td>
              </tr>
              <tr>
                <td className="left_side">Inprogress; Acceptance</td>
                <td>{inprogress_acceptance}</td>
              </tr>
            </tbody>
          </table>

          <table className="table table-striped seventh main_table">
            <thead className="proposal_thead">
              <tr>
                <th className="left_side">Accepted; Proposals </th>
                <th>{accepted_proposals}</th>
              </tr>
            </thead>
          </table>

          <table className="table table-striped eight main_table">
            <thead className="proposal_thead">
              <tr>
                <th className="left_side">Customer Declined; Proposals</th>
                <th>{declined}</th>
              </tr>
            </thead>
          </table>


        </div>

        <div className="col-md-3 content_header">
          <table className="table table-striped ninth main_table">
            <thead className="assignment_thead">
              <tr>
                <th className="left_side">All Assignments</th>
                <th>{inprogress + complete + +(customer_declined_payment)}</th>
              </tr>
            </thead>
          </table>

          <table className="table table-striped tenth main_table">
            <thead className="assignment_thead">

              <tr>
                <th className="left_side">Inprogress; Assignments</th>
                <th>{inprogress}</th>
              </tr>
            </thead>

            <tbody classNameName="table_body">
              <tr>
                <td className="left_side">Client Discussion</td>
                <td>{client_discussion}</td>
              </tr>
              <tr>
                <td className="left_side">Draft Reports</td>
                <td>{draft_report}</td>
              </tr>
              <tr>
                <td className="left_side">Final Discussion</td>
                <td>{final_discussion}</td>
              </tr>
              <tr>
                <td className="left_side">Delivery of Final Reports</td>
                <td>{final_report}</td>
              </tr>
              <tr>
                <td className="left_side">Awaiting Completion</td>
                <td>{complete_inprocess}</td>
              </tr>
            </tbody>
          </table>

          <table className="table table-striped tenth main_table">
            <thead className="assignment_thead">

              <tr>
                <th className="left_side">Completed; Assignments</th>
                <th>{complete}</th>
              </tr>
            </thead>
          </table>

          <table className="table table-striped tenth main_table">
            <thead className="assignment_thead">

              <tr>
                <th className="left_side">Customer Declined; Payment</th>
                <th>{customer_declined_payment}</th>
              </tr>
            </thead>
          </table>
        </div>


        <div className="col-md-3 content_header">

          <table className="table table-striped twelvth main_table">
            <thead className="payment_thead">
              <tr>
                <th className="left_side">All Payments</th>
                <th>{totalpayment}</th>
              </tr>
            </thead>
          </table>
          <table className="table table-striped thirteen main_table">
            <thead className="payment_thead2">
              <tr>
                <th className="left_side">Paid</th>
                <th>{paid}</th>
              </tr>
            </thead>
          </table>

          <table className="table table-striped thirteen main_table">
            <thead className="payment_thead2">
              <tr>
                <th className="left_side">Unpaid</th>
                <th>{unpaid}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>


    </Layout>
  );
}

export default Dashboard;










// var todaysDate = new Date();
//   console.log(todaysDate);
// function convertDate(date) {
//   var yyyy = date.getFullYear().toString();
//   var mm = (date.getMonth() + 1).toString();
//   var dd = date.getDate().toString();

//   var mmChars = mm.split("");
//   var ddChars = dd.split("");

//   return (
//     yyyy +
//     "-" +
//     (mmChars[1] ? mm : "0" + mmChars[0]) +
//     "-" +
//     (ddChars[1] ? dd : "0" + ddChars[0])
//   );
// }

// console.log(convertDate(todaysDate));
