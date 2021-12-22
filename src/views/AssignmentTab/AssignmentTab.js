import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";


import AllAssignment from "./AllAssignment";
import InprogressAssignment from "./InprogressAssignment";
import CompletedAssignment from "./CompletedAssignment";
import CustomerDeclinedPayment from "./CustomerDeclinedPayment";



function AssignmentTab(props) {
  const userId = window.localStorage.getItem("userid");

  const [tabIndex, setTabIndex] = useState(0);
  useLayoutEffect(() => {
    setTabIndex(props.location.index || 0);
  }, [props.location.index]);


  const [allassignment, setAllAssignment] = useState("");
  const [inprogressAssignmentCount, setInprogressAssignmentCount] = useState("");
  const [completeAssignment, setCompleteAssignment] = useState("");
  const [declinedAssignment, setDeclinedAssignment] = useState("");


  useEffect(() => {
    getAllAssignment();
    getInprogressAssignment();
    getCompletedAssignment();
    getCustomerDeclinedPayment();
  }, []);


  const getAllAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}`)
      .then((res) => {
        
        setAllAssignment(res.data.result.length);
      });
  };

  const getInprogressAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=1`)
      .then((response) => {
       
        if (response.data.code === 1) {
          setInprogressAssignmentCount(response.data.result.length);
        }
      })
  };

  const getCompletedAssignment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=2`)
      .then((res) => {
      
        if (res.data.code === 1) {
          setCompleteAssignment(res.data.result.length);
        }
      });
  };

  const getCustomerDeclinedPayment = () => {
    axios
      .get(`${baseUrl}/customers/completeAssignments?user=${JSON.parse(userId)}&status=3`)
      .then((response) => {
     
        if (response.data.code === 1) {
          setDeclinedAssignment(response.data.result.length);
        }
      })
  };



  const myStyle1 = {
    backgroundColor: "grey",
    padding: "12px 24px",
    borderRadius: "50px",
    width: "auto",
    textAlign: "center",
    color: "white",
    cursor: "pointer",
  };

  const myStyle2 = {
    padding: "12px 24px",
    borderRadius: "50px",
    width: "auto",
    textAlign: "center",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  };





  return (
    <Layout custDashboard="custDashboard" custUserId={userId}>
      <div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList
            style={{
              listStyleType: "none",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Tab style={tabIndex === 0 ? myStyle2 : myStyle1}>
              All Assignment ({allassignment})
            </Tab>
            <Tab style={tabIndex === 1 ? myStyle2 : myStyle1}>
              Inprogress; Assignments ({inprogressAssignmentCount})
            </Tab>

            <Tab style={tabIndex === 2 ? myStyle2 : myStyle1}>
              Completed; Assignments ({completeAssignment})
            </Tab>

            <Tab style={tabIndex === 3 ? myStyle2 : myStyle1}>
              Client Declined; Payment ({declinedAssignment})
            </Tab>
          </TabList>

          <TabPanel>
            <AllAssignment />
          </TabPanel>

          <TabPanel>
            <InprogressAssignment />
          </TabPanel>

          <TabPanel>
            <CompletedAssignment />
          </TabPanel>

          <TabPanel>
            <CustomerDeclinedPayment />
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default AssignmentTab;




