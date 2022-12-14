import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import CustomTypography from "../../../components/Common/CustomTypography";
function Dashboard() {
  const userid = window.localStorage.getItem("tpkey");
  const sessionTpid = window.sessionStorage.getItem("sessionTpid");
  let history = useHistory();
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
  });

  const [assignment, setAssignment] = useState({
    inprogress: "",
    complete: "",
    client_discussion: "",
    draft_report: "",
    final_discussion: "",
    final_report: "",
    complete_inprocess: "",
    customer_declined_payment: "",
  });

  const [payment, setPayment] = useState({
    paid: "",
    unpaid: "",
    totalpayment: "",
  });
  const [clientDeclinedp, setClientDeclinedp] = useState("");
  const [clientDeclineda, setClientDeclineda] = useState("");
  const [permission_to_issue_invoice, setpermission_to_issue_invoice] =
    useState("");
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
  } = allQueries;

  const {
    inprogress,
    complete,
    client_discussion,
    draft_report,
    final_discussion,
    final_report,
    complete_inprocess,
    customer_declined_payment,
  } = assignment;

  const { paid, unpaid, totalpayment } = payment;
  const token = window.localStorage.getItem("tptoken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  useEffect(() => {
    const getAllQueries = () => {
      axios
        .get(
          `${baseUrl}/tp/totalComplete?tp_id=${JSON.parse(userid)}`,
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
            });
          }
        })
        .catch((error) => {});
    };

    const getAssignment = () => {
      axios
        .get(
          `${baseUrl}/tl/getAssignmentsCount?tp_id=${JSON.parse(userid)}`,
          myConfig
        )
        .then((response) => {
          if (response.data.code === 1) {
            setAssignment({
              inprogress: response.data.result.inprogress,
              complete: response.data.result.complete,
              client_discussion: response.data.result.client_discussion,
              draft_report: response.data.result.draft_report,
              final_discussion: response.data.result.final_discussion,
              final_report: response.data.result.final_report,
              complete_inprocess: response.data.result.complete_inprocess,
              customer_declined_payment:
                response.data.result.customer_declined_payment,
            });
          }
        })
        .catch((error) => {});
    };

    const getPayment = () => {
      axios
        .get(
          `${baseUrl}/tl/getAssignmentsPaymentCount?tp_id=${JSON.parse(
            userid
          )}`,
          myConfig
        )
        .then((response) => {
          if (response.data.code === 1) {
            setPayment({
              paid: response.data.result.paid,
              unpaid: response.data.result.unpaid,
              totalpayment: response.data.result.totalpayment,
            });
          }
        })
        .catch((error) => {});
    };

    getAllQueries();
    getPayment();
    getAssignment();
  }, []);

  const logout = () => {
    localStorage.removeItem("tpkey");
    localStorage.removeItem("tpEmail");
    history.push("/taxprofessional/login");
  };

  return (
    <>
      {sessionTpid ? (
        <Layout TPDashboard="TPDashboard" TPuserId={userid}>
          <Container maxWidth="xl">
            <div className="row">
              <div className="col-md-3 content_header">
                <table className="table table-striped first main_table mb-1">
                  <thead className="query_thead">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          All queries
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {total}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>
                <table className="table table-striped second main_table mb-1">
                  <thead className="query_thead1">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Inprogress; queries
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {inprogress_queries}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="table_body">
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Inprogress; allocation
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {inprogress_allocation}
                        </CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Inprogress; proposals
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {inprogress_proposal}
                        </CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Inprogress; assignments
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {inprogress_assignment}
                        </CustomTypography>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="table table-striped third main_table mb-1">
                  {/* <thead className="query_thead1">
              <tr>
                <th className="left_side"></th>
                <CustomTypography color="#ffffff">
                Completed; queries
                </CustomTypography>
                <th>
                  <CustomTypography color="#ffffff">
                  {complete_query}
                  </CustomTypography>
                </th>
              </tr>
            </thead> */}
                  <thead className="query_thead1">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Completed; queries
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {complete_query}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table_body">
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Completed; assignments
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>{complete_query}</CustomTypography>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="table table-striped forth main_table mb-1">
                  <thead className="query_thead1">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Declined; queries
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {declined_queries}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="table_body">
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Admin Declined; queries
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {admin_declined_query}
                        </CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Client Declined; queries
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {customer_declined_Query}
                        </CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Client declined; proposals
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {customer_declined_proposal}
                        </CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Client declined; payment
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {Customer_declined_payment}
                        </CustomTypography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-md-3 content_header">
                <table className="table table-striped fifth main_table mb-1">
                  <thead className="proposal_thead">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          All proposals
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {allproposal}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table className="table table-striped sixth main_table mb-1">
                  <thead className="proposal_thead3">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Inprogress; proposals
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {InProgress}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                  <tbody classNameName="table_body">
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Inprogress; preparation
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {inprogress_preparation}
                        </CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Inprogress; acceptance
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {inprogress_acceptance}
                        </CustomTypography>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="table table-striped seventh main_table mb-1">
                  <thead className="proposal_thead3">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Accepted; proposals
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {accepted_proposals}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table className="table table-striped eight main_table mb-1">
                  <thead className="proposal_thead3">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Client declined; proposals
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {declined}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table_body">
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Client declined; proposals
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>{clientDeclineda}</CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          client declined; assignments
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>{clientDeclinedp}</CustomTypography>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table table-striped eight main_table mb-1">
                  <thead className="proposal_thead3">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Permission to issue invoice
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {permission_to_issue_invoice}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="col-md-3 content_header">
                <table className="table table-striped ninth main_table mb-1">
                  <thead className="assignment_thead">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          All assignments
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {inprogress + complete + +customer_declined_payment}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table className="table table-striped tenth main_table mb-1">
                  <thead className="assignment_thead2">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Inprogress; assignments
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {inprogress}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>

                  <tbody classNameName="table_body">
                    <tr>
                      <td className="left_side">
                        <CustomTypography>Client discussion</CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>{client_discussion}</CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>Draft reports</CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>{draft_report}</CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>Final discussion</CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>{final_discussion}</CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>
                          Delivery of final reports
                        </CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>{final_report}</CustomTypography>
                      </td>
                    </tr>
                    <tr>
                      <td className="left_side">
                        <CustomTypography>Awaiting completion</CustomTypography>
                      </td>
                      <td>
                        <CustomTypography>
                          {complete_inprocess}
                        </CustomTypography>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="table table-striped tenth main_table mb-1">
                  <thead className="assignment_thead2">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Completed; assignments
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {complete}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table className="table table-striped tenth main_table mb-1">
                  <thead className="assignment_thead2">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Client declined; payment
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {customer_declined_payment}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="col-md-3 content_header">
                <table className="table table-striped twelvth main_table mb-1">
                  <thead className="payment_thead">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          All payments
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {unpaid + paid}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>
                <table className="table table-striped thirteen main_table mb-1">
                  <thead className="payment_thead2">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Paid
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {paid}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>

                <table className="table table-striped thirteen main_table mb-1">
                  <thead className="payment_thead2">
                    <tr>
                      <th className="left_side">
                        <CustomTypography color="#ffffff">
                          Unpaid
                        </CustomTypography>
                      </th>
                      <th>
                        <CustomTypography color="#ffffff">
                          {unpaid}
                        </CustomTypography>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </Container>
        </Layout>
      ) : (
        <>{logout()}</>
      )}
    </>
  );
}

export default Dashboard;
