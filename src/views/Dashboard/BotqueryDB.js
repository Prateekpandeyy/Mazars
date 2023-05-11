import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../config/config";


import { Container, Grid, Paper, Box } from "@material-ui/core";
function BotqueryDB() {
  const userId = window.localStorage.getItem("userid");
  const [allQueries, setAllQueries] = useState({
    total: "",
    inprogress_queries: "",
    inprogress_allocation: "",
    inprogress_proposal: "",
    inprogress_assignment: "",
    complete_query: "",
    declined_queries: "",
    admin_declined_query: "",
    customer_declined_Query: "",
    customer_declined_proposal: "",
    Customer_declined_payment: "",

    allproposal: "",
    accepted_proposals: "",
    InProgress: "",
    inprogress_preparation: "",
    inprogress_acceptance: "",
    declined: "",

    allassignment: "",
    inprogress: "",
    complete: "",
    customer_declined_Pay: "",

    paid: "",
    unpaid: "",
    totalpayment: "",
  });

  const {
    total,
    inprogress_queries,
    inprogress_allocation,
    inprogress_proposal,
    inprogress_assignment,
    complete_query,
    declined_queries,
    admin_declined_query,
    customer_declined_Query,
    customer_declined_proposal,
    Customer_declined_payment,
    allproposal,
    inprogress_preparation,
    declined,
    inprogress_acceptance,
    accepted_proposals,
    InProgress,
    allassignment,
    inprogress,
    complete,
    customer_declined_Pay,
    paid,
    unpaid,
    totalpayment,
  } = allQueries;
  const [clientDeclinedp, setClientDeclinedp] = useState("0");
  const [clientDeclineda, setClientDeclineda] = useState("0");
  const [permission_to_issue_invoice, setpermission_to_issue_invoice] =
    useState("0");
  useEffect(() => {
    const getAllQueries = () => {
      const token = window.localStorage.getItem("clientToken");
      const myConfig = {
        headers: {
          uit: token,
        },
      };

      axios
        .get(
          `${baseUrl}/customers/totalComplete?uid=${JSON.parse(userId)}`,
          myConfig
        )
        .then((response) => {
          if (response.data.code === 1) {
            setpermission_to_issue_invoice(
              response.data.result.proposal.permission_to_issue_invoice
            );
            setClientDeclinedp(
              response.data.result.proposal["customer_declined_proposalsa "]
            );
            setClientDeclineda(
              response.data.result.proposal["customer_declined_proposalsp "]
            );
            setAllQueries({
              total: response.data.result.total,
              inprogress_queries: response.data.result.inprogress_queries,
              inprogress_allocation: response.data.result.inprogress_allocation,
              inprogress_proposal: response.data.result.inprogress_proposal,
              inprogress_assignment: response.data.result.inprogress_assignment,
              complete_query: response.data.result.complete_query,
              declined_queries: response.data.result.declined_queries,
              admin_declined_query: response.data.result.admin_declined_query,
              customer_declined_Query:
                response.data.result.customer_declined_Query,
              customer_declined_proposal:
                response.data.result.customer_declined_proposal,
              Customer_declined_payment:
                response.data.result.Customer_declined_payment,

              allproposal: response.data.result.proposal.allproposal,
              InProgress: response.data.result.proposal.InProgress,
              inprogress_preparation:
                response.data.result.proposal.inprogress_preparation,
              inprogress_acceptance:
                response.data.result.proposal.inprogress_acceptance,
              accepted_proposals:
                response.data.result.proposal.accepted_proposals,
              declined:
                response.data.result.proposal["customer_declined_proposals "],

              allassignment: response.data.result.assignment.allassignment,
              inprogress: response.data.result.assignment.inprogress,
              complete: response.data.result.assignment.complete,
              customer_declined_Pay:
                response.data.result.assignment.customer_declined_payment,

              totalpayment: response.data.result.payments.totalpayment,
              paid: response.data.result.payments.paid,
              unpaid: response.data.result.payments.unpaid,
            });
          }
        })
        .catch((error) => {});
    };

    getAllQueries();
  }, [userId]);

  return (
                    <>
                      <table className="table table-striped  third main_table">
                        <thead className="query_thead query_thead1">
                          <tr>
                            <th className="left_side">Completed; queries</th>
                            <th>{complete_query}</th>
                          </tr>
                        </thead>
                        <tbody className="table_body">
                          <tr>
                            <td className="left_side">
                              Completed; assignments
                            </td>
                            <td>{complete_query}</td>
                          </tr>
                        </tbody>
                      </table>
                      {complete_query !== 0 || declined_queries !== 0 ? (
                        <>
                          <table className="table table-striped  forth main_table">
                            <thead className="query_thead query_thead1">
                              <tr>
                                <th className="left_side">Declined; queries</th>
                                <th>{declined_queries}</th>
                              </tr>
                            </thead>

                            <tbody className="table_body">
                              <tr>
                                <td className="left_side">
                                  Admin declined; queries
                                </td>
                                <td>{admin_declined_query}</td>
                              </tr>
                              <tr>
                                <td className="left_side">
                                  Client declined; queries
                                </td>
                                <td>{customer_declined_Query}</td>
                              </tr>
                              <tr>
                                <td className="left_side">
                                  Client declined; proposals
                                </td>
                                <td>{customer_declined_proposal}</td>
                              </tr>
                              <tr>
                                <td className="left_side">
                                  Client declined; payment
                                </td>
                                <td>{Customer_declined_payment}</td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      ) : (
                        ""
                      )}{" "}
                    </>       
  );
}

export default BotqueryDB;
