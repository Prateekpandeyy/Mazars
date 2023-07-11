<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../config/config";

import { Container, Grid, Paper, Box } from "@material-ui/core";
function PaymentDB() {
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
                        <Grid item sm={3}>
                          <Box m={1}>
                            <Paper>
                              <table className="table table-striped thirteenth main_table">
                                <thead className="payment_thead">
                                  <tr>
                                    <th className="left_side">All payments</th>
                                    <th>{totalpayment}</th>
                                  </tr>
                                </thead>
                              </table>
                              <table className="table table-striped fortheenth main_table">
                                <thead className="payment_thead2">
                                  <tr>
                                    <th className="left_side">Paid</th>
                                    <th>{paid}</th>
                                  </tr>
                                </thead>
                              </table>
                              <table className="table table-striped fiftheenth main_table">
                                <thead className="payment_thead2">
                                  <tr>
                                    <th className="left_side">Unpaid</th>
                                    <th>{unpaid}</th>
                                  </tr>
                                </thead>
                              </table>
                            </Paper>
                          </Box>
                        </Grid>
                      </>
                   
  );
}

export default PaymentDB;
=======
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../config/config";

import { Container, Grid, Paper, Box } from "@material-ui/core";
function PaymentDB() {
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
                        <Grid item sm={3}>
                          <Box m={1}>
                            <Paper>
                              <table className="table table-striped thirteenth main_table">
                                <thead className="payment_thead">
                                  <tr>
                                    <th className="left_side">All payments</th>
                                    <th>{totalpayment}</th>
                                  </tr>
                                </thead>
                              </table>
                              <table className="table table-striped fortheenth main_table">
                                <thead className="payment_thead2">
                                  <tr>
                                    <th className="left_side">Paid</th>
                                    <th>{paid}</th>
                                  </tr>
                                </thead>
                              </table>
                              <table className="table table-striped fiftheenth main_table">
                                <thead className="payment_thead2">
                                  <tr>
                                    <th className="left_side">Unpaid</th>
                                    <th>{unpaid}</th>
                                  </tr>
                                </thead>
                              </table>
                            </Paper>
                          </Box>
                        </Grid>
                      </>
                   
  );
}

export default PaymentDB;
>>>>>>> b4d05016293e3d8995b9d3bd87d2a6cc56e3fa64
