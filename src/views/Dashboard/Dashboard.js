import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../config/config";
import BotqueryDB from "./BotqueryDB"
import ProposalDB from "./proposalDB"
import useErrorHandler from "../../useErrorHandler"


import { Container, Grid, Paper, Box } from "@material-ui/core";
function Dashboard() {
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
  const setVisibleError = useErrorHandler()
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
        .catch((error) => {
          setVisibleError('Unable to record work start time', error)
        });
    };

    getAllQueries();
  }, [userId]);

  return (
    <>
      <Layout custDashboard="custDashboard" custUserId={userId}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item sm={3}>
              <Box m={1}>
                <Paper>
                  <table className="table table-striped  first main_table">
                    <thead className="query_thead">
                      <tr>
                        <th className="left_side"> All queries</th>
                        <th>{total}</th>
                      </tr>
                    </thead>
                  </table>
                  <table className="table table-striped  second main_table">
                    <thead className="query_thead query_thead1">
                      <tr>
                        <th className="left_side">Inprogress; queries</th>
                        <th>{inprogress_queries}</th>
                      </tr>
                    </thead>

                    <tbody className="table_body">
                      <tr>
                        <td className="left_side">Inprogress; allocation</td>
                        <td>{inprogress_allocation}</td>
                      </tr>
                      <tr>
                        <td className="left_side">Inprogress; proposals</td>
                        <td>{inprogress_proposal}</td>
                      </tr>
                      <tr>
                        <td className="left_side">Inprogress; assignments</td>
                        <td>{inprogress_assignment}</td>
                      </tr>
                    </tbody>
                  </table>

                  {inprogress_queries !== 0 || declined_queries !== 0 ? (
                    <BotqueryDB/>
                  ) : (
                    ""
                  )}
                </Paper>
              </Box>
            </Grid>
            {allproposal !== 0 ? (
              <ProposalDB/>
            ) : (
              ""
            )}
          </Grid>
        </Container>
      </Layout>{" "}
      :
    </>
  );
}

export default Dashboard;
