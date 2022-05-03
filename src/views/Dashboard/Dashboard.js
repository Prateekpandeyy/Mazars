import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useHistory } from "react-router";
import {Container, Grid, Paper, Box} from "@material-ui/core";
import CommonServices from '../../common/common';
function Dashboard() {
  const userId = window.localStorage.getItem("userid");

const sessionId =  window.sessionStorage.getItem("userIdsession")
let history= useHistory()
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

    allassignment: '',
    inprogress: '',
    complete: '',
    customer_declined_Pay: '',


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
    accepted_proposals, InProgress,
    allassignment, inprogress, complete,
    customer_declined_Pay,
    paid, unpaid, totalpayment,
  } = allQueries;

const logout = () => {
  localStorage.removeItem("userid")
  localStorage.removeItem("custEmail")
  history.push("/")
}

console.log("sessionStorage", window.sessionStorage)
  useEffect(() => {
    const getAllQueries = () => {

      const token = window.localStorage.getItem("clientToken")
      const myConfig = {
        headers : {
         "uit" : token
        }
      }
       axios
        .get(`${baseUrl}/customers/totalComplete?uid=${JSON.parse(userId)}`, myConfig)
        .then((response) => {

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


              allassignment: response.data.result.assignment.allassignment,
              inprogress: response.data.result.assignment.inprogress,
              complete: response.data.result.assignment.complete,
              customer_declined_Pay: response.data.result.assignment.customer_declined_payment,



              totalpayment: response.data.result.payments.totalpayment,
              paid: response.data.result.payments.paid,
              unpaid: response.data.result.payments.unpaid,


            })
          }
          else if(response.data.code === 0){
CommonServices.clientLogout(history)
          }
        })
        .catch((error) => {
      
        });
    };


    getAllQueries();
  }, []);


  return (
  <>
  {sessionId ? 
  <Layout custDashboard="custDashboard" custUserId={userId}>

<Container maxWidth="xl">
 <Grid container>

  <Grid item sm = {3}>
  <Box m={1}> 
     <Paper>

       <table className="table table-striped  first main_table">
        <thead className="query_thead">
          <tr>
            <th className="left_side"> All Queries</th>
            <th>{total}</th>
          </tr>
        </thead>
      </table>
      <table className="table table-striped  second main_table">
        <thead className="query_thead query_thead1">
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

      {inprogress_queries != 0 || declined_queries != 0 ? <>
        <table className="table table-striped  third main_table">
          <thead className="query_thead query_thead1">
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
        {complete_query != 0  || declined_queries != 0 ? <>

          <table className="table table-striped  forth main_table">
            <thead className="query_thead query_thead1">
              <tr>
                <th className="left_side">Declined; Queries</th>
                <th>{declined_queries}</th>
              </tr>
            </thead>

            <tbody className="table_body">
              <tr>
                <td className="left_side">Admin Declined; Queries</td>
                <td>{admin_declined_query}</td>
              </tr>
              <tr>
                <td className="left_side">Client Declined; Queries</td>
                <td>{customer_declined_Query}</td>
              </tr>
              <tr>
                <td className="left_side">Client Declined; Proposals</td>
                <td>{customer_declined_proposal}</td>
              </tr>
              <tr>
                <td className="left_side">Client Declined; Payment</td>
                <td>{Customer_declined_payment}</td>
              </tr>
            </tbody>
          </table>
        </> : ""}   </> : ""}
        
         </Paper>   
         </Box>
        </Grid>
    {allproposal != 0 ? <>
      <Grid item sm = {3}>
      <Box m={1}>
     <Paper>
     
       <table className="table table-striped fifth main_table">
          <thead className="proposal_thead">
            <tr>
              <th className="left_side">All Proposals</th>
              <th>{allproposal}</th>

            </tr>
          </thead>
        </table>

        <table className="table table-striped  sixth main_table">
          <thead className="proposal_thead3">
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
          <thead className="proposal_thead3">
            <tr>
              <th className="left_side">Accepted; Proposals </th>
              <th>{accepted_proposals}</th>
            </tr>
          </thead>
        </table>

        <table className="table table-striped eight main_table">
          <thead className="proposal_thead3">
            <tr>
              <th className="left_side">Client Declined; Proposals</th>
              <th>{declined}</th>
            </tr>
          </thead>
        </table>
       
     </Paper>
     </Box>
      </Grid>
      {allassignment != 0 ? <>
        <Grid item sm = {3}>
        <Box m={1}>
         <Paper>
        
           <table className="table table-striped ninth main_table">
            <thead className="assignment_thead">
              <tr>
                <th className="left_side">All Assignments</th>
                <th>{allassignment}</th>
              </tr>
            </thead>
          </table>

          <table className="table table-striped tenth main_table">
            <thead className="assignment_thead2">

              <tr>
                <th className="left_side">Inprogress; Assignments</th>
                <th>{inprogress}</th>
              </tr>
            </thead>
          </table>

          <table className="table table-striped elevnth main_table">
            <thead className="assignment_thead2">

              <tr>
                <th className="left_side">Completed; Assignments</th>
                <th>{complete}</th>
              </tr>
            </thead>
          </table>

          <table className="table table-striped twelvth main_table">
            <thead className="assignment_thead2">

              <tr>
                <th className="left_side">Client Declined; Payment</th>
                <th>{customer_declined_Pay}</th>
              </tr>
            </thead>
          </table>
          
         </Paper>
         </Box>
    </Grid>
        {totalpayment != 0 ? <>

          <Grid item sm = {3}>
          <Box m={1}>
           <Paper>
           
             <table className="table table-striped thirteenth main_table">
              <thead className="payment_thead">
                <tr>
                  <th className="left_side">All Payments</th>
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
        </> : ""} </> : ""}  </> : ""}  
</Grid>
  </Container>

 
</Layout> : 
<>
{logout()}
</>}
  </>
  );
}

export default Dashboard;